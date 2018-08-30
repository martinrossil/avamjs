import EventDispatcher from "../events/EventDispatcher.js";
import CollectionEventTypes from "../constants/CollectionEventTypes.js";
export default class ArrayCollection extends EventDispatcher
{
    constructor( data = [] )
    {
        super();
        this.arrayData = data;
    }
    addItem( item )
    {
        let index = this.arrayData.length;
        this.arrayData.push( item );
        this.dispatch( CollectionEventTypes.ITEM_ADDED, index );
    }
    addItems( items )
    {
        this._arrayData = this.arrayData.concat( items );
        this.dispatch( CollectionEventTypes.ITEMS_ADDED, items );
    }
    getItemAt( index )
    {
        if( index < this.arrayData.length )
        {
            return this.arrayData[ index ];
        }
        return null;
    }
    removeItem( item )
    {
        let index = this.arrayData.indexOf( item );
        if( index > -1 )
        {
            this.arrayData.splice( index, 1 );
        }
    }
    removeItemAt( index )
    {
        if( index < this.arrayData.length )
        {
            let item = this.arrayData.splice( index, 1 )[ 0 ];
            this.dispatch( CollectionEventTypes.ITEM_REMOVED, item );
            return item;
        }
        return null;
    }
    get length()
    {
        return this.arrayData.length;
    }
    set arrayData( value )
    {
        if( this._arrayData !== value )
        {
            this._arrayData = value;
            this.dispatch( CollectionEventTypes.RESET, value );
        }
    }
    get arrayData()
    {
        return this._arrayData;
    }
}