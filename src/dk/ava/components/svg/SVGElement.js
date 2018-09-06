import BaseElement from "../base/BaseElement.js";
import Colors from "../../styles/Colors.js";
import Direction from "../../constants/Direction.js";
import EventTypes from "../../constants/EventTypes.js";
export default class SVGElement extends BaseElement
{
    constructor()
    {
        super();
    }
    setSize( w, h )
    {
        if( this._width !== w && this._height !== h )
        {
            if( w < 0 )
            {
                w = 0;
            }
            this._width = w;
            this.svg.setAttribute( "width", w + "" );
            if( h < 0 )
            {
                h  = 0;
            }
            this._height = h;
            this.svg.setAttribute( "height", h + "" );
            this.sizeChanged( w, h );
        }
        else
        {
            this.width = w;
            this.height = h;
        }
    }
    setPosition( x, y )
    {
        if( this._x !== x && this._y !== y )
        {
            this._x = x;
            this._y = y;
            this.svg.style.left = x + "px";
            this.svg.style.top = y + "px";
        }
        else
        {
            this.x = x;
            this.y = y;
        }
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
    initialize()
    {
        super.initialize();
        this.notifyPropertyAnimationEnd = false;
        this.animationEnded = this.animationEnded.bind( this );
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._shadowColor = Colors.BLACK;
        this._shadowBlur = 4;
        this._shadowDirection = Direction.SOUTH;
        this._shadowOpacity = .5;
        this._width = 0;
        this._height = 0;
        this._scale = 1;
        this.appendChild( this.svg );
    }
    get svg()
    {
        if( !this._svg )
        {
            this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._svg.style.position = "absolute";
        }
        return this._svg;
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
    get defs()
    {
        if( !this._defs )
        {
            this._defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
            this._defs.appendChild( this.filter );
        }
        return this._defs;
    }
    get filter()
    {
        if( !this._filter )
        {
            this._filter = document.createElementNS("http://www.w3.org/2000/svg", 'filter');
            this._filter.setAttribute( "id", "dropshadow" );
            this._filter.setAttribute( "width", "200%" );
            this._filter.setAttribute( "height", "200%" );
            this._filter.appendChild( this.dropShadow );
        }
        return this._filter;
    }
    get dropShadow()
    {
        if( !this._dropShadow )
        {
            this._dropShadow = document.createElementNS("http://www.w3.org/2000/svg", 'feDropShadow');
            this._dropShadow.setAttribute( "dx", this.dx );
            this._dropShadow.setAttribute( "dy", this.dy );
            this._dropShadow.setAttribute( "stdDeviation", this.shadowBlur + "" );
            this._dropShadow.setAttribute( "flood-color", this.shadowColor );
            this._dropShadow.setAttribute( "flood-opacity", this.shadowOpacity );
        }
        return this._dropShadow;
    }
    set shadowOpacity( value )
    {
        if( this._shadowOpacity !== value )
        {
            this._shadowOpacity = value;
            this.dropShadow.setAttribute( "flood-opacity", value );
        }
    }
    get shadowOpacity()
    {
        return this._shadowOpacity;
    }
    set shadowDirection( value )
    {
        if( this._shadowDirection !== value )
        {
            this._shadowDirection = value;
            this.dropShadow.setAttribute( "dx", this.dx );
            this.dropShadow.setAttribute( "dy", this.dy );
        }
    }
    get shadowDirection()
    {
        return this._shadowDirection;
    }
    get dx()
    {
        let sd = this.shadowDirection;
        if( sd === Direction.NORTH_WEST || 
            sd === Direction.SOUTH_WEST ||
            sd === Direction.WEST )
        {
            return -this.z + "";
        }
        else if( sd === Direction.NORTH_EAST ||
                 sd === Direction.SOUTH_EAST ||
                 sd === Direction.EAST )
        {
            return this.z + "";
        }
        else
        {
            return "0";
        }
    }
    get dy()
    {
        let sd = this.shadowDirection;
        if( sd === Direction.NORTH_EAST ||
            sd === Direction.NORTH_WEST ||
            sd === Direction.NORTH )
        {
            return -this.z + "";
        }
        else if( sd === Direction.SOUTH_EAST ||
                 sd === Direction.SOUTH_WEST ||
                 sd === Direction.SOUTH )
        {
            return this.z + "";
        }
        else
        {
            return "0";
        }
    }
    set x( value )
    {
        if( this._x !== value )
        {
            this._x = value;
            this.svg.style.left = value + "px";
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
            this.svg.style.top = value + "px";
        }
    }
    get y()
    {
        return this._y;
    }
    set z( value )
    {
        if( this._z !== value )
        {
            if( value < 0 )
            {
                value = 0;
            }
            this._z = value;
            if( value > 0 )
            {
                if( !this.svg.contains( this.defs ) )
                {
                    this.svg.appendChild( this.defs );
                }
                this.svg.setAttribute( "filter", "url(#dropshadow)" );
            }
            else
            {
                if( this.svg.contains( this.defs ) )
                {
                    this.svg.removeChild( this.defs );
                }
                this.svg.setAttribute( "filter", "" );
            }
        }
    }
    get z()
    {
        return this._z;
    }
    set shadowColor( value )
    {
        if( this._shadowColor !== value )
        {
            this._shadowColor = value;
            this._shadowColor.setAttribute( "flood-color", value );
        }
    }
    get shadowColor()
    {
        return this._shadowColor;
    }
    set shadowBlur( value )
    {
        if( this._shadowBlur !== value )
        {
            this._shadowBlur = value;
            this.dropShadow.setAttribute( "stdDeviation", value + "" );
        }
    }
    get shadowBlur()
    {
        return this._shadowBlur;
    }
    set width( value ) 
    {
        if( this._width !== value )
        {
            if( value < 0 )
            {
                value = 0;
            }
            this._width = value;
            this.svg.setAttribute( "width", value + "" );
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
            if( value < 0 )
            {
                value = 0;
            }
            this._height = value;
            this.svg.setAttribute( "height", value + "" );
            this.heightChanged( value );
        }
    }
    get height()
    {
        return this._height;
    }
    set color( value )
    {
        if( this._color != value )
        {
            this._color = value;
            this.svg.setAttribute( "fill", value );
        }
    }
    get color()
    {
        return this._color;
    }
    set viewBox( value )
    {
        if( this._viewBox !== value )
        {
            this._viewBox = value;
            this.svg.setAttribute( "viewBox", value );
        }
    }
    get viewBox()
    {
        return this._viewBox;
    }
    set animatedProperties( value )
    {
        if( this._animatedProperties !== value )
        {
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
                this.svg.style.transitionProperty = transitionProperties.join();
                this.svg.style.transitionDuration = transitionDurations.join();
                this.svg.style.transitionTimingFunctions = transitionTimingFunctions.join();
                this.svg.addEventListener( "transitionend", this.animationEnded );
            }
            else
            {
                this.svg.style.transitionProperty = "";
                this.svg.style.transitionDuration = "";
                this.svg.style.transitionTimingFunctions = "";
                this.svg.removeEventListener( "transitionend", this.animationEnded );
            }
        }
    }
    get animatedProperties()
    {
        return this._animatedProperties;
    }
    set scale( value )
    {
        if( this._scale !== value )
        {
            this._scale = value;
            this.svg.style.transform = "scale( " + value + ", " + value + ")";
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
            this.svg.style.opacity = value + "";
        }
    }
    get opacity()
    {
        return this._opacity;
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
}
customElements.define( "svg-element", SVGElement );