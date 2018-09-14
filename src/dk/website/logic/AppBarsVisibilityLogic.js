import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ScrollDirection from "../../ava/constants/ScrollDirection.js";
import UIDS from "../app/consts/UIDS.js";
import Properties from "../app/consts/Properties.js";
export default class AppBarsVisibilityLogic extends Logic
{
    constructor()
    {
        super();
        this.scrollDirectionChanged = this.scrollDirectionChanged.bind( this );
        this.listen( UIDS.TRAILERS_LIST, EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
        this.listen( UIDS.MOVIES_LIST, EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
        this.listen( UIDS.ACTORS_LIST, EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
    }
    scrollDirectionChanged( data )
    {
        let showBars = data === ScrollDirection.DOWN;
        this.setProperty( UIDS.APP_BAR, Properties.IS_SHOWN, showBars );
        this.setProperty( UIDS.BOTTOM_NAVIGATION_BAR, Properties.IS_SHOWN, showBars );
    }
}