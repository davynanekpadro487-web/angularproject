import { Injectable } from '@angular/core';

declare const $: any;
declare const WOW: any;

@Injectable({
    providedIn: 'root'
})
export class ScriptsInitService {

    initAll(): void {
        // 1. Fixed navbar scroll effect
        $(window).off('scroll.navbar').on('scroll.navbar', () => {
            if ($(window).scrollTop() > 60) {
                $('.navbar').addClass('affix');
            } else {
                $('.navbar').removeClass('affix');
            }
        });

        // 2. Smooth page scrolling (requires jQuery Easing)
        $(document).off('click.pagescroll', 'a.page-scroll')
            .on('click.pagescroll', 'a.page-scroll', (event: Event) => {
                const target = (event.currentTarget as HTMLAnchorElement);
                const href = target.getAttribute('href');
                if (href && href.startsWith('#') && $(href).length) {
                    $('html, body').stop().animate(
                        { scrollTop: $(href).offset().top - 60 },
                        900,
                        'easeInOutExpo'
                    );
                    event.preventDefault();
                }
            });

        // 3. Close responsive navbar on menu item click
        $('.navbar-nav li a').off('click.navclose').on('click.navclose', (event: Event) => {
            const el = event.currentTarget as HTMLElement;
            if (!$(el).parent().hasClass('dropdown')) {
                $('.navbar-collapse').collapse('hide');
            }
        });

        // 4. Magnific Popup video
        if (typeof $ !== 'undefined' && $.fn && $.fn.magnificPopup) {
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        // 5. Client testimonial slider
        if (typeof $ !== 'undefined' && $.fn && $.fn.owlCarousel) {
            const $testimonial = $('.client-testimonial');
            if ($testimonial.length && !$testimonial.hasClass('owl-loaded')) {
                $testimonial.owlCarousel({
                    loop: false,
                    margin: 30,
                    items: 1,
                    nav: true,
                    dots: false,
                    responsiveClass: true,
                    autoplay: false,
                    autoplayHoverPause: true,
                    lazyLoad: true,
                });
            }

            // 6. Screenshots slider
            const $screens = $('.screen-carousel');
            if ($screens.length && !$screens.hasClass('owl-loaded')) {
                $screens.owlCarousel({
                    loop: true,
                    margin: 0,
                    center: true,
                    dots: true,
                    nav: false,
                    autoplay: true,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 3 },
                        991: { items: 4 },
                        1200: { items: 4 },
                        1920: { items: 4 }
                    }
                });
            }

            // 8. Client testimonial one item carousel
            const $testimonial1 = $('.client-testimonial-1');
            if ($testimonial1.length && !$testimonial1.hasClass('owl-loaded')) {
                $testimonial1.owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayHoverPause: true,
                    lazyLoad: true,
                    items: 1,
                });
            }

            // 9. Clients logo carousel
            const $clients = $('.clients-carousel');
            if ($clients.length && !$clients.hasClass('owl-loaded')) {
                $clients.owlCarousel({
                    autoplay: true,
                    loop: true,
                    margin: 15,
                    dots: true,
                    slideTransition: 'linear',
                    autoplayTimeout: 4500,
                    autoplayHoverPause: true,
                    autoplaySpeed: 4500,
                    responsive: {
                        0: { items: 2 },
                        500: { items: 3 },
                        600: { items: 4 },
                        800: { items: 5 },
                        1200: { items: 6 }
                    }
                });
            }
        }

        // 11. WOW.js scroll animations
        if (typeof WOW !== 'undefined') {
            new WOW({
                offset: 100,
                mobile: true
            }).init();
        }
    }
}
