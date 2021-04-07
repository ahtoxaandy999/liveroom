//=require ../blocks/**/*.js
$(document).ready(function () {
    // modal
    $('.js-open-auth-modal').click(function () {
        $('.js-mask').fadeIn();
        $('.js-auth-modal').fadeIn();
    });

    // close modal
    $('.js-close-modal, .js-mask').click(function () {
        $('.js-mask').fadeOut();
        $('.js-modal').fadeOut();
    });

});


new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 2,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
});