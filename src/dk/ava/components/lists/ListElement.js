import ScrollContainer from "../display/ScrollContainer.js";
import CollectionEventTypes from "../../constants/CollectionEventTypes.js";
import ScrollDirection from "../../constants/ScrollDirection.js";
import EventTypes from "../../constants/EventTypes.js";
export default class ListElement extends ScrollContainer
{
    constructor()
    {
        super();
    }
    selectedIndexChanged()
    {
        if( this.selectedIndex != -1 )
        {
            if( this.dataProvider && this.dataProvider.length > this.selectedIndex )
            {
                let data = this.dataProvider.getItemAt( this.selectedIndex );
                if( data )
                {
                    let itemRenderers = this.childElements;
                    let itemRenderer;
                    for( itemRenderer of itemRenderers )
                    {
                        itemRenderer.isSelected = itemRenderer.data === data;
                    }
                }
                else
                {
                    this.unSelectAllItemRenderers();
                }
            }
            else
            {
                this.unSelectAllItemRenderers();
            }
        }
        else
        {
            this.unSelectAllItemRenderers();
        }
    }
    unSelectAllItemRenderers()
    {
        let itemRenderers = this.childElements;
        let itemRenderer;
        for( itemRenderer of itemRenderers )
        {
            itemRenderer.isSelected = false;
        }
    }
    initialize()
    {
        super.initialize();
        this.reset          = this.reset.bind( this );
        this.itemAdded      = this.itemAdded.bind( this );
        this.itemsAdded     = this.itemsAdded.bind( this );
        this.itemRemovedAt  = this.itemRemovedAt.bind( this );
        this.itemRemoved    = this.itemRemoved.bind( this );
        this._selectedIndex = -1;
        this.lastScrollPosition = 0;
        this.requestTick();
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
        let sp = this.scrollPosition;
        if( this.lastScrollPosition !== sp ) 
        {
            if( this.lastScrollPosition < sp ) 
            {
                this.scrollDirection = ScrollDirection.UP;
            }
            else
            {
                this.scrollDirection = ScrollDirection.DOWN;
            }
            this.lastScrollPosition = sp;
            this.setItemRenderersInViewPort();
            this.setIsOnLastScreen();
        }
    }
    setIsOnLastScreen()
    {
        this.isOnLastScreen = this.scrollPosition > ( this.elementsContainer.height - 2 * this.height );
    }
    setItemRenderersInViewPort()
    {
        let itemRenderers = this.childElements;
        let itemRenderer;
        let height = this.height;
        let scrollPosition = this.scrollTop;
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
        this.setIsOnLastScreen();
    }
    dataProviderChanged()
    {
        this.removeAllChildElements();
        if( this.dataProvider && this.dataProvider.length > 0 && this.itemRenderType )
        {
            this.itemsAdded( this.dataProvider.arrayData );
        }
        this.selectedIndexChanged();
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
    set isOnLastScreen( value )
    {
        if( this._isOnLastScreen !== value )
        {
            this._isOnLastScreen = value;
            this.dispatch( EventTypes.IS_ON_LAST_SCREEN_CHANGED, value );
        }
    }
    get isOnLastScreen()
    {
        return this._isOnLastScreen;
    }
    get scrollPosition()
    {
        return this.scrollTop;
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
    set selectedIndex( value )
    {
        if( this._selectedIndex !== value )
        {
            this._selectedIndex = value;
            this.selectedIndexChanged();
        }
    }
    get selectedIndex()
    {
        return this._selectedIndex;
    }
}
customElements.define("list-element", ListElement ); 