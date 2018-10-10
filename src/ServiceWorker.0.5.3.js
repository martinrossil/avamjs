var VERSION             = "0.5.3";
var WEBSITE             = "website-" + VERSION;
var WEBSITE_FILES       = [ "/bundle." + VERSION + ".js", "/offline.svg" ]; // 
var IMMUTABLE_IMAGES    = "immutable-images";
var MUTABLE_JSON        = "mutable-json";
self.addEventListener( 'install', ( e ) =>
{ 
    console.log( "installComplete", VERSION );
    self.skipWaiting();
    var offlinePage = new Request( 'offline.' + VERSION + '.html' );
    e.waitUntil
    (
        fetch( offlinePage ).then( ( response ) => 
        {
            return caches.open( WEBSITE ).then( ( cache ) =>
            {
                cache.put( offlinePage, response );
                return cache.addAll( WEBSITE_FILES );
            })
        } )
    );
    // create cache and store website assets
} );
self.addEventListener( 'activate', ( e ) =>
{
    console.log( "activateComplete", VERSION );
    self.clients.claim();
    e.waitUntil
    (
        caches.keys().then( ( cacheNames ) =>
        {
            return Promise.all(
            cacheNames.map
            ( 
                ( cacheName ) =>
                {
                    if( cacheName !== WEBSITE && cacheName !== IMMUTABLE_IMAGES ) 
                    {
                        return caches.delete( cacheName );
                    }
                })
            );
        })
    );
    // cleanup old cache
} );
self.addEventListener( 'fetch', ( e ) =>
{
    const requestURL = new URL( e.request.url );
    const pathname = requestURL.pathname;
    if( pathname === "/" )
    {
        e.respondWith
        (
            fetch( e.request).then( ( networkResponse ) =>
            {
                return networkResponse;
            } )
            .catch( ( error ) => 
            {
                return caches.open( WEBSITE ).then(function(cache) 
                {
                  return cache.match( 'offline.' + VERSION + '.html' );
                });
            })
        );
    }
    else if( pathname === "/bundle." + VERSION + ".js" )
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
                    })
                    .catch( ( error ) =>
                    {
                        return new Response( JSON.stringify( { offline : true } ), 
                        {
                            headers: { 'Content-Type': 'application/json' }
                        } );
                    } );
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
                    })
                    .catch( () =>
                    {
                        return new Response( JSON.stringify( { offline : true } ), 
                        {
                            headers: { 'Content-Type': 'application/json' }
                        } );
                    } )
                });
            })
        );
    }
    else
    {
        return new Response( JSON.stringify( { unknown : true } ), 
        {
            headers: { 'Content-Type': 'application/json' }
        } );
    }
});