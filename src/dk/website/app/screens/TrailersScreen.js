import BaseScreen from "../../../ava/screens/base/BaseScreen.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import VideoItemRenderer from "../itemrenderers/VideoItemRenderer.js";
import TiledRowsLayout from "../../../ava/layouts/TiledRowsLayout.js";
import AnchorLayout from "../../../ava/layouts/AnchorLayout.js";
export default class TrailersScreen extends BaseScreen
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.addElement( this.trailersList );
    }
    get trailersList()
    {
        if( !this._trailersList )
        {
            this._trailersList = new ListElement();
            this._trailersList.uid = "trailersList";
            this._trailersList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._trailersList.layout = this.tiledRowsLayout;
            this._trailersList.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._trailersList.itemRenderType = VideoItemRenderer;
        }
        return this._trailersList;
    }
    get tiledRowsLayout()
    {
        if( !this._tiledRowsLayout )
        {
            this._tiledRowsLayout = new TiledRowsLayout();
            this._tiledRowsLayout.padding = 24;
            this._tiledRowsLayout.paddingTop = 56 + 24;
            this._tiledRowsLayout.paddingBottom = 56 + 64 + 16;
            this._tiledRowsLayout.gap = 24;
            this._tiledRowsLayout.verticalGap = 64 + 16;
            this._tiledRowsLayout.maxColumns = 3;
            this._tiledRowsLayout.elementAspectRatio = 2;
            this._tiledRowsLayout.elementMinWidth = 240;
            this._tiledRowsLayout.maxTotalWidth = 1024;
        }
        return this._tiledRowsLayout;
    }
}
customElements.define( "trailers-screen", TrailersScreen );