(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"+wRh":function(e,t,n){"use strict";var a=n("KQm4"),i=n("rePB"),o=n("q1tI"),r=n.n(o),s=n("8Kt/"),c=n.n(s),u=n("A8lN"),l=n("0Bsm"),m=n.n(l),d=n("yNYL"),g=n.n(d),f=r.a.createElement,p=function(e){return e.active?f("div",{className:"AdminActionMenu"},f("button",{className:"AdminActionMenuItem"}," My Profile"),f("button",{className:"AdminActionMenuItem"}," Edit My Profile"),f("button",{className:"AdminActionMenuItem"}," Log Out")):null},b=n("YFqc"),v=n.n(b),y=r.a.createElement,P=function(e){var t=Object(o.useState)({});t[0],t[1];return Object(o.useEffect)((function(){}),[]),e.active?y("div",{className:"NewItemMenu"},y(v.a,{href:"/admin/post?new=1"},y("a",{className:"SideBarItem"},"New Post"))):null},h=r.a.createElement;function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=m()((function(e){var t=Object(o.useContext)(u.a),n=Object(o.useState)({AdminActionMenu:!1,NewItemMenu:!1}),a=n[0],i=n[1];return h(r.a.Fragment,null,h("div",{className:"adminTopBar"},h("div",{className:"adminTopBarControl"},h("button",{className:"adminSideBarMobileBtn adminTopBarItem",onClick:function(){t.settings.adminPanelSideBar?t.dispatchSettings((function(e){return O({},e,{adminPanelSideBar:!1})})):t.dispatchSettings((function(e){return O({},e,{adminPanelSideBar:!0})}))}},h(g.a,{className:"fontawesomeMedium",name:"bars"})),h("button",{className:"adminGoToHomePageBtn adminTopBarItem",onClick:function(){return e.router.push("/"),void console.log(e.router)}},h(g.a,{className:"fontawesomeMedium",name:"home"})),h("button",{className:"adminNewActionBtn adminTopBarItem",onClick:function(){a.NewItemMenu?i(O({},a,{NewItemMenu:!1})):i(O({},a,{NewItemMenu:!0}))}},h(g.a,{className:"fontawesomeMedium",name:"plus"})),h(P,{active:a.NewItemMenu})),h("button",{className:"adminActionBtn adminTopBarItem",onClick:function(){a.AdminActionMenu?i(O({},a,{AdminActionMenu:!1})):i(O({},a,{AdminActionMenu:!0}))}},h(g.a,{className:"fontawesomeMedium",name:"user"})),h(p,{active:a.AdminActionMenu})))})),w=n("U+0P"),N=(n("vDqi"),n("zGA0")),I=n.n(N),C=n("o2Ts"),M=n.n(C),D=r.a.createElement,L=function(e){var t=Object(o.useContext)(u.a),n=Object(o.useState)({Dashboard:{pathURL:"/admin",subItems:[]},Posts:{pathURL:"/admin/posts",subItems:[]},FileManager:{pathURL:"/admin/fileManager",subItems:[]},Comments:{pathURL:"/admin/comments",subItems:[]},Contacts:{pathURL:"/admin/contacts",subItems:[]},Design:{pathURL:"/admin/design",subItems:["topBar","header","navigation","widgets","postPage","footer","customStyle"]},Users:{pathURL:"/admin/users",subItems:[]},Tools:{pathURL:"/admin/tools",subItems:["terminal"]},Settings:{pathURL:"/admin/settings",subItems:["customScript"]}}),a=n[0],i=(n[1],Object(o.useState)("")),r=i[0],s=i[1],c=Object.keys(a).map((function(e){var t=a[e].subItems.map((function(t){return r===e?D(v.a,{href:a[e].pathURL+"/"+t},D("a",{className:"SideBarItem-SubItem"},Object(w.b)(t))):null}));return D("div",{key:e,className:"SideBarItemElement"},D("div",{className:"SideBarItemTitle",onMouseOver:function(){return s(e)}},D(v.a,{href:a[e].pathURL},D("a",{className:"SideBarItem"},Object(w.b)(e))),D((function(){return a[e].subItems.length>0?D("button",{onClick:function(){return s(r===e?"":e)}},D("img",{className:"fontawesomeSvgVerySmall",src:r===e?I.a:M.a,alt:""})):null}),null)),D("div",{className:"SideBarItemElementSubItems"},t))}));return t.settings.adminPanelSideBar?D("div",{className:"SideBar"},c):null},x=n("nOHt"),A=n("KOc1"),T=n("UMKl"),k=n("bSV5"),B=(n("Y0NT"),r.a.createElement);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.a=Object(x.withRouter)((function(e){var t=Object(o.useContext)(u.a),n=Object(o.useRef)(null),i=Object(o.useRef)(null),s=Object(o.useState)({});s[0],s[1];return Object(o.useEffect)((function(){window.innerWidth>768&&t.dispatchSettings((function(e){return Y({},e,{adminPanelSideBar:!0})}))}),[]),Object(o.useEffect)((function(){Object(k.g)("identity",!1,window.location.origin,Date.now()).then((function(e){t.dispatchSiteIdentity(Y({},t.siteIdentity,{},e.data.setting.data))})),Object(k.g)("design",!1,window.location.origin,Date.now()).then((function(e){t.dispatchSiteDesign(Y({},t.siteDesign,{},e.data.setting.data))})),Object(k.g)("navigation",!1,window.location.origin,Date.now()).then((function(e){t.dispatchNavigationData(Object(a.a)(e.data.setting.data))}))}),[]),"administrator"===t.userData.role?B(r.a.Fragment,null,B(c.a,null,B("title",null,"Admin Panel"),B("meta",{name:"theme-color",content:"#000000"}),B("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),B("meta",{charSet:"utf-8"}),B("link",{href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",rel:"stylesheet"}),B("link",{rel:"icon",href:"/favicon.ico"})),B(T.a,null),B("div",{ref:n,className:"container"},B(j,null),B(L,null),B("div",{ref:i,className:"Admin"},e.children),B(A.a,null))):B("h1",null,"Access Denied")}))},"3I4S":function(e,t,n){},"9HFx":function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),i=n.n(a),o=n("KQm4"),r=n("rePB"),s=n("q1tI"),c=n.n(s),u=n("+wRh"),l=n("bSV5"),m=n("yNYL"),d=n.n(m),g=n("A8lN"),f=n("U+0P"),p=c.a.createElement;function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){var t=Object(s.useContext)(g.a),n=Object(s.useRef)(null),a=Object(s.useState)({title:e.identity.title||"website title",themeColor:e.identity.themeColor||"#000",description:e.identity.description||"website description",keywords:e.identity.keywords||[],imageLogo:e.identity.imageLogo||!1,imageLogoUrl:e.identity.imageLogo||"/static/images/logo/Logo.png",logoText:e.identity.logoText||"",headLine:e.identity.headLine||"",homePageH1:e.identity.homePageH1||"",homePagePagination:e.identity.homePagePagination||!1,postsCountPerPage:e.identity.postsCountPerPage||30,homePageSidebar:e.identity.homePageSidebar||!1,categoriesPageSidebar:e.identity.categoriesPageSidebar||!1,tagsPageSidebar:e.identity.tagsPageSidebar||!1,actorsPageSidebar:e.identity.actorsPageSidebar||!1,postPageSidebar:e.identity.postPageSidebar||!1,postsPageSidebar:e.identity.postsPageSidebar||!1}),i=a[0],c=a[1],l=function(e){var t="true"===e.target.value||"false"!==e.target.value&&e.target.value;c(v({},i,Object(r.a)({},e.target.name,t)))},m=i.keywords.map((function(e){return p("div",{key:e,className:"item"},p("p",null,e),p("button",{name:e,onClick:function(e){return function(e){c(v({},i,{keywords:i.keywords.filter((function(t){return t!==e.currentTarget.name}))}))}(e)}},p(d.a,{className:"fontawesomeMedium",name:"times"})))}));return p(u.a,null,p("form",{id:"site-settings-form",onSubmit:function(n){return function(n){n.preventDefault(),t.dispatchState(v({},t.state,{loading:!0})),t.functions.updateSetting("identity",i,e.domainName).then((function(){t.dispatchState(v({},t.state,{loading:!1}))}))}(n)}},p("div",{className:"forms"},p("h2",null,"site identity"),p("div",{className:"siteIdentity site-settings-form-section-parent"},p("div",{className:"site-settings-form-section"},p("p",null,"Logo Text:"),p("input",{name:"logoText",value:i.logoText,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Image Logo:"),p("select",{defaultValue:i.imageLogo,name:"imageLogo",onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No")),p("input",{name:"imageLogoUrl",value:i.imageLogoUrl,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Head Line:"),p("input",{name:"headLine",value:i.headLine,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Site Title:"),p("input",{name:"title",value:i.title,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Description:"),p("textarea",{name:"description",value:i.description,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Home Page H1:"),p("textarea",{name:"homePageH1",value:i.homePageH1,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section keywords"},p("p",null,"Keywords:"),p("input",{ref:n,name:"keywords"}),p("button",{type:"button",onClick:function(){return function(){if(n.current.value.includes(",")){var e=n.current.value.split(",");c((function(t){return v({},t,{keywords:[].concat(Object(o.a)(t.keywords),Object(o.a)(e))})}))}else c(v({},i,{keywords:[].concat(Object(o.a)(i.keywords),[n.current.value])}));n.current.value=""}()}},"add"),p("span",null,"Separate tags with commas"),p("div",{className:"items"},m))),p("div",{className:"site-settings-form-section"},p("p",null,"Theme Color:"),p("input",{name:"themeColor",value:i.themeColor,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Posts Per Page:"),p("input",{type:"number",name:"postsCountPerPage",value:i.postsCountPerPage,onChange:function(e){return l(e)}})),p("div",{className:"site-settings-form-section"},p("p",null,"Home Page Pagination:"),p("select",{name:"homePagePagination",value:i.homePagePagination,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("h2",null,"Sidebars Status"),p("div",{className:"sidebarsStatus site-settings-form-section-parent"},p("div",{className:"site-settings-form-section"},p("p",null,"Home Page Sidebar:"),p("select",{name:"homePageSidebar",value:i.homePageSidebar||!1,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("div",{className:"site-settings-form-section"},p("p",null,"Categories Pages Sidebar:"),p("select",{name:"categoriesPageSidebar",value:i.categoriesPageSidebar,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("div",{className:"site-settings-form-section"},p("p",null,"Tags Pages Sidebar:"),p("select",{name:"tagsPageSidebar",value:i.tagsPageSidebar,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("div",{className:"site-settings-form-section"},p("p",null,"Actors Pages Sidebar:"),p("select",{name:"actorsPageSidebar",value:i.actorsPageSidebar,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("div",{className:"site-settings-form-section"},p("p",null,"Post Page Sidebar:"),p("select",{name:"postPageSidebar",value:i.postPageSidebar,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))),p("div",{className:"site-settings-form-section"},p("p",null,"Posts Page Sidebar:"),p("select",{name:"postsPageSidebar",value:i.postsPageSidebar,onChange:function(e){return l(e)}},p("option",{value:"true"},"Yes"),p("option",{value:"false"},"No"))))),p("button",{className:"submitBtn",type:"submit"},"save settings")))};y.getInitialProps=function(e){var t,n,a,o;return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.pathname,e.query,t=e.req,e.res,e.err,!t){r.next=7;break}return r.next=4,i.a.awrap(Object(f.d)(t));case 4:r.t0=r.sent,r.next=8;break;case 7:r.t0="";case 8:return n=r.t0,r.next=11,i.a.awrap(Object(l.g)("identity",!1,n));case 11:return o=r.sent,a=o.data.setting?o.data.setting.data:{},r.abrupt("return",{domainName:n,identity:a});case 14:case"end":return r.stop()}}))},t.default=y},KQm4:function(e,t,n){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"a",(function(){return a}))},SDHI:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/settings/general",function(){return n("9HFx")}])},Y0NT:function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),i=n.n(a),o=n("q1tI"),r=n.n(o),s=n("hItm"),c=n("XpSs"),u=n("wbII"),l=r.a.createElement,m=function(e){return l(s.a,null,l(c.a,e),l("div",{className:"error-page"},l("h1",{className:"error-page-message"},e.errorCode?"error ".concat(e.errorCode," occurred on server"):"An error occurred on client")),l(u.a,{widgets:e.widgets,position:"footer"}))};m.getInitialProps=function(e){var t,n,a;return i.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return e.req,t=e.res,n=e.err,a=t?t.statusCode:n?n.statusCode:404,i.abrupt("return",{statusCode:a});case 3:case"end":return i.stop()}}))},t.default=m},o2Ts:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LWRvd24iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1zb3J0LWRvd24gZmEtdy0xMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MSAyODhoMjM4YzIxLjQgMCAzMi4xIDI1LjkgMTcgNDFMMTc3IDQ0OGMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMMjQgMzI5Yy0xNS4xLTE1LjEtNC40LTQxIDE3LTQxeiI+PC9wYXRoPjwvc3ZnPg=="},wbII:function(e,t,n){"use strict";var a=n("rePB"),i=n("q1tI"),o=n.n(i),r=(n("3I4S"),n("A8lN")),s=n("bDCP"),c=o.a.createElement;function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}t.a=function(e){var t=Object(i.useContext)(r.a),n=Object(i.useState)({style:{}}),o=n[0],l=n[1];return Object(i.useEffect)((function(){l(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},o,{style:{backgroundColor:t.siteDesign.footerBackgroundColor,color:t.siteDesign.footerTextColor}}))}),[t.siteDesign]),c("div",{id:"footer",style:o.style},c(s.a,e))}},zGA0:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LXVwIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtc29ydC11cCBmYS13LTEwIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyMCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTI3OSAyMjRINDFjLTIxLjQgMC0zMi4xLTI1LjktMTctNDFMMTQzIDY0YzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDExOSAxMTljMTUuMiAxNS4xIDQuNSA0MS0xNi45IDQxeiI+PC9wYXRoPjwvc3ZnPg=="}},[["SDHI",1,2,0,4,5,3]]]);