import BaseDrawer from "./BaseDrawer.js";
import ScreensNavigator from "../../../ava/screens/ScreensNavigator.js";
import UIDS from "../consts/UIDS.js";
import AnchorLayoutData from "../../../ava/layouts/data/AnchorLayoutData.js";
import TrailersFilterScreen from "./screens/TrailersFilterScreen.js";
import MoviesFilterScreen from "./screens/MoviesFilterScreen.js";
import ActorsFilterScreen from "./screens/ActorsFilterScreen.js";
export default class FiltersDrawer extends BaseDrawer
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
        this.addElement( this.screensNavigator );
    }
    get screensNavigator()
    {
        if( !this._screensNavigator )
        {
            this._screensNavigator = new ScreensNavigator();
            this._screensNavigator.uid = UIDS.FILTER_SCREENS_NAVIGATOR;
            this._screensNavigator.layoutData = new AnchorLayoutData( 0, 0, 0, 0 );
            this._screensNavigator.addScreen( new TrailersFilterScreen() );
            this._screensNavigator.addScreen( new MoviesFilterScreen() );
            this._screensNavigator.addScreen( new ActorsFilterScreen() );
        }
        return this._screensNavigator;
    }
}
customElements.define("filters-drawer", FiltersDrawer );