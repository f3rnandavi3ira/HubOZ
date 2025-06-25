// Header scroll e transparência
$(window).on('scroll', function() {
    const navbar = $('.navbar-collapse');
    if (!navbar.hasClass('show')) {
        $('.main-header').toggleClass('scrolled', $(window).scrollTop() > 50);
    }
});

$(document).ready(function() {

    $(document).on('click', function(e) {
        const navbar = $('.navbar-collapse');
        const isMenuButton = $(e.target).closest('.navbar-toggler').length > 0;
        const isMenuContent = $(e.target).closest('.navbar-collapse').length > 0;
        
        if (navbar.hasClass('show') && !isMenuButton && !isMenuContent) {
            navbar.collapse('hide');
            $('.main-header').removeClass('force-dark');
        }
    });

    // Fechar menu ao clicar nos links
    $('.navbar-nav .nav-link').on('click', function() {
        const navbar = $('.navbar-collapse');
        if (navbar.hasClass('show')) {
            navbar.collapse('hide');
            $('.main-header').removeClass('force-dark');
        }
    });

    // Controle do menu hamburguer
    $('.navbar-toggler').on('click', function() {
        const navbar = $('.navbar-collapse');
        const isOpening = !navbar.hasClass('show');
        
        $('.main-header').toggleClass('force-dark', isOpening);
        
        navbar.on('hidden.bs.collapse shown.bs.collapse', function() {
            if (!navbar.hasClass('show')) {
                $('.main-header').removeClass('force-dark');
            }
        });
    });

  // Owl Carousel
  $('.owl-carousel').owlCarousel({
      loop: true,
      items: 2,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 2000,
      responsive: {
          0: { items: 1 },
          900: { items: 2 }
      }
  });

  // One Page Scroll
  $.scrollIt({
      easing: 'linear',
      topOffset: -70
  });


  // Filtros de membros (atualizado para nova estrutura)
  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    const filterValue = $(this).data('filter');
    
    $('.member-card').each(function() {
        if (filterValue === 'all') {
            $(this).show();
        } else {
            const cardCargo = $(this).data('cargo');
            $(this).toggle(cardCargo === filterValue);
        }
    });
});

/// Configuração do scroll horizontal para ambas as seções
function configurarScrollHorizontal(seletorContainer) {
    const container = $(seletorContainer);
    
    // Habilita arrastar com o mouse
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.on('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offset().left;
        scrollLeft = container.scrollLeft();
        container.css('cursor', 'grabbing');
    });
    
    container.on('mouseleave', () => {
        isDown = false;
        container.css('cursor', 'grab');
    });
    
    container.on('mouseup', () => {
        isDown = false;
        container.css('cursor', 'grab');
    });
    
    container.on('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offset().left;
        const walk = (x - startX) * 2; // Velocidade do arraste
        container.scrollLeft(scrollLeft - walk);
    });
    
    // Toque para dispositivos móveis
    container.on('touchstart', (e) => {
        isDown = true;
        startX = e.originalEvent.touches[0].pageX - container.offset().left;
        scrollLeft = container.scrollLeft();
    });
    
    container.on('touchend', () => {
        isDown = false;
    });
    
    container.on('touchmove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.originalEvent.touches[0].pageX - container.offset().left;
        const walk = (x - startX) * 2;
        container.scrollLeft(scrollLeft - walk);
    });
}

// Configura scroll para membros
configurarScrollHorizontal('.team-section .horizontal-scroll-container');

// Configura scroll para projetos
configurarScrollHorizontal('.projects-section .horizontal-scroll-container');

// Configura botões de navegação
$('.scroll-nav-button').on('click', function() {
    const section = $(this).closest('.horizontal-scroll-section');
        const container = section.find('.horizontal-scroll-container');
        const scrollAmount = container.width() * 0.95; // Rola 90% da largura visível
        
        if ($(this).hasClass('left')) {
            container.animate({scrollLeft: `-=${scrollAmount}`}, 300);
        } else {
            container.animate({scrollLeft: `+=${scrollAmount}`}, 300);
        }
});
});