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
            this.div.textContent = value;
            //this.height = this.div.scrollHeight;
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
            this.div.style.color = value;
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
            this.div.style.fontSize = value + "px";
            //this.height = this.div.scrollHeight;
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
            this.div.style.fontWeight = value;
            //this.height = this.div.scrollHeight;
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
            this.div.style.fontFamily = value;
            //this.height = this.div.scrollHeight;
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
            this.div.style.lineHeight = value + "";
            //this.height = this.div.scrollHeight;
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
            this.div.style.textAlign = value;
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
                this.div.style.overflow = "";
                this.div.style.whiteSpace = "";
                this.div.style.textOverflow = "";
            }
            else
            {
                this.div.style.overflow = "hidden";
                this.div.style.whiteSpace = "nowrap";
                this.div.style.textOverflow = "ellipsis"; 
            }
        }
    }
    get wordWrap()
    {
        return this._wordWrap;
    }
}
customElements.define("text-element", TextElement);