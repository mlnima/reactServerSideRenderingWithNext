if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return a[s]||(e=new Promise((async e=>{if("document"in self){const a=document.createElement("script");a.src=s,document.head.appendChild(a),a.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!a[s])throw new Error(`Module ${s} didn’t register its module`);return a[s]}))},e=(e,a)=>{Promise.all(e.map(s)).then((s=>a(1===s.length?s[0]:s)))},a={require:Promise.resolve(e)};self.define=(e,c,n)=>{a[e]||(a[e]=Promise.resolve().then((()=>{let a={};const i={uri:location.origin+e.slice(1)};return Promise.all(c.map((e=>{switch(e){case"exports":return a;case"module":return i;default:return s(e)}}))).then((s=>{const e=n(...s);return a.default||(a.default=e),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/LQlqhy7hl2qEY1dqNswso/_buildManifest.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/LQlqhy7hl2qEY1dqNswso/_ssgManifest.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1108.772617e5791b92330445.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1167.52c611fa03693ea30349.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1346.a2edb8e551a3ae61d2ce.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1444.b76126dc1674f05f5269.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1491-5cd780142430ee4ab4ed.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/161.1254d45c5d086ba8d6da.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1664.5ce951ba930cc8a1bca4.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1753-f848d3dd3bcfcd81f800.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1848.c9892c512796c14d6e25.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1875.b9202ffe6f701d8d60b8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/1902.fdf9b3d21fef8bd33bf8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2002-131fd68081ea7c46a7b8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2196.684b211f0a68e5cf41a4.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2204.49b6ce02d843975070ff.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/229-f0519539854919cce53c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2363-1f32f88b03afc855a9e4.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2427.dc5d5a8a98b932ce4a38.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2458.97fb28bd47a72be47652.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2527.a2201c4eda31596bae6f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2648-e3b8b3413d41a12ea52c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2685.8fbbafc40d95867cf8c4.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2788.a3b78be7c1bdeacc25e5.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/2853.e81b980c5aa860430083.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/286-45b5803f9df6dfd6f9d2.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3041-36652fcaedb8ec8a0440.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3129.671841813dff5953a1b8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3175.bf49a37bd2a526f53143.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3179.6c139b935f800ecfe1a8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3387.2dd84b2c110381612347.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3515.13bbeb29d1ffb870c07b.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3690-dea9a6a5cead6c11c00d.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3698.e35ded311dfa551717ea.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3773.7c6afb48b576b2cb1fb8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3838.12454dac882a20196d1f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/3960.a8c30e1b40e3a7251a09.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4040.17fcfa8bcfb4f9ba8972.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4097-67d5937a93a0fea15828.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4137.6855e4464d403c46be1a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4446.65aa19356ebc07636050.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4507.c74399c2b05ea2e8af68.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4537.4e70771028ac211f7dfe.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4842.96e4fa9544400e473c98.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4848.29408421727b41e74b63.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4851.f286aadced61765fe83e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4877.0a0dfbb4a2c1ca748ef9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4929.5c4178cda1f450d176b2.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4954.a03ba74f576df89f9020.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4972-909346ebdb9215f57690.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/4988.285d102da1980c1af330.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5171-325b7d9a5677cc2e4288.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5183.982f9ad377ae2ef9bcf9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5215-2169ac56355891ff877e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/522.b89aa6fed8081fbdbb07.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5290.740fa336bb428c300f54.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5336.88eaf48a0ada151d9d36.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5363.4e092acc7ed98c8d24d3.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5389.b913fc212af881aa7eb9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/539.0b25984fc357c5c1f478.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5527-7074cf3210bb8c36d6cc.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/557.cb167897133e81598678.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5935-d73b2cc461e79975665a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/5947-c6b5d99d0dafed0f3a01.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6024-fefeab69916375d714cf.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6177-a2ea7f6cb5afbbde2d76.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6257-8e19c1db70a7810579b7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6261-3e69f54194a9424eb5ed.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6374-633b5588fdce05b61cad.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6682.b48e4faa9b02a7c6e590.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6702.8c95969c215338348dc1.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/68.90fe4cd52e35a50ed479.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6810.bc58d739ed85fcd1e184.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/6996-134b1e1b329477d11b86.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7054.b745469ef1c803467dc2.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7158.55b5beec22df215e5557.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7179.6cc3f24b09cdd50dcf01.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7305.e7f69d7e22cebdcff73f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7318.eec41c36ed53e6404196.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7565.326fd687777c4575109d.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/75fc9c18-2a20c2e7f10e4bdea475.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7625-06cd75c414cc1bf8bb82.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7682.2e27a1eea78829349153.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7696.abae62f9a179e40bb18e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7697-62a1d35d570b740efa09.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7909.7c6fcd2fdd5d366cdc2a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/7943.08fe2e34312eae19712e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8047.2fcf88da2270fa3e5dae.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8106.277271bfcf48f6f78225.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8214.14cecdd9d09d2e31b22e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8330.9b61e94d520df37ba94a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8364.3697e368c748c2e1bf78.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8446.44e5203134a226c91e08.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8535-5c363d8fb06fcac39a85.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8569.4ab4e9d9d598401df914.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8764-90af2fd2b09a18feb1d7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8853-fc203767388515d17b44.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8942.4368670aa1b677dfc710.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8952.5ca04396f4361ccd5480.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/8955.e0084ac6532af9d85e31.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9025.9cb89b687988ff9861d7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9049.30945d0bd8faab503ad9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9124.7b9a9fb09132339b1e55.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9260.ae0e91dfae9c18a74bb7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9614-a61ac2e62b3ed900c559.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9669-5a9fef3a0b290f11b6d7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9875.f18f5d54c228d2b0a82a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9903-4deb2c5af912d5e4ab86.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/9964.b7e9b109f2c8dd92682a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/a9a7754c-65cb40d06ee673ac44d0.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/cb1608f2-0f151c9a46b680fc5263.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/eabe11fc.ca805ba446ed6095b736.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/framework-1c28876af024d9fc78de.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/main-32fcf68eaafb1d14ac89.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/404-5011e55265f805a923ea.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/500-21028ef39db82b466a6c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/_app-984f6d5b7d7c571055c0.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/_error-83454092bb0588b56632.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/actor/%5BactorId%5D-ab281a929d0953edfb50.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/actors-72e5bb28521e0e545488.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin-b87fca858e445eda8b45.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/assets-6bb4c49014e0f6261187.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/comments-15384667bef10dceead7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design-c15aa102889797aec6ce.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/customColors-f0224339d5ea22bc7078.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/customStyles-8a542adc32c97e1acb65.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/footer-f4a9165faa452114a661.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/header-e868c12647b4626991d6.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/navigation-e4cf252df7663a020d2a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/postElement-cd86439bf404f42c2a96.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/postPage-72a54c13410413b884dd.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/postsPage-369ff409b22f120a132c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/topBar-a76f9f45b882b3590e39.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/widgets-b33e0aa67dbd10c2cf6f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/design/widgets/widget-301e0a3030e3143bb665.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/exporter/postsExporter-7d7f32a7954c622537d7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/fileManager-a695a55cf26a12865f07.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/form/%5BformId%5D-cbe05f2093d546df182f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/importer-8d7c0304364c104925b4.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/importer/content-7168581ac512ff71ce48.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/importer/youtube-59bfc6b0bf29f87b038c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/meta-302f5cdbb3a1aa1a33d8.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/page-ceffc1d96572697ecdc5.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/post-a932d739109eef734565.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/settings-cfd25f9ce91aae87977c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/settings/customScript-c455cd3097eafc8c9775.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/settings/eCommerceSettings-3d6f6bc7aef400d3e20f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/settings/general-f6c622af5cccc03db73c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/settings/socialMediaSettings-1b87038994d8f3f17ce9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/tools-232c92b0fe3e40e3def9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/tools/terminal-3ff3bf572aa5f36f6c3e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/translations-342bb450e390d551170b.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/user-cf8c397070f318b80317.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/admin/users-b65f30ff186cecf472a7.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/auth/login-4c6ff599ec153d21b456.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/auth/register-07a0a19ebac28250440c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/categories-144050ae205619b4b33e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/category/%5BcategoryId%5D-d3ea2a6051240cc16c63.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/chatroom/%5BchatRoomName%5D-9c0cd926709dc2d7a5c2.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/checkout-80e2edb226db6426dc8f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/index-731fd9dad9fd8bce9e4f.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/maintenance-698fa64aab69782509fc.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/messenger-a519840ad8bc2c530de1.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/messenger/%5Bconversation%5D-ecd7741adab21a7ec2f9.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/page/%5BpageName%5D-99ee62973563a05ba085.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/post-523cbbbb9243fa5f9922.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/post/%5BpostType%5D/%5Bid%5D-b377ae950b213e84d5a3.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/posts-a33e1dc78f0130e02164.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile-92b01858f7c0c00427ee.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile/edit-0bc840bf17d459fe1a89.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile/followers-bb82fa4367aa92bfc1cb.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile/following-27bf6ef4b752dca0afbb.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile/posts-e599f44261e0cbad40ee.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/profile/posts/newpost-a761b6e951199dab9f9e.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/search/%5Bkeyword%5D-70f61ada8df4b69df669.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/staticIndex-f8e12b2655234f2c3f36.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/tag/%5BtagId%5D-5457da4f9960bf8d896d.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/tags-656bedd475d4c8775a6a.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/pages/user/%5Busername%5D-e9f50dce1bee09190a1c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/chunks/webpack-d68b668745034067d72c.js",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/css/2c97fa07e0211c5869da.css",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/_next/static/css/3df4e70bbb124b936565.css",revision:"LQlqhy7hl2qEY1dqNswso"},{url:"/asset/images/icons/ico-rating-positive.png",revision:"c9985c518f1fb332bea18e9388a5e127"},{url:"/asset/images/icons/icon-tag.png",revision:"a780021f00b74a6337f87e8dbcf37ca6"},{url:"/asset/images/icons/profile-image.jpg",revision:"93ca8bf9e462dae7ecd1fa9b5decfbf9"},{url:"/asset/images/icons/search.svg",revision:"d723d557eede9ef696fbe8ce89482b12"},{url:"/asset/images/user/femaleAvatar150.jpg",revision:"8c3daf35ab384b47bcd8f801d7e18479"},{url:"/asset/images/user/femaleAvatar50.jpg",revision:"a2106ab147f7f97dc1f3ae81cfffc808"},{url:"/asset/images/user/maleAvatar150.jpg",revision:"abf0d6e2c51e940fb81720e37c330f83"},{url:"/asset/images/user/maleAvatar50.jpg",revision:"761830f34626fa830f73eeb790b07dad"},{url:"/asset/images/user/noGenderAvatar150.jpg",revision:"ce3d2640ec0f7b2d26e81df8f8cc0e0d"},{url:"/asset/images/user/noGenderAvatar50.jpg",revision:"f102071b369e7711ca05c17a41b22d66"},{url:"/locales/ar/common.json",revision:"5648c8ee05a8517d14be8ab9dd538d91"},{url:"/locales/cs/common.json",revision:"5a66db492901e2426c11a319eb8dcfc7"},{url:"/locales/cs/customTranslation.json",revision:"82708a5ca278cfd128fbfdda5cd4aada"},{url:"/locales/da/common.json",revision:"0f96190b6f0cc6b4a35bc6b3bebc8c18"},{url:"/locales/da/customTranslation.json",revision:"84f80f654d587f166d3a3520503bbb09"},{url:"/locales/de/common.json",revision:"919aa8d1dde95e560921ee7d6a459a0a"},{url:"/locales/de/customTranslation.json",revision:"16450068a58d20d2057e0ecfcefc55dd"},{url:"/locales/el/common.json",revision:"866ee19af5ba621ef17ec11ba85b50ba"},{url:"/locales/en/common.json",revision:"57a068daace935c9ef6f680ec15cf8b6"},{url:"/locales/en/customTranslation.json",revision:"dd6cc4a493b3a62556e6d24aaab0c92b"},{url:"/locales/en/profile.json",revision:"45b3ade27dc224df93f6dead8362d6a8"},{url:"/locales/es/common.json",revision:"9c01924f68be0bcd9c2cfb593d6860c6"},{url:"/locales/fa/common.json",revision:"3982d391692f6026e88569a1eb7115a3"},{url:"/locales/fa/customTranslation.json",revision:"6a4fab1206a9d752df866d02bdaba81c"},{url:"/locales/fa/profile.json",revision:"b009981d9deb19de333cb12c1a7192dd"},{url:"/locales/fi/common.json",revision:"a657bb804e75d1f12c83075e3e085f52"},{url:"/locales/fr/common.json",revision:"b80513286cdf24c0974ff624370d7202"},{url:"/locales/fr/customTranslation.json",revision:"8f772bce420a41e6f26e64bc1fd55aa5"},{url:"/locales/hi/common.json",revision:"b075c3880545ca285faa2aa9c835626f"},{url:"/locales/hu/common.json",revision:"866964bd956f55ce082b051a03ef2119"},{url:"/locales/it/common.json",revision:"c2db5ea0c0ba5715fbd9f9532a22bb51"},{url:"/locales/ja/common.json",revision:"8947edff2158d3e2e5558e59a10b1fdf"},{url:"/locales/ko/common.json",revision:"8081ebfe96cb18176a47271d8cf9c0ce"},{url:"/locales/nl/common.json",revision:"a52cec639b59126b2a49b1cfaaa7994a"},{url:"/locales/no/common.json",revision:"b9b74530cbb5d868f25509dbc91e5d09"},{url:"/locales/pl/common.json",revision:"383ae4d8ad96a417d2cd0c4603451288"},{url:"/locales/pt/common.json",revision:"df863a93cec4a4a51f42ed214519a55a"},{url:"/locales/ru/common.json",revision:"e8c1d97dda810772d6b9817a23a4e274"},{url:"/locales/sk/common.json",revision:"29f386dcc01abca9512a385d23909865"},{url:"/locales/sl/common.json",revision:"f2a33b345318aab27a7a5a72c0d44ea2"},{url:"/locales/sv/common.json",revision:"971fd2fef6fa8230288ff26ec74820bd"},{url:"/locales/tr/common.json",revision:"1659fa875b72e66861c80115356a0d95"},{url:"/locales/zh/common.json",revision:"d162cbedf9bd335991932a3365a1dc3d"},{url:"/uploads/image/2021/7/JENDEKHANELOGO.jpg",revision:"895119366e4930d8fbfb82ec36457b31"},{url:"/uploads/image/2021/7/black-white-facebook-cover-4.jpg",revision:"a68c08b6148f5134cd9bd9a39b3d6695"},{url:"/uploads/image/2021/7/brazzers.jpg",revision:"ec8f96c4a137e50eec2e5a6eabc5e8e1"},{url:"/uploads/image/2021/7/cover.jpg",revision:"6d8ccd97c89a373e75daf69af3222f42"},{url:"/uploads/image/2021/7/g7Jo79Dh_400x400.jpg",revision:"c3e0ae3c5b5f238037ab73abde4d78aa"},{url:"/uploads/users/603ade9f4b1c515ec00d52fd/profile.png",revision:"c2c7ad1e5aa4e2c760af9c34122d44d0"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:mp3|mp4)$/i,new s.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
