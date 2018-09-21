import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import UIDS from "../app/consts/UIDS.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import Events from "../app/consts/Events.js";
import Paths from "../app/consts/Paths.js";
import Properties from "../app/consts/Properties.js";
export default class TopNavigationLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.alc.bind( this ) );
        window.addEventListener( Events.POP_STATE, this.popped.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    alc()
    {
        this.setBottomAndScreenIndex( window.location.pathname );
    }
    popped()
    {
        this.setBottomAndScreenIndex( window.location.pathname );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            if( window.location.pathname !== path )
            {
                history.pushState( null, null, path ); 
                this.setBottomAndScreenIndex( path );
            }
        }
    }
    setBottomAndScreenIndex( path )
    {
        let index;
        if( path === Paths.ROOT || path.indexOf( Paths.TRAILERS ) !== -1 )
        {
            index = 0;
        }
        else if( path.indexOf( Paths.MOVIES ) !== -1 )
        {
            index = 1;
        }
        else if( path.indexOf( Paths.ACTORS ) !== -1 )
        {
            index = 2;
        }
        if( index > -1 )
        {
            this.setProperty( UIDS.BOTTOM_NAVIGATION_BAR, Properties.SELECTED_INDEX, index );
            this.setProperty( UIDS.SCREENS_NAVIGATOR, Properties.SELECTED_INDEX, index );
        }
        this.setIconButtonsVisibility( index );
    }
    setIconButtonsVisibility( index )
    {
        this.setProperty( UIDS.TRAILERS_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 0 );
        this.setProperty( UIDS.TRAILERS_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 0 );
        this.setProperty( UIDS.MOVIES_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 1 );
        this.setProperty( UIDS.MOVIES_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 1 );
        this.setProperty( UIDS.ACTORS_SORT_ICON_BUTTON, Properties.IS_VISIBLE, index === 2 );
        this.setProperty( UIDS.ACTORS_DRAWER_ICON_BUTTON, Properties.IS_VISIBLE, index === 2 );
    }
}