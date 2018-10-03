import BaseBehavior from "./base/BaseBehavior.js";
import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
import ClickTargetUtil from "../utils/ClickTargetUtil.js";
import TrailerItemRenderer from "../itemrenderers/TrailerItemRenderer.js"
import MovieInfoTrailerItemRenderer from "../itemrenderers/MovieInfoTrailerItemRenderer.js";
import ActorInfoTrailerItemRenderer from "../itemrenderers/ActorInfoTrailerItemRenderer.js";
export default class TrailerPlaybackBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    clicked( e )
    {
        let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
        if( itemRenderer instanceof TrailerItemRenderer || 
            itemRenderer instanceof MovieInfoTrailerItemRenderer ||
            itemRenderer instanceof ActorInfoTrailerItemRenderer )
        {
            let data = itemRenderer.data;
            this.setProperty( UIDS.TRAILER_DIALOG, Properties.IS_SHOWN, true );
            this.setProperty( UIDS.TRAILER_DIALOG, Properties.DATA, data );
        }
    }
    pathChanged( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        const len = pathArray.length;
        if( len === 2 )
        {
            if( path.indexOf( Paths.TRAILERS ) === 0 )
            {
                this.isTrailerDialogShown( true, path );
            }
            else
            {
                this.isTrailerDialogShown( false, null );
            }
        }
        else
        {
            this.isTrailerDialogShown( false, null );
        }
    }
    isTrailerDialogShown( isShown, path )
    {
        this.setProperty( UIDS.TRAILER_DIALOG, Properties.IS_SHOWN, isShown );
        this.setProperty( UIDS.TRAILER_DIALOG, Properties.PATH, path );
    }
}