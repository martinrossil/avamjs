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
    applicationLoadComplete()
    {
        //this.pathChanged( "/skuespillere/tom-cruise(1962)" );
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
                this.isActorInfoShown( true, pathArray[ 1 ] );
            }
            else
            {
                this.isActorInfoShown( false, null );
            }
        }
        else
        {
            this.isActorInfoShown( false, null );
        }
    }
    isActorInfoShown( isShown, path )
    {
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.IS_SHOWN, isShown );
        this.setProperty( UIDS.ACTOR_DIALOG, Properties.PATH, path );
    }
}