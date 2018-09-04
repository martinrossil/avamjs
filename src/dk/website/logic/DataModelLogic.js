import Logic from "../../ava/logic/Logic.js";
import JSONLoader from "../../ava/loaders/JSONLoader.js";
import EventTypes from "../../ava/constants/EventTypes.js";
import ClickTargetUtil from "../ClickTargetUtil.js";
import GenreItemRenderer from "../app/itemrenderers/GenreItemRenderer.js";
import ArrayCollection from "../../ava/data/ArrayCollection.js";
import CountryItemRenderer from "../app/itemrenderers/CountryItemRenderer.js";
import BottomNavigationBarItemRenderer from "../../ava/components/itemrenderers/BottomNavigationBarItemRenderer.js";
import FilterTypeItemRenderer from "../app/itemrenderers/FilterTypeItemRenderer.js";
export default class DataModelLogic extends Logic
{
    constructor()
    {
        super();
        this.currentSort = "sortedByCreated";
        this.currentGenre = "alle";
        this.currentCountry = "alle";
        document.addEventListener( "click", this.clicked.bind( this ) );
        this.listen( "AvaApp", EventTypes.APPLICATION_LOAD_COMPLETE, this.applicationLoadComplete.bind( this ) );
        this.listen( "moviesList", EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.moviesListIsOnLastScreenChanged.bind( this ) );
        this.listen( "videosList", EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.videosListIsOnLastScreenChanged.bind( this ) );
        this.listen( "actorsList", EventTypes.IS_ON_LAST_SCREEN_CHANGED, this.actorsListIsOnLastScreenChanged.bind( this ) );
    }
    clicked( e )
    {
        let aTag = ClickTargetUtil.getATagFromTarget( e.target );
        if( aTag )
        {
            e.preventDefault();
            let iconButton = ClickTargetUtil.getIconButtonFromTarget( e.target );
            if( iconButton )
            {
                this.iconButtonClicked( iconButton.href );
            }
            else
            {
                let itemRenderer = ClickTargetUtil.getItemRendererFromTarget( e.target );
                if( itemRenderer )
                {
                    if( itemRenderer instanceof GenreItemRenderer )
                    {
                        this.genreItemRendererClicked( itemRenderer.data );
                    }
                    else if( itemRenderer instanceof CountryItemRenderer )
                    {
                        this.countryItemRendererClicked( itemRenderer.data );
                    }
                    else if( itemRenderer instanceof BottomNavigationBarItemRenderer )
                    {
                        this.bottomNavigationItemRendererClicked( itemRenderer.data.href );
                    }
                    else if( itemRenderer instanceof FilterTypeItemRenderer )
                    {
                        this.filterTypeItemRendererClicked( itemRenderer.data.href );
                    }
                }
            }
        }
    }
    filterTypeItemRendererClicked( href )
    {
        console.log( "filterTypeItemRendererClicked", href );
        if( href === "/trailers/genrer" )
        {
            this.setProperty( "trailersFilterTypesList", "selectedIndex", 0 );

            this.setProperty( "trailersGenresList", "isVisible", true );
            this.setProperty( "trailersGenresList", "isInteractive", true );
            this.setProperty( "trailersCountriesList", "isVisible", false );
            this.setProperty( "trailersCountriesList", "isInteractive", false );
        }
        else if( href === "/trailers/lande" )
        {
            this.setProperty( "trailersFilterTypesList", "selectedIndex", 1 );

            if( !this.loadedPaths[ href ] )
            {
                this.jsonLoader.load( "/data" + href + ".json" );
            }

            this.setProperty( "trailersGenresList", "isVisible", false );
            this.setProperty( "trailersGenresList", "isInteractive", false );
            this.setProperty( "trailersCountriesList", "isVisible", true );
            this.setProperty( "trailersCountriesList", "isInteractive", true );
        }
    }
    moviesListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = "/film/genrer/" + this.currentGenre + "/" + this.currentSort;
            if( this.loadedPaths[ path ] )
            {
                let chunksObject = this.loadedPaths[ path ];
                if( chunksObject.index < chunksObject.total - 1 )
                {
                    this.jsonLoader.load( "/data" + path + "/" + ( chunksObject.index + 1 ) + ".json" );
                }
            }
        }
    }
    videosListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = "/trailers/genrer/" + this.currentGenre + "/" + this.currentSort;
            if( this.loadedPaths[ path ] )
            {
                let chunksObject = this.loadedPaths[ path ];
                if( chunksObject.index < chunksObject.total - 1 )
                {
                    this.jsonLoader.load( "/data" + path + "/" + ( chunksObject.index + 1 ) + ".json" );
                }
            }
        }
    }
    actorsListIsOnLastScreenChanged( isOnLastScreen )
    {
        if( isOnLastScreen )
        {
            let path = "/skuespillere/lande/" + this.currentCountry + "/" + this.currentSort;
            if( this.loadedPaths[ path ] )
            {
                let chunksObject = this.loadedPaths[ path ];
                if( chunksObject.index < chunksObject.total - 1 )
                {
                    this.jsonLoader.load( "/data" + path + "/" + ( chunksObject.index + 1 ) + ".json" );
                }
            }
        }
    }
    bottomNavigationItemRendererClicked( href )
    {
        console.log( href );
        let path;
        if( href === "/trailers" )
        {
            path = href + "/genrer/" + this.currentGenre + "/" + this.currentSort;
        }
        else if( href === "/film" )
        {
            path = href + "/genrer/" + this.currentGenre + "/" + this.currentSort;
        }
        else
        {
            path = href + "/lande/" + this.currentCountry + "/" + this.currentSort;
        }
        console.log( path );
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "/data" + path + "/0.json" );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            if( path.indexOf( "trailers" ) != -1 )
            {
                this.setProperty( "videosList", "dataProvider", chunksObject.collection );
            }
            else if( path.indexOf( "film" ) != -1 )
            {
                this.setProperty( "moviesList", "dataProvider", chunksObject.collection );
            }
            else
            {
                this.setProperty( "actorsList", "dataProvider", chunksObject.collection );
            }
        }
    }
    genreItemRendererClicked( data )
    {
        console.log( "genreItemRendererClicked", data );
        let href = data.h;
        if( href.indexOf( "/trailers/genrer" ) != -1 )
        {
            let trailersGenrerDataProvider = this.loadedPaths[ "/trailers/genrer" ];
            if( trailersGenrerDataProvider )
            {
                let selectedTrailersGenrerIndex = trailersGenrerDataProvider.getItemIndex( data );
                this.setProperty( "trailersGenresList", "selectedIndex", selectedTrailersGenrerIndex );
            }
        }
        this.currentGenre = data.g.toLowerCase();
        let path = href + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "/data" + path + "/0.json" );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            if( path.indexOf( "film" ) != -1 )
            {
                this.setProperty( "moviesList", "dataProvider", chunksObject.collection );
            }
            else if( path.indexOf( "trailers" ) != -1 )
            {
                this.setProperty( "videosList", "dataProvider", chunksObject.collection );
            }
        }
    }
    countryItemRendererClicked( data )
    {
        this.currentCountry = data.l.toLowerCase();
        let href = data.h;
        let path = href + "/" + this.currentSort;
        if( !this.loadedPaths[ path ] )
        {
            this.jsonLoader.load( "/data" + path + "/0.json" );
        }
        else
        {
            let chunksObject = this.loadedPaths[ path ];
            if( path.indexOf( "skuespillere" ) != -1 )
            {
                this.setProperty( "actorsList", "dataProvider", chunksObject.collection );
            }
        }
    }
    iconButtonClicked( href )
    {
        if( href !== "/trailers" && href !== "/film" && href !== "/skuespillere" )
        {
            if( !this.loadedPaths[ href ] )
            {
                this.jsonLoader.load( "/data" + href + ".json" );
            }
        }
    }
    loadComplete( data )
    {
        if( data )
        {
            if( data.path === "/film/genrer" )
            {
                let moviesGenresListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = moviesGenresListDataProvider;
                this.setProperty( "movieGenresList", "dataProvider", moviesGenresListDataProvider );
            }
            else if( data.path === "/trailers/genrer" )
            {
                let trailersGenresListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = trailersGenresListDataProvider;
                this.setProperty( "trailersGenresList", "dataProvider", trailersGenresListDataProvider );
            }
            else if( data.path === "/trailers/lande" )
            {
                let trailersCountriesListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[data.path  ] = trailersCountriesListDataProvider;
                this.setProperty( "trailersCountriesList", "dataProvider", trailersCountriesListDataProvider );
            }
            else if( data.path === "/skuespillere/lande" )
            {
                let actorsCountriesListDataProvider = new ArrayCollection( data.items );
                this.loadedPaths[ data.path ] = actorsCountriesListDataProvider;
                this.setProperty( "actorsCountriesList", "dataProvider", actorsCountriesListDataProvider );
            }
            else
            {
                let chunksObject;
                if( !this.loadedPaths[ data.path ] )
                {
                    chunksObject = {};
                    chunksObject.index = data.index;
                    chunksObject.total = data.total;
                    chunksObject.collection = new ArrayCollection( data.items );
                    this.loadedPaths[ data.path ] = chunksObject;
                }
                else
                {
                    chunksObject = this.loadedPaths[ data.path ];
                    chunksObject.index++;
                    chunksObject.collection.addItems( data.items );
                }
                if( data.path.indexOf( "film" ) != -1 )
                {
                    this.setProperty( "moviesList", "dataProvider", chunksObject.collection );
                }
                else if( data.path.indexOf( "trailers" ) != -1 )
                {
                    this.setProperty( "videosList", "dataProvider", chunksObject.collection );
                }
                else if( data.path.indexOf( "skuespillere" ) != -1 )
                {
                    this.setProperty( "actorsList", "dataProvider", chunksObject.collection );
                }
            }
        }
    }
    applicationLoadComplete()
    {
        this.jsonLoader.load( 'data/trailers/genrer/alle/' + this.currentSort + '/0.json' );
    }
    get jsonLoader()
    {
        if( !this._jsonLoader )
        {
            this._jsonLoader = new JSONLoader();
            this._jsonLoader.listen( EventTypes.LOAD_COMPLETE, this.loadComplete.bind( this ) );
        }
        return this._jsonLoader;
    }
    get loadedPaths()
    {
        if( !this._loadedPaths )
        {
            this._loadedPaths = {};
        }
        return this._loadedPaths;
    }
}