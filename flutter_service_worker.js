'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "b1cf2230d193ca9b4be413d68977e2e4",
"assets/AssetManifest.bin.json": "c58b674a175b6931cabbfb0dbff6b7b1",
"assets/AssetManifest.json": "6dd9dc8f0c23bffe7e98f0c4c47e7389",
"assets/assets/fonts/DancingScript-Regular.ttf": "949b41b511eeacbbf6884959b6eedc56",
"assets/assets/images/aabb.jpg": "21d3c174f34fd0716ebc1f2ec7f2ad06",
"assets/assets/images/anonovo.jpg": "3f444dd5dc07630c56513e4bb69eaa78",
"assets/assets/images/barbie.jpg": "abb04e5e0ba2a43b7d7b6c39069f9da5",
"assets/assets/images/beijo.jpg": "e6645b8b58e1966b6825af39d36fa447",
"assets/assets/images/carnaval.jpg": "2f91058821a0dc7113aa9997a41f72fa",
"assets/assets/images/casa.jpg": "0408d640371e52660a84d06e66c28995",
"assets/assets/images/circo.jpg": "5113a4d009fdec2fe21d09a926baf3c8",
"assets/assets/images/copa.jpg": "92ee58bc981337da77f7765a12d91325",
"assets/assets/images/crisma.jpg": "55e24f0364b0f7457750fd6f67ec4d53",
"assets/assets/images/encontro.jpg": "2723a7263bbfb9a16bc31c84e3751956",
"assets/assets/images/festasantana.jpg": "d3b8430d1584a889275facb236e9c815",
"assets/assets/images/formatura.jpg": "a63b41f667952c8483f49d8dad7fd3ca",
"assets/assets/images/gabriel.jpg": "8222ea85773dbd0f1a49b3fbbca46eab",
"assets/assets/images/gabriel1.jpg": "858088bf214ec46e64a8cf904e466cf1",
"assets/assets/images/joao_pessoa.jpg": "d3c18c3db4976b9ba6918983f05baf5b",
"assets/assets/images/lara.jpg": "56408ea873e08cf5d2c055c24ad03e66",
"assets/assets/images/lara1.jpg": "b24abb92f81ec85ea4252f3d8b0d8630",
"assets/assets/images/namoro.jpg": "caebcb900ec17951949b61b723341a72",
"assets/assets/images/novo.jpg": "18156c37ff6fdd5a49a5837a835450d5",
"assets/assets/images/pet.jpg": "08bcd9a1eeb2f2f5878b1de10e04252c",
"assets/assets/images/procissao.jpg": "5399486fc72be7fb4e81a16e9109294d",
"assets/assets/images/voto.jpg": "236bae49f1941b033b0d6acc12beef94",
"assets/FontManifest.json": "da531dd40ee3ff924af7e9e3c8dcc26a",
"assets/fonts/MaterialIcons-Regular.otf": "f2beb41df2f75fda7222714cc0f42ef3",
"assets/NOTICES": "726228b97fc4d7bf2025b7dec6d1349f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "a4343c337c00b4173605709a6de6d2f3",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "16ea966c37a55183f97f33a4c94496df",
"/": "16ea966c37a55183f97f33a4c94496df",
"main.dart.js": "b0fdacfb1fb1b5ae49d9362f3e277beb",
"manifest.json": "8f5b7158d4304e0da4cf8b8293ed5b00",
"version.json": "694fe15db67afb9b7fad5a72d29daddc"};
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
