import BaseItemRenderer from "./BaseItemRenderer.js";
import IconElement from "../icons/IconElement.js";
import TextElement from "../text/TextElement.js";
import TextAlign from "../../constants/TextAlign.js";
import Theme from "../../styles/Theme.js";
import EventTypes from "../../constants/EventTypes.js";
import RippleSurface from "../display/RippleSurface.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
import DisplayElement from "../display/DisplayElement.js";
export default class BottomNavigationBarItemRenderer extends BaseItemRenderer
{
    constructor()
    {
        super();
    }
    sizeChanged()
    {
        super.sizeChanged();
        this.layoutChildren();
    }
    widthChanged()
    {
        super.widthChanged();
        this.layoutChildren();
    }
    layoutChildren()
    {
        this.labelText.width = this.width;
        this.labelText.y = 32;
        this.icon.x = this.width * .5 - 12;
        this.rippleSurface.setSize( this.width, this.height );
        this.background.setSize( this.width, this.height );   
    }
    isSelectedChanged()
    {
        let is = this.isSelected;
        this.labelText.opacity = is ? 1 : 0;
        this.icon.opacity = is ? 1 : .76;
        this.icon.y = is ? 8 : 16;
    }
    dataChanged()
    {
        if( this.data )
        {
            this.aTag.href = this.data.href;
            this.icon.iconName = this.data.icon; 
            this.labelText.text = this.data.label;
        }
    }
    initialize() 
    {
        super.initialize();
        this._rippleColor = Theme.RIPPLE_COLOR;
        this._isSelected = false;
        this.height = 56;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.aTag );
    }
    get aTag()
    {
        if( !this._aTag )
        {
            this._aTag = document.createElement( "a" );
            this._aTag.appendChild( this.background );
            this._aTag.appendChild( this.icon );
            this._aTag.appendChild( this.labelText );
            this._aTag.appendChild( this.rippleSurface );
        }
        return this._aTag;
    }
    get background()
    {
        if( !this._background )
        {
            this._background = new DisplayElement();
            this._background.setSize( 48, 48 );
        }
        return this._background;
    }
    get rippleSurface()
    {
        if( !this._rippleSurface )
        {
            this._rippleSurface = new RippleSurface();
            this._rippleSurface.rippleColor = this.rippleColor;
            this._rippleSurface.listen( EventTypes.TRIGGERED, this.rippleSurfaceTriggered.bind( this ) );
        }
        return this._rippleSurface;
    }
    rippleSurfaceTriggered()
    {
        this.dispatch( EventTypes.TRIGGERED, this.index );
    }
    get icon()
    {
        if( !this._icon )
        {
            this._icon = new IconElement();
            this._icon.opacity = .76;
            this._icon.y = 16;
            this._icon.animatedProperties = [   new AnimatedProperty( "opacity", 225 ), 
                                                new AnimatedProperty( "y", 225 ) ];
        }
        return this._icon;
    }
    get labelText()
    {
        if( !this._labelText )
        {
            this._labelText = new TextElement();
            this._labelText.opacity = 0;
            this._labelText.fontSize = 12;
            this._labelText.textColor = Theme.ICON_COLOR;
            this._labelText.textAlign = TextAlign.CENTER;
            this._labelText.animatedProperties = [ new AnimatedProperty( "opacity", 225 ) ];
        }
        return this._labelText;
    }
    set isSelected( value )
    {
        if( this._isSelected != value )
        {
           this._isSelected = value;
           this.isSelectedChanged();
        }
    }
    get isSelected()
    {
        return this._isSelected;
    }
    set index( value )
    {
        if( this._index !== value )
        {
           this._index = value;
        }
    }
    get index()
    {
        return this._index;
    }
    set rippleColor( value )
    {
        if( this._rippleColor != value )
        {
            this._rippleColor = value;
            this.rippleSurface.rippleColor = value;
        }
    }
    get rippleColor()
    {
        return this._rippleColor;
    }
}
customElements.define("bottom-navigation-bar-item-renderer", BottomNavigationBarItemRenderer);