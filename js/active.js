(function ($) {
    "use strict";

    var $window = $(window);

    // :: Preloader Active Code
    $window.on("load", function () {
        $("#preloader").fadeOut("slow", function () {
            $(this).remove();
        });
    });

    // :: Search Form Active
    var searchbtnI = $(".searchbtn i");
    var searchbtn = $(".searchbtn");

    searchbtnI.addClass("fa-search");
    searchbtn.on("click", function () {
        $("body").toggleClass("search-close");
        searchbtnI.toggleClass("fa-times");
    });

    // :: More Filter Active Code
    $("#moreFilter").on("click", function () {
        $(".search-form-second-steps").slideToggle("1000");
    });

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $("#southNav").classyNav({
            theme: "dark",
        });
    }

    // :: Sticky Active Code
    if ($.fn.sticky) {
        $("#stickyHeader").sticky({
            topSpacing: 0,
        });
    }

    // 본문 상단 간격
    $(".listings-content-wrapper").css("padding-top", function () {
        return $(".main-header-area").outerHeight(true) + 50;
    });

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: Nice Select Active Code
    if ($.fn.niceSelect) {
        $("select").niceSelect();
    }

    // :: Owl Carousel Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $(".hero-slides");

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
        });

        welcomeSlide.on("translate.owl.carousel", function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data("animation");
                $(this)
                    .removeClass("animated " + anim_name)
                    .css("opacity", "0");
            });
        });

        welcomeSlide.on("translated.owl.carousel", function () {
            var slideLayer = welcomeSlide.find(".owl-item.active").find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data("animation");
                $(this)
                    .addClass("animated " + anim_name)
                    .css("opacity", "1");
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data("delay");
            $(this).css("animation-delay", anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data("duration");
            $(this).css("animation-duration", anim_dur);
        });

        // Dots Showing Number
        var dot = $(".hero-slides .owl-dot");

        dot.each(function () {
            var dotnumber = $(this).index() + 1;
            if (dotnumber <= 9) {
                $(this).html("0").append(dotnumber);
            } else {
                $(this).html(dotnumber);
            }
        });

        $(".testimonials-slides").owlCarousel({
            items: 3,
            margin: 50,
            loop: true,
            center: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 3,
                },
            },
        });

        $(".featured-properties-slides, .single-listings-sliders").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        });
    }

    // :: CounterUp Active Code
    if ($.fn.counterUp) {
        $(".counter").counterUp({
            delay: 10,
            time: 2000,
        });
    }

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: "easeInOutQuart",
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>',
        });
    }

    // :: PreventDefault a Click
    $("a[href='#']").on("click", function ($) {
        $.preventDefault();
    });

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Slider Range
    $(".slider-range-price").each(function () {
        var min = jQuery(this).data("min");
        var max = jQuery(this).data("max");
        var unit = jQuery(this).data("unit");
        var value_min = jQuery(this).data("value-min");
        var value_max = jQuery(this).data("value-max");
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = ui.values[0] + unit + " - " + ui.values[1] + unit;
                t.closest(".slider-range").find(".range").html(result);
            },
        });
    });

    function viewmodel() {
        this.apts = ko.observableArray([]);
        this.loading = ko.observable(false);
    }

    var aptCate = new viewmodel();

    ko.applyBindings(aptCate, document.getElementById("aptCate"));

    $("#aptCate").cascadingDropdown({
        selectBoxes: [
            {
                selector: ".step1",
                source: [
                    { label: "서울시", value: 77 },
                    { label: "경기도", value: 99 },
                ],
            },
            {
                selector: ".step2",
                requires: [".step1"],
                source: function (request, response) {
                    // subCate는 category.js에서 가져옴
                    data = subCate[request["sido"]];

                    var selectOnlyOption = data.length <= 1;
                    response(
                        $.map(data, function (item, index) {
                            return {
                                label: item.name,
                                value: item.cate_no,
                                selected: selectOnlyOption,
                            };
                        })
                    );
                },
            },
            {
                selector: ".step3",
                requires: [".step1", ".step2"],
                requireAll: true,
                source: function (request, response) {
                    data = subCate[request["gungu"]];

                    var selectOnlyOption = data.length <= 1;
                    response(
                        $.map(data, function (item, index) {
                            return {
                                label: item.name,
                                value: item.cate_no,
                                selected: selectOnlyOption,
                            };
                        })
                    );
                },
            },
        ],
        onChange: function (event, dropdownData) {
            var arr2 = Object.values(dropdownData).filter(function (n) {
                return n !== "";
            });
            var cate_no = arr2[arr2.length - 1];
            if (cate_no !== undefined) {
                aptCate.loading(true);

                /*
                var res_array = [];
                var offset;

                for (offset = 0; offset < 1000; offset += 100) {
                    $.ajax({
                        type: "GET",
                        url: "/api/v2/categories/" + cate_no + "/products?display_group=1",
                        data: { offset: offset, limit: 100 },
                        async: false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-Cafe24-Client-Id", "1mbvODfKbKpc71Z4rs3kgH");
                            xhr.setRequestHeader("Content-Type", "application/json");
                        },
                        success: function (res) {
                            var products = res.products                            
                            for (var i in products) {
                                res_array.push(products[i]);
                            }               

                        },
                        error: function (request, status, error) {
                            console.log("e:", error);
                        },
                    });
                }
                */
                res_array = aptData;

                console.log("last:", res_array);

                aptCate.apts(res_array);
                aptCate.loading(false);
            }
        },
    });
})(jQuery);
