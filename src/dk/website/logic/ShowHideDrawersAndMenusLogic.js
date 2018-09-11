import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import UIDS from "../app/UIDS.js";
export default class ShowHideDrawersAndMenusLogic extends Logic
{
    constructor()
    {
        super();
        this.drawerClosed = this.drawerClosed.bind( this );
        this.listen( UIDS.TRAILERS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.TRAILERS_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( "moviesDrawerIconButton", EventTypes.TRIGGERED, this.moviesDrawerIconButtonTriggered.bind( this ) );
        this.listen( "moviesDrawerCloseButton", EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( "actorsDrawerIconButton", EventTypes.TRIGGERED, this.actorsDrawerIconButtonTriggered.bind( this ) );
        this.listen( "actorsDrawerCloseButton", EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.OVERLAY, EventTypes.TRIGGERED, this.drawerClosed.bind( this ) );
    }
    trailersDrawerIconButtonTriggered() 
    {
        this.setProperty( UIDS.OVERLAY, "isShown", true );
        this.setProperty( UIDS.TRAILERS_DRAWER, "isShown", true );
    }
    moviesDrawerIconButtonTriggered() 
    {
        this.setProperty( UIDS.OVERLAY, "isShown", true );
        this.setProperty( "moviesDrawer", "isShown", true );
    }
    actorsDrawerIconButtonTriggered()
    {
        this.setProperty( UIDS.OVERLAY, "isShown", true );
        this.setProperty( "actorsDrawer", "isShown", true );
    }
    drawerClosed()
    {
        this.setProperty( UIDS.OVERLAY, "isShown", false );
        this.setProperty( UIDS.TRAILERS_DRAWER, "isShown", false );
        this.setProperty( "moviesDrawer", "isShown", false );
        this.setProperty( "actorsDrawer", "isShown", false );
    }
}