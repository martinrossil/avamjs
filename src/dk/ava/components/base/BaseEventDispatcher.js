import ComCenter from "../../logic/ComCenter.js";
export default class BaseEventDispatcher extends HTMLElement
{
    constructor()
    {
        super();
    }
    get listeners()
    {
        if( !this._listeners )
        {
            this._listeners = {};
        }
        return this._listeners;
    }
    unListen( type, listener )
    {
        if( this.listeners[ type ] )
        {
            let typeListeners = this.listeners[ type ];
            let method;
            for( method of typeListeners )
            {
                if( method === listener )
                {
                    let index = typeListeners.indexOf( listener );
                    typeListeners.splice( index, 1 );
                    break;
                }
            }
        }
    }
    listen( type, listener )
    {
        if( !this.listeners[ type ] )
        {
            this.listeners[ type ] = [];
        }
        this.listeners[ type ].push( listener );
    }
    dispatch( type, data = null )
    {
        if( this.listeners[ type ] )
        {
            let typeListeners = this.listeners[ type ];
            let listener;
            for( listener of typeListeners )
            {
                listener( data );
            }
        }
        if( this.uid )
        {
            ComCenter.dispatch( this.uid, type, data );
        }
    }
    set uid( value )
    {
        if( this._uid !== value )
        {
            this._uid = value;
            ComCenter.register( value, this );
        }
    }
    get uid()
    {
        return this._uid;
    }
}
customElements.define( "base-event-dispatcher", BaseEventDispatcher );