import DisplayContainer from "./DisplayContainer.js";
import CircleElement from "../svg/CircleElement.js";
import EventTypes from "../../constants/EventTypes.js";
import Theme from "../../styles/Theme.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
export default class RippleSurface extends DisplayContainer
{
    constructor()
    {
        super();
        
    }
    initialize()
    {
        super.initialize();
        this.touchStart = this.touchStart.bind( this );
        this.mouseDown = this.mouseDown.bind( this );
        this.windowTouchEnd = this.windowTouchEnd.bind( this );
        this.windowMouseUp = this.windowMouseUp.bind( this );
        this.meMouseUp = this.meMouseUp.bind( this );
        this._rippleColor = Theme.RIPPLE_COLOR;
        this.clipContent = true;
        this.addEventListener( "touchstart", this.touchStart, { capture : true, passive : false } );
        this.addEventListener( "mousedown", this.mouseDown, { capture : true } );
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.circle );
    }
    get circle()
    {
        if( !this._circle )
        {
            this._circle = new CircleElement();
            this._circle.setSize( 88, 88 );
            this._circle.color = this.rippleColor;
            this._circle.opacity = 0;
            this._circle.scale = 0;
            this._circle.animatedProperties = [ new AnimatedProperty( "scale", 180 ), 
                                                new AnimatedProperty( "opacity", 180 ) ];
            this._circle.listen( EventTypes.PROPERTY_ANIMATION_ENDED, this.circlePropertyAnimationEnded.bind( this ) );
        }
        return this._circle;
    }
    circlePropertyAnimationEnded( data )
    {
        if( data === "opacity" && this.circle.opacity === 0 )
        {
            this.circle.scale = 0;
        }
    }
    touchStart( e )
    {
        e.preventDefault();
        window.addEventListener( "touchend", this.windowTouchEnd );
        if( !this.hasMouseEventsBeenRemoved )
        {
            this.hasMouseEventsBeenRemoved = true;
            this.removeEventListener( "mousedown", this.mouseDown, { capture : true } );
            this.removeEventListener( "mouseup", this.meMouseUp, { capture : true } );
        }
        if( e.changedTouches && e.changedTouches.length > 0 )
        {
            let touch = e.changedTouches[ 0 ];
            let px = touch.pageX;
            let py = touch.pageY;
            let rect = this.getBoundingClientRect();
            let localX = px - rect.x;
            let localY = py - rect.y;
            this.circle.x = localX - this.circle.width * .5;
            this.circle.y = localY - this.circle.height * .5;
            this.circle.scale = 1;
            this.circle.opacity = .3;
        }
    }
    mouseDown( e )
    {
        window.addEventListener( "mouseup", this.windowMouseUp );
        this.addEventListener( "mouseup", this.meMouseUp, { capture : true } );
        let px = e.pageX;
        let py = e.pageY;
        let rect = this.getBoundingClientRect();
        let localX = px - rect.x;
        let localY = py - rect.y;
        this.circle.x = localX - this.circle.width * .5;
        this.circle.y = localY - this.circle.height * .5;
        this.circle.scale = 1;
        this.circle.opacity = .3;
    }
    windowMouseUp( e )
    {
        window.removeEventListener( "mouseup", this.windowMouseUp );
        this.circle.opacity = 0;
    }
    meMouseUp( e )
    {
        this.removeEventListener( "mouseup", this.meMouseUp, { capture : true } );
        this.dispatch( EventTypes.TRIGGERED );
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
        this.circle.opacity = 0;
    }
    set rippleColor( value )
    {
        if( this._rippleColor != value )
        {
            this._rippleColor = value;
            this.circle.color = value;
        }
    }
    get rippleColor()
    {
        return this._rippleColor;
    }
}
customElements.define("ripple-surface", RippleSurface);