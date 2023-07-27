export const sliderDefaultData = {
    cube:{
        "tag": "div",
        "wrapperTag": "div",
        "controller": {
            "control": "controlledSwiper"
        },
        "keyboard": false,
        "autoplay": true,
        "navigation": false,
        "effect": "cube",
        "modules": [
            "EffectCube",
            "Pagination"
        ],
        "pagination": false,
        "grabCursor": false,
        "cubeEffect": {
            "shadow": true,
            "slideShadows": true,
            "shadowOffset": 20,
            "shadowScale": 0.94
        }
    },
    fade:{
        "spaceBetween":30,
        "effect": "fade",
        "autoplay": true,
        "navigation":true,
        "pagination":{
            "clickable": true
        },
        "modules":["EffectFade", "NavigationWidgetArea", "Pagination"]
    },
    coverflow:{
        "grabCursor":true,
        "centeredSlides":true,
        "slidesPerView":"auto",
        "effect": "coverflow",
        "pagination":true,
        "autoplay": true,
        "coverflowEffect":{
            "rotate": 50,
            "stretch": 0,
            "depth": 100,
            "modifier": 1,
            "slideShadows": true,
        },
        "modules":["EffectCoverflow", "Pagination"]
    },
    flip:{
        "effect": "flip",
        "autoplay": true,
        "grabCursor":true,
        "pagination":true,
        "navigation":true,
        "modules":["EffectFlip", "Pagination", "NavigationWidgetArea"]
    },
    cards:{
        "effect": "cards",
        "grabCursor":true,
        "centeredSlides":true,
        "autoplay": true,
        "modules":["EffectCards"]
    },
    creative:{
        "effect": "creative",
        "grabCursor":true,
        "autoplay": true,
        "creativeEffect":{
            "prev": {
                shadow: true,
                translate: [0, 0, -400]
            },
            "next": {
                translate: ["100%", 0, 0]
            }
        },
        "modules":["EffectCreative"]
    }

}