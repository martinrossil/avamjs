import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import UIDS from "../app/UIDS.js";
export default class HistoryLogic extends Logic
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
        this.setTitle( path );
        this.setTopLevel( path );
    }
    popped()
    {
        let path = window.location.pathname;
        console.log( "HistoryLogic", "popped", path );
        this.setTitle( path );
        this.setTopLevel( path );
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
                this.setTitle( path );
                this.setTopLevel( path );
            }
        }
    }
    setTopLevel( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        let len = pathArray.length;    
        if( len === 0 || len === 1 )
        {
            let index = this.getTopLevelIndex( pathArray );
            this.setIndex( index );
        }   
    }
    setIndex( index )
    {
        this.setProperty( "bottomNavigationBar", "selectedIndex", index );
        this.setProperty( "screensNavigator", "selectedIndex", index );
    }
    getTopLevelIndex( pathArray )
    {
        if( pathArray.length === 0 )
        {
            return 0;
        }
        else
        {
            let top = pathArray[ 0 ];
            if( !top ){ return 0 };
            if( top === "trailers" ){ return 0 };
            if( top === "film" ){ return 1 };
            return 2;
        }
    }
    setTitle( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        let title = "";    
        let frag;
        let first;
        let i = 0;
        for( ; i < pathArray.length; i++ )
        {
            frag = pathArray[ i ];
            first = frag.charAt( 0 ).toUpperCase();
            title += first + frag.substr( 1 );
            if( i < ( pathArray.length - 1 ) )
            {
                title += " / ";
            }
        }
        if( !title )
        {
            title = "Trailers";
        }
        document.title = title;
        this.setProperty( "appBar", "title", title );
    }
}