var RunFn = (function () {
  var $carouselIcons = [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  ];
  function runnCarousel(holder) {
    var $carousel = $(holder);
    if (!$().owlCarousel) {
      console.log("carousel: owlCarousel plugin is missing.");
      return true;
    }
    if ($carousel.length > 0) {
      $carousel.each(function () {
        var elem = $(this),
          autoplaySpeed = elem.attr("data-autoplay-speed") || '',
          slideTransition = elem.attr("data-slide-transition") || '',
          autoplayHoverPause = elem.attr("data-autoplay-hover-pause") || true,
          rtl = elem.attr("data-rtl") || false,
          carouselNav = elem.attr("data-arrows"),
          touchDrag = elem.attr("data-touch"),
          carouselDots = elem.attr("data-dots") || true,
          carouseldotsData = elem.attr("data-dotsData") || false,
          carouselAutoPlay = elem.attr("data-autoplay") || false,
          carouselAutoplayTimeout = elem.attr("data-autoplay-timeout") || 3000,
          carouselAutoWidth = elem.attr("data-auto-width") || false,
          resizeHeight = elem.attr("auto-height") || false,
          carouseAnimateIn = elem.attr("data-animate-in") || false,
          carouseAnimateOut = elem.attr("data-animate-out") || false,
          carouselLoop = elem.attr("data-loop") || false,
          carouselMargin = elem.attr("data-margin") || 0,
          carouselVideo = elem.attr("data-video") || false,
          carouselItems = elem.attr("data-items") || 4,
          carouselSlideBy = elem.attr("data-slideBy") || 1,
          centerMode = elem.attr("data-center") || false,
          carouselItemsLg = elem.attr("data-items-lg") || Number(carouselItems),
          carouselItemsMd =
            elem.attr("data-items-md") || Number(carouselItemsLg),
          carouselItemsSm =
            elem.attr("data-items-sm") || Number(carouselItemsMd),
          carouselItemsXs =
            elem.attr("data-items-xs") || Number(carouselItemsSm),
          carouselItemsXxs =
            elem.attr("data-items-xxs") || Number(carouselItemsXs);
        if (carouselItemsMd >= 3) {
          var carouselItemsSm = elem.attr("data-items-sm") || Number(2);
        }
        if (carouselItemsSm >= 2) {
          var carouselItemsXs = elem.attr("data-items-xs") || Number(2);
        }
        if (carouselItemsXs >= 1) {
          var carouselItemsXxs = elem.attr("data-items-xxs") || Number(1);
        }
        if (carouselNav == "false") {
          carouselNav = false;
        } else {
          carouselNav = true;
        }
        if (carouselDots == "false") {
          carouselDots = false;
        } else {
          carouselDots = true;
        }
        if (carouseldotsData == "true") {
          carouseldotsData = true;
        } else {
          carouseldotsData = false;
        }
        if (carouselAutoPlay == "false") {
          carouselAutoPlay = false;
        }
        var t = setTimeout(function () {
          elem.owlCarousel({
            nav: carouselNav,
            dots: carouselDots,
            dotsData: carouseldotsData,
            thumbs: true,
            thumbsPrerendered: true,
            navText: $carouselIcons,
            autoplay: carouselAutoPlay,
            autoplayTimeout: carouselAutoplayTimeout,
            autoplayHoverPause: autoplayHoverPause,
            autoWidth: carouselAutoWidth,
            autoHeight: resizeHeight,
            loop: carouselLoop,
            margin: Number(carouselMargin),
            smartSpeed: Number(800),
            video: carouselVideo,
            slideBy: Number(carouselSlideBy),
            animateIn: carouseAnimateIn,
            animateOut: carouseAnimateOut,
            video: true,
            center: centerMode,
            lazyLoad: true,
            videoWidth: true,
            videoHeight: true,
            touchDrag: touchDrag,
            mouseDrag: touchDrag,
            slideTransition: slideTransition,
            autoplaySpeed: autoplaySpeed,
            rtl: rtl,
            onInitialize: function (event) {
              // setTimeout(function () {
              elem.addClass("owl-carousel owl-theme");
              //    }, 1000);
            },
            responsive: {
              0: {
                items: Number(carouselItemsXxs),
              },
              480: {
                items: Number(carouselItemsXs),
              },
              768: {
                items: Number(carouselItemsSm),
              },
              992: {
                items: Number(carouselItemsMd),
              },
              1200: {
                items: Number(carouselItemsLg),
              },
            },
          });
        }, 0);
      });
    }
  }
  function syncOwl(slider_1, slider_2) {
    var sync1 = $(slider_1);
    var sync2 = $(slider_2);

    var thumbnailItemClass = ".owl-item";

    var slides = sync1
      .owlCarousel({
        autoplayHoverPause: true,
        video: true,
        startPosition: 12,
        items: 1,
        loop: true,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        nav: false,
        dots: false,
      })
      .on("changed.owl.carousel", syncPosition);

    function syncPosition(el) {
      $owl_slider = $(this).data("owl.carousel");
      var loop = $owl_slider.options.loop;

      if (loop) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
        if (current < 0) {
          current = count;
        }
        if (current > count) {
          current = 0;
        }
      } else {
        var current = el.item.index;
      }

      var owl_thumbnail = sync2.data("owl.carousel");
      var itemClass = "." + owl_thumbnail.options.itemClass;

      var thumbnailCurrentItem = sync2
        .find(itemClass)
        .removeClass("synced")
        .eq(current);

      thumbnailCurrentItem.addClass("synced");

      if (!thumbnailCurrentItem.hasClass("active")) {
        var duration = 300;
        sync2.trigger("to.owl.carousel", [current, duration, true]);
      }
    }
    var thumbs = sync2
      .owlCarousel({
        autoplayHoverPause: true,
        startPosition: 12,
        items: 4,
        loop: false,
        margin: 10,
        autoplay: false,
        nav: true,
        navText: $carouselIcons,
        dots: false,
        onInitialized: function (e) {
          var thumbnailCurrentItem = $(e.target)
            .find(thumbnailItemClass)
            .eq(this._current);
          thumbnailCurrentItem.addClass("synced");
        },
      })
      .on("click", thumbnailItemClass, function (e) {
        e.preventDefault();
        var duration = 300;
        var itemIndex = $(e.target).parents(thumbnailItemClass).index();
        sync1.trigger("to.owl.carousel", [itemIndex, duration, true]);
      })
      .on("changed.owl.carousel", function (el) {
        var number = el.item.index;
        $owl_slider = sync1.data("owl.carousel");
        $owl_slider.to(number, 100, true);
      });
  }
  function menuscroll(menuItem) {
    $(menuItem).click(function (event) {
      event.preventDefault();

      var defaultAnchorOffset = 0;

      var anchor = $(this).attr("data-id");

      $("html,body").animate(
        {
          scrollTop: $("#" + anchor).offset().top - 130,
        },
        500
      );
    });
  }

  function backTop(btnScrollTop) {
    $(window).scroll(function () {
      var scrollTop = $(document).scrollTop();
      if (scrollTop > 200) {
        $(btnScrollTop).show("fast");
      } else {
        $(btnScrollTop).hide("fast");
      }
    });

    $(btnScrollTop).click(function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }
  function mmenu(mmenuItems) {
    $(mmenuItems).mmenu({
      extensions: ['pagedim-black'],
    });
  }

  return {
    runnCarousel: runnCarousel,
    syncOwl: syncOwl,
    menuscroll: menuscroll,
    backTop: backTop,
    mmenu: mmenu,
  };
})();
