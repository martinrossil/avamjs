import BaseBehavior from "./base/BaseBehavior.js";
import Paths from "../consts/Paths.js";
import Strings from "../consts/Strings.js";
import UIDS from "../consts/UIDS.js";
import Properties from "../consts/Properties.js";
export default class HistoryBehavior extends BaseBehavior
{
    constructor()
    {
        super();
    }
    pathChanged( path )
    {
        if( path !== window.location.pathname )
        {
            history.pushState( null, null, path );
        }
        this.setDocumentAndAppTitle( path );
    }
    setDocumentAndAppTitle( path )
    {
        if( path === Paths.ROOT || path === Paths.TRAILERS )
        {
            this.setTitles( Strings.TRAILERS );
        }
        else if( path === Paths.MOVIES )
        {
            this.setTitles( Strings.MOVIES );
        }
        else if( path === Paths.ACTORS )
        {
            this.setTitles( Strings.ACTORS );
        }
    }
    setTitles( title )
    {
        document.title = title;
        this.setProperty( UIDS.APP_BAR, Properties.TITLE, title );
    }
}