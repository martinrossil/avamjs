import BaseEventDispatcher from "./BaseEventDispatcher.js";
export default class BaseElement extends BaseEventDispatcher
{
    constructor()
    {
        super();
        this.initialize();
    }
    initialize()
    {
        // override
    }
    connectedCallback()
	{
        // override
    }
    disconnectedCallback()
    {
        // override
    }
}
customElements.define( "base-element", BaseElement );