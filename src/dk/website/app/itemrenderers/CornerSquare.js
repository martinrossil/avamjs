import DisplayContainer from "../../../ava/components/display/DisplayContainer.js";
import Theme from "../../../ava/styles/Theme.js";
import Colors from "../../../ava/styles/Colors.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import FontWeight from "../../../ava/constants/FontWeight.js";
import TextAlign from "../../../ava/constants/TextAlign.js";
import AppColors from "../AppColors.js";
export default class CornerSquare extends DisplayContainer
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.setSize( 42, 42 );
        this.backgroundColor = Theme.PRIMARY_COLOR;
        this.addElement( this.textElement );
    }
    get textElement()
    {
        if( !this._textElement )
        {
            this._textElement = new TextElement();
            this._textElement.width = this.width;
            this._textElement.y = 8.5;
            this._textElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._textElement.fontWeight = FontWeight.BOLD;
            this._textElement.textAlign = TextAlign.CENTER;
        }
        return this._textElement;
    }
    set age( value )
    {
        if( this._age !== value )
        {
            this._age = value;
            this.textElement.text = value;
        }
    }
    get age()
    {
        return this._age;
    }
    set rating( value )
    {
        if( this._rating !== value )
        {
            this._rating = value;
            this.textElement.text = value;
            if( value > 6.9 )
            {
                this.backgroundColor = AppColors.GREEN;// Colors.GREEN_700
            }
            else if( value > 4.9 )
            {
                this.backgroundColor = AppColors.ORANGE;// Colors.AMBER_700;
            }
            else
            {
                this.backgroundColor = AppColors.RED;// Colors.RED_700;
            }
        }
    }
    get rating()
    {
        return this._rating;
    }
}
customElements.define("corner-square", CornerSquare);