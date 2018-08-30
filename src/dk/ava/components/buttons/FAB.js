import DisplayContainer from "../display/DisplayContainer.js";
import CircleElement from "../svg/CircleElement.js";
import IconElement from "../icons/IconElement.js";
import Theme from "../../styles/Theme.js";
import IconNames from "../../constants/IconNames.js";
import RippleSurface from "../display/RippleSurface.js";
import EventTypes from "../../constants/EventTypes.js";
export default class FAB extends DisplayContainer
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        this.circle.setSize( w, h );
        this.icon.setPosition( w * .5 - 12, h * .5 - 12 );
        this.rippleSurface.setSize( w, h );
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.circle.width = w;
        this.icon.x = w * .5 - 12;
        this.rippleSurface.width = w;
    }
    heightChanged( h )
    {
        super.heightChanged( h );
        this.circle.height = h;
        this.icon.y = h * .5 - 12;
        this.rippleSurface.height = h;
    }
    initialize()
    {
        super.initialize();
        this.setSize( 56, 56 );
        this.addElement( this.circle );
        this.addElement( this.icon );
        this.addElement( this.rippleSurface );
        this.backgroundColor = Theme.PRIMARY_COLOR;
        this.rippleColor = Theme.RIPPLE_COLOR;
        this.iconName = IconNames.PEOPLE;
        this.iconColor = Theme.ICON_COLOR;
        this.z = 2;
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
        this.dispatch( EventTypes.TRIGGERED, this.uid );
    }
    get circle()
    {
        if( !this._circle )
        {
            this._circle = new CircleElement();
        }
        return this._circle;
    }
    get icon()
    {
        if( !this._icon )
        {
            this._icon = new IconElement();
            this._icon.color = this.iconColor;
            this._icon.iconName = this.iconName;
        }
        return this._icon;
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
    set backgroundColor( value )
    {
        if( this._backgroundColor != value )
        {
            this._backgroundColor = value;
            this.circle.color = value;
        }
    }
    get backgroundColor()
    {
        return this._backgroundColor;
    }
    set z( value )
    {
        if( this._z !== value )
        {
            this._z = value;
            this.circle.z = value;
        }
    }
    get z()
    {
        return this._z;
    }
    set iconName( value )
    {
        if( this._iconName != value )
        {
            this.icon.iconName = value;
        }
    }
    get iconName()
    {
        return this._iconName;
    }
    set iconColor( value )
    {
        if( this._iconColor != value )
        {
            this._iconColor = value;
            this.icon.color = value;
            
        }
    }
    get iconColor()
    {
        return this._iconColor;
    }
}
customElements.define( "f-a-b", FAB );