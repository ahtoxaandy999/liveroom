$(document).ready(function () {
    mousewheelInit();
    modalsInit();
    tabsInit();
    swiperInit();
    autosize(document.querySelectorAll('.js-textarea'));
    new OpenClose({
        holders: '.js-open-close',
        hideOnClickOutside: true
    });
    new OpenClose({
        holders: '.js-sidebar',
        hideOnClickOutside: false,
        classToBody: 'js-sidebar-active'
    });
});

function mousewheelInit() {
    $('.scroll-holder__wrap').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 30);
        e.preventDefault();
    });
}

function swiperInit() {
    if(document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
        });
    }
}

function tabsInit() {
    $('.js-tabs').each((i, item) => {
        const holder = $(item);
        const navLinks = holder.find('.tabs__nav-item');
        const tabs = holder.find('.tabs__tab');
        const activeClass = 'js-active'

        navLinks.each((i, link) => {
            $(link).click((e) => {
                e.preventDefault();
                if (e.currentTarget.classList.contains(activeClass)) return;
                const tabId = e.currentTarget.getAttribute('href');

                $(tabs).removeClass(activeClass);
                $(navLinks).removeClass(activeClass);
                $(e.currentTarget).addClass(activeClass);
                $(tabId).addClass(activeClass);
            });
        });
    });
}

function modalsInit() {
    $('.js-open-modal').each((i, item) => {
        $(item).click(() => {
            const modalTo = item.dataset.modalTo;
            $('.js-modal').fadeOut();
            $('.js-mask').fadeIn();
            $(`.js-${ modalTo }`).fadeIn();
            $('body').addClass('js-scroll-lock');
        });
    });
    // close modal
    $('.js-close-modal, .js-mask').click(function () {
        $('.js-mask').fadeOut();
        $('.js-modal').fadeOut();
        $('body').removeClass('js-scroll-lock');
    });
}

class OpenClose {
    constructor(params) {
        if (!document.querySelector(params.holders)) return;

        this.holders = document.querySelectorAll(params.holders);
        this.opener = params.opener || '.js-opener';
        this.closeBtn = params.close || '.js-close';
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
                } else {
                    this.addClass(currentEl);
                    if (this.finishClass) {
                        this.addFinishClass(currentEl)
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
                    if (el.target.classList.contains('js-open-modal') || !currentEl.contains(el.target)) {
                        this.removeClass(currentEl);
                    }
                });
            }
        });
    }

    addClass(e) {
        e.classList.add(this.activeClass);
        
        if (this.classToBody) {
            document.querySelector('body').classList.add(this.classToBody);
        }
    }

    removeClass(e) {
        e.classList.remove(this.activeClass);
        
        if (this.classToBody) {
            document.querySelector('body').classList.remove(this.classToBody);
        }
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