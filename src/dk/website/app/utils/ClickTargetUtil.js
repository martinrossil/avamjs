import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
export default class ClickTargetUtil
{
    constructor()
    {
    }
    static getATagFromTarget( target )
    {
        if( target instanceof HTMLAnchorElement )
        {
            return target;
        }
        else if( target instanceof HTMLDocument )
        {
            return null;
        }
        else
        {
            return this.getATagFromTarget( target.parentNode );
        }
    }
    static getIconButtonFromTarget( target )
    {
        if( target instanceof IconButton )
        {
            return target;
        }
        else if( target instanceof HTMLDocument )
        {
            return null;
        }
        else
        {
            return this.getIconButtonFromTarget( target.parentNode );
        }
    }
    static getItemRendererFromTarget( target )
    {
        if( target instanceof BaseItemRenderer )
        {
            return target;
        }
        else if( target instanceof HTMLDocument )
        {
            return null;
        }
        else
        {
            return this.getItemRendererFromTarget( target.parentNode );
        }
    }
}