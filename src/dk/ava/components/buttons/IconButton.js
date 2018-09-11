import DisplayContainer from "../display/DisplayContainer.js";
import IconElement from "../icons/IconElement.js";
import Theme from "../../styles/Theme.js";
import EventTypes from "../../constants/EventTypes.js";
import DisplayElement from "../display/DisplayElement.js";
export default class IconButton extends DisplayContainer
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
        this.meMouseUp = this.meMouseUp.bind( this );
        this.setSize( 48, 48 );
        this.rippleColor = Theme.RIPPLE_COLOR;
        this.color = Theme.ICON_COLOR;
        this.createChildren();
        this.addEventListener( "touchstart", this.touchStart, { capture : true, passive : true } );
        this.addEventListener( "mousedown", this.mouseDown, { capture : true } );
        this.addEventListener( "mouseup", this.meMouseUp, { capture : true } );
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
        if( e.changedTouches && e.changedTouches.length > 0 )
        {
            let touch = e.changedTouches[ 0 ];
            let px = touch.pageX;
            let py = touch.pageY;
            let rect = this.getBoundingClientRect();
            if( px > rect.x && px < rect.x + rect.width )
            {
                if( py > rect.y && py < rect.y + rect.height )
                {
                    this.dispatch( EventTypes.TRIGGERED );
                }
            }
        }
        this.svg.style.opacity = "0";
    }
    windowMouseUp( e )
    {
        window.removeEventListener( "mouseup", this.windowMouseUp );
        this.svg.style.opacity = "0";
    }
    meMouseUp( e )
    {
        this.dispatch( EventTypes.TRIGGERED );
    }
    animationEnded( e )
    {
        e.preventDefault();
        if( this.svg.style.opacity === "0" )
        {
            this.circle.style.transform = "scale( 0, 0 )";
        }
    }
    createChildren()
    {
        this.addElement( this.background );
        this.addElement( this.icon );
        this.addElement( this.svg );
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
}
customElements.define("icon-button", IconButton);