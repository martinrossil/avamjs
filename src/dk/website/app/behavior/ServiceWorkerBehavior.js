import BaseBehavior from "./base/BaseBehavior.js";
export default class ServiceWorkerBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    applicationLoadComplete()
    {
        if( "serviceWorker" in navigator )
        {
            console.log( "Service worker support" );
            this.registerServiceWorker();
        }
        else
        {
            console.log( "Service worker NOT supported" );
        }
    }
    registerServiceWorker()
    {
        navigator.serviceWorker.register( "/ServiceWorker.js" )
        .then( function( reg )
        {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch( function( error )
        {
            console.log('Registration failed with ' + error);
        });
    }
}