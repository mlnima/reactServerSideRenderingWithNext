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

// export const swiperWidgetModel = {
//     ...generalModel,
// uniqueData:{
//     swiperConfigDesktop: {
//         effect: "cards",
//         grabCursor: true,
//         autoplay: true,
//         modules: [
//             "EffectCards"
//         ]
//     },
//     swiperConfigMobile: {
//         tag: "div",
//         wrapperTag: "div",
//         controller: {
//             control: "controlledSwiper"
//         },
//         keyboard: false,
//         autoplay: true,
//         navigation: false,
//         effect: "cube",
//         modules: [
//             "EffectCube",
//             "Pagination"
//         ],
//         pagination: false,
//         grabCursor: false,
//         cubeEffect: {
//             shadow: true,
//             slideShadows: true,
//             shadowOffset: 20,
//             shadowScale: 0.94
//         }
//     }
// }
// }

export const slider = {
    ...generalModel,
    uniqueData:{
        sliderConfig:{
            pagination:true,
            navigation:true
        }
    }

}




export const authenticationWidgetModel = {
    ...generalModel,

}
export const languageWidgetModel = {
    ...generalModel,
    customStyles:'select{\n' +
        '  border: none;\n' +
        '  background-color: var(--main-background-color,#000);\n' +
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
    headLine:'head line',
    customStyles:`.logo{
  .logo-text,p{
    color: white;
  }
  .logo-text{
    font-weight: bold;
  }
}`
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
}

export const menuWidgetModel = {
    ...generalModel,
    menuItems:[]
}

export const postsWidgetModel = {
    ...generalModel,
    count:8,
    postElementSize:255,
    sortBy:'updatedAt'
}

export const postsSwiperWidgetModel = {
    ...generalModel,
    count:16,
    sliderEffect:'',
    sortBy:'',
}
