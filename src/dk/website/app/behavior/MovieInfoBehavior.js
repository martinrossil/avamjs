import BaseBehavior from "./base/BaseBehavior.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
import Paths from "../consts/Paths.js";
export default class MovieInfoBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    applicationLoadComplete()
    {
        this.pathChanged( "/film/mission-impossible-fallout(2018)" );
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        const len = pathArray.length;
        if( len === 2 )
        {
            if( path.indexOf( Paths.MOVIES ) === 0 )
            {
                this.showMovieInfo( pathArray[ 1 ] );
            }
            else
            {
                this.hideMovieInfo();
            }
        }
        else
        {
            this.hideMovieInfo();
        }
    }
    showMovieInfo( path )
    {
        this.setProperty( UIDS.MOVIE_DIALOG, Properties.IS_SHOWN, true );
        this.setProperty( UIDS.MOVIE_DIALOG, Properties.PATH, path );
    }
    hideMovieInfo()
    {
        this.setProperty( UIDS.MOVIE_DIALOG, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.MOVIE_DIALOG, Properties.PATH, null );
    }
}