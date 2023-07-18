"use strict";

$(document).ready(function () {
	$(".sidebar-menu__item.with-ul .sidebar-menu__link").on("click", function () {
		if ($(this).parent().hasClass("opened")) {
			$(this).siblings("ul.cat-menu").slideUp("slow");
			$(this).parent().removeClass("opened");
			$("ul.subcat-menu").slideUp("slow");
			$(".cat-menu__item.with-ul .cat-menu__link")
				.parent()
				.removeClass("opened");
		} else {
			$("ul.cat-menu").slideUp("slow");
			$(".sidebar-menu__item.with-ul .sidebar-menu__link")
				.parent()
				.removeClass("opened");
			$(this).siblings("ul.cat-menu").slideDown("slow");
			$(this).parent().addClass("opened");
		}
	});
	$(".cat-menu__item.with-ul .cat-menu__link").on("click", function () {
		if ($(this).parent().hasClass("opened")) {
			$(this).siblings("ul.subcat-menu").slideUp("slow");
			$(this).parent().removeClass("opened");
		} else {
			$("ul.subcat-menu").slideUp("slow");
			$(".cat-menu__item.with-ul .cat-menu__link")
				.parent()
				.removeClass("opened");
			$(this).siblings("ul.subcat-menu").slideDown("slow");
			$(this).parent().addClass("opened");
		}
	});

	if ($("body").width() < 851) {
		$(".sidebar__head").on("click", function () {
			if ($(this).hasClass("active")) {
				$(".sidebar__menu").slideUp("slow");
				$(".filter").slideUp("slow");
				$(this).removeClass("active");
			} else {
				$(".sidebar__menu").slideDown("slow");
				$(".filter").slideDown("slow");
				$(this).addClass("active");
			}
		});
	}

	$(".h-basket").on("click", function () {
		$(".basket-content").slideToggle("slow");
	});
	$(".filter__head").on("click", function () {
		if ($(this).hasClass("opened")) {
			$(".filter__content").slideUp("slow");
			$(this).removeClass("opened");
		} else {
			$(".filter__content").slideDown("slow");
			$(this).addClass("opened");
		}
	});
	$(".main-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: false,
		autoplaySpeed: 4000,
		speed: 1000,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: false,
				},
			},
		],
	});
	$(".clients-list").slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		dots: false,
		autoplay: false,
		autoplaySpeed: 3000,
		speed: 1000,
		arrows: false,
		responsive: [
			{
				breakpoint: 801,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 601,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 421,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	});
	$(".product-photo-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		swipe: false,
		asNavFor: ".product-photo-slider-nav",
	});
	$(".product-photo-slider-nav").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: ".product-photo-slider",
		dots: false,
		arrows: false,
		centerMode: false,
		focusOnSelect: true,
		swipe: false,
	});
	$("ul.tabs__caption").on("click", "li:not(.active)", function () {
		$(this)
			.addClass("active")
			.siblings()
			.removeClass("active")
			.closest("div.tabs")
			.find("div.tabs__content")
			.removeClass("active")
			.eq($(this).index())
			.addClass("active");
	});
	ymaps.ready(init);

	function init() {
		var myMap = new ymaps.Map(
			"map",
			{
				center: [55.910951399430296, 37.41628047435786],
				zoom: 16,
			},
			{
				searchControlProvider: "yandex#search",
			}
		);
		myMap.behaviors.disable("scrollZoom");
		var myGeocoder = ymaps.geocode(
			"Россия, Московская область, Химки, Коммунальный проезд, 1 "
		);
		myGeocoder.then(function (res) {
			var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
			var placeMarket = new ymaps.Placemark(
				coordinates,
				{
					balloonContent: "Коммунальный проезд, 1",
				},
				{
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: "default#image",
					// Своё изображение иконки метки.
					iconImageHref: "img/placeholder.svg",
					// Размеры метки.
					iconImageSize: [40, 40],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38],
				}
			);
			myMap.geoObjects.add(placeMarket);
		});
	}

	$(".popup-gallery").magnificPopup({
		delegate: "a",
		type: "image",
		tLoading: "Loading image #%curr%...",
		mainClass: "mfp-img-mobile",
		fixedContentPos: true,
		showCloseBtn: false,
		gallery: {
			enabled: true,
			navigateByImgClick: false,
			preload: [0, 1],
		},
	});
	$(".popup").magnificPopup({
		type: "inline",
		preloader: false,
		removalDelay: 160,
		closeOnBgClick: true,
		enableEscapeKey: true,
		fixedContentPos: true,
		showCloseBtn: false,
	});
	$(document).on("click", ".popup-close", function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
	$(document).mouseup(function (e) {
		// событие клика по веб-документу
		var div = $(".basket-content");

		if (
			!div.is(e.target) && // если клик был не по нашему блоку
			div.has(e.target).length === 0
		) {
			// и не по его дочерним элементам
			div.slideUp("slow");
		}
	});
	$(function () {
		$("#phone1, #phone2, #phone3").mask("+375(99) 999-99-99");
	});
	var $topblock = $(".sidebar.stickied");

	if ($("body").width() > 850) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 204) {
				$topblock.addClass("sticky-fixed");
			} else {
				$topblock.removeClass("sticky-fixed");
			}
		}); //scroll
	}

	if ($("body").width() > 801) {
		$(".zoomy").imagezoomsl({
			zoomrange: [2, 2],
		});
	}
});
//# sourceMappingURL=index.js.map
