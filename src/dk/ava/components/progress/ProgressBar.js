import DisplayContainer from "../display/DisplayContainer.js";
import DisplayElement from "../display/DisplayElement.js";
import Theme from "../../styles/Theme.js";
import AnimatedProperty from "../../animation/AnimatedProperty.js";
export default class ProgressBar extends DisplayContainer
{
    constructor()
    {
        super();
    }
    setProgress( value, total )
    {
        this.currentValue = value;
        this.currentTotal = total;
        if( this.currentTotal <= 0 )
        {
            this.currentTotal = 1;
        }
        if( this.currentValue > this.currentTotal )
        {
            this.currentValue = this.currentTotal;
        }
        if( this.currentValue <= 0 )
        {
            this.currentValue = 1;
        }
        this.setIndicatorWidth();
    }
    setIndicatorWidth()
    {
        let percent = this.currentValue / this.currentTotal;
        this.indicator.width = percent * this.width;
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.track.width = w;
        this.setIndicatorWidth();
    }
    initialize()
    {
        super.initialize();
        this.currentValue = 0;
        this.currentTotal = 1;
        this.height = 4;
        this.isInteractive = false;
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.track );
        this.addElement( this.indicator );
    }
    get track()
    {
        if( !this._track )
        {
            this._track = new DisplayElement();
            this._track.height = 4;
            this._track.opacity = 0.25;
            this._track.backgroundColor = this.color;
        }
        return this._track;
    }
    get indicator()
    {
        if( !this._indicator )
        {
            this._indicator = new DisplayElement();
            this._indicator.height = 4;
            this._indicator.backgroundColor = this.color;
            this._indicator.animatedProperties = [ new AnimatedProperty( "width", 225, "ease-in" ) ];
        }
        return this._indicator;
    }
    set color( value )
    {
        if( this._color != value )
        {
            this._color = value;
            this.track.backgroundColor = value;
            this.indicator.backgroundColor = value;
        }
    }
    get color()
    {
        if( !this._color )
        {
            this._color = Theme.PRIMARY_TEXT_COLOR;
        }
        return this._color;
    }
    set showTrack( value )
    {
        if( this._showTrack !== value )
        {
            this._showTrack = value;
            this.track.isVisible = value;
        }
    }
    get showTrack()
    {
        return this._showTrack;
    }
}
customElements.define("progress-bar", ProgressBar);