var VERSION             = "v5";
var IMMUTABLE_IMAGES    = "immutable-images";
var BACKGROUNDS         = "/baggrunde/";
var PROFILES            = "/profile/";
var POSTERS             = "/plakater/";

self.addEventListener( 'install', function( e ) 
{ 
    console.log( "installComplete", VERSION );
    self.skipWaiting(); 
} );

self.addEventListener( 'activate', function( e ) 
{
    console.log( "activateComplete", VERSION );
} );

self.addEventListener( 'fetch', function( e )
{
    const requestURL = new URL( e.request.url );
    if( requestURL.pathname.startsWith( BACKGROUNDS ) || 
        requestURL.pathname.startsWith( PROFILES ) || 
        requestURL.pathname.startsWith( POSTERS ) )
    {
        e.respondWith
        (
            caches.open( IMMUTABLE_IMAGES ).then( function( cache ) 
            {
                return cache.match( e.request).then( function( response ) 
                {
                    return response || fetch( e.request ).then( function( response ) 
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
        e.respondWith
        ( 
            fetch( e.request ).then( function( response ) 
            {
                return response;
            } ).
            catch( function( error )
            {
                //console.log( error );
                return error;
            } ) 
        );
    }
} );