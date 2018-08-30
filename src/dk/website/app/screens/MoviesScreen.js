import BaseScreen from "../../../ava/screens/base/BaseScreen.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import Model from "../../model/Model.js";
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
    firstShow()
    {
        //this.jsonLoader.load( 'film/genrer/alle.json' );
    }
    moviesComplete( data )
    {
        if( data )
        {
            data.sort( this.sortByCreated );
            Model.moviesCollection.arrayData = data;
        }
    }
    sortByCreated( a, b )
    {
        if( a.i > b.i )
        {
            return -1;
        }
        return 1;
    }
    sortByRating( a, b ) 
    {
        if( a.r > b.r )
        {
            return -1;
        }
        return 1;
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
            this._moviesList.dataProvider = Model.moviesCollection;
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
    get jsonLoader()
    {
        if( !this._jsonLoader )
        {
            this._jsonLoader = new JSONLoader();
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.moviesComplete.bind( this ) );
        }
        return this._jsonLoader;
    }
}
customElements.define( "movies-screen", MoviesScreen );