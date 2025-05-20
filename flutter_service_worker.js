'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "91520722dba673aa088db3c6fd743e49",
".git/config": "d6363a23610d44a4a877bcab764553bf",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "040729e337355ff4c6997e46fccfe9ee",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "688a8d4fdd0d82b9149a30ab95cb039d",
".git/logs/refs/heads/main": "5eb9714ff7dda21ec30de05d1a2c93d8",
".git/logs/refs/remotes/origin/main": "ddc8138d7321aee022dd78c068a31313",
".git/objects/06/9d73d2725bd35099099d408d5b849670629e44": "2b318f161a7796469d6762a4f5a32e88",
".git/objects/07/9e8be21d3e838ba1cb3f4e8f33bee25c1f03ac": "6e4ec9a9068e176d638a4d02f37d90ab",
".git/objects/09/37f1ec4331b69de8032424eceec6dc99c154f3": "91b3b2bbe2190588aca7bd34099b6b5f",
".git/objects/13/3fa9587d7bc3a6a35e8fac329be8dd5e5714c0": "1879b12eaf1628eef2747c84aa44c2cf",
".git/objects/1a/7f3b0bba45b7470a4240c3ec67595eeeb02192": "ac15319d47a37f9c7a950395d0777c21",
".git/objects/22/da8e0e46d6b8d970e000dcdc0631b02d15afa3": "6b1514ad6054d417b522c9fdc03616dd",
".git/objects/24/3edc7199f1c5a105921dabb441dde8e0537674": "e472519b806fe4c39a1de328608e5ea0",
".git/objects/27/db8292afc1d5e491bcd76f4ee13e96985a1800": "4ea2c9aa66855928790d0c80256d7622",
".git/objects/2c/97eeadffe1a34bd67d3ff1c3887fd53e22c2ca": "083284edbfcb5640ad9f2ae180e0b94b",
".git/objects/2e/bcbaba86e8c0d8bf367140683a5261059c8b4c": "3a979690f772fc30cfd09111a6c95922",
".git/objects/30/b478aa1dfc66b4fea800aa57ed1f0c5de89175": "d35a762040750a8e80bd73e01b8e72f0",
".git/objects/31/e5456c9219874c6fc4445cbeff68ab01e3d4b1": "50513b9c85a816d200c178072435be29",
".git/objects/31/edfe0161ac7c9117968bc771793148e630f501": "fcc5d3924928b9eb3261fa4aeafc0a80",
".git/objects/32/faaf7c3a0f88b64b859c76a09ae09bd5a5a692": "4e4ad401ecc6607437fe93660431a4f4",
".git/objects/37/af43485700d92c4d321974ad88cbec93ece5d9": "73e02a2f5e0715a3e77caaaab119c940",
".git/objects/3a/943109974819699dc91b92665a2357aa795eab": "cb26d559d0c8de3ac4aa62c1d16d07ea",
".git/objects/3e/d0ddd7136a48520910e7e4bf665362facd60d4": "c8322669a78b5f07c75b1decdc05718d",
".git/objects/40/9bd42c3b070c53b313a71de0b269b86de7c97a": "a205abecd1cdbe2030d583cecc534a45",
".git/objects/45/5469080dad34d20ce2e6e178b954c5911eb63b": "bc6a91d57c4a743a80aef50f0498879a",
".git/objects/4c/db71276f5c06caebc2bf4dbfe84b44165621c3": "08a6c24b0ef8c814e45c686145e6b8da",
".git/objects/55/ad1737c89c06e21010aaa7b98acc2b63069cba": "b304da126eda71eb567aee54b38563a6",
".git/objects/5a/562bfb9ce1f548720a6b1832fbb760528cd49c": "2427987fe41c62c235ffcdcb5106be74",
".git/objects/5b/4cc9505e8244438505e2fef09d823f2e90229a": "5b153614fc8e253db0fe963f1741938d",
".git/objects/62/17180037771b315c376d24ecf3032644c615e2": "6b7bd8d509deeba44732f31cb7485de0",
".git/objects/78/27ad8e312f233a9fd9421e8e5054cb2cf8868b": "7a2c0127b379f0f1b3ec6c6bbbae150e",
".git/objects/7a/6c1911dddaea52e2dbffc15e45e428ec9a9915": "f1dee6885dc6f71f357a8e825bda0286",
".git/objects/80/948a1610f25a2d453bfe428d78d759da2dacdd": "8cd83b79b91a2d42bb388ca03bc55fc7",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/97/f2a061e854f2d6a6e560b7f9285c1671484762": "1156e3b6775726a8b8d97b65b0274581",
".git/objects/99/a3e497cc7765fb4acbdddd8dddf012646ac490": "e99326d84fde827e260dd55708a0d7fb",
".git/objects/9e/6aa0ddfa5d086d25eef4759a5cbf0371830947": "439de09f9cd06a4c5456e725b4756fd2",
".git/objects/a4/8cc434abb245b2ba17dca9786116b0c68d574b": "11aab86c9df85e84884047c0462283f9",
".git/objects/a8/6f703084d17020859a78f48b1175cc0d672a94": "efb2d3f99c30fff1f13ae08e6c33b7a5",
".git/objects/ac/f0bc69d848d68a684995b70aa31800b68f266f": "ee1b4a447fb5468d0e88b0d3fc5c55ea",
".git/objects/b6/b8806f5f9d33389d53c2868e6ea1aca7445229": "b14016efdbcda10804235f3a45562bbf",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/bf/7d9d692bba36619bb8e73fa2bc352741a92a28": "1b8c2ebf275e94e3834fdd6efdb9180c",
".git/objects/c2/de2acec1324290949b2241c8c14a01b1913091": "5b0c52a514133f5d5dd0063460f063a0",
".git/objects/cb/6b7a6137f8e01d986294349a6bc2fadc6d1849": "9df7d09456db8013ef6b3c4b23309f7a",
".git/objects/ce/0b3c279194cfaacf1857ea5de4eeef86644bee": "79bfa0f2077e2e7e1dc34a0c4022769c",
".git/objects/cf/63e228907c28a6f236ce433201f18c11a4af67": "321990e189448fb8fd1a70f3dabaf34b",
".git/objects/d3/a50a3db2546f068fe2f71d6ebfd63bce290178": "9e22736e074f0357ea59f7a2706235aa",
".git/objects/d3/f01ad245b628f386ac95786f53167038720eb2": "eb7788324f1d4bfed1ef935c3992b2ed",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/df/785f515c2a538ad6d9fa8df8147421c6970c97": "0795e4ec668a939c06b0cf61a7eab268",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ef/c2b5900092ede573f22a996d367d7383a49ff9": "c78d9fc2e9fdcd66a6444ad1711b77c1",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f2/822b403aa6d2a0b06d26448412a555b991ccd3": "b4aa4d5852ee7c8ba8ce8b17b631f267",
".git/objects/f3/07f2416807bb669a6a5f0a1120646319df8596": "0ec0933e603acb83a0c464c1126fc8d0",
".git/objects/f4/d7b5a9954234e5226e31e459bcb006232fe8bd": "1eed205dbd3d1c6b8889ba79a7db19da",
".git/objects/f5/5e5f2ab4cc9c5ee9e9a2d812813a45901c103d": "c673adb0bee5fb1a585f2eb0a1e82138",
".git/objects/f7/e6685cde31d5597e254c569f7c38b018041fc5": "c948ee74105a0f702b976701bbea76d1",
".git/objects/fe/c30bd8227f9911d7dd8583c9055beb16d5c5c1": "0e8deb85150c8e26f24adcbd0ebc4b3a",
".git/refs/heads/main": "a1808f4a3617ac3ec2ca5a8d59b642b6",
".git/refs/remotes/origin/main": "a1808f4a3617ac3ec2ca5a8d59b642b6",
"assets/AssetManifest.bin": "a1212b7131acd770fc73517e2d52724a",
"assets/AssetManifest.bin.json": "71d313bc121dd5b221e08b4c3ab7bcef",
"assets/AssetManifest.json": "7ad49b41ec7c147e099b31d013cb9fc0",
"assets/assets/fonts/Roboto-Bold.ttf": "ee7b96fa85d8fdb8c126409326ac2d2b",
"assets/assets/fonts/Roboto-Medium.ttf": "d08840599e05db7345652d3d417574a9",
"assets/assets/fonts/Roboto-Regular.ttf": "3e1af3ef546b9e6ecef9f3ba197bf7d2",
"assets/assets/images/Dot.png": "dc5223b6c1f2a6ae884972acec36e402",
"assets/assets/images/graph.png": "827358c377bd154473f4263ce6678ca9",
"assets/FontManifest.json": "23ccacd143a95cd8006dff65bc3b760e",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/NOTICES": "90b300b723eb315c37df06239ef56ef4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "825e75415ebd366b740bb49659d7a5c6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "05e7032ed1a877f972cbcf13b3ae2a83",
"canvaskit/canvaskit.wasm": "dfd8c2ccd4a55ef5eb15ea5526ce88c7",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "8fce22f4d72ad11f225a4999cd247660",
"canvaskit/chromium/canvaskit.wasm": "79edcb1b72306f512e90f3e5e4063b40",
"canvaskit/skwasm.js": "4087d5eaf9b62d309478803602d8e131",
"canvaskit/skwasm.js.symbols": "ffc07b382ae1e2cf61303ec4391ea4ad",
"canvaskit/skwasm.wasm": "bf03908c64926317680317decd585425",
"canvaskit/skwasm_heavy.js": "dddba7cbf636e5e28af8de827a6e5b49",
"canvaskit/skwasm_heavy.js.symbols": "ea201db27134823febd57da1f31df2ec",
"canvaskit/skwasm_heavy.wasm": "a8695a49f5aee9479f64b69a90674703",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "2a09505589bbbd07ac54b434883c2f03",
"flutter_bootstrap.js": "dbd49636760a1a4f57ac88a7d10a92cd",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "764103006002b94aaaaca3dd85a73048",
"/": "764103006002b94aaaaca3dd85a73048",
"main.dart.js": "081867db9e82c7e67469426301be84db",
"manifest.json": "7e11305acf2c1a82b5b9f2b1de14ffdc",
"version.json": "141f2ac27cd4c1903bb6f4ad9fb9b28a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
