import ArrayCollection from "../../ava/data/ArrayCollection.js";
export default class Model
{
    constructor()
    {

    }
    static get trailersCollection()
    {
        if( !this._trailersCollection )
        {
            this._trailersCollection = new ArrayCollection();
        }
        return this._trailersCollection;
    }
    static get moviesCollection()
    {
        if( !this._moviesCollection )
        {
            this._moviesCollection = new ArrayCollection();
        }
        return this._moviesCollection;
    }
    static get actorsCollection()
    {
        if( !this._actorsCollection )
        {
            this._actorsCollection = new ArrayCollection();
        }
        return this._actorsCollection;
    }
}