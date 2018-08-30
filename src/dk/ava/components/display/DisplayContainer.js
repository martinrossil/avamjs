import DisplayElement from "./DisplayElement.js";
export default class DisplayContainer extends DisplayElement
{
    constructor()
    {
        super(); 
    }
    initialize()
    {
        super.initialize();
    }
    addElements( elements )
    {
        let frag = document.createDocumentFragment();
        let len = elements.length;
        let i;
        let element;
        for( i = 0; i < len; i++ )
        {
            element = elements[ i ];
            frag.appendChild( element );
        }
        this.div.appendChild( frag );
    }
    addElement( displayElement )
    {
        this.div.appendChild( displayElement );
    }
    removeElement( displayElement )
    {
        this.div.removeChild( displayElement );
    }
    removeAllChildElements()
    {
        let lastElement;
        while( lastElement = this.div.lastChild )
        {
            this.div.removeChild( lastElement );
        }
    }
    containsElement( element )
    {
        return this.div.contains( element );
    }
    getElementAt( index )
    {
        return this.div.childNodes[ index ];
    }
    getElementIndex( element )
    {
        let childNodes = this.childElements;
        let len = childNodes.length;
        let i;
        let child;
        for( i = 0; i < len; i++ )
        {
            child = childNodes[ i ];
            if( child === element )
            {
                return i;
            }
        }
        return -1;
    }
    get hasElements() 
    {
        return this.div.hasChildNodes();
    }
    get childElements()
    {
        return this.div.childNodes;
    }
    get numElements()
    {
        return this.div.childNodes.length;
    }
    set clipContent( value )
    {
        if( this._clipContent !== value )
        {
            this._clipContent = value;
            this.div.style.overflow = value ? "hidden" : ""; 
        }
    }
    get clipContent()
    {
        return this._clipContent;
    }
}
customElements.define("display-container", DisplayContainer);