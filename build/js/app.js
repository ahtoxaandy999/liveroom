"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  mousewheelInit();
  modalsInit();
  tabsInit();
  new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 2,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row'
  });
  new OpenClose({
    holders: '.js-open-close',
    hideOnClickOutside: true
  });
  new OpenClose({
    holders: '.js-sidebar',
    hideOnClickOutside: false
  });
});

function mousewheelInit() {
  $('.scroll-holder__wrap').mousewheel(function (e, delta) {
    this.scrollLeft -= delta * 30;
    e.preventDefault();
  });
}

function tabsInit() {
  $('.js-tabs').each(function (i, item) {
    var holder = $(item);
    var navLinks = holder.find('.tabs__nav-item');
    var tabs = holder.find('.tabs__tab');
    var activeClass = 'js-active';
    navLinks.each(function (i, link) {
      $(link).click(function (e) {
        e.preventDefault();
        if (e.currentTarget.classList.contains(activeClass)) return;
        var tabId = e.currentTarget.getAttribute('href');
        $(tabs).removeClass(activeClass);
        $(navLinks).removeClass(activeClass);
        $(e.currentTarget).addClass(activeClass);
        $(tabId).addClass(activeClass);
      });
    });
  });
}

function modalsInit() {
  $('.js-open-modal').each(function (i, item) {
    $(item).click(function () {
      var modalTo = item.dataset.modalTo;
      $('.js-modal').fadeOut();
      $('.js-mask').fadeIn();
      $(".js-".concat(modalTo)).fadeIn();
      $('body').addClass('js-scroll-lock');
    });
  }); // close modal

  $('.js-close-modal, .js-mask').click(function () {
    $('.js-mask').fadeOut();
    $('.js-modal').fadeOut();
    $('body').removeClass('js-scroll-lock');
  });
}

var OpenClose = /*#__PURE__*/function () {
  function OpenClose(params) {
    _classCallCheck(this, OpenClose);

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

  _createClass(OpenClose, [{
    key: "attachEvents",
    value: function attachEvents() {
      var _this = this;

      this.holders.forEach(function (currentEl) {
        var opener = currentEl.querySelector(_this.opener);
        opener.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();

          if (currentEl.classList.contains(_this.activeClass)) {
            _this.removeClass(currentEl);

            if (_this.finishClass) {
              _this.removeFinishClass(currentEl);
            }

            if (_this.classToBody) {
              document.querySelector('body').classList.remove(_this.classToBody);
            }
          } else {
            _this.addClass(currentEl);

            if (_this.finishClass) {
              _this.addFinishClass(currentEl);
            }

            if (_this.classToBody) {
              document.querySelector('body').classList.add(_this.classToBody);
            }
          }

          if (_this.hideOnClickOutside) {
            //hide other drop if open
            _this.holders.forEach(function (item) {
              if (item.classList.contains(_this.activeClass) && item !== currentEl) {
                _this.removeClass(item);
              }
            });
          }
        });
        var closeBtn = currentEl.querySelector(_this.closeBtn);

        if (closeBtn) {
          closeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            _this.removeClass(currentEl);
          });
        }

        if (_this.hideOnClickOutside) {
          //hide drop on click outside
          document.addEventListener('click', function (el) {
            if (el.target.classList.contains('js-open-modal') || !currentEl.contains(el.target)) {
              _this.removeClass(currentEl);
            }
          });
        }
      });
    }
  }, {
    key: "addClass",
    value: function addClass(e) {
      e.classList.add(this.activeClass);
    }
  }, {
    key: "removeClass",
    value: function removeClass(e) {
      e.classList.remove(this.activeClass);
    }
  }, {
    key: "addFinishClass",
    value: function addFinishClass(e) {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        if (e.classList.contains(_this2.activeClass)) {
          e.classList.add(_this2.finishClass);
        }
      }, 300);
    }
  }, {
    key: "removeFinishClass",
    value: function removeFinishClass(e) {
      e.classList.remove(this.finishClass);
    }
  }]);

  return OpenClose;
}();