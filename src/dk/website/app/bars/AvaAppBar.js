import AppBar from "../../../ava/components/bars/AppBar.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
export default class AvaAppBar extends AppBar
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.titleTextElement );
        //this.addElement( this.openTrailersCountriesDrawerIconButton );
        this.addElement( this.openTrailersGenresDrawerIconButton );
        //this.addElement( this.openTrailersLanguagesDrawerIconButton );
        this.addElement( this.openMovieGenresDrawerIconButton );
        this.addElement( this.openActorsDrawerIconButton );
    }
    get openActorsDrawerIconButton()
    {
        if( !this._openActorsDrawerIconButton )
        {
            this._openActorsDrawerIconButton = new IconButton();
            this._openActorsDrawerIconButton.uid = "openActorsDrawerIconButton";
            this._openActorsDrawerIconButton.isVisible = false;
            this._openActorsDrawerIconButton.href = "/skuespillere/lande";
            this._openActorsDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._openActorsDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openActorsDrawerIconButton;
    }
    get openMovieGenresDrawerIconButton()
    {
        if( !this._openMovieGenresDrawerIconButton )
        {
            this._openMovieGenresDrawerIconButton = new IconButton();
            this._openMovieGenresDrawerIconButton.uid = "openMovieGenresDrawerIconButton";
            this._openMovieGenresDrawerIconButton.isVisible = false;
            this._openMovieGenresDrawerIconButton.href = "/film/genrer";
            this._openMovieGenresDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._openMovieGenresDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openMovieGenresDrawerIconButton;
    }
    get titleTextElement()
    {
        if( !this._titleTextElement )
        {
            this._titleTextElement = new TextElement();
            this._titleTextElement.layoutData = new AnchorLayoutData( 16, NaN, 56 );
            this._titleTextElement.setPosition( 16, 13 );
            this._titleTextElement.textColor = Theme.PRIMARY_TEXT_COLOR;
            this._titleTextElement.fontSize = 20;
            this._titleTextElement.wordWrap = false;
        }
        return this._titleTextElement;
    }
    get openTrailersGenresDrawerIconButton()
    {
        if( !this._openTrailersGenresDrawerIconButton )
        {
            this._openTrailersGenresDrawerIconButton = new IconButton();
            this._openTrailersGenresDrawerIconButton.uid = "openTrailersGenresDrawerIconButton";
            this._openTrailersGenresDrawerIconButton.href = "/trailers/genrer";
            this._openTrailersGenresDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._openTrailersGenresDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._openTrailersGenresDrawerIconButton;
    }
    get openTrailersCountriesDrawerIconButton()
    {
        if( !this._openTrailersCountriesDrawerIconButton )
        {
            this._openTrailersCountriesDrawerIconButton = new IconButton();
            this._openTrailersCountriesDrawerIconButton.href = "/trailers/lande/";
            this._openTrailersCountriesDrawerIconButton.iconName = IconNames.DATE_RANGE;
            this._openTrailersCountriesDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._openTrailersCountriesDrawerIconButton;
    }
    get openTrailersLanguagesDrawerIconButton()
    {
        if( !this._openTrailersLanguagesDrawerIconButton )
        {
            this._openTrailersLanguagesDrawerIconButton = new IconButton();
            this._openTrailersLanguagesDrawerIconButton.href = "/trailers/sprog/";
            this._openTrailersLanguagesDrawerIconButton.iconName = IconNames.LANGUAGE;
            this._openTrailersLanguagesDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 100, NaN, NaN, 0 );
        }
        return this._openTrailersLanguagesDrawerIconButton;
    }
    set title( value )
    {
        if( this._title !== value )
        {
            this._title = value;
            this._titleTextElement.text = value;
        }
    }
    get title()
    {
        return this._title;
    }
}
customElements.define("ava-app-bar", AvaAppBar);