import LayoutContainer from "../../../../ava/components/display/LayoutContainer.js";
import Theme from "../../../../ava/styles/Theme.js";
import TextElement from "../../../../ava/components/text/TextElement.js";
import FontWeight from "../../../../ava/constants/FontWeight.js";
import TextAlign from "../../../../ava/constants/TextAlign.js";
import AnchorLayoutData from "../../../../ava/layouts/data/AnchorLayoutData.js";
export default class AgeBlock extends LayoutContainer
{
    constructor()
    {
        super();
    }
    ageChanged()
    {
        this.textElement.text = this.age;
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        if( w === 42 )
        {
            this.textElement.fontSize = 16;
            this.textElement.y = 8.5;
        }
        else
        {
            this.textElement.fontSize = 32;
            this.textElement.y = 17;
        }
        this.textElement.width = w;
    }
    initialize()
    {
        super.initialize();
        this.setSize( 42, 42 );
        this.backgroundColor = Theme.PRIMARY_COLOR_DARK;
        this.addElement( this.textElement );
    }
    get textElement()
    {
        if( !this._textElement )
        {
            this._textElement = new TextElement();
            this._textElement.width = this.width;
            this._textElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._textElement.fontWeight = FontWeight.BOLD;
            this._textElement.textAlign = TextAlign.CENTER;
            //this._textElement.layoutData = new AnchorLayoutData( 0, NaN, 0, NaN, 0, 0 );
        }
        return this._textElement;
    }
    set age( value )
    {
        if( this._age !== value )
        {
            this._age = value;
            this.ageChanged();
        }
    }
    get age()
    {
        return this._age;
    }
}
customElements.define("age-block", AgeBlock);