ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.910951399430296, 37.41628047435786],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });
        myMap.behaviors.disable("scrollZoom");
        var myGeocoder = ymaps.geocode("Россия, Московская область, Химки, Коммунальный проезд, 1 ");
        myGeocoder.then(function (res) {
            var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            var placeMarket = new ymaps.Placemark(coordinates, {
                balloonContent: 'Коммунальный проезд, 1'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/placeholder.svg',
                // Размеры метки.
                iconImageSize: [40, 40],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });
            myMap.geoObjects.add(placeMarket);
        });
    }