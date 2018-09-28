import BaseBehavior from "./base/BaseBehavior.js";
import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
export default class ActorInfoBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        const len = pathArray.length;
        if( len === 2 )
        {
            if( path.indexOf( Paths.ACTORS ) === 0 )
            {
                this.showActorInfo( pathArray[ 1 ] );
            }
            else
            {
                this.hideActorInfo();
            }
        }
        else
        {
            this.hideActorInfo();
        }
    }
    showActorInfo( path )
    {
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.IS_SHOWN, true );
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.PATH, path );
    }
    hideActorInfo()
    {
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.IS_SHOWN, false );
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.PATH, null );
    }
}