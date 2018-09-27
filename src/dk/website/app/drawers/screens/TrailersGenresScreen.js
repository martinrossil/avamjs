import BaseScreen from "../../../../ava/screens/base/BaseScreen.js";
import AnchorLayout from "../../../../ava/layouts/AnchorLayout.js";
import ListElement from "../../../../ava/components/lists/ListElement.js";
import UIDS from "../../consts/UIDS.js";
import ScrollPolicy from "../../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../../ava/layouts/data/AnchorLayoutData.js";
import VerticalLayout from "../../../../ava/layouts/VerticalLayout.js";
import LinkItemRenderer from "../../itemrenderers/base/LinkItemRenderer.js";
export default class TrailersGenresScreen extends BaseScreen
{
    constructor()
    {
        super();
    }
    initialize()
    {
        super.initialize();
        this.layout = new AnchorLayout();
        this.createChildren();
    }
    createChildren()
    {
        this.addElement( this.list );
    }
    get list()
    {
        if( !this._list )
        {
            this._list = new ListElement();
            this._list.uid = UIDS.TRAILERS_GENRES_LIST;
            this._list.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._list.layout = this.listLayout;
            this._list.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._list.itemRenderType = LinkItemRenderer;
        }
        return this._list;
    }
    get listLayout()
    {
        if( !this._listLayout )
        {
            this._listLayout =  new VerticalLayout();
            this._listLayout.paddingTop = 4;
        }
        return this._listLayout;
    }
}
customElements.define("trailers-genres-screen", TrailersGenresScreen ); 