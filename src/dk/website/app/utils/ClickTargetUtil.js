import BaseItemRenderer from "../../../ava/components/itemrenderers/BaseItemRenderer.js";
import IconButton from "../../../ava/components/buttons/IconButton.js";
import LinkItemRenderer from "../itemrenderers/base/LinkItemRenderer.js";
import BottomNavigationBarItemRenderer from "../../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
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
    static getLinkItemRendererFromTarget( target )
    {
        if( target instanceof LinkItemRenderer )
        {
            return target;
        }
        else if( target instanceof HTMLDocument )
        {
            return null;
        }
        else
        {
            return this.getLinkItemRendererFromTarget( target.parentNode );
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
    static getBottomNavigationBarItemRendererFromTarget( target )
    {
        if( target instanceof BottomNavigationBarItemRenderer )
        {
            return target;
        }
        else if( target instanceof HTMLDocument )
        {
            return null;
        }
        else
        {
            return this.getBottomNavigationBarItemRendererFromTarget( target.parentNode );
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