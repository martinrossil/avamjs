import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import UIDS from "../app/UIDS.js";
export default class ShowHideUILogic extends Logic
{
    constructor()
    {
        super();
        window.addEventListener( "popstate", this.popped.bind( this ) );
        document.addEventListener( "click", this.clicked.bind( this ) );
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
        this.showHide( path );
    }
    popped()
    {
        this.showHide( window.location.pathname );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            this.showHide( aTag.pathname );
        }
    }
    showHide( path )
    {
        let pathArray = path.split( "/" );
        pathArray.shift();
        let len = pathArray.length;  
        if( len === 0 || len === 1 )
        {
            this.hideDrawers();
        }
        else if( len === 2 )
        {
            this.showDrawer( pathArray );
        }
        else if( len === 3 )
        {
            console.log( "showHide", path );
            this.setProperty( "trailersfiltergenrerList", "isVisible", path === "/trailers/filter/genrer" );
            this.setProperty( "trailersfiltergenrerList", "isInteractive", path === "/trailers/filter/genrer" );
            this.setProperty( "trailersfilterlandeList", "isVisible", path === "/trailers/filter/lande" );
            this.setProperty( "trailersfilterlandeList", "isInteractive", path === "/trailers/filter/lande" );
        }
        this.showHideIconButtons( pathArray );
    }
    showHideIconButtons( pathArray )
    {
        let top = pathArray[ 0 ];
        if( !top )
        {
            top = "trailers";
        }
        this.setProperty( UIDS.TRAILERS_DRAWER_ICON_BUTTON, "isVisible", top === "trailers" );
        this.setProperty( "filmDrawerIconButton", "isVisible", top === "film" );
        this.setProperty( "skuespillereDrawerIconButton", "isVisible", top === "skuespillere" );
    }
    showDrawer( pathArray )
    {
        let uid = pathArray[ 0 ] + "Drawer";
        this.setProperty( uid, "isShown", true );
    }
    hideDrawers()
    {
        this.setProperty( "filmDrawer", "isShown", false );
        this.setProperty( UIDS.TRAILERS_DRAWER, "isShown", false );
        this.setProperty( "skuespillereDrawer", "isShown", false );
    }
}