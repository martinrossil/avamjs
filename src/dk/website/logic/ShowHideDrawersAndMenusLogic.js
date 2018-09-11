import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import UIDS from "../app/consts/UIDS.js";
export default class ShowHideDrawersAndMenusLogic extends Logic
{
    constructor()
    {
        super();
        this.drawerClosed = this.drawerClosed.bind( this );
        this.listen( UIDS.TRAILERS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.trailersDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.TRAILERS_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.MOVIES_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.moviesDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.MOVIES_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.ACTORS_DRAWER_ICON_BUTTON, EventTypes.TRIGGERED, this.actorsDrawerIconButtonTriggered.bind( this ) );
        this.listen( UIDS.ACTORS_DRAWER_CLOSE_BUTTON, EventTypes.TRIGGERED, this.drawerClosed );
        this.listen( UIDS.OVERLAY, EventTypes.TRIGGERED, this.drawerClosed.bind( this ) );
    }
    trailersDrawerIconButtonTriggered() 
    {
        this.showDrawer(  UIDS.TRAILERS_DRAWER );
    }
    moviesDrawerIconButtonTriggered() 
    {
        this.showDrawer(  UIDS.MOVIES_DRAWER );
    }
    actorsDrawerIconButtonTriggered()
    {
        this.showDrawer(  UIDS.ACTORS_DRAWER );
    }
    showDrawer( uid )
    {
        this.setProperty( UIDS.OVERLAY, "isShown", true );
        this.setProperty( uid, "isShown", true );
    }
    drawerClosed()
    {
        this.setProperty( UIDS.OVERLAY, "isShown", false );
        this.setProperty( UIDS.TRAILERS_DRAWER, "isShown", false );
        this.setProperty( UIDS.MOVIES_DRAWER, "isShown", false );
        this.setProperty( UIDS.ACTORS_DRAWER, "isShown", false );
    }
}