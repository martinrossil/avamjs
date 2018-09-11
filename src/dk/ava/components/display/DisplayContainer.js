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
        this.appendChild( frag );
    }
    addElement( displayElement )
    {
        this.appendChild( displayElement );
    }
    removeElement( displayElement )
    {
        this.removeChild( displayElement );
    }
    removeAllChildElements()
    {
        let lastElement;
        while( lastElement = this.lastChild )
        {
            this.removeChild( lastElement );
        }
    }
    containsElement( element )
    {
        return this.contains( element );
    }
    getElementAt( index )
    {
        return this.childNodes[ index ];
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
        return this.hasChildNodes();
    }
    get childElements()
    {
        return this.childNodes;
    }
    get numElements()
    {
        return this.childNodes.length;
    }
    set clipContent( value )
    {
        if( this._clipContent !== value )
        {
            this._clipContent = value;
            this.style.overflow = value ? "hidden" : ""; 
        }
    }
    get clipContent()
    {
        return this._clipContent;
    }
}
customElements.define("display-container", DisplayContainer);