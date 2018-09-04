import DisplayContainer from "../display/DisplayContainer.js";
export default class BaseItemRenderer extends DisplayContainer
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        //this.isVisible = false;
        this._isSelected = false;
        this._isInViewPort = false;
    }
    isSelectedChanged()
    {
        // override
    }
    isInViewPortChanged()
    {
        // override
    }
    dataChanged()
    {
        // override
    }
    set isInViewPort( value )
    {
        if( this._isInViewPort !== value )
        {
            this._isInViewPort = value;
            this.isInViewPortChanged();
        }
    }
    get isInViewPort()
    {
        return this._isInViewPort;
    }
    set data( value )
    {
        if( this._data != value )
        {
            this._data = value;
            this.dataChanged();
        }
    }
    get data()
    {
        return this._data;
    }
    set isSelected( value )
    {
        if( this._isSelected !== value )
        {
            this._isSelected = value;
            this.isSelectedChanged();
        }
    }
    get isSelected()
    {
        return this._isSelected;
    }
}