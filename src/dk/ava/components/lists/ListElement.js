import ScrollContainer from "../display/ScrollContainer.js";
import CollectionEventTypes from "../../constants/CollectionEventTypes.js";
import ScrollDirection from "../../constants/ScrollDirection.js";
import EventTypes from "../../constants/EventTypes.js";
export default class ListElement extends ScrollContainer
{
    constructor()
    {
        super();
        this.reset          = this.reset.bind( this );
        this.itemAdded      = this.itemAdded.bind( this );
        this.itemsAdded     = this.itemsAdded.bind( this );
        this.itemRemovedAt  = this.itemRemovedAt.bind( this );
        this.itemRemoved    = this.itemRemoved.bind( this );
    }
    initialize()
    {
        super.initialize();
        //this.itemRendererTriggered = this.itemRendererTriggered.bind( this );
        this.lastScrollPosition = 0;
        this.requestTick();
        //this.div.addEventListener( EventTypes.TRIGGERED, this.itemRendererTriggered );
    }
    itemRendererTriggered( e )
    {
    }
    requestTick()
    {
        this.requestAnimationFrame( this.animationTick.bind( this ) );
    }
    animationTick( e )
    {
        setTimeout( this.requestTick.bind( this ), 150 );
        this.scrolling();
    }
    scrolling()
    {
        let scrollPosition = this.div.scrollTop;
        if( this.lastScrollPosition !== scrollPosition ) 
        {
            if( this.lastScrollPosition < scrollPosition ) 
            {
                this.scrollDirection = ScrollDirection.UP;
            }
            else
            {
                this.scrollDirection = ScrollDirection.DOWN;
            }
            this.lastScrollPosition = scrollPosition;
            this.setItemRenderersInViewPort();
        }
    }
    setItemRenderersInViewPort()
    {
        let itemRenderers = this.childElements;
        let itemRenderer;
        let height = this.height;
        let scrollPosition = this.div.scrollTop;
        let min = scrollPosition - 2 * height;
        let max = scrollPosition + 2 * height
        let y;
        for( itemRenderer of itemRenderers )
        {
            y = itemRenderer.y;
            if( y > min && y < max )
            {
                itemRenderer.isInViewPort = true;
            }
            else
            {
                itemRenderer.isInViewPort = false;
            }
        }
    }
    reset( data )
    {
        this.removeAllChildElements();
        this.itemsAdded( data );
    }
    itemAdded( data )
    {
        let item = this.dataProvider.getItemAt( data );
        if( this.itemRenderType )
        {
            this.addItemRenderer( item );
        }
    }
    itemRemovedAt( data )
    {
        // TODO
    }
    itemRemoved( data )
    {
        // TODO
    }
    addItemRenderer( item )
    {
        let itemRenderer = new this.itemRenderType();
            itemRenderer.data = item;
        this.addElement( itemRenderer );    
    }
    itemsAdded( items )
    {
        if( this.itemRenderType )
        {
            let elements = [];
            let item;
            let itemRenderer;
            for( item of items )
            {
                itemRenderer = new this.itemRenderType();
                itemRenderer.data = item;
                elements.push( itemRenderer );
            }
            this.addElements( elements );
        }
        this.setItemRenderersInViewPort();
    }
    dataProviderChanged()
    {
        this.removeAllChildElements();
        if( this.dataProvider && this.dataProvider.length > 0 && this.itemRenderType )
        {
            this.itemsAdded( this.dataProvider.arrayData );
        }
    }
    set itemRenderType( value )
    {
        if( this._itemRenderType != value )
        {
            this._itemRenderType = value;
            if( value && this.dataProvider && this.dataProvider.length > 0 )
            {
                this.itemsAdded( this.dataProvider.arrayData );
            }
        }
    }
    get itemRenderType()
    {
        return this._itemRenderType; 
    }
    set dataProvider( value )
    {
        if( this._dataProvider != value )
        {
            if( this._dataProvider )
            {
                this._dataProvider.unListen( CollectionEventTypes.RESET, this.reset );
                this._dataProvider.unListen( CollectionEventTypes.ITEM_ADDED, this.itemAdded );
                this._dataProvider.unListen( CollectionEventTypes.ITEMS_ADDED, this.itemsAdded );
                this._dataProvider.unListen( CollectionEventTypes.ITEM_REMOVED_AT, this.itemRemovedAt );
                this._dataProvider.unListen( CollectionEventTypes.ITEM_REMOVED, this.itemRemoved ); 
            }
            this._dataProvider = value;
            this._dataProvider.listen( CollectionEventTypes.RESET, this.reset );
            this._dataProvider.listen( CollectionEventTypes.ITEM_ADDED, this.itemAdded );
            this._dataProvider.listen( CollectionEventTypes.ITEMS_ADDED, this.itemsAdded );
            this._dataProvider.listen( CollectionEventTypes.ITEM_REMOVED_AT, this.itemRemovedAt );
            this._dataProvider.listen( CollectionEventTypes.ITEM_REMOVED, this.itemRemoved );
            this.dataProviderChanged();
        }
    }
    get dataProvider()
    {
        return this._dataProvider;
    }
    set scrollDirection( value )
    {
        if( this._scrollDirection !== value )
        {
            this._scrollDirection = value;
            this.dispatch( EventTypes.SCROLL_DIRECTION_CHANGED, value );
        }
    }
    get scrollDirection()
    {
        return this._scrollDirection;
    }
    get requestAnimationFrame()
    {
        if( !this._requestAnimationFrame )
        {
            this._requestAnimationFrame =   window.requestAnimationFrame.bind( window ) || 
                                            window.mozRequestAnimationFrame.bind( window ) ||
                                            window.webkitRequestAnimationFrame.bind( window ) || 
                                            window.msRequestAnimationFrame.bind( window );
        }
        return this._requestAnimationFrame;
    }
}
customElements.define("list-element", ListElement ); 