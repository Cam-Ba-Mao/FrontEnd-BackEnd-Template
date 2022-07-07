(function ($) {
    var isRunCounter = false;

    function initBanner() {
        if( $('.isa-home-banner__list').length < 1 ) return;

        $('.isa-home-banner__list').slick({
            slidesToShow: 1,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: 0,
            dots: ( $('.isa-home-banner__item').length > 1 ? true : false ),
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        arrows: false,
                    }
                },
            ]
        });
    }

    function initTestimonial() {
        if( $('.isa-testimonial__list').length < 1 ) return;

        $('.isa-testimonial__list').slick({
            lazyLoad: 'progressive',
            slide: '.isa-testimonial__item',
            slidesToShow: 1,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: 0,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
        });

        $(document).on('click', '.isa-testimonial__arrow--prev', function(e) { 
            e.preventDefault(); 
            $('.isa-testimonial__list').slick('slickPrev');
        });

        $(document).on('click', '.isa-testimonial__arrow--next', function(e) {
            e.preventDefault(); 
            $('.isa-testimonial__list').slick('slickNext');
	    });
    }

    function initProgram() {
        if( $('.isa-program__list').length < 1 ) return;

        $('.isa-program__list').slick({
            lazyLoad: 'progressive',
            slide: '.isa-program__item',
            slidesToShow: 2,
            centerMode: true,
            focusOnSelect: true,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            centerPadding: '15%',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        centerPadding: '10%',
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        centerPadding: '48px',
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '10%',
                        //arrows: false,
                    }
                },
            ]
        });

        $('.isa-program__list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $('.isa-program__arrow--nav span').removeClass('is-active');
            $('.isa-program__arrow--nav span:eq('+ nextSlide +')').addClass('is-active');
        });

        $(document).on('click', '.isa-program__arrow--prev', function(e) { 
            e.preventDefault(); 
            $('.isa-program__list').slick('slickPrev');
        });

        $(document).on('click', '.isa-program__arrow--next', function(e) {
            e.preventDefault(); 
            $('.isa-program__list').slick('slickNext');
	    });
    }

    function handlePositionCountryContent() {
        if($('.isa-select-country__content').length < 1) return;

        $('.isa-select-country__content').each(function(){
            let title = $(this).find('.isa-select-country__title');
            let titleHeight = title.outerHeight();

            titleHeight += 32 + 16;
            $(this).closest('.isa-select-country__item').attr('style', '--countryTop: calc(100% - '+ titleHeight +'px)');
        });
    }

    function handleCounterNumber() {
        if($('.isa-about__item--number').length < 1) return;

        if(isRunCounter) return;

        var elValFromTop;
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(window).scrollTop();

        elValFromTop = Math.ceil($('.isa-about__item--number').offset().top);

        if ((windowHeight + windowScrollValFromTop) > elValFromTop) {
            counter();
            isRunCounter = true;
        }
    }

    function counter() {
        if( $('.isa-about__item--number').length < 1 ) return false;
        
        $('.isa-about__item--number').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    now = Math.ceil(now);
                    if( now.toString().length < 2 ) {
                        now = '0' + now.toString();
                    } else {
                        now = new Intl.NumberFormat('de-DE').format(Math.ceil(now))
                    }
                    $(this).text(now);
                }
            });
        });
    }

    function initPartner() {

        if( $('.isa-partner__list').length < 1 ) return;

        $('.isa-partner__list').slick({
            lazyLoad: 'progressive',
            slide: '.isa-partner__item',
            slidesToShow: 4,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: 0,
            dots: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }

    function handleTagPartner() {

        $('.isa-partner__tab a[data-toggle="tab"]').on('click', function (e) {
            console.log('click');
            
            setTimeout(function () {
                $('.isa-partner__list').slick('setPosition');
            }, 10)
        });

        $(document).on('shown.bs.tab', '.isa-partner__tab a[data-toggle="tab"]', function (e) {
            $('.isa-partner__list').slick('setPosition');
        });
    }

    $(function () {
        initBanner();
        initTestimonial();
        initProgram();  

        initPartner();
        handleTagPartner();

        handleCounterNumber();
        $(window).on('scroll', function() {
            handleCounterNumber();
        });
        
        handlePositionCountryContent();
        $( window ).resize(function() {
            handlePositionCountryContent();
        });

        $('.isa-partner__item--body').matchHeight();
    });
})(jQuery);