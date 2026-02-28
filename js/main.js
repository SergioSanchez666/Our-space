/**
 * Pace - Lógica unificada: contador, mensajes y galería
 * PRD: fecha de inicio configurable en CONFIG.startDate
 */

(function () {
  'use strict';

  // --- Configuración (PRD: fecha de inicio configurable mediante variable en código) ---
  const CONFIG = {
    startDate: '2022-05-05T00:00:00', // 5 de mayo de 2022
    maxPhotoSizeKB: 800,
    storageKeys: {
      photos: 'pace_photos',
      config: 'pace_config'
    }
  };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ----- Supabase (mensajes + storage) -----
  const SUPABASE_URL = 'https://bwikogxafcyfdohlqsxk.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_0Gaz8klFzUhibpoXzKDiCA_yCLuaDjb';
  const supabaseClient =
    (window.supabase && typeof window.supabase.createClient === 'function')
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      : null;

  // ----- Contador -----
  function getStartDate() {
    const d = new Date(CONFIG.startDate);
    if (isNaN(d.getTime())) return new Date();
    return d;
  }

  function updateCounter() {
    const start = getStartDate();
    const now = new Date();
    if (now < start) {
      $('#contador-dias').textContent = '0';
      $('#contador-horas').textContent = '0';
      $('#contador-min').textContent = '0';
      $('#contador-seg').textContent = '0';
      return;
    }
    let diff = Math.floor((now - start) / 1000);
    const seg = diff % 60;
    diff = Math.floor(diff / 60);
    const min = diff % 60;
    diff = Math.floor(diff / 60);
    const horas = diff % 24;
    const dias = Math.floor(diff / 24);

    $('#contador-dias').textContent = dias;
    $('#contador-horas').textContent = horas;
    $('#contador-min').textContent = min;
    $('#contador-seg').textContent = seg;
  }

  setInterval(updateCounter, 1000);
  updateCounter();

  // ----- Mensajes: Supabase (DB + Storage) -----

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatMessageText(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>');
  }

  function renderMessages(list) {
    const listEl = $('#lista-mensajes');
    const query = ($('#buscar-mensajes')?.value || '').toLowerCase();
    // Checkbox reservado para futuras mejoras
    const _onlyFav = $('#solo-favoritos')?.checked;

    let filtered = list || [];
    if (query) {
      filtered = filtered.filter(m =>
        (m.contenido || '').toLowerCase().includes(query) ||
        (m.nombre || '').toLowerCase().includes(query)
      );
    }

    listEl.innerHTML = filtered.map(m => {
      const fecha = m.created_at ? new Date(m.created_at) : null;
      return `
        <li class="mensaje-card" data-id="${escapeHtml(String(m.id ?? ''))}">
          <div class="mensaje-card__header">
            <div class="mensaje-card__meta">
              <span class="mensaje-card__nombre">${escapeHtml(m.nombre || 'Anónimo')}</span>
              <span class="mensaje-card__fecha">${escapeHtml(fecha ? fecha.toLocaleDateString('es-ES', { dateStyle: 'medium' }) : '')}</span>
            </div>
          </div>
          <p class="mensaje-card__texto">${formatMessageText(m.contenido || '')}</p>
          ${m.imagen_url ? `<img class="mensaje-card__img" src="${escapeHtml(m.imagen_url)}" alt="Foto adjunta" loading="lazy">` : ''}
        </li>`;
    }).join('');
  }

  function getNombrePorDefecto() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKeys.config);
      if (!raw) return 'Diego';
      const cfg = JSON.parse(raw);
      return (cfg?.nombre && String(cfg.nombre).trim()) ? String(cfg.nombre).trim() : 'Diego';
    } catch {
      return 'Diego';
    }
  }

  async function enviarMensaje() {
    if (!supabaseClient) {
      alert('Supabase no está cargado. Revisa el script CDN.');
      return;
    }

    const textarea = $('#mensaje-texto');
    const fotoInput = $('#foto-input');
    const contenido = (textarea?.value || '').trim();
    if (!contenido) return;

    const nombre = getNombrePorDefecto();
    const file = fotoInput?.files?.[0] || null;

    let imagenUrl = null;
    if (file) {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const safeExt = ext.match(/^[a-z0-9]+$/) ? ext : 'jpg';
      const path = `mensajes/${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExt}`;

      const { error: uploadError } = await supabaseClient
        .storage
        .from('fotos')
        .upload(path, file, { upsert: false, cacheControl: '3600' });

      if (uploadError) {
        alert('No se pudo subir la imagen. Asegúrate de que exista el bucket `fotos` y tenga permisos.');
        return;
      }

      const { data: publicData } = supabaseClient
        .storage
        .from('fotos')
        .getPublicUrl(path);

      imagenUrl = publicData?.publicUrl || null;
    }

    const { error: insertError } = await supabaseClient
      .from('mensajes')
      .insert({ nombre, contenido, imagen_url: imagenUrl });

    if (insertError) {
      alert('No se pudo insertar en la tabla `mensajes`. Revisa columnas y RLS.');
      return;
    }

    textarea.value = '';
    if (fotoInput) fotoInput.value = '';
    await cargarMensajes();
  }

  async function cargarMensajes() {
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
      .from('mensajes')
      .select('id,nombre,contenido,imagen_url,created_at')
      .order('created_at', { ascending: false });

    if (error) {
      const listEl = $('#lista-mensajes');
      if (listEl) {
        listEl.innerHTML = '<li class="mensaje-card"><p class="mensaje-card__texto">No se pudieron cargar los mensajes.</p></li>';
      }
      return;
    }

    renderMessages(data || []);
  }

  function initMessages() {
    const form = $('#form-mensaje');

    // UI de formato (simple: inserta tokens markdown)
    form.querySelectorAll('.btn-toolbar[data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        const textarea = $('#mensaje-texto');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = textarea.value.slice(start, end);
        if (!selected) return;
        const wrapper = cmd === 'bold' ? '**' : '_';
        textarea.setRangeText(wrapper + selected + wrapper, start, end, 'end');
        textarea.focus();
      });
    });

    form.querySelectorAll('.btn-toolbar[data-emoji]').forEach(btn => {
      btn.addEventListener('click', () => {
        const textarea = $('#mensaje-texto');
        const emoji = btn.dataset.emoji || '❤️';
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = textarea.value.slice(0, start);
        const after = textarea.value.slice(end);
        textarea.value = before + emoji + after;
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await enviarMensaje();
    });

    $('#buscar-mensajes')?.addEventListener('input', () => cargarMensajes());
    $('#solo-favoritos')?.addEventListener('change', () => cargarMensajes());

    cargarMensajes();
  }

  // ----- Galería: almacenamiento y compresión -----
  function getPhotos() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKeys.photos);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function setPhotos(list) {
    localStorage.setItem(CONFIG.storageKeys.photos, JSON.stringify(list));
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const maxBytes = CONFIG.maxPhotoSizeKB * 1024;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        const maxDim = 1200;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = (h / w) * maxDim;
            w = maxDim;
          } else {
            w = (w / h) * maxDim;
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        let quality = 0.85;
        const tryExport = () => {
          canvas.toBlob(
            (blob) => {
              if (blob.size <= maxBytes || quality <= 0.2) {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              } else {
                quality -= 0.1;
                tryExport();
              }
            },
            'image/jpeg',
            quality
          );
        };
        tryExport();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('No se pudo cargar la imagen'));
      };
      img.src = url;
    });
  }

  function renderGallery(list) {
    const grid = $('#galeria-grid');
    grid.innerHTML = list.map((p, i) => `
      <figure class="galeria__item" role="listitem" data-index="${i}">
        <img src="${p.data}" alt="Foto ${i + 1}" loading="lazy" />
        <figcaption>${p.date ? new Date(p.date).toLocaleDateString('es-ES') : ''}</figcaption>
      </figure>
    `).join('');
  }

  let lightboxCurrent = 0;
  let lightboxList = [];

  function showLightboxImage() {
    const list = lightboxList;
    if (list.length === 0) return;
    const p = list[lightboxCurrent];
    const img = $('#lightbox-img');
    const cap = $('#lightbox-caption');
    img.src = p.data;
    img.alt = p.description || `Foto ${lightboxCurrent + 1}`;
    cap.textContent = (p.description || '') + (p.date ? ' — ' + new Date(p.date).toLocaleDateString('es-ES') : '');
  }

  function openLightbox(index) {
    const list = getPhotos();
    if (index < 0 || index >= list.length) return;
    lightboxList = list;
    lightboxCurrent = index;
    const lightbox = $('#lightbox');
    showLightboxImage();
    lightbox.hidden = false;
  }

  function initGallery() {
    const drop = $('#galeria-drop');
    const input = $('#galeria-input');
    const progress = $('#galeria-progreso');

    renderGallery(getPhotos());

    function addFiles(files) {
      const accepted = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      const list = getPhotos();
      let done = 0;
      const total = [...files].filter(f => accepted.includes(f.type)).length;
      if (total === 0) return;
      progress.hidden = false;

      [...files].forEach((file) => {
        if (!accepted.includes(file.type)) return;
        progress.textContent = `Subiendo ${done + 1}/${total}...`;
        compressImage(file)
          .then((data) => {
            list.push({ data, date: new Date().toISOString(), description: '' });
            setPhotos(list);
            renderGallery(list);
            done++;
            progress.textContent = done === total ? 'Listo.' : `Subiendo ${done + 1}/${total}...`;
            if (done === total) setTimeout(() => { progress.hidden = true; }, 1500);
          })
          .catch(() => {
            done++;
            if (done === total) progress.hidden = true;
          });
      });
    }

    drop.addEventListener('click', (e) => { if (e.target === drop || e.target.classList.contains('galeria__drop-text')) input.click(); });
    input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });

    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('drag-over'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('drag-over');
      addFiles(e.dataTransfer.files);
    });

    $('#galeria-grid').addEventListener('click', (e) => {
      const item = e.target.closest('.galeria__item');
      if (item) openLightbox(parseInt(item.dataset.index, 10));
    });

    const lightbox = $('#lightbox');
    $('.lightbox__cerrar').addEventListener('click', () => { lightbox.hidden = true; });
    $('.lightbox__prev').addEventListener('click', () => {
      lightboxCurrent = (lightboxCurrent - 1 + lightboxList.length) % lightboxList.length;
      showLightboxImage();
    });
    $('.lightbox__next').addEventListener('click', () => {
      lightboxCurrent = (lightboxCurrent + 1) % lightboxList.length;
      showLightboxImage();
    });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
  }

  // ----- Menú móvil -----
  const header = $('.header');
  const menuBtn = $('.header__menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      header.classList.toggle('nav-abierto');
      menuBtn.setAttribute('aria-expanded', header.classList.contains('nav-abierto'));
    });
  }

  $$('.header__nav-list a').forEach(a => {
    a.addEventListener('click', () => header.classList.remove('nav-abierto'));
  });

  // ----- Inicio -----
  document.addEventListener('DOMContentLoaded', () => {
    initMessages();
    initGallery();
  });
})();

function closeWelcome() {
  document.getElementById('welcome-overlay').style.display = 'none';
  localStorage.setItem('welcomeShown', 'true');
}

// Al cargar la página, revisar si ya lo vio
window.onload = function() {
  if (localStorage.getItem('welcomeShown')) {
    document.getElementById('welcome-overlay').style.display = 'none';
  }
}