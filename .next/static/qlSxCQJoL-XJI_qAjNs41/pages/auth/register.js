(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"9UF8":function(e,n,t){"use strict";t.r(n);var a=t("hfKm"),r=t.n(a),u=t("2Eek"),o=t.n(u),s=t("XoMD"),i=t.n(s),c=t("Jo+v"),l=t.n(c),m=t("4mXO"),p=t.n(m),f=t("pLtp"),d=t.n(f),v=t("vYYK"),h=t("q1tI"),b=t.n(h),g=t("hItm"),w=(t("xhvR"),t("0Bsm")),N=t.n(w),y=t("vDqi"),O=t.n(y),j=b.a.createElement;function F(e,n){var t=d()(e);if(p.a){var a=p()(e);n&&(a=a.filter((function(n){return l()(e,n).enumerable}))),t.push.apply(t,a)}return t}function C(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?F(Object(t),!0).forEach((function(n){Object(v.a)(e,n,t[n])})):i.a?o()(e,i()(t)):F(Object(t)).forEach((function(n){r()(e,n,l()(t,n))}))}return e}n.default=N()((function(e){var n=Object(h.useRef)(null),t=Object(h.useState)({username:void 0,email:void 0,password:void 0,password2:void 0}),a=t[0],r=t[1],u=Object(h.useState)({response:void 0,type:void 0}),o=u[0],s=u[1],i=function(e){r(C({},a,Object(v.a)({},e.target.name,e.target.value)))};return j(g.a,null,j("div",{className:"Register authPage"},j("form",{className:"authForm",onSubmit:function(e){return function(e){e.preventDefault(),O.a.post("/api/v1/users/register",a).then((function(e){"success"===type?n.current.style.backgroundColor="green":n.current.style.backgroundColor="red",s(C({},o,{response:e.data.response,type:e.data.type}))})).catch((function(e){return console.log(e)}))}(e)}},j("div",{className:"authFormItem"},j("p",null,"username"),j("input",{name:"username",onChange:function(e){return i(e)}})),j("div",{className:"authFormItem"},j("p",null,"email"),j("input",{name:"email",onChange:function(e){return i(e)}})),j("div",{className:"authFormItem"},j("p",null,"password"),j("input",{name:"password",onChange:function(e){return i(e)}})),j("div",{className:"authFormItem"},j("p",null,"repeat password"),j("input",{name:"password2",onChange:function(e){return i(e)}})),j("button",{type:"submit",className:"submitBtn"},"Register"))))}))},b2z8:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/register",function(){return t("9UF8")}])}},[["b2z8",1,2,0,3,4,5,6]]]);