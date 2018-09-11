import DisplayElement from "../display/DisplayElement.js";
import FontWeight from "../../constants/FontWeight.js";
import TextAlign from "../../constants/TextAlign.js";
import Theme from "../../styles/Theme.js";
import EventTypes from "../../constants/EventTypes.js";
export default class TextElement extends DisplayElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        
    }
    heightChanged()
    {
        super.heightChanged();
        //this.dispatch( EventTypes.HEIGHT_CHANGED, this.height )
    }
    initialize()
    {
        super.initialize();
        this.isInteractive = false;
        this.fontSize = 16;
        this.fontWeight = FontWeight.REGULAR;
        this.fontFamily = Theme.FONT_FAMILY;
        this.lineHeight = 1.5;
        this.textAlign = TextAlign.LEFT;
    }
    set text( value )
    {
        if( this._text != value )
        {
            this._text = value;
            this.textContent = value;
            //this.height = this.scrollHeight;
        }
    }
    get text()
    {
        return this._text;
    }
    set textColor( value )
    {
        if( this._textColor != value )
        {
            this._textColor = value;
            this.style.color = value;
        }
    }
    get textColor()
    {
        return this._textColor;
    }
    set fontSize( value )
    {
        if( this._fontSize != value )
        {
            this._fontSize = value;
            this.style.fontSize = value + "px";
            //this.height = this.scrollHeight;
        }
    }
    get fontSize()
    {
        return this._fontSize;
    }
    set fontWeight( value )
    {
        if( this._fontWeight != value )
        {
            this._fontWeight = value;
            this.style.fontWeight = value;
            //this.height = this.scrollHeight;
        }
    }
    get fontWeight()
    {
        return this._fontWeight;
    }
    set fontFamily( value )
    {
        if( this._fontFamily != value )
        {
            this._fontFamily = value;
            this.style.fontFamily = value;
            //this.height = this.scrollHeight;
        }
    }
    get fontFamily()
    {
        return this._fontFamily;
    }
    set lineHeight( value )
    {
        if( this._lineHeight != value )
        {
            this._lineHeight = value;
            this.style.lineHeight = value + "";
            //this.height = this.scrollHeight;
        }
    }
    get lineHeight()
    {
        return this._lineHeight;
    }
    set textAlign( value )
    {
        if( this._textAlign != value )
        {
            this._textAlign = value;
            this.style.textAlign = value;
        }
    }
    get textAlign()
    {
        return this._textAlign;
    }
    set wordWrap( value )
    {
        if( this._wordWrap !== value )
        {
            this._wordWrap = value;
            if( value )
            {
                this.style.overflow = "";
                this.style.whiteSpace = "";
                this.style.textOverflow = "";
            }
            else
            {
                this.style.overflow = "hidden";
                this.style.whiteSpace = "nowrap";
                this.style.textOverflow = "ellipsis"; 
            }
        }
    }
    get wordWrap()
    {
        return this._wordWrap;
    }
}
customElements.define("text-element", TextElement);