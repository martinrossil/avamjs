import LayoutContainer from "../../../../ava/components/display/LayoutContainer.js";
import Theme from "../../../../ava/styles/Theme.js";
import TextElement from "../../../../ava/components/text/TextElement.js";
import FontWeight from "../../../../ava/constants/FontWeight.js";
import TextAlign from "../../../../ava/constants/TextAlign.js";
import Colors from "../../../../ava/styles/Colors.js";
import AnchorLayoutData from "../../../../ava/layouts/data/AnchorLayoutData.js";
export default class RatingBlock extends LayoutContainer
{
    constructor()
    {
        super();
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
    ratingChanged()
    {
        let r = this.rating;
        this.textElement.text = r;
        if( r > 6.9 )
        {
            this.backgroundColor = "#75a529";// Colors.GREEN_700
        }
        else if( r > 4.9 )
        {
            this.backgroundColor = Colors.AMBER_700;
        }
        else
        {
            this.backgroundColor = "#bf1400";// Colors.RED_700;
        }
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
            this._textElement.layoutData = new AnchorLayoutData( 0, NaN, 0, NaN, 0, 0 );
        }
        return this._textElement;
    }
    set rating( value )
    {
        if( this._rating !== value )
        {
            this._rating = value;
            this.ratingChanged();
        }
    }
    get rating()
    {
        return this._rating;
    }
}
customElements.define("rating-block", RatingBlock);