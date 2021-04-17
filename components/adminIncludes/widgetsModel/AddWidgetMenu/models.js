export let widgetModels = {
    type: '',
    title: '',
    categories:[],
    formData:{
        formName:'',
        formFields:[]
    },
    menuItems:[],
    tags:[],
    count:8,
    comments:[],
    pagination:false,
    position:'',
    redirectLink:'',
    sortBy:'',
    text:'',
    textAlign:'center',
    customHtml:'',
    metaType:'',
    pathURL:'',
    LogoUrl:'',
    LogoText:'',
    headLine:'',
    viewType:'standard',
}

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

export const textWidgetModel = {
 ...generalModel
}

export const imageSwiperWidgetModel = {
    ...generalModel,
    imageSwiperData:[],
    slideAmountInMobile:1,
    slideAmountInDesktop:3,
    spaceBetweenAmountMobile:0,
    spaceBetweenAmountDesktop:0,
    sliderEffect:'fade',
    sliderAutoplay:true,
    sliderSpeed:1000
}

export const authenticationWidgetModel = {
    ...generalModel,

}
export const languageWidgetModel = {
    ...generalModel,
    languageTextAsDefaultLanguage:'',
    languageToShowBesideDropDown:'',
    customStyles:'select{\n' +
        '  border: none;\n' +
        '  background-color: var(--background-color);\n' +
        '  color: var(--main-text-color);\n' +
        '}'
}
export const alphabeticalNumericalRangeWidgetModel = {
    ...generalModel,
}
export const shoppingCartWidgetModel = {
    ...generalModel,
}
export const formWidgetModel = {
    ...generalModel,
    formData:[]
}
export const logoWidgetModel = {
    ...generalModel,
    LogoText:'LOGO',
    headLine:'head line'
}
export const metaWidgetModel = {
    ...generalModel,
    metaType:'',
    sortBy:'',
    count:30,
    metaData:[]
}
export const searchBarWidgetModel = {
    ...generalModel,
    searchInputPlaceHolder:'search...',
    mobileMode:false
}
export const recentCommentsWidgetModel = {
    ...generalModel,
    comments:[]
}
export const mediaWidgetModel = {
    ...generalModel,
    mediaUrl:'',
    mediaType:''
}

export const linkToWidgetModel = {
    ...generalModel,
    linkTo:'',
    linkToAs:'',
    linkToText:''
}
export const multipleLinkToWidgetModel = {
    ...generalModel,
    multipleLinks:[],
    customStyles:'ul{\n' +
        '    display: flex;\n' +
        '    flex-wrap: wrap;\n' +
        '    align-items: center;\n' +
        '    justify-content: center;\n' +
        '    margin: 0 ;\n' +
        '    padding: 0 ;\n' +
        '    li{\n' +
        '        list-style: none;\n' +
        '        margin: 0 5px;\n' +
        '        a,p{\n' +
        '           color: var(--main-text-color);\n' +
        '        }\n' +
        '    }\n' +
        '}',
}

export const menuWidgetModel = {
    ...generalModel,
    menuItems:[]
}
export const postsWidgetModel = {
    ...generalModel,
    count:8,
    viewType:'standard',
    sortBy:'-lastModify'
}

export const postsSwiperWidgetModel = {
    ...generalModel,
    count:16,
    sliderEffect:'',
    sortBy:'',
}
