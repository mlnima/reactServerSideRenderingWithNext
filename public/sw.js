if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,c)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const i={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return i;default:return e(s)}}))).then((e=>{const s=c(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1108.e345529fcf0cbc5c7947.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1167.ff94e65295dcf4aca149.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1193-6fa591ddcc06131f5f39.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1288-a9895dd45efe656ea798.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1346.a2edb8e551a3ae61d2ce.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1444.6d7cbfbda29c2b210d04.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1491-6839992291f2c04437bc.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/161.2b8834bcdea6ee00a1b1.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1664.5ce951ba930cc8a1bca4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1753-5b7cbcd413a80bf5485b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1848.79a36436c7a558ee411d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1875.124dcd05c88d23c134a8.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/1902.7bc4be3f93bc40489a5a.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2002-33ca4f23cdb035804c7d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2196.53dadd6a3fcd6b6d8570.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2204.49b6ce02d843975070ff.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/229-ac4c3a171f7f452ddfcf.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2363-8b4603cc0d7d65bc4ebc.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2458.97fb28bd47a72be47652.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2527.0629aa7468f2fc2378e1.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2685.8fbbafc40d95867cf8c4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2788.ae70e6184d09dae7c4aa.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/2853.e81b980c5aa860430083.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/286-45b5803f9df6dfd6f9d2.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3041-badbb9e6364b5e70279a.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3129.6a2fb7183a376d212828.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3175.6b8a6a86269726bc18bf.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3179.3db29a30203ea7d9dad1.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3387.2dd84b2c110381612347.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3515.13bbeb29d1ffb870c07b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3698.9301e15fbec824345a56.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3773.411625c80484f00717a9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3838.133f40b818da1406465c.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3883-0aca93751a2782c19479.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/3960.1259871e5511d54dd0c5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4040.ca19adf2f17a6b81fc5a.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4137.bfd03ba5f2f369db1d90.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4446.ef6c3de2f2b9f6b1a6f5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4507.3767d190cbb2b44a4e82.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4537.902484578a547f2dbe83.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4848.766a73a7ecd6673a9b7f.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4851.f286aadced61765fe83e.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4877.042dbd993f1fc433555d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4929.f80888a24457b79ae027.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4954.345cc8befafa262f2179.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/4988.e49d8071c7b8f79dc344.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5007-5397f005eaf649b109f9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5171-325b7d9a5677cc2e4288.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5183.ff4d24db1437b7960ccf.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5215-7e0ae45898e3d34e04a7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/522.e58f97d9e7d8ca7f2e85.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5290.853c99a9713c3361218f.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5336.dd21ea661358a2f11b55.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5363.4e092acc7ed98c8d24d3.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/539.1d405e3c2083c78c5c12.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/557.8ae93e310eb374ffe488.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5935-d6b8ef20dbd8f9da4d41.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/594.13216ceb9d200c7455d4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/5947-c6b5d99d0dafed0f3a01.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6024-fefeab69916375d714cf.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6177-84db1ea5d032bc713616.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6257-8e19c1db70a7810579b7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6261-6af75b85c90bf8c7eaa7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6374-633b5588fdce05b61cad.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6682.b48e4faa9b02a7c6e590.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6702.d73a94c518b029d4cb38.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/68.9700141bbc474bf417f5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6810.202da787a97feedcbfaf.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/6996-134b1e1b329477d11b86.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7054.4b8881cb74eda2ea1b9d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7158.91aa33e094d21ca506df.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7179.3c71e34a6e78ba476135.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7305.e48f785b5cb6306f9e46.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7318.eec41c36ed53e6404196.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7440-5caf38cc6aa087bcc934.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7565.326fd687777c4575109d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/75fc9c18-2a20c2e7f10e4bdea475.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7625-10013a9f54f6f68d8c19.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7682.5a7e532338d2cc1802c1.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7696.506bf614ae5803d1452b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7748-4d8975dc4581ea2d8f20.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/7909.3341d6ac8337ee1dc5fb.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8047.2fcf88da2270fa3e5dae.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8214.1e3f61a3bf97abebed5a.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8330.0a47f037dbfbb85a1525.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8364.6dd792990da2f835b159.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8446.70a6798d86c5049af7d4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8498-9942b5dddb418ab88cff.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8535-f328f3ed6974bcc80629.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8569.4ab4e9d9d598401df914.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8712.ca342ff5e4d88971c89b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8764-90af2fd2b09a18feb1d7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8781.f4664e2da70a4b13a658.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8853-53a1ec351c56e37a98aa.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8942.2bc70357d1f63c669a26.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8952.acb7f16ce9455be9cc2b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8955.927a6ede6d3db42d0a4c.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/8957.80634d4793c9b50319ba.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9025.4fd96e29e5ce483a7af8.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9049.30945d0bd8faab503ad9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9124.2362affd861ad00d89c3.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9260.ae0e91dfae9c18a74bb7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/940.d0e8c4bb0e008f3009ee.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9614-a61ac2e62b3ed900c559.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9669-4e762caabbea14d7822e.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9855.0c608aff5bea7b69e141.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9875.50c64ebf66603eeea2e6.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9903-5fc447b6ce89c09bced4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/9964.3f55636b4a80bf98e2ae.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/a9a7754c-65cb40d06ee673ac44d0.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/cb1608f2-c8de52aa7b7c04ce5c69.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/eabe11fc.ca805ba446ed6095b736.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/framework-1c28876af024d9fc78de.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/main-6f5724ee3d9918bc8600.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/404-fa655837b8358f390dab.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/500-9a76632a1fe8a6968f28.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/_app-737bec9edc19d2750380.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/_error-c3146e1baa92e362fabb.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/actor/%5BactorId%5D-fc94d15687e9d85518e5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/actors-0f3e5a39b8632fee06bd.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin-504c83fd7efff6444cf9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/assets-bb26f65e80ff1b2b8e3c.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/comments-23d3661993f6954b1f6b.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design-b580daa26d0856204428.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/customColors-ada14836dc54996336ca.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/customStyles-7181ef76dec69ea8c2f2.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/footer-67b92c6b7ec0934d1046.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/header-c0b2590ae594bdb95c26.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/navigation-f7e5336b4efa42ac0498.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/postElement-e01f4716f9a5a44e9c79.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/postPage-a47459a44db2028e7df8.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/postsPage-33f60de6847aae63e633.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/topBar-570e26868e6cb8ca65d0.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/widgets-a9bdd99214287a2fd6c2.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/design/widgets/widget-67c874666b175daae158.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/exporter/postsExporter-b24b904ebb983fad5b13.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/fileManager-8a46c5d1e38ea3d8a9fc.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/form/%5BformId%5D-dbcd25102c316900d5a0.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/importer-3a942dad64250457e1a9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/importer/content-32c1bd980e59d2f180d8.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/importer/youtube-bed2bb61d37b451fbd29.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/meta-20c6d709b564d117be40.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/page-37428a976ac08c830e76.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/post-c253afadce8211f496b5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/settings-0ac225afb784bb2e2989.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/settings/customScript-48fde5912b6fe4ef5a18.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/settings/eCommerceSettings-b618eb00e6ffa4ff94ad.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/settings/general-ae2dd059707db049f2cc.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/settings/socialMediaSettings-1b87038994d8f3f17ce9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/tools-c7eb047e1b29610367b9.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/tools/terminal-d56fa02c4d964ba1bcc1.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/translations-2a04a55471cd908318c4.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/user-8e9870e81291f1af39fc.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/admin/users-98b9d1000f7a9acc1fc7.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/auth/login-631c39c6060e2fbca535.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/auth/register-555cfad7fc2a45cd0317.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/categories-b5b7dac5e1c861b2ad7c.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/category/%5BcategoryId%5D-d04b08ea1777b5ce3031.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/chatroom/%5BchatRoomName%5D-e7a07acf607d557b8d3f.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/checkout-cbfdb40bd3087726af55.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/index-82adf6ab58433224f7b3.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/maintenance-9d5d867df1ba1e6cf2e0.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/messenger-6e056a7a846a8870dd76.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/messenger/%5Bconversation%5D-bff080a9b1622406a990.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/page/%5BpageName%5D-9fc2e726e5385b3e3aad.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/post-b1f3950c0df376bf85d6.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/post/%5BpostType%5D/%5Bid%5D-0eab5fdf14fe1da835ad.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/posts-f58e1017d01125a961a5.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile-7e2faff15db4c5083d9e.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile/edit-29971a9a39ffe3752e91.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile/followers-bb82fa4367aa92bfc1cb.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile/following-27bf6ef4b752dca0afbb.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile/posts-0291b04ed382580dc134.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/profile/posts/newpost-fcd63e5a14966358dabe.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/search/%5Bkeyword%5D-d3bc6b135167c3dffe64.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/staticIndex-112988ca64207ab22e6d.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/tag/%5BtagId%5D-ecb7ad7e30d4001fe92a.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/tags-891e3a92d908a1d0f953.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/pages/user/%5Busername%5D-670f22e3d58287da00e8.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/chunks/webpack-3add5c254db5cdb2ddec.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/css/64bbd48b44425d2c4d99.css",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/css/759d9d14e50f28319cb6.css",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/eGSaeddL008jHjOjl2FbJ/_buildManifest.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/_next/static/eGSaeddL008jHjOjl2FbJ/_ssgManifest.js",revision:"eGSaeddL008jHjOjl2FbJ"},{url:"/asset/images/icons/ico-rating-positive.png",revision:"c9985c518f1fb332bea18e9388a5e127"},{url:"/asset/images/icons/icon-tag.png",revision:"a780021f00b74a6337f87e8dbcf37ca6"},{url:"/asset/images/icons/profile-image.jpg",revision:"93ca8bf9e462dae7ecd1fa9b5decfbf9"},{url:"/asset/images/icons/search.svg",revision:"d723d557eede9ef696fbe8ce89482b12"},{url:"/asset/images/user/femaleAvatar150.jpg",revision:"8c3daf35ab384b47bcd8f801d7e18479"},{url:"/asset/images/user/femaleAvatar50.jpg",revision:"a2106ab147f7f97dc1f3ae81cfffc808"},{url:"/asset/images/user/maleAvatar150.jpg",revision:"abf0d6e2c51e940fb81720e37c330f83"},{url:"/asset/images/user/maleAvatar50.jpg",revision:"761830f34626fa830f73eeb790b07dad"},{url:"/asset/images/user/noGenderAvatar150.jpg",revision:"ce3d2640ec0f7b2d26e81df8f8cc0e0d"},{url:"/asset/images/user/noGenderAvatar50.jpg",revision:"f102071b369e7711ca05c17a41b22d66"},{url:"/locales/ar/common.json",revision:"5648c8ee05a8517d14be8ab9dd538d91"},{url:"/locales/cs/common.json",revision:"5a66db492901e2426c11a319eb8dcfc7"},{url:"/locales/cs/customTranslation.json",revision:"82708a5ca278cfd128fbfdda5cd4aada"},{url:"/locales/da/common.json",revision:"0f96190b6f0cc6b4a35bc6b3bebc8c18"},{url:"/locales/da/customTranslation.json",revision:"84f80f654d587f166d3a3520503bbb09"},{url:"/locales/de/common.json",revision:"f52798049a9abd54f150fc944a2201e1"},{url:"/locales/de/customTranslation.json",revision:"16450068a58d20d2057e0ecfcefc55dd"},{url:"/locales/el/common.json",revision:"866ee19af5ba621ef17ec11ba85b50ba"},{url:"/locales/en/common.json",revision:"9402513b73f5401a8b6b74155c0359c1"},{url:"/locales/en/customTranslation.json",revision:"dd6cc4a493b3a62556e6d24aaab0c92b"},{url:"/locales/en/profile.json",revision:"45b3ade27dc224df93f6dead8362d6a8"},{url:"/locales/es/common.json",revision:"9c01924f68be0bcd9c2cfb593d6860c6"},{url:"/locales/fa/common.json",revision:"2c504ca9432ab8e56556c361051ae578"},{url:"/locales/fa/customTranslation.json",revision:"6a4fab1206a9d752df866d02bdaba81c"},{url:"/locales/fa/profile.json",revision:"b009981d9deb19de333cb12c1a7192dd"},{url:"/locales/fi/common.json",revision:"a657bb804e75d1f12c83075e3e085f52"},{url:"/locales/fr/common.json",revision:"b80513286cdf24c0974ff624370d7202"},{url:"/locales/fr/customTranslation.json",revision:"8f772bce420a41e6f26e64bc1fd55aa5"},{url:"/locales/hi/common.json",revision:"b075c3880545ca285faa2aa9c835626f"},{url:"/locales/hu/common.json",revision:"866964bd956f55ce082b051a03ef2119"},{url:"/locales/it/common.json",revision:"c2db5ea0c0ba5715fbd9f9532a22bb51"},{url:"/locales/ja/common.json",revision:"8947edff2158d3e2e5558e59a10b1fdf"},{url:"/locales/ko/common.json",revision:"8081ebfe96cb18176a47271d8cf9c0ce"},{url:"/locales/nl/common.json",revision:"a52cec639b59126b2a49b1cfaaa7994a"},{url:"/locales/no/common.json",revision:"b9b74530cbb5d868f25509dbc91e5d09"},{url:"/locales/pl/common.json",revision:"383ae4d8ad96a417d2cd0c4603451288"},{url:"/locales/pt/common.json",revision:"df863a93cec4a4a51f42ed214519a55a"},{url:"/locales/ru/common.json",revision:"e8c1d97dda810772d6b9817a23a4e274"},{url:"/locales/sk/common.json",revision:"29f386dcc01abca9512a385d23909865"},{url:"/locales/sl/common.json",revision:"f2a33b345318aab27a7a5a72c0d44ea2"},{url:"/locales/sv/common.json",revision:"971fd2fef6fa8230288ff26ec74820bd"},{url:"/locales/tr/common.json",revision:"1659fa875b72e66861c80115356a0d95"},{url:"/locales/zh/common.json",revision:"d162cbedf9bd335991932a3365a1dc3d"},{url:"/uploads/image/2021/7/JENDEKHANELOGO.jpg",revision:"895119366e4930d8fbfb82ec36457b31"},{url:"/uploads/image/2021/7/black-white-facebook-cover-4.jpg",revision:"a68c08b6148f5134cd9bd9a39b3d6695"},{url:"/uploads/image/2021/7/brazzers.jpg",revision:"ec8f96c4a137e50eec2e5a6eabc5e8e1"},{url:"/uploads/image/2021/7/cover.jpg",revision:"6d8ccd97c89a373e75daf69af3222f42"},{url:"/uploads/image/2021/7/g7Jo79Dh_400x400.jpg",revision:"c3e0ae3c5b5f238037ab73abde4d78aa"},{url:"/uploads/users/603ade9f4b1c515ec00d52fd/profile.png",revision:"c2c7ad1e5aa4e2c760af9c34122d44d0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
