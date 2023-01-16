'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d2ec17ea7829f152dfb2b47a5abb29de",
"assets/FontManifest.json": "a2ac0f34ef32f5834ffe9d4207e24638",
"assets/fonts/Exo2-Black.ttf": "e495f6598be7d1108a1dfec8e1625035",
"assets/fonts/Exo2-BlackItalic.ttf": "750d8a99a1d1eabfa77d78b8233aed2f",
"assets/fonts/Exo2-Regular.ttf": "d1a552c4d4489fe0ed010009ef192da7",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/images/cardboard.png": "37104f7ccbccf616aafc2578c8c0a01b",
"assets/images/cardboard_closed.png": "9bbcdccd0e62682e6f64d3b3cdc627cd",
"assets/images/cardboard_top.png": "c0c65b4a4d860468098fa8159d69ecc7",
"assets/images/card_bobol.png": "0ef64ba3975cf558fa7f3be765f539d3",
"assets/images/card_hidden.png": "6c9a9e6d438643e0854f18eec422d9bc",
"assets/images/card_nambahbilling.png": "2e3a567545b087c2ea16ff3679053422",
"assets/images/card_nego.png": "f5ec1ba9a6256b59de1f7cb46ec88c7f",
"assets/images/card_orangdalam.png": "faf168457c4338ce9bfe904afa4be8c1",
"assets/images/card_sedekahviral.png": "43795f050ef9e6a69d12119e2da57721",
"assets/images/card_turu.png": "5f78f60ebd3e540f0b465fcf20b02679",
"assets/images/card_watados.png": "8648515e51fac33f2a1980a786631477",
"assets/images/logo.png": "6ee4b2fc7985e426ada992a9935dd1a9",
"assets/images/logo_white.png": "868d6437af940bca7fa4fe59c9a03cb0",
"assets/images/mode_easy.png": "3a7313b0cc28605df4e451c8bee99361",
"assets/images/mode_hard.png": "aa70db041d274158f06454b410ceb7e8",
"assets/images/mode_normal.png": "05d27bfc1c84dd60612d49053da1e3e9",
"assets/images/shines.png": "91310ba0a61eecbe82c45530de57b183",
"assets/images/timer.png": "f6158f1c416c24de03bc40a8c57ac896",
"assets/NOTICES": "ff7313b293bcf87409802f609a4bacce",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "a9e2c523afa5dd8595cf9a18875b2a34",
"assets/sounds/menu.mp3": "40084cd71bf45341f15b859daf2a4556",
"assets/sounds/mode_easy.mp3": "5c441597ea9671ea272eb42e27395472",
"assets/sounds/mode_hard.mp3": "7f1a3e539608b43dbf3c7eda8a17300a",
"assets/sounds/mode_normal.mp3": "5deb997d533a31712124a47cedde84cf",
"assets/sounds/sfx_ui_click.mp3": "47de6e74b4efb024bd4d94016f7cc0c1",
"assets/sounds/sfx_ui_hover.mp3": "7ba610e61d9f84627eeae0ba3e9e35b6",
"assets/sounds/unbox_play.mp3": "36defc578d643eb31cca9cea939c3ccb",
"assets/sounds/unbox_play.ogg": "ed7112ff557bd18cdad0085615a90554",
"assets/sounds/unbox_start.mp3": "676af5f974896c410eaf1c7de7446fcc",
"assets/sounds/unbox_start.ogg": "4c810aa3e891713a8fbe5baae88fd578",
"assets/videos/menu.mp4": "73ce0c5a47f8551b531450a948875707",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "823cb79cde5c1d365922c50cdde08c4e",
"/": "823cb79cde5c1d365922c50cdde08c4e",
"main.dart.js": "e5acf39d93b782a0e46bf451cf9e213c",
"manifest.json": "e6a77700007f6e029184bfabb4548700",
"version.json": "a1476ca1091d824bb49b99cde2350f1b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
