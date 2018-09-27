import Paths from "../consts/Paths.js";
import UIDS from "../consts/UIDS.js";
export default class PathUtil
{
    static getSubFilter( path )
    {
        let pathSplit = path.split( "/" );
        pathSplit.shift();
        if( pathSplit.length > 2 )
        {
            return "/" + pathSplit[ 2 ];
        }
        return null;
    }
    static getFilter( path )
    {
        let pathSplit = path.split( "/" );
            pathSplit.shift();
        if( pathSplit.length > 1 )
        {
            return "/" + pathSplit[ 1 ];
        }
        return null;
    }
    static getTop( path )
    {
        if( path === Paths.ROOT )
        {
            return Paths.ROOT;
        }
        else if( path.indexOf( Paths.TRAILERS ) != -1 )
        {
            return Paths.TRAILERS;
        }
        else if( path.indexOf( Paths.MOVIES ) != -1 )
        {
            return Paths.MOVIES;
        }
        else if( path.indexOf( Paths.ACTORS ) != -1 )
        {
            return Paths.ACTORS;
        }
        return null;
    }
    static getTopNavigationIndex( path )
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
    static getListUid( path )
    {
        if( path === Paths.ROOT )
        {
            return UIDS.TRAILERS_LIST;
        }
        else if( path.indexOf( Paths.TRAILERS ) != -1 )
        {
            return UIDS.TRAILERS_LIST;
        }
        else if( path.indexOf( Paths.MOVIES ) != -1 )
        {
            return UIDS.MOVIES_LIST;
        }
        else if( path.indexOf( Paths.ACTORS )!= -1 )
        {
            return UIDS.ACTORS_LIST;
        }
        return null;
    }
    static getFilterListUid( path )
    {
        let uid;
        if( path === Paths.TRAILERS_GENRES )
        {
            uid = UIDS.TRAILERS_GENRES_LIST;
        }
        else if( path === Paths.TRAILERS_COUNTRIES )
        {
            uid = UIDS.TRAILERS_COUNTRIES_LIST;
        }
        else if( path === Paths.MOVIES_GENRES )
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
}