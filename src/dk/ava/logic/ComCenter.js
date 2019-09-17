import EventDispatcher from "../events/EventDispatcher.js";
export default class ComCenter
{
    static get instances()
    {
        if( !this._instances )
        {
            this._instances = {};
        }
        return this._instances;
    }
    static get uids()
    {
        if( !this._uids )
        {
            this._uids = {};
        }
        return this._uids;
    }
    static register( uid, instance )
    {
        if( !this.uids[ uid ] )
        {
            this.uids[ uid ] = new EventDispatcher(); 
        }
        this.instances[ uid ] = instance;
    }
    static listen( uid, type, listener )
    {
        if( !this.uids[ uid ] )
        {
            this.uids[ uid ] = new EventDispatcher();
        }
        let dispatcher = this.uids[ uid ];
        dispatcher.listen( type, listener );
    }
    static dispatch( uid, type, data = null )
    {
        let dispatcher = this.uids[ uid ];
        if( dispatcher )
        {
            dispatcher.dispatch( type, data )
        }
    }
    static setProperty( uid, property, value )
    {
        if( this.instances[ uid ] )
        {
            let instance = this.instances[ uid ];
            instance[ property ] = value;
        }
    }
}