if(!self.define){const a=a=>{"require"!==a&&(a+=".js");let s=Promise.resolve();return c[a]||(s=new Promise((async s=>{if("document"in self){const c=document.createElement("script");c.src=a,document.head.appendChild(c),c.onload=s}else importScripts(a),s()}))),s.then((()=>{if(!c[a])throw new Error(`Module ${a} didn’t register its module`);return c[a]}))},s=(s,c)=>{Promise.all(s.map(a)).then((a=>c(1===a.length?a[0]:a)))},c={require:Promise.resolve(s)};self.define=(s,e,t)=>{c[s]||(c[s]=Promise.resolve().then((()=>{let c={};const n={uri:location.origin+s.slice(1)};return Promise.all(e.map((s=>{switch(s){case"exports":return c;case"module":return n;default:return a(s)}}))).then((a=>{const s=t(...a);return c.default||(c.default=s),c}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(a){"use strict";importScripts(),self.skipWaiting(),a.clientsClaim(),a.precacheAndRoute([{url:"/_next/static/-tKOLPExcAVFTAca5_aqY/_buildManifest.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/-tKOLPExcAVFTAca5_aqY/_ssgManifest.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/1442.96d4f0f5d231e38153c5.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/161.8f4c1502bf504b555d0e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/2204.b952d0551ffccbf97370.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/2458.046625aec7151af220fc.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/2527.3c7c8a2a93842de7b8f5.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/2680.059fdb6af8d6ea50fde2.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/2788.b0d6a87183a0acd0843c.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/308-b5cdbd577eabef2e74ef.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3179.06503901683f9c891056.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3387.78e56c83aac9a220235e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3515-2b6d4a2cc025b7cca408.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3698.08a8cc1f8f610d975d65.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3773.ba2ccb8d4c6b917f9eb2.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/3838.21f36cd14cf076a83455.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4163-d4cf9da74f9d4161890f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4537.10fb1b4302a4946103e8.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4754.c5be36ae78407e44fb74.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4851.d4dcba16be26921f1afe.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4877.132eff39e77f0fee0351.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4954.20fb416b47f0f7dcd411.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/4972-d859fef1a06324c29dc8.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/5056-17955f7ab0c150657c50.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/5290.27e18febdfe9446e2659.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/539.809073fec4addd21248f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/6413-91525ad45d6e456f42c0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/65-b4110e312f8fb380c9f9.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/6623.a32a541b50ac47f6e51f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/6653.fc5c67e36ecd0cff42c8.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/6682.4e1032eff84de9cf67d9.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/7127.e4400e33073cbbb0def6.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/7318.4e469641f3fa3683604f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/7682.8d5dc22c24fdeb0336d6.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/7909.06d17b794d6c8f462ced.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/7943.b357b18bf9c5dad37de4.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8047.817d484cd6e5f1c4b7e0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8060-33d08ffc284423ed8e39.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8214.7f92dbef0aa6679e74f8.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8267.967d4201506771813fc4.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8330.82582ef3da105e771749.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8364.dc03446c3b4a0d2a7b6e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8446.754dad40bdd1f0f43a3c.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/8569.9bb7b2a8a3127d910541.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/9049.0e6b736c7ccaa111cd1b.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/9124.e52123b71f847bee0a0f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/9260-5fdaa0b75887bacf8ca0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/9369-68101cf02cbe7373f2fe.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/997.db7813a1764c1d86e5ae.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/a9a7754c-c5d4bef51d863e4e2f7b.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/eabe11fc.ca805ba446ed6095b736.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/framework-1c28876af024d9fc78de.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/main-b63ff4dc1d06db82e621.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/404-99d4f0a661bd8f0e1a12.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/_app-83031378a6c7045d3771.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/_error-e5d9d5c534550a1ed2d6.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin-1a4e611f16f56b4a1cac.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/assets-9fc0aece62a32d5fd265.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/comments-a00795a2fc5ead8b7845.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design-86a37489007db46d04c1.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/customColors-4d63ebd9fe4aa4137c4f.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/customStyles-95c3155533301f5c5af5.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/footer-da5d0b1edbb552578cfb.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/header-c0d4e5900551fe9085ff.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/navigation-55a1ba4c6d6babf794b7.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/postElement-a6851578da34c0a60e9d.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/postPage-39e2d37c96d5071bc190.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/postsPage-b648d9ae302c86d48f92.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/topBar-f060b743fef26a7bc947.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/widgets-8f2ab00d285709bb7324.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/design/widgets/widget-8fb92c5fe7c8c85dd87e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/exporter/postsExporter-03c192a05d0260627b18.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/fileManager-cc5b1b37c8b0b37a5d52.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/form-8fda6d5867afa6d392a8.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/importer-a2799ac7ada8b5e315a7.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/importer/content-1cee714cafcf2b7eee2c.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/importer/youtube-cfa27ca8dc66031f9b91.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/meta-e04f90bdc487a3fc7f00.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/page-ca33b26d0b8abc3797f9.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/post-4e4ba2370bf2590e7f41.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/settings-fec70250834ab7670ae4.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/settings/customScript-7e8a5864013ce946b6e0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/settings/eCommerceSettings-4ac7ea07bc7f21d2085d.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/settings/general-5de84bfc407a0e7b1d52.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/tools-a18cfef007929cfc0384.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/tools/terminal-627f2cd8c93c695d873b.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/translate-0eeb8825ee7eb81834da.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/user-1d2aa6f7eaa353275376.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/admin/users-2a3c711ffc8c7527e8f0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/auth/login-4a862323fa731863bc69.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/auth/register-a2af538ca9c819aba198.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/checkout-9707e0ddcfd04029d43d.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/index-3a08e70f8825b9c7c907.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/maintenance-4d7e70d0677ff6e45e2a.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/meta-126fe2e49deca3f7915e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/page-d2a3bc46bcbbb0884205.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/post-28206bea38e658a0fa00.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/posts-9b47a26d280319d8e184.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile-64981921436dfc35d424.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile/followers-2ff8d230d3a3806fd12e.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile/following-bbd473c95c5b830ead38.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile/friendRequests-531a39c6acd41c7d7982.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile/friends-f9423e11cbe9f9630882.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/profile/posts-c6fc875726e6df3d5d8b.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/pages/user-58c006566118a2874156.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/polyfills-b69b38e0e606287ba003.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/chunks/webpack-dbe97ac9b52c6aadc5f0.js",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/css/2c97fa07e0211c5869da.css",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/css/3df4e70bbb124b936565.css",revision:"-tKOLPExcAVFTAca5_aqY"},{url:"/_next/static/css/aed29042a50df0a2ffdc.css",revision:"-tKOLPExcAVFTAca5_aqY"}],{ignoreURLParametersMatching:[]}),a.cleanupOutdatedCaches(),a.registerRoute("/",new a.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:a,response:s,event:c,state:e})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),a.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new a.CacheFirst({cacheName:"google-fonts",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new a.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new a.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\/_next\/image\?url=.+$/i,new a.StaleWhileRevalidate({cacheName:"next-image",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:mp3|mp4)$/i,new a.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:js)$/i,new a.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:css|less)$/i,new a.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new a.StaleWhileRevalidate({cacheName:"next-data",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute(/\.(?:json|xml|csv)$/i,new a.NetworkFirst({cacheName:"static-data-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute((({url:a})=>{if(!(self.origin===a.origin))return!1;const s=a.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new a.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),a.registerRoute((({url:a})=>{if(!(self.origin===a.origin))return!1;return!a.pathname.startsWith("/api/")}),new a.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
