import DisplayContainer from "../display/DisplayContainer.js";
import TextElement from "../text/TextElement.js";
import Theme from "../../styles/Theme.js";
import TextAlign from "../../constants/TextAlign.js";
export default class TimeIndicator extends DisplayContainer
{
    constructor()
    {
        super();
    }
    updateTextElement()
    {
        this.textElement.text = this.formattedTimeString;
    }
    get formattedTimeString()
    {
        let t = this.currentTime;
        let d = this.duration;
        if( isNaN( t ) )
        {
            t = 0;
        }
        if( isNaN( d ) )
        {
            d = 0;
        }
        let tm = Math.floor( t / 60 );
        let ts = Math.floor( t - tm * 60 );
        let dm = Math.floor( d / 60 );
        let ds = Math.floor( d - dm * 60 );
        if( ts < 10 )
        {
            ts = "0" + ts;
        }
        if( ds < 10 )
        {
            ds = "0" + ds;
        }
        return tm + ":" + ts + " / " + dm + ":" + ds;
    }
    initialize()
    {
        super.initialize();
        //this.backgroundColor = "#CC0000";
        this.setSize( 100, 56 );
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.textElement );
    }
    get textElement()
    {
        if( !this._textElement )
        {
            this._textElement = new TextElement();
            this._textElement.text = "0:00 / 0:00";
            this._textElement.y = 15;
            this._textElement.setSize( this.width, this.height );
            this._textElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._textElement.textAlign = TextAlign.CENTER;
        }
        return this._textElement;
    }
    set currentTime( value )
    {
        if( this._currentTime !== value )
        {
            this._currentTime = value;
            this.updateTextElement();
        }
    }
    get currentTime()
    {
        return this._currentTime;
    }
    set duration( value )
    {
        if( this._duration !== value )
        {
            this._duration = value;
            this.updateTextElement();
        }
    }
    get duration()
    {
        return this._duration;
    }
}
customElements.define( "time-indicator", TimeIndicator );