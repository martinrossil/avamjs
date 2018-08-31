import BaseDrawer from "./BaseDrawer.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import GenreItemRenderer from "../itemrenderers/GenreItemRenderer.js";
export default class TrailersGenresDrawer extends BaseDrawer
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
        this.addElement( this.genresList );
    }
    get genresList()
    {
        if( !this._genresList )
        {
            this._genresList = new ListElement();
            this._genresList.uid = "trailersGenresList";
            this._genresList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._genresList.layout = this.verticalLayout;
            this._genresList.layoutData = new AnchorLayoutData( 16, 56, 16, 16 );
            this._genresList.itemRenderType = GenreItemRenderer;
        }
        return this._genresList;
    }
    get verticalLayout()
    {
        if( !this._verticalLayout )
        {
            this._verticalLayout = new VerticalLayout();
        }
        return this._verticalLayout;
    }
}
customElements.define("trailers-genres-drawer", TrailersGenresDrawer ); 