import BaseScreen from "../../../ava/screens/base/BaseScreen.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import MovieItemRenderer from "../itemrenderers/MovieItemRenderer.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
export default class MoviesScreen extends BaseScreen
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.addElement( this.moviesList );
    }
    get moviesList()
    {
        if( !this._moviesList )
        {
            this._moviesList = new ListElement();
            this._moviesList.uid = "moviesList";
            this._moviesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._moviesList.layout = this.tiledRowsLayout;
            this._moviesList.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._moviesList.itemRenderType = MovieItemRenderer;
        }
        return this._moviesList;
    }
    get tiledRowsLayout()
    {
        if( !this._tiledRowsLayout )
        {
            this._tiledRowsLayout = new TiledRowsLayout();
            this._tiledRowsLayout.padding = 24;
            this._tiledRowsLayout.paddingTop = 56 + 24;
            this._tiledRowsLayout.paddingBottom = 56 + 64;
            this._tiledRowsLayout.gap = 24;
            this._tiledRowsLayout.verticalGap = 64;
            this._tiledRowsLayout.maxColumns = 4;
            this._tiledRowsLayout.elementAspectRatio = 1 / 1.5;
            this._tiledRowsLayout.elementMinWidth = ( 320 - 72 ) * .5;
            this._tiledRowsLayout.maxTotalWidth = 1024;
        }
        return this._tiledRowsLayout;
    }
}
customElements.define( "movies-screen", MoviesScreen );