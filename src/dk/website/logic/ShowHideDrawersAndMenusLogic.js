import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
export default class ShowHideDrawersAndMenusLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( "trailersDrawerIconButton", EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( "trailersDrawerCloseButton", EventTypes.TRIGGERED, this.drawerClosed.bind( this ) );
    }
    trailersDrawerIconButtonTriggered()
    {
        this.setProperty( "overlay", "isShown", true );
        this.setProperty( "trailersDrawer", "isShown", true );
    }
    drawerClosed()
    {
        this.setProperty( "overlay", "isShown", false );
        this.setProperty( "trailersDrawer", "isShown", false );
    }
}