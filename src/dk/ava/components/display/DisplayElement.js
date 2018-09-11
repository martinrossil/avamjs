import BaseElement from "../base/BaseElement.js";
import Direction from "../../constants/Direction.js";
import Shadows from "./sub/Shadows.js";
import EventTypes from "../../constants/EventTypes.js";
export default class DisplayElement extends BaseElement
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.style.position = "absolute";
        this.animationEnded = this.animationEnded.bind( this );
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._z = 0;
        this._shadowDirection = Direction.SOUTH;
        this._opacity = 1;
        this._isVisible = true;
        this._backgroundColor = "";
        this._notifyPropertyAnimationEnd = false;
        this._isInteractive = true;
        this._cornerRadius = 0;
    }
    sizeChanged( w, h )
    {
        // override
    }
    widthChanged( w )
    {
        // override
    }
    heightChanged( h )
    {
        // override
    }
    animationEnded( e )
    {
        e.preventDefault();
        e.stopImmediatePropagation();
        if( this.notifyPropertyAnimationEnd )
        {
            let property = e.propertyName;
            if( property === "transform" )
            {
                property = "scale";
            }
            else if( property === "left" )
            {
                property = "x";
            }
            else if( property === "top" )
            {
                property = "y";
            }
            this.dispatch( EventTypes.PROPERTY_ANIMATION_ENDED, property );
        }
    }
    set animatedProperties( value )
    {
        if( this._animatedProperties !== value )
        {
            this._animatedProperties = value;
            if( value )
            {
                let len = value.length;
                let i;
                let animatedProperty;
                let transitionProperties = [];
                let transitionDurations = [];
                let transitionTimingFunctions = [];
                for( i = 0; i < len; i++ )
                {
                    animatedProperty = value[ i ];
                    if( animatedProperty.property === "scale" )
                    {
                        transitionProperties.push( "transform" );
                    }
                    else if( animatedProperty.property === "x" )
                    {
                        transitionProperties.push( "left" );
                    }
                    else if( animatedProperty.property === "y" )
                    {
                        transitionProperties.push( "top" );
                    }
                    else
                    {
                        transitionProperties.push( animatedProperty.property );
                    }
                    transitionDurations.push( animatedProperty.duration + "ms" );
                    transitionTimingFunctions.push( animatedProperty.easing );
                }
                this.style.transitionProperty = transitionProperties.join();
                this.style.transitionDuration = transitionDurations.join();
                this.style.transitionTimingFunctions = transitionTimingFunctions.join();
                this.addEventListener( "transitionend", this.animationEnded, false );
            }
            else
            {
                this.style.transitionProperty = "";
                this.style.transitionDuration = "";
                this.style.transitionTimingFunctions = "";
            }
        }
    }
    get animatedProperties()
    {
        return this._animatedProperties;
    }
    setPosition( x, y )
    {
        if( this._x !== x && this._y !== y )
        {
            this._x = x;
            this._y = y;
            this.style.left = x + "px";
            this.style.top = y + "px";
        }
        else
        {
            this.x = x;
            this.y = y;
        }
    }
    setSize( w, h )
    {
        if( this._width !== w && this._height !== h )
        {
            this._width = w;
            this.style.width = w + "px";
            this._height = h;
            this.style.height = h + "px";
            this.sizeChanged( w, h );
        }
        else
        {
            this.width = w;
            this.height = h;
        }
    }
    set x( value )
    {
        if( this._x !== value )
        {
            this._x = value;
            this.style.left = value + "px";
        }
    }
    get x()
    {
        return this._x;
    }
    set y( value )
    {
        if( this._y !== value )
        {
            this._y = value;
            this.style.top = value + "px";
        }
    }
    get y()
    {
        return this._y;
    }
    set width( value ) 
    {
        if( this._width !== value )
        {
            this._width = value;
            this.style.width = value + "px";
            this.widthChanged( value );
        }
    }
    get width()
    {
        return this._width;
    }
    set height( value )
    {
        if( this._height != value ) 
        {
            this._height = value;
            this.style.height = value + "px";
            this.heightChanged( value );
        }
    }
    get height()
    {
        return this._height;
    }
    set backgroundColor(value) 
    {
        if( this.backgroundColor != value ) 
        {
            this._backgroundColor = value;
            this.style.backgroundColor = value;
        }
    }
    get backgroundColor() 
    {
        return this._backgroundColor;
    }
    set layoutData( value )
    {
        if( this._layoutData != value )
        {
            this._layoutData = value;
        }
    }
    get layoutData()
    {
        return this._layoutData;
    }
    set z( value ) 
    {
        if( this._z !== value ) 
        {
            this._z = value;
            this.style.boxShadow = Shadows.getShadow( value, this.shadowDirection );
        }
    }
    get z()
    {
        return this._z;
    }
    set shadowDirection( value )
    {
        if( this._shadowDirection !== value )
        {
            this._shadowDirection = value;
            if( this.z !== 0 )
            {
                this.style.boxShadow = Shadows.getShadow( this.z, value );
            }
        }
    }
    get shadowDirection()
    {
        return this._shadowDirection;
    }
    set scale( value )
    {
        if( this._scale !== value )
        {
            this._scale = value;
            this.style.transform = "scale( " + value + ", " + value + ")";
        }
    }
    get scale()
    {
        return this._scale;
    }
    set opacity( value )
    {
        if( this.opacity != value )
        {
            this._opacity = value;
            this.style.opacity = value + "";
        }
    }
    get opacity()
    {
        return this._opacity;
    }
    set isVisible( value )
    {
        if( this._isVisible != value )
        {
            this._isVisible = value;
            this.style.visibility = value ? "visible" : "hidden";
        }
    }
    get isVisible()
    {
        return this._isVisible;
    }
    set notifyPropertyAnimationEnd( value )
    {
        if( this._notifyPropertyAnimationEnd !== value )
        {
            this._notifyPropertyAnimationEnd = value;
        }
    }
    get notifyPropertyAnimationEnd()
    {
        return this._notifyPropertyAnimationEnd;
    }
    set isInteractive( value )
    {
        if( this._isInteractive !== value )
        {
            this._isInteractive = value;
            this.style.pointerEvents = value ? "" : "none";
        }
    }
    get isInteractive()
    {
        return this._isInteractive;
    }
    set cornerRadius( value )
    {
        if( this._cornerRadius !== value )
        {
            this._cornerRadius = value;
            this.style.borderRadius = value + "px";
        }
    }
    get cornerRadius()
    {
        return this._cornerRadius;
    }
}
customElements.define( "display-element", DisplayElement );