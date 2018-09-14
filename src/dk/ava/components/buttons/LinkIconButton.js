import DisplayContainer from "../display/DisplayContainer.js";
import Theme from "../../styles/Theme.js";
import EventTypes from "../../constants/EventTypes.js";
import DisplayElement from "../display/DisplayElement.js";
import IconElement from "../icons/IconElement.js";
export default class LinkIconButton extends DisplayContainer
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.clipContent = false;
        this.touchStart = this.touchStart.bind( this );
        this.mouseDown = this.mouseDown.bind( this );
        this.windowTouchEnd = this.windowTouchEnd.bind( this );
        this.windowMouseUp = this.windowMouseUp.bind( this );
        this.animationEnded = this.animationEnded.bind( this );
        this.setSize( 48, 48 );
        this.rippleColor = Theme.RIPPLE_COLOR;
        this.color = Theme.ICON_COLOR;
        this.createChildren();
        this.addEventListener( "touchstart", this.touchStart, { capture : true, passive : true } );
        this.addEventListener( "mousedown", this.mouseDown, { capture : true } );
    }
    touchStart( e )
    {
        window.addEventListener( "touchend", this.windowTouchEnd );
        if( !this.hasMouseEventsBeenRemoved )
        {
            this.hasMouseEventsBeenRemoved = true;
            this.removeEventListener( "mousedown", this.mouseDown, { capture : true } );
            this.removeEventListener( "mouseup", this.meMouseUp, { capture : true } );
        }
        this.svg.style.opacity = .3 + "";
        this.circle.style.transform = "scale( 1, 1 )";
    }
    mouseDown( e )
    {
        window.addEventListener( "mouseup", this.windowMouseUp );
        this.svg.style.opacity = .3 + "";
        this.circle.style.transform = "scale( 1, 1 )";
    }
    windowTouchEnd( e )
    {
        window.removeEventListener( "touchend", this.windowTouchEnd );
        this.svg.style.opacity = "0";
    }
    windowMouseUp()
    {
        window.removeEventListener( "mouseup", this.windowMouseUp );
        this.svg.style.opacity = "0";
    }
    animationEnded( e )
    {
        e.preventDefault();
        if( this.svg.style.opacity === "0" )
        {
            this.circle.style.transform = "scale( 0, 0 )";
        }
    }
    hrefChanged()
    {
        this.aTag.href = this.href;
    }
    createChildren()
    {
        this.addElement( this.aTag );
        //this.addElement( this.icon );
        this.addElement( this.svg );
    }
    get aTag()
    {
        if( !this._aTag )
        {
            this._aTag = document.createElement( "a" );
            this._aTag.appendChild( this.background );
            this._aTag.appendChild( this.icon );
            //this._aTag.appendChild( this.svg );
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
    get svg()
    {
        if( !this._svg )
        {
            this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._svg.setAttribute( "width", "96" );
            this._svg.setAttribute( "height", "96" );
            this._svg.setAttribute( "fill", "#00CC00" );
            this._svg.style.position = "absolute";
            this._svg.appendChild( this.circle );
            this._svg.style.opacity = 0;
            this._svg.style.left = "-24px";
            this._svg.style.top = "-24px";
            this._svg.style.transitionProperty = "opacity";
            this._svg.style.transitionDuration = "375ms";
            this._svg.style.transitionTimingFunctions = "ease-in";
            this._svg.style.pointerEvents = "none";
            this._svg.addEventListener( "transitionend", this.animationEnded );
        }
        return this._svg;
    }
    get circle()
    {
        if( !this._circle )
        {
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            this._circle.setAttribute( "cx", "48" );
            this._circle.setAttribute( "cy", "48" );
            this._circle.setAttribute( "r", "48" );
            this._circle.setAttribute( "fill", this.rippleColor );
            this._circle.style.transform = "scale( 0, 0 )";
            this._circle.style.transformOrigin = "center";
            this._circle.style.transitionProperty = "transform";
            this._circle.style.transitionDuration = "375ms";
            this._circle.style.transitionTimingFunctions = "ease-in";
        }
        return this._circle;
    }
    get icon()
    {
        if( !this._icon )
        {
            this._icon = new IconElement();
            this._icon.color = this.color;
            this._icon.x = 12;
            this._icon.y = 12;
        }
        return this._icon;
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
    set color( value )
    {
        if( this._color != value )
        {
            this._color = value;
            this.icon.color = value;
        }
    }
    get color()
    {
        return this._color;
    }
    set rippleColor( value )
    {
        if( this._rippleColor != value )
        {
            this._rippleColor = value;
            
        }
    }
    get rippleColor()
    {
        return this._rippleColor;
    }
    set href( value )
    {
        if( this._href !== value )
        {
            this._href = value;
            this.hrefChanged();
        }
    }
    get href()
    {
        return this._href;
    }
}
customElements.define("link-icon-button", LinkIconButton);