import Logic from "../../../../ava/logic/Logic.js";
import UIDS from "../../consts/UIDS.js";
import EventTypes from "../../../../ava/constants/EventTypes.js";
import Events from "../../consts/Events.js";
import ClickTargetUtil from "../../utils/ClickTargetUtil.js";
export default class BaseBehavior extends Logic
{
    constructor()
    {
        super();
        this.listen( UIDS.APP, EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        window.addEventListener( Events.POP_STATE, this.popped.bind( this ) );
        document.addEventListener( Events.CLICK, this.clicked.bind( this ) );
    }
    pathChanged( path )
    {
        // overide
    }
    popped()
    {
        this.pathChanged( window.location.pathname );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let path = aTag.pathname;
            this.pathChanged( path );
        }
    }
    applicationLoadComplete()
    {
        let path = window.location.pathname;
        this.pathChanged( path );
    }
}