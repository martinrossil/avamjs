import BaseBehavior from "./base/BaseBehavior.js";
import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
import ClickTargetUtil from "../utils/ClickTargetUtil.js";
export default class TrailerPlaybackBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    clicked( e )
    {
        //super.clicked( e );
        
        let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
        console.log( "TrailerPlaybackBehavior", "clicked", itemRenderer );
    }
    pathChanged( path )
    {
        console.log( "TrailerPlaybackBehavior", "pathChanged", path );
        let pathArray = path.split( "/" );
            pathArray.shift();
        const len = pathArray.length;
        if( len === 2 )
        {
            if( path.indexOf( Paths.TRAILERS ) === 0 )
            {
                this.setProperty( UIDS.TRAILER_DIALOG, Properties.IS_SHOWN, true );
                this.setProperty( UIDS.TRAILER_DIALOG, Properties.PATH, path );
            }
        }
        else
        {
            this.setProperty( UIDS.TRAILER_DIALOG, Properties.IS_SHOWN, false );
            this.setProperty( UIDS.TRAILER_DIALOG, Properties.PATH, null );
        }
    }
}