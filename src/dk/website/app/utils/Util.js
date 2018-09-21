import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
export default class Util
{
    constructor()
    {
    }
    static getFilterListUidFromPath( path )
    {
        let uid;
        if( path === Paths.TRAILERS_GENRER )
        {
            uid = UIDS.TRAILERS_GENRES_LIST;
        }
        else if( path === Paths.TRAILERS_COUNTRIES )
        {
            uid = UIDS.TRAILERS_COUNTRIES_LIST;
        }
        else if( path === Paths.MOVIES_GENRER )
        {
            uid = UIDS.MOVIES_GENRES_LIST;
        }
        else if( path === Paths.MOVIES_COUNTRIES )
        {
            uid = UIDS.MOVIES_COUNTRIES_LIST;
        }
        else if( path === Paths.ACTORS_COUNTRIES )
        {
            uid = UIDS.ACTORS_COUNTRIES_LIST;
        }
        return uid;
    }
    static getTopIndex( top )
    {
        let index = 0;
        if( top === "" || top === "trailers" )
        {
            index = 0;
        }
        else if( top === "film" )
        {
            index = 1;
        }
        else if( top === "skuespillere" )
        {
            index = 2;
        }
        return index;
    }
    static getMoviesFilterListIndexFromPath( path )
    {
        if( path.indexOf( Paths.MOVIES_GENRER ) != -1 )
        {
            return 0;
        }
        else if( path.indexOf( Paths.MOVIES_COUNTRIES ) != -1 )
        {
            return 1;
        }
        return 0;
    }
    static getTrailersFilterListIndexFromPath( path )
    {
        if( path.indexOf( Paths.TRAILERS_GENRER ) != -1 )
        {
            return 0;
        }
        else if( path.indexOf( Paths.TRAILERS_COUNTRIES ) != -1 )
        {
            return 1;
        }
        return 0;
    }
    static getTopNavigationIndexFromPath( path )
    {
        if( path === Paths.ROOT )
        {
            return 0;
        }
        else if( path.indexOf( Paths.TRAILERS ) !== -1  )
        {
            return 0;
        }
        else if( path.indexOf( Paths.MOVIES ) !== -1 )
        {
            return 1;
        }
        else if( path.indexOf( Paths.ACTORS ) !== -1 )
        {
            return 2;
        }
        return 0;
    }
    static getTitleFromPath( path )
    {
        let pathArray = path.split( "/" );
            pathArray.shift();
        let title = "";    
        let frag;
        let first;
        let i = 0;
        for( ; i < pathArray.length; i++ )
        {
            frag = pathArray[ i ];
            first = frag.charAt( 0 ).toUpperCase();
            title += first + frag.substr( 1 );
            if( i < ( pathArray.length - 1 ) )
            {
                title += " / ";
            }
        }
        if( !title )
        {
            title = "Trailers";
        }
        return title;
    }
    static getImageSize( w )
    {
        if( w < 240 )
        {
            return 240;
        }
        else if( w < 320 )
        {
            return 320;
        }
        else if( w < 400 )
        {
            return 400;
        }
        else if( w < 480 )
        {
            return 480;
        }
        return 560;
    }
}