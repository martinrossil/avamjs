import ComCenter from "./ComCenter.js";
export default class Logic
{
    constructor()
    {
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