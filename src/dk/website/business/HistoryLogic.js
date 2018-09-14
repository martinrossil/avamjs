import Logic from "../../ava/logic/Logic.js";
import Events from "../app/consts/Events.js";
import ClickTargetUtil from "../app/utils/ClickTargetUtil.js";
import Util from "../app/utils/Util.js";
import UIDS from "../app/consts/UIDS.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import Paths from "../app/consts/Paths.js";
export default class HistoryLogic extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
        if( path === Paths.ROOT )
        {
            path = Paths.TRAILERS;
            history.pushState( null, null, path );
            this.setDocumentTitleFromPath( path );
        }
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            if( path !== window.location.pathname )
            {
                history.pushState( null, null, path );
                this.setDocumentTitleFromPath( path );
            }
        }
    }
    setDocumentTitleFromPath( path )
    {
        document.title = Util.getTitleFromPath( path );
    }
}