const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Galería =====
const galeriaGrid = document.querySelector('.galeria-grid');

if (galeriaGrid) {
  const fotos = Array.from(galeriaGrid.querySelectorAll('.foto'));
  const tabs = document.querySelectorAll('.filtro-tab');
  const lightbox = document.querySelector('.lightbox');

  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCategoria = lightbox.querySelector('.category');
    const lightboxTitulo = lightbox.querySelector('h3');
    const btnCerrar = lightbox.querySelector('.lightbox-cerrar');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let visibles = fotos;
    let indiceActual = 0;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('activo'));
        tab.classList.add('activo');

        const categoria = tab.dataset.categoria;
        fotos.forEach((foto) => {
          const coincide = categoria === 'todas' || foto.dataset.categoria === categoria;
          foto.hidden = !coincide;
        });

        visibles = fotos.filter((foto) => !foto.hidden);
        indiceActual = 0;
      });
    });

    function abrirLightbox(indice) {
      indiceActual = indice;
      actualizarLightbox();
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function cerrarLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    function actualizarLightbox() {
      const foto = visibles[indiceActual];
      if (!foto) return;
      const img = foto.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCategoria.textContent = foto.querySelector('.category').textContent;
      lightboxTitulo.textContent = foto.querySelector('h3').textContent;
    }

    function siguiente() {
      if (!visibles.length) return;
      indiceActual = (indiceActual + 1) % visibles.length;
      actualizarLightbox();
    }

    function anterior() {
      if (!visibles.length) return;
      indiceActual = (indiceActual - 1 + visibles.length) % visibles.length;
      actualizarLightbox();
    }

    fotos.forEach((foto) => {
      foto.addEventListener('click', () => {
        visibles = fotos.filter((f) => !f.hidden);
        const nuevoIndice = visibles.indexOf(foto);
        abrirLightbox(nuevoIndice);
      });
    });

    btnCerrar.addEventListener('click', cerrarLightbox);
    btnNext.addEventListener('click', siguiente);
    btnPrev.addEventListener('click', anterior);

    lightbox.addEventListener('click', (evento) => {
      if (evento.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', (evento) => {
      if (lightbox.hidden) return;
      if (evento.key === 'Escape') cerrarLightbox();
      if (evento.key === 'ArrowRight') siguiente();
      if (evento.key === 'ArrowLeft') anterior();
    });
  }
}
