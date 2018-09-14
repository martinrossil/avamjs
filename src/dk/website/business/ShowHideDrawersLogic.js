import Logic from "../../ava/logic/Logic.js";
import Events from "../app/consts/Events.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import UIDS from "../app/consts/UIDS.js";
import Properties from "../app/consts/Properties.js";
import Paths from "../app/consts/Paths.js";
import EventTypes from "../../ava/constants/EventTypes.js";

export default class ShowHideDrawersLogic extends Logic
{
    constructor()
    {
        super();
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
        this.listen( UIDS.OVERLAY, EventTypes.TRIGGERED, this.overlayTriggered.bind( this ) );
    }
    clicked( e )
    {
        let linkIconButton = ClickTargetUtil.getLinkIconButtonFromTarget( e.target );
        if( linkIconButton )
        {
            let href = linkIconButton.href;
            this.openDrawerFromHref( href );
        }
        else
        {
            let iconButton = ClickTargetUtil.getIconButtonFromTarget( e.target );
            if( iconButton )
            {
                if( iconButton.uid === UIDS.DRAWER_CLOSE_BUTTON )
                {
                    this.hideAllDrawers();
                }
            }
        }
    }
    openDrawerFromHref( href )
    {
        let drawerUid;
        if( href.indexOf( Paths.TRAILERS ) != -1 )
        {
            drawerUid = UIDS.TRAILERS_DRAWER;
        }
        else if( href.indexOf( Paths.MOVIES ) != -1 )
        {
            drawerUid = UIDS.MOVIES_DRAWER;
        }
        else if( href.indexOf( Paths.ACTORS ) != -1 )
        {
            drawerUid = UIDS.ACTORS_DRAWER;
        }
        if( drawerUid )
        {
            this.isDrawerShown( drawerUid, true );
            this.isOverlayShown( true );
        }
    }
    overlayTriggered()
    {
        this.isOverlayShown( false );
        this.hideAllDrawers();
    }
    hideAllDrawers()
    {
        this.isDrawerShown( UIDS.TRAILERS_DRAWER, false );
        this.isDrawerShown( UIDS.MOVIES_DRAWER, false );
        this.isDrawerShown( UIDS.ACTORS_DRAWER, false );
        this.isOverlayShown( false );
    }
    isOverlayShown( value )
    {
        this.setProperty( UIDS.OVERLAY, Properties.IS_SHOWN, value );
    }
    isDrawerShown( uid, value )
    {
        this.setProperty( uid, Properties.IS_SHOWN, value );
    }
}