import BaseDrawer from "./BaseDrawer.js";
import ListElement from "../../../ava/components/lists/ListElement.js";
import ScrollPolicy from "../../../ava/constants/ScrollPolicy.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import CountryItemRenderer from "../itemrenderers/CountryItemRenderer.js";
import VerticalLayout from "../../../ava/layouts/VerticalLayout.js";
export default class ActorsDrawer extends BaseDrawer
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
        this.addElement( this.countriesList );
    }
    get countriesList()
    {
        if( !this._countriesList )
        {
            this._countriesList = new ListElement();
            this._countriesList.uid = "actorsCountriesList";
            this._countriesList.horizontalScrollPolicy = ScrollPolicy.OFF;
            this._countriesList.layout = this.verticalLayout;
            this._countriesList.layoutData = new AnchorLayoutData( 16, 56, 16, 16 );
            this._countriesList.itemRenderType = CountryItemRenderer;
        }
        return this._countriesList;
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
customElements.define("actors-drawer", ActorsDrawer ); 