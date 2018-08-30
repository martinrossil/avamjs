import DisplayElement from "../display/DisplayElement.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
import Theme from "../../styles/Theme.js";
export default class SpinnerElement extends DisplayElement
{
    constructor()
    {
        super();
    }
    isShownChanged()
    {
        if( this.isShown )
        {
            this.rotation = 0;
            this.opacity = 1;
            this.shouldRotate = true;
            this.requestAnimationFrame( this.animationTick );
        }
        else
        {
            this.opacity = 0;
        }
    }
    animationTick()
    {
        if( this.shouldRotate )
        {
            this.rotation += this.speed;
            this.div.style.transform = "rotate(" + this.rotation + "deg)";
            this.requestAnimationFrame( this.animationTick.bind( this ) );
        }
    }
    animationEnded( e )
    {
        super.animationEnded( e );
        if( this.opacity == 0 )
        {
            this.shouldRotate = false;
        }
    }
    initialize()
    {
        super.initialize();
        this.setSize( 64, 64 );
        this.isInteractive = false;
        this.animationTick = this.animationTick.bind( this );
        this._color = Theme.PRIMARY_COLOR;
        this._isShown = false;
        this._speed = 5;
        this.opacity = 0;
        this.rotation = 0;
        this.shouldRotate = false;
        this.notifyPropertyAnimationEnd = true;
        this.animatedProperties = [ new AnimatedProperty( "opacity", 225, "ease-in" ) ];
        this.div.appendChild( this.svg );
    }
    get svg()
    {
        if( !this._svg )
        {
            this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._svg.style.position = "absolute";
            this._svg.setAttribute( "width", this.width + "" );
            this._svg.setAttribute( "height", this.height + "" );
            this._svg.appendChild( this.circle );
        }
        return this._svg;
    }
    get circle()
    {
        if( !this._circle )
        {
            this._circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            this._circle.setAttribute( "cx", this.width * .5 );
            this._circle.setAttribute( "cy", this.height * .5 );
            this._circle.setAttribute( "r", this.width * .5 - 2 );
            this._circle.setAttribute( "fill", "none" );
            this._circle.setAttribute( "stroke-width", 4 );
            this._circle.setAttribute( "stroke", this.color );
            this._circle.setAttribute( "stroke-linecap", "square" );
            this._circle.setAttribute( "stroke-dasharray", "45%, 30%" );
            
        }
        return this._circle;
    }
    set isShown( value )
    {
        if( this._isShown !== value )
        {
            this._isShown = value;
            this.isShownChanged();
        }
    }
    get isShown()
    {
        return this._isShown;
    }
    get requestAnimationFrame()
    {
        if( !this._requestAnimationFrame )
        {
            this._requestAnimationFrame =   window.requestAnimationFrame.bind( window ) || 
                                            window.mozRequestAnimationFrame.bind( window ) ||
                                            window.webkitRequestAnimationFrame.bind( window ) || 
                                            window.msRequestAnimationFrame.bind( window );
        }
        return this._requestAnimationFrame;
    }
    set color( value )
    {
        if( this._color !== value )
        {
            this._color = value;
            this.circle.setAttribute( "stroke", value );
        }
    }
    get color()
    {
        return this._color;
    }
    set speed( value )
    {
        if( this._speed !== value )
        {
            this._speed = value;
        }
    }
    get speed()
    {
        return this._speed;
    }
}
customElements.define( "spinner-element", SpinnerElement );