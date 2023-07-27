const generalModel ={
    extraClassName:'',
    extraId:'',
    position:'',
    text:'',
    title:'',
    widgetIndex:0,
    redirectLink:'',
    redirectToTitle:'',
    type:'',
    translations:{},
    customStyles:'',
    deviceTypeToRender:'',
    languageToRender:''
}

const defaultWidgetsData = {
    'text': {...generalModel},
    'textEditor': {...generalModel},
    'menu': {
        ...generalModel,
        menuItems:[]
    },
    'postsSlider': {
        ...generalModel,
        uniqueData:{
            sliderConfig:{
                pagination:true,
                navigation:true
            }
        }
    },
    'imagesSlider': {
        ...generalModel,
        uniqueData:{
            sliderConfig:{
                pagination:true,
                navigation:true
            }
        }
    },
    'linkTo': {
        ...generalModel,
        uniqueData:{
            linkTo:'',
            linkToAs:'',
            linkToText:''
        }

    },
    'multipleLinkTo': {
        ...generalModel,
        uniqueData:{
            menuItems:[]
        }
    },
    'posts': {
        ...generalModel,
        uniqueData:{
            count:8,
            postElementSize:255,
            sortBy:'updatedAt'
        }
    },
    'media': {
        ...generalModel,
        uniqueData:{
            mediaUrl:'',
            mediaType:''
        }
    },
    'searchBar': {
        ...generalModel,
        uniqueData:{
            searchInputPlaceHolder:'search...',
            mobileMode:false
        }
    },
    'recentComments': {
        ...generalModel,
        uniqueData:{
           comments:[]
        }
    },
    'meta': {
        ...generalModel,
        uniqueData:{
            metaType:'',
            sortBy:'',
            count:30,
            metaData:[]
        }
    },
    'logo': {
        ...generalModel,
        uniqueData:{
            LogoText:'LOGO',
            headLine:'head line',
        }
    },
    'shoppingCart': {
        ...generalModel,
        uniqueData:{
            LogoText:'LOGO',
            headLine:'head line',
        }
    },
    'language': {
        ...generalModel,
        customStyles:'select{\n' +
            '  border: none;\n' +
            '  background-color: var(--main-background-color,#000);\n' +
            '  color: var(--primary-text-color,#fff);\n' +
            '}'
    },
    'alphabeticalNumericalRange': {
        ...generalModel,
        uniqueData:{
            LogoText:'LOGO',
            headLine:'head line',
        }
    },
}

export default defaultWidgetsData