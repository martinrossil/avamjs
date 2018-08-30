import DisplayContainer from "./DisplayContainer.js";
export default class LayoutContainer extends DisplayContainer
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.autoSizeHorizontal = false;
        this.autoSizeVertical = false;
    }
    addElement( displayElement )
    {
        super.addElement( displayElement );
        if( this.layout )
        {
            this.layout.elementAdded( displayElement );
        }
    }
    addElements( elements )
    {
        super.addElements( elements );
        if( this.layout )
        {
            this.layout.elementsAdded( elements );
        }
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        if( this.layout )
        {
            this.layout.updateLayoutHorizontal( w, this.height );
        }
    }
    heightChanged( h )
    {
        super.heightChanged( h );
        if( this.layout )
        {
            this.layout.updateLayoutVertical( this.width, h );
        }
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        if( this.layout )
        {
            this.layout.updateLayout( w, h );
        }
    }
    set layout( value ) 
    {
        if (this._layout != value) 
        {
            this._layout = value;
            if( this._layout )
            {
                this._layout.host = this;
                this._layout.updateLayout( this.width, this.height ); 
            }
        }
    }
    get layout() 
    {
        return this._layout;
    }
    set autoSizeHorizontal( value )
    {
        if( this._autoSizeHorizontal !== value )
        {
            this._autoSizeHorizontal = value;
        }
    }
    get autoSizeHorizontal()
    {
        return this._autoSizeHorizontal;
    }
    set autoSizeVertical( value )
    {
        if( this._autoSizeVertical !== value )
        {
            this._autoSizeVertical = value;
        }
    }
    get autoSizeVertical()
    {
        return this._autoSizeVertical;
    }
}
customElements.define("layout-container", LayoutContainer);