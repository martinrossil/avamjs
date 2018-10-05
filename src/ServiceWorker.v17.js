var VERSION             = "v17";
var WEBSITE             = "website-" + VERSION;
var WEBSITE_FILES       = [ "/", "/index.html", "/bundle.v17.js" ];
var IMMUTABLE_IMAGES    = "immutable-images";
var MUTABLE_JSON        = "mutable-json";
self.addEventListener( 'install', ( e ) =>
{ 
    console.log( "installComplete", VERSION );
    self.skipWaiting();
    e.waitUntil
    (
        caches.open( WEBSITE ).then( (cache)=>
        {
          return cache.addAll( WEBSITE_FILES );
        })
    );
    // create cache and store website assets
} );
self.addEventListener( 'activate', ( e ) =>
{
    console.log( "activateComplete", VERSION );
    self.clients.claim();
    // cleanup old cache
} );
self.addEventListener( 'fetch', ( e ) =>
{
    const requestURL = new URL( e.request.url );
    const pathname = requestURL.pathname;
    if( pathname === "/" || pathname === "/bundle." + VERSION + ".js" )
    {
        e.respondWith
        (
            caches.open( WEBSITE ).then( ( cache ) =>
            {
                return cache.match( e.request).then( ( response ) =>
                {
                    return response;
                });
            })
        );
    }
    else if( pathname.endsWith( ".json" ) )
    {
        e.respondWith
        (
            caches.open( MUTABLE_JSON ).then( ( cache ) =>
            {
                return cache.match( e.request).then( ( response ) =>
                {
                    return response || fetch( e.request ).then( ( response ) =>
                    {
                        cache.put( e.request, response.clone() );
                        return response;
                    });
                });
            })
        );
    }
    else if( pathname.endsWith( ".webp" ) || pathname.endsWith( ".jpg" ) )
    {
        e.respondWith
        (
            caches.open( IMMUTABLE_IMAGES ).then( ( cache ) =>
            {
                return cache.match( e.request).then( ( response ) =>
                {
                    return response || fetch( e.request ).then( ( response ) =>
                    {
                        cache.put( e.request, response.clone() );
                        return response;
                    });
                });
            })
        );
    }
    else
    {
        e.respondWith( fetch( e.request ).then( ( response ) => { return response; }) );
    }
});