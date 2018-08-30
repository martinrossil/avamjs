import BaseScreen from "../../../ava/screens/base/BaseScreen.js";
import Colors from "../../../ava/styles/Colors.js";
import Config from "../Config.js";
import JSONLoader from "../../../ava/loaders/JSONLoader.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import Model from "../../model/Model.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ActorItemRenderer from "../itemrenderers/ActorItemRenderer.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
export default class ActorsScreen extends BaseScreen
{
    constructor()
    {
        super();
    }
    firstShow()
    {
        //this.jsonLoader.load( Config.FIRE_BASE_DB_BASE_URL + 'actors.json?orderBy="b"&equalTo="Sverige"' );
    }
    actorsComplete( data )
    {
        if( data )
        {
            let actors = Object.values( data );
            actors.sort( this.sortByCreated );
            Model.actorsCollection.arrayData = actors;
        }
    }
    sortByCreated( a, b ) 
    {
        if( a.c > b.c )
        {
            return -1;
        }
        return 1;
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.addElement( this.actorsList );
    }
    get actorsList()
    {
        if( !this._actorsList )
        {
            this._actorsList = new ListElement();
            this._actorsList.uid = "actorsList";
            this._actorsList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._actorsList.layout = this.tiledRowsLayout;
            this._actorsList.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._actorsList.dataProvider = Model.actorsCollection;
            this._actorsList.itemRenderType = ActorItemRenderer;
        }
        return this._actorsList;
    }
    get tiledRowsLayout()
    {
        if( !this._tiledRowsLayout )
        {
            this._tiledRowsLayout = new TiledRowsLayout();
            this._tiledRowsLayout.padding = 24;
            this._tiledRowsLayout.paddingTop = 56 + 24;
            this._tiledRowsLayout.paddingBottom = 56 + 80;
            this._tiledRowsLayout.gap = 24;
            this._tiledRowsLayout.verticalGap = 80;
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
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.actorsComplete.bind( this ) );
        }
        return this._jsonLoader;
    }
}
customElements.define( "actors-screen", ActorsScreen );