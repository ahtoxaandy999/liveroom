//=require ../blocks/**/*.js
$(document).ready(function () {
    mousewheelInit();
    modalsInit();
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
    new OpenClose({
        holders: '.js-open-close',
        close: '.js-close',
        hideOnClickOutside: true
    });
});

function mousewheelInit() {
    $('.scroll-holder').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 40);
        e.preventDefault();
    });
}

function modalsInit() {
    $('.js-open-modal').each((i, item) => {
        $(item).click(() => {
            const modalTo = item.dataset.modalTo;
            console.log(modalTo);
            $('.js-modal').fadeOut();
            $('.js-mask').fadeIn();
            $(`.js-${ modalTo }`).fadeIn();
        });
    });
    // close modal
    $('.js-close-modal, .js-mask').click(function () {
        $('.js-mask').fadeOut();
        $('.js-modal').fadeOut();
    });
}

class OpenClose {
    constructor(params) {
        if (!document.querySelector(params.holders)) return;

        this.holders = document.querySelectorAll(params.holders);
        this.opener = params.opener || '.js-opener';
        this.closeBtn = params.close;
        this.hideOnClickOutside = params.hideOnClickOutside;
        this.classToBody = params.classToBody;
        this.activeClass = params.activeClass || 'js-active';
        this.finishClass = params.finishClass || 'js-finished';

        this.attachEvents();
    }

    attachEvents() {
        this.holders.forEach((currentEl) => {
            const opener = currentEl.querySelector(this.opener);
            opener.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                if (currentEl.classList.contains(this.activeClass)) {
                    this.removeClass(currentEl);
                    if (this.finishClass) {
                        this.removeFinishClass(currentEl)
                    }
                    if (this.classToBody) {
                        document.querySelector('body').classList.remove(this.classToBody);
                    }
                } else {
                    this.addClass(currentEl);
                    if (this.finishClass) {
                        this.addFinishClass(currentEl)
                    }
                    if (this.classToBody) {
                        document.querySelector('body').classList.add(this.classToBody);
                    }
                }

                if (this.hideOnClickOutside) {
                    //hide other drop if open
                    this.holders.forEach((item) => {
                        if (item.classList.contains(this.activeClass) && item !== currentEl) {
                            this.removeClass(item);
                        }
                    });
                }
            });

            const closeBtn = currentEl.querySelector(this.closeBtn);
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.removeClass(currentEl);
                });
            }

            if (this.hideOnClickOutside) {
                //hide drop on click outside
                document.addEventListener('click', (el) => {
                    if (!currentEl.contains(el.target)) {
                        this.removeClass(currentEl);
                    }
                });
            }
        });
    }

    addClass(e) {
        e.classList.add(this.activeClass);
    }

    removeClass(e) {
        e.classList.remove(this.activeClass);
    }

    addFinishClass(e) {
        this.timeout = setTimeout(() => {
            if (e.classList.contains(this.activeClass)) {
                e.classList.add(this.finishClass);
            }
        }, 300);
    }

    removeFinishClass(e) {
        e.classList.remove(this.finishClass);
    }
}