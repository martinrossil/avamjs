import Logic from "../../ava/logic/Logic.js";
import UIDS from "../app/consts/UIDS.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Events from "../app/consts/Events.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import Paths from "../app/consts/Paths.js";
import Filters from "../app/consts/Filters.js";
import Properties from "../app/consts/Properties.js"
export default class AppBarUILinkLogic extends Logic
{
    constructor()
    {
        super();
        this.setInitialFilters();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        window.addEventListener( Events.POP_STATE, this.popped.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    setInitialFilters()
    {
        this.currentTrailersFilter      = Filters.GENRES;
        this.currentTrailersSubFilter   = Filters.ALL;
        this.currenMoviesFilter         = Filters.GENRES;
        this.currenMoviesSubFilter      = Filters.ALL;
        this.currentActorsFilter        = Filters.COUNTRIES;
        this.currentActorsSubFilter     = Filters.ALL;
    }
    popped()
    {
        this.setFilterHrefFromPath( window.location.pathname );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            this.setFilterHrefFromPath( path );
        }
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
        this.setFilterHrefFromPath( path );
    }
    setFilterHrefFromPath( path )
    {
        let href;
        if( path === Paths.ROOT || path.indexOf( Paths.TRAILERS ) != -1 )
        {
            href = Paths.TRAILERS + "/" + this.currentTrailersFilter;// + "/" + this.currentTrailersSubFilter;
        }
        else if( path.indexOf( Paths.MOVIES ) != -1 )
        {
            href = Paths.MOVIES + "/" + this.currenMoviesFilter;;// + "/" + this.currenMoviesSubFilter;
        }
        else if( path.indexOf( Paths.ACTORS ) != -1 )
        {
            href = Paths.ACTORS + "/" + this.currentActorsFilter;// + "/" + this.currentActorsSubFilter;
        }
        if( href )
        {
            this.setProperty( UIDS.OPEN_FILTER_DRAWER_LINK_ICON_BUTTON, Properties.HREF, href );
        }
    }
}