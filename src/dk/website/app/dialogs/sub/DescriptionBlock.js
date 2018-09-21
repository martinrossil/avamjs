import DisplayContainer from "../../../../ava/components/display/DisplayContainer.js";
import Colors from "../../../../ava/styles/Colors.js";
import TextElement from "../../../../ava/components/text/TextElement.js";
import Theme from "../../../../ava/styles/Theme.js";
import FontWeight from "../../../../ava/constants/FontWeight.js";
import DisplayElement from "../../../../ava/components/display/DisplayElement.js";
export default class DescriptionBlock extends DisplayContainer
{
    constructor()
    {
        super();
    }
    sizeChanged( w, h )
    {
        super.sizeChanged( w, h );
        this.height = this.descriptionTextElement.textHeight;
        this.background.height = this.height;
    }
    widthChanged( w )
    {
        super.widthChanged( w );
        this.background.width = w;
        this.descriptionTextElement.width = w;
        this.height = this.descriptionTextElement.textHeight;
    }
    descriptionChanged()
    {
        this.descriptionTextElement.text = this.description;
        this.height = this.descriptionTextElement.textHeight;
        this.background.height = this.height;
    }
    initialize()
    {
        super.initialize();
        //this.z = 8;
        //this.addElement( this.background );
        this.addElement( this.descriptionTextElement );
    }
    get background()
    {
        if( !this._background )
        {
            this._background = new DisplayElement();
            this._background.backgroundColor = Colors.BLACK;
            this._background.opacity = .8;
        }
        return this._background;
    }
    get descriptionTextElement()
    {
        if( !this._descriptionTextElement )
        {
            this._descriptionTextElement = new TextElement();
            this._descriptionTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._descriptionTextElement.fontWeight = FontWeight.BOLD;
            this._descriptionTextElement.wordWrap = true;
        }
        return this._descriptionTextElement;
    }
    set description( value )
    {
        if( this._description !== value )
        {
            this._description = value;
            this.descriptionChanged();
        }
    }
    get description()
    {
        return this._description;
    }
    set fontSize( value )
    {
        if( this._fontSize !== value )
        {
            this._fontSize = value;
            this.descriptionTextElement.fontSize = value;
        }
    }
    get fontSize()
    {
        if( !this._fontSize )
        {
            this._fontSize = 16;
        }
        return this._fontSize;
    }
}
customElements.define("deescription-block", DescriptionBlock);