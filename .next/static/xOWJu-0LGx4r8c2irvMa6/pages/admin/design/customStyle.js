(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"+wRh":function(e,t,n){"use strict";var a=n("KQm4"),r=n("rePB"),o=n("q1tI"),i=n.n(o),c=n("8Kt/"),s=n.n(c),u=n("A8lN"),m=n("0Bsm"),l=n.n(m),d=n("yNYL"),b=n.n(d),f=i.a.createElement,p=function(e){return e.active?f("div",{className:"AdminActionMenu"},f("button",{className:"AdminActionMenuItem"}," My Profile"),f("button",{className:"AdminActionMenuItem"}," Edit My Profile"),f("button",{className:"AdminActionMenuItem"}," Log Out")):null},g=n("YFqc"),O=n.n(g),j=i.a.createElement,y=function(e){var t=Object(o.useState)({});t[0],t[1];return Object(o.useEffect)((function(){}),[]),e.active?j("div",{className:"NewItemMenu"},j(O.a,{href:"/admin/post?new=1"},j("a",{className:"SideBarItem"},"New Post"))):null},w=i.a.createElement;function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=l()((function(e){var t=Object(o.useContext)(u.a),n=Object(o.useState)({AdminActionMenu:!1,NewItemMenu:!1}),a=n[0],r=n[1];return w(i.a.Fragment,null,w("div",{className:"adminTopBar"},w("div",{className:"adminTopBarControl"},w("button",{className:"adminSideBarMobileBtn adminTopBarItem",onClick:function(){t.settings.adminPanelSideBar?t.dispatchSettings((function(e){return S({},e,{adminPanelSideBar:!1})})):t.dispatchSettings((function(e){return S({},e,{adminPanelSideBar:!0})}))}},w(b.a,{className:"fontawesomeMedium",name:"bars"})),w("button",{className:"adminGoToHomePageBtn adminTopBarItem",onClick:function(){return e.router.push("/"),void console.log(e.router)}},w(b.a,{className:"fontawesomeMedium",name:"home"})),w("button",{className:"adminNewActionBtn adminTopBarItem",onClick:function(){a.NewItemMenu?r(S({},a,{NewItemMenu:!1})):r(S({},a,{NewItemMenu:!0}))}},w(b.a,{className:"fontawesomeMedium",name:"plus"})),w(y,{active:a.NewItemMenu})),w("button",{className:"adminActionBtn adminTopBarItem",onClick:function(){a.AdminActionMenu?r(S({},a,{AdminActionMenu:!1})):r(S({},a,{AdminActionMenu:!0}))}},w(b.a,{className:"fontawesomeMedium",name:"user"})),w(p,{active:a.AdminActionMenu})))})),v=n("U+0P"),P=(n("vDqi"),n("zGA0")),N=n.n(P),M=n("o2Ts"),D=n.n(M),x=i.a.createElement,A=function(e){var t=Object(o.useContext)(u.a),n=Object(o.useState)({Dashboard:{pathURL:"/admin",subItems:[]},Posts:{pathURL:"/admin/posts",subItems:[]},FileManager:{pathURL:"/admin/fileManager",subItems:[]},Comments:{pathURL:"/admin/comments",subItems:[]},Contacts:{pathURL:"/admin/contacts",subItems:[]},Design:{pathURL:"/admin/design",subItems:["topBar","header","navigation","widgets","postPage","footer","customStyle"]},Users:{pathURL:"/admin/users",subItems:[]},Tools:{pathURL:"/admin/tools",subItems:["terminal"]},Settings:{pathURL:"/admin/settings",subItems:["customScript"]}}),a=n[0],r=(n[1],Object(o.useState)("")),i=r[0],c=r[1],s=Object.keys(a).map((function(e){var t=a[e].subItems.map((function(t){return i===e?x(O.a,{href:a[e].pathURL+"/"+t},x("a",{className:"SideBarItem-SubItem"},Object(v.b)(t))):null}));return x("div",{key:e,className:"SideBarItemElement"},x("div",{className:"SideBarItemTitle",onMouseOver:function(){return c(e)}},x(O.a,{href:a[e].pathURL},x("a",{className:"SideBarItem"},Object(v.b)(e))),x((function(){return a[e].subItems.length>0?x("button",{onClick:function(){return c(i===e?"":e)}},x("img",{className:"fontawesomeSvgVerySmall",src:i===e?N.a:D.a,alt:""})):null}),null)),x("div",{className:"SideBarItemElementSubItems"},t))}));return t.settings.adminPanelSideBar?x("div",{className:"SideBar"},s):null},C=n("nOHt"),B=n("KOc1"),L=n("UMKl"),E=n("bSV5"),T=(n("Y0NT"),i.a.createElement);function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.a=Object(C.withRouter)((function(e){var t=Object(o.useContext)(u.a),n=Object(o.useRef)(null),r=Object(o.useRef)(null),c=Object(o.useState)({});c[0],c[1];return Object(o.useEffect)((function(){window.innerWidth>768&&t.dispatchSettings((function(e){return R({},e,{adminPanelSideBar:!0})}))}),[]),Object(o.useEffect)((function(){Object(E.g)("identity",!1,window.location.origin,Date.now()).then((function(e){t.dispatchSiteIdentity(R({},t.siteIdentity,{},e.data.setting.data))})),Object(E.g)("design",!1,window.location.origin,Date.now()).then((function(e){t.dispatchSiteDesign(R({},t.siteDesign,{},e.data.setting.data))})),Object(E.g)("navigation",!1,window.location.origin,Date.now()).then((function(e){t.dispatchNavigationData(Object(a.a)(e.data.setting.data))}))}),[]),"administrator"===t.userData.role?T(i.a.Fragment,null,T(s.a,null,T("title",null,"Admin Panel"),T("meta",{name:"theme-color",content:"#000000"}),T("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),T("meta",{charSet:"utf-8"}),T("link",{href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",rel:"stylesheet"}),T("link",{rel:"icon",href:"/favicon.ico"})),T(L.a,null),T("div",{ref:n,className:"container"},T(h,null),T(A,null),T("div",{ref:r,className:"Admin"},e.children),T(B.a,null))):T("h1",null,"Access Denied")}))},"3I4S":function(e,t,n){},KQm4:function(e,t,n){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"a",(function(){return a}))},Y0NT:function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),r=n.n(a),o=n("q1tI"),i=n.n(o),c=n("hItm"),s=n("XpSs"),u=n("wbII"),m=i.a.createElement,l=function(e){return m(c.a,null,m(s.a,e),m("div",{className:"error-page"},m("h1",{className:"error-page-message"},e.errorCode?"error ".concat(e.errorCode," occurred on server"):"An error occurred on client")),m(u.a,{widgets:e.widgets,position:"footer"}))};l.getInitialProps=function(e){var t,n,a;return r.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e.req,t=e.res,n=e.err,a=t?t.statusCode:n?n.statusCode:404,r.abrupt("return",{statusCode:a});case 3:case"end":return r.stop()}}))},t.default=l},ne5v:function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),r=n.n(a),o=n("rePB"),i=n("q1tI"),c=n.n(i),s=n("+wRh"),u=(n("f7RD"),n("bSV5")),m=n("U+0P"),l=c.a.createElement;function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=function(e){var t=Object(i.useState)(""),n=t[0],a=t[1];return Object(i.useEffect)((function(){console.log(e),e.customStyles.data&&a(e.customStyles.data)}),[e]),l(s.a,null,l("div",{className:"custom-style"},l("form",{className:"customStyle",onSubmit:function(e){return function(e){e.preventDefault(),contextData.dispatchState(b({},contextData.state,{loading:!0})),Object(u.i)(n).then((function(){contextData.dispatchState(b({},contextData.state,{loading:!1}))}))}(e)}},l("textarea",{value:n,onChange:function(e){return function(e){a(e.target.value)}(e)}}),l("button",{className:"submitBtn",type:"submit"},"Save Custom Style"))))};f.getInitialProps=function(e){var t,n,a,o;return r.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:if(!(t=e.req)){i.next=7;break}return i.next=4,r.a.awrap(Object(m.d)(t));case 4:i.t0=i.sent,i.next=8;break;case 7:i.t0="";case 8:return n=i.t0,i.next=11,r.a.awrap(Object(u.g)("customStyle",!1,n));case 11:return o=i.sent,a=o.data.setting?o.data.setting:{},i.abrupt("return",{customStyles:a});case 14:case"end":return i.stop()}}))},t.default=f},"nf/x":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/design/customStyle",function(){return n("ne5v")}])},o2Ts:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LWRvd24iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1zb3J0LWRvd24gZmEtdy0xMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00MSAyODhoMjM4YzIxLjQgMCAzMi4xIDI1LjkgMTcgNDFMMTc3IDQ0OGMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBMMjQgMzI5Yy0xNS4xLTE1LjEtNC40LTQxIDE3LTQxeiI+PC9wYXRoPjwvc3ZnPg=="},wbII:function(e,t,n){"use strict";var a=n("rePB"),r=n("q1tI"),o=n.n(r),i=(n("3I4S"),n("A8lN")),c=n("bDCP"),s=o.a.createElement;function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}t.a=function(e){var t=Object(r.useContext)(i.a),n=Object(r.useState)({style:{}}),o=n[0],m=n[1];return Object(r.useEffect)((function(){m(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},o,{style:{backgroundColor:t.siteDesign.footerBackgroundColor,color:t.siteDesign.footerTextColor}}))}),[t.siteDesign]),s("div",{id:"footer",style:o.style},s(c.a,e))}},zGA0:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJzb3J0LXVwIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtc29ydC11cCBmYS13LTEwIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyMCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTI3OSAyMjRINDFjLTIxLjQgMC0zMi4xLTI1LjktMTctNDFMMTQzIDY0YzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDExOSAxMTljMTUuMiAxNS4xIDQuNSA0MS0xNi45IDQxeiI+PC9wYXRoPjwvc3ZnPg=="}},[["nf/x",1,2,0,4,5,3]]]);