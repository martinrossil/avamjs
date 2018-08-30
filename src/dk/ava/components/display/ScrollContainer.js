import DisplayElement from "./DisplayElement.js";
import LayoutContainer from "./LayoutContainer.js";
import ScrollPolicy from "../../constants/ScrollPolicy.js";
export default class ScrollContainer extends DisplayElement
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        if( this.horizontalScrollPolicy === ScrollPolicy.OFF && this.verticalScrollPolicy === ScrollPolicy.OFF )
        {
            this.elementsContainer.setSize( this.width, this.height );
        }
        else if( this.horizontalScrollPolicy === ScrollPolicy.OFF )
        {
            this.elementsContainer.width = this.width;
        }
        else if( this.verticalScrollPolicy === ScrollPolicy.OFF )
        {
            this.elementsContainer.height = this.height;
        }
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        if( this.horizontalScrollPolicy === ScrollPolicy.OFF )
        {
            this.elementsContainer.width = this.width;
        }
    }
    heightChanged( h )
    {
        super.heightChanged( h );
        if( this.verticalScrollPolicy === ScrollPolicy.OFF )
        {
            this.elementsContainer.height = this.height;
        }
    }
    addElement( displayElement )
    {
        this.elementsContainer.addElement( displayElement );
    }
    addElements( elements )
    {
        this.elementsContainer.addElements( elements );
    }
    removeAllChildElements()
    {
        this.elementsContainer.removeAllChildElements();
    }
    get childElements()
    {
        return this.elementsContainer.childElements;
    }
    set layout(value) 
    {
        this.elementsContainer.layout = value;
    }
    initialize()
    {
        super.initialize();
        this.horizontalScrollPolicy = ScrollPolicy.ON;
        this.verticalScrollPolicy = ScrollPolicy.ON;
        this.div.appendChild( this.elementsContainer );
    }
    get elementsContainer()
    {
        if( !this._elementsContainer )
        {
            this._elementsContainer = new LayoutContainer();
        }
        return this._elementsContainer;
    }
    set horizontalScrollPolicy( value )
    {
        if( this._horizontalScrollPolicy !== value )
        {
            this._horizontalScrollPolicy = value;
            if( value === ScrollPolicy.ON )
            {
                this.div.style.overflowX = "auto";
                this.elementsContainer.autoSizeHorizontal = true;
            }
            else
            {
                this.div.style.overflowX = "hidden";
                this.elementsContainer.autoSizeHorizontal = false;
                this.elementsContainer.width = this.width;
            }
        }
    }
    get horizontalScrollPolicy()
    {
        return this._horizontalScrollPolicy;
    }
    set verticalScrollPolicy( value )
    {
        if( this._verticalScrollPolicy !== value )
        {
            this._verticalScrollPolicy = value;
            if( value === ScrollPolicy.ON )
            {
                this.div.style.overflowY = "auto";
                this.elementsContainer.autoSizeVertical = true;
            }
            else
            {
                this.div.style.overflowY = "hidden";
                this.elementsContainer.autoSizeVertical = false;
                this.elementsContainer.height = this.height;
            }
        }
    }
    get verticalScrollPolicy()
    {
        return this._verticalScrollPolicy;
    }
}
customElements.define("scroll-container", ScrollContainer );