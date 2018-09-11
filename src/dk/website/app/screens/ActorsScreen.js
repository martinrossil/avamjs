import BaseScreen from "../../../ava/screens/base/BaseScreen.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ActorItemRenderer from "../itemrenderers/ActorItemRenderer.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
import UIDS from "../consts/UIDS.js";
export default class ActorsScreen extends BaseScreen
{
    constructor()
    {
        super();
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
            this._actorsList.uid = UIDS.ACTORS_LIST;
            this._actorsList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._actorsList.layout = this.tiledRowsLayout;
            this._actorsList.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
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
}
customElements.define( "actors-screen", ActorsScreen );