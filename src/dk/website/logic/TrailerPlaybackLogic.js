import Logic from "../../ava/logic/Logic.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import VideoItemRenderer from "../app/itemrenderers/VideoItemRenderer.js";
export default class TrailerPlaybackLogic extends Logic
{
    constructor()
    {
        super();
        document.addEventListener( "click", this.clicked.bind( this ) );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
            if( itemRenderer )
            {
                if( itemRenderer instanceof VideoItemRenderer )
                {
                    this.setProperty( "trailerDialog", "isShown", true );
                    this.setProperty( "trailerDialog", "data", itemRenderer.data );
                }
            }
            else
            {
                let iconButton = ClickTargetUtil.getIconButtonFromTarget( e.target );
                if( iconButton )
                {
                    if( iconButton.href === "/trailers/" )
                    {
                        this.setProperty( "trailerDialog", "isShown", false );
                    }
                }
            }
        }
    }
}