import ComCenter from "./ComCenter.js";
export default class Logic
{
    constructor()
    {
    }
    dispatch( uid, type, data = null )
    {
        ComCenter.dispatch( uid, type, data );
    }
    listen( uid, type, listener )
    {
        ComCenter.listen( uid, type, listener );
    }
    setProperty( uid, property, value )
    {
        ComCenter.setProperty( uid, property, value );
    }
}