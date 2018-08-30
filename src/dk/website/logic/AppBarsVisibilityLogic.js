import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ScrollDirection from "../../ava/constants/ScrollDirection.js";
export default class AppBarsVisibilityLogic extends Logic
{
    constructor()
    {
        super();
        this.scrollDirectionChanged = this.scrollDirectionChanged.bind( this );
        this.listen( "videosList", EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
        this.listen( "moviesList", EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
        this.listen( "actorsList", EventTypes.SCROLL_DIRECTION_CHANGED, this.scrollDirectionChanged );
    }
    scrollDirectionChanged( data )
    {
        let showBars = data === ScrollDirection.DOWN;
        this.setProperty( "appBar", "isShown", showBars );
        this.setProperty( "bottomNavigationBar", "isShown", showBars );
    }
}