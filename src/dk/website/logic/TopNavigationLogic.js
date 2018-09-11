import Logic from "../../ava/logic/Logic.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import UIDS from "../app/UIDS.js";
export default class TopNavigationLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.alc.bind( this ) );
        window.addEventListener( "popstate", this.popped.bind( this ) );
        document.addEventListener( "click", this.clicked.bind( this ) );
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
        if( path === "/" || path.indexOf( "/trailers" ) !== -1 )
        {
            index = 0;
        }
        else if( path.indexOf( "/film" ) !== -1 )
        {
            index = 1;
        }
        else if( path.indexOf( "/skuespillere" ) !== -1 )
        {
            index = 2;
        }
        if( index > -1 )
        {
            this.setProperty( "bottomNavigationBar", "selectedIndex", index );
            this.setProperty( "screensNavigator", "selectedIndex", index );
        }
        this.setIconButtonsVisibility( index );
    }
    setIconButtonsVisibility( index )
    {
        this.setProperty( "trailersSortIconButton", "isVisible", index === 0 );
        this.setProperty( UIDS.TRAILERS_DRAWER_ICON_BUTTON, "isVisible", index === 0 );
        this.setProperty( "moviesSortIconButton", "isVisible", index === 1 );
        this.setProperty( "moviesDrawerIconButton", "isVisible", index === 1 );
        this.setProperty( "actorsSortIconButton", "isVisible", index === 2 );
        this.setProperty( "actorsDrawerIconButton", "isVisible", index === 2 );
    }
}