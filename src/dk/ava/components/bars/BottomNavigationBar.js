import LayoutContainer from "../display/LayoutContainer.js";
import Direction from "../../constants/Direction.js";
import HorizontalLayout from "../../layouts/HorizontalLayout.js";
import EventTypes from "../../constants/EventTypes.js";
import Theme from "../../styles/Theme.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
export default class BottomNavigationBar extends LayoutContainer
{
    constructor()
    {
        super();
    }
    selectedIndexChanged()
    {
        if( this.selectedIndex < this.numElements )
        {
            this.setIsSelectedOnChildElements();
        }
    }
    rippleColorChanged()
    {
        let len = this.numElements;
        let i;
        let element;
        for( i = 0; i < len; i++ )
        {
            element = this.getElementAt( i );
            element.rippleColor = this.rippleColor;
        }
    }
    setIsSelectedOnChildElements()
    {
        let index = this.selectedIndex;
        let len = this.numElements;
        let i;
        let element;
        for( i = 0; i < len; i++ )
        {
            element = this.getElementAt( i );
            element.isSelected = i === index;
        }
    }
    initialize()
    {
        super.initialize();
        this.resizeAndPosition = this.resizeAndPosition.bind( this );
        this._selectedIndex = -1;
        this.backgroundColor = Theme.PRIMARY_COLOR;
        this.shadowDirection = Direction.NORTH;
        this.isShown = false;
        this.animatedProperties = [ new AnimatedProperty( "y", 225, "ease-in" ) ];
        this.z = 4;
        this.resizeAndPosition();
        this.layout = this.horizontalLayout;
        window.addEventListener( "resize", this.resizeAndPosition );
    }
    get horizontalLayout()
    {
        if( !this._horizontalLayout )
        {
            this._horizontalLayout = new HorizontalLayout();
            this._horizontalLayout.elementMinWidth = 88;
            this._horizontalLayout.elementMaxWidth = 168;
        }
        return this._horizontalLayout;
    }
    resizeAndPosition()
    {
        this.setSize( window.innerWidth, 56 );
        this.y = this.isShown ? window.innerHeight - 56 : window.innerHeight;
    }
    dataProviderChanged()
    {
        this.removeAllChildElements();
        if( this.dataProvider && this.dataProvider.length > 0 && this.itemRenderType )
        {
            this.itemsAdded( this.dataProvider.arrayData );
        }
    }
    itemsAdded( items )
    {
        if( this.itemRenderType ) 
        {
            let len = items.length;
            let i;
            let elements = [];
            let item;
            let itemRenderer;
            for( i = 0; i < len; i++ )
            {
                item = items[ i ];
                itemRenderer = new this.itemRenderType(); 
                itemRenderer.data = item;
                itemRenderer.index = i;
                itemRenderer.listen( EventTypes.TRIGGERED, this.itemRendererTriggered.bind( this ) );
                elements.push( itemRenderer );
            }
            this.horizontalLayout.maxTotalWidth = items.length * 168;
            this.addElements( elements );
        }
        this.setIsSelectedOnChildElements();
    }
    itemRendererTriggered( data )
    {
        if( this.selectedIndex !== data )
        {
            this.selectedIndex = data;
            //this.dispatch( EventTypes.SELECTED_INDEX_CHANGED, data );
        }
    }
    set dataProvider( value )
    {
        if( this._dataProvider != value )
        {
            this._dataProvider = value;
            this.removeAllChildElements();
            if( value && value.length > 0 && this.itemRenderType )
            {
                this.itemsAdded( value.arrayData );
            }
        }
    }
    get dataProvider()
    {
        return this._dataProvider;
    }
    set itemRenderType( value )
    {
        if( this._itemRenderType != value )
        {
            this._itemRenderType = value;
            if( value && this.dataProvider && this.dataProvider.length > 0 )
            {
                this.itemsAdded( this.dataProvider.arrayData );
            }
        }
    }
    get itemRenderType()
    {
        return this._itemRenderType; 
    }
    set selectedIndex( value )
    {
        if( this._selectedIndex !== value )
        {
            this._selectedIndex = value;
            this.selectedIndexChanged();
        }
    }
    get selectedIndex()
    {
        return this._selectedIndex;
    }
    set rippleColor( value )
    {
        if( this._rippleColor != value )
        {
            this._rippleColor = value;
            this.rippleColorChanged();
        }
    }
    get rippleColor()
    {
        return this._rippleColor;
    }
    set isShown( value )
    {
        if( this._isShown !== value )
        {
            this._isShown = value;
            this.y = value ? window.innerHeight - 56 : window.innerHeight;
        }
    }
    get isShown()
    {
        return this._isShown;
    }
}
customElements.define("bottom-navigation-bar", BottomNavigationBar);