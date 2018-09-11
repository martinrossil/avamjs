import AppBar from "../../../ava/components/bars/AppBar.js";
import TextElement from "../../../ava/components/text/TextElement.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import Theme from "../../../ava/styles/Theme.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import IconNames from "../../../ava/constants/IconNames.js";
import UIDS from "../UIDS.js";
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
        this.addElement( this.trailersSortIconButton );
        this.addElement( this.trailersDrawerIconButton );
        this.addElement( this.movieSortIconButton );
        this.addElement( this.movieDrawerIconButton );
        this.addElement( this.actorsSortIconButton );
        this.addElement( this.actorsDrawerIconButton );
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
    get trailersSortIconButton()
    {
        if( !this._trailersSortIconButton )
        {
            this._trailersSortIconButton = new IconButton();
            this._trailersSortIconButton.isVisible = false;
            this._trailersSortIconButton.uid = "trailersSortIconButton";
            this._trailersSortIconButton.iconName = IconNames.SORT;
            this._trailersSortIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._trailersSortIconButton;
    }
    get trailersDrawerIconButton()
    {
        if( !this._trailersDrawerIconButton )
        {
            this._trailersDrawerIconButton = new IconButton();
            this._trailersDrawerIconButton.isVisible = false;
            this._trailersDrawerIconButton.uid = UIDS.TRAILERS_DRAWER_ICON_BUTTON;
            this._trailersDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._trailersDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._trailersDrawerIconButton;
    }
    get movieSortIconButton()
    {
        if( !this._movieSortIconButton )
        {
            this._movieSortIconButton = new IconButton();
            this._movieSortIconButton.uid = "moviesSortIconButton";
            this._movieSortIconButton.isVisible = false;
            this._movieSortIconButton.iconName = IconNames.SORT;
            this._movieSortIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._movieSortIconButton;
    }
    get movieDrawerIconButton()
    {
        if( !this._movieDrawerIconButton )
        {
            this._movieDrawerIconButton = new IconButton();
            this._movieDrawerIconButton.uid = "moviesDrawerIconButton";
            this._movieDrawerIconButton.isVisible = false;
            this._movieDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._movieDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._movieDrawerIconButton;
    }
    get actorsSortIconButton()
    {
        if( !this._actorsSortIconButton )
        {
            this._actorsSortIconButton = new IconButton();
            this._actorsSortIconButton.uid = "actorsSortIconButton";
            this._actorsSortIconButton.isVisible = false;
            this._actorsSortIconButton.iconName = IconNames.SORT;
            this._actorsSortIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 52, NaN, NaN, 0 );
        }
        return this._actorsSortIconButton;
    }
    get actorsDrawerIconButton()
    {
        if( !this._actorsDrawerIconButton )
        {
            this._actorsDrawerIconButton = new IconButton();
            this._actorsDrawerIconButton.uid = "actorsDrawerIconButton";
            this._actorsDrawerIconButton.isVisible = false;
            this._actorsDrawerIconButton.iconName = IconNames.FILTER_LIST;
            this._actorsDrawerIconButton.layoutData = new AnchorLayoutData( NaN, NaN, 4, NaN, NaN, 0 );
        }
        return this._actorsDrawerIconButton;
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