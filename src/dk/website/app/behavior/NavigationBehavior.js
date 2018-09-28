import BaseBehavior from "./base/BaseBehavior.js";
import PathUtil from "../utils/PathUtil.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
import EventTypes from "../../../ava/constants/EventTypes.js";
import ScrollDirection from "../../../ava/constants/ScrollDirection.js";
export default class NavigationBehavior extends BaseBehavior
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
    pathChanged( path )
    {
        let index = PathUtil.getTopNavigationIndex( path );
        this.setProperty( UIDS.BOTTOM_NAVIGATION_BAR, Properties.SELECTED_INDEX, index );
        this.setProperty( UIDS.SCREENS_NAVIGATOR, Properties.SELECTED_INDEX, index );
    }
}