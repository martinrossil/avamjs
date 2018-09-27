export default class EventTypes
{
    static get WIDTH_CHANGED()              {return "widthChanged";}
    static get HEIGHT_CHANGED()             {return "heightChanged";}
    static get SIZE_CHANGED()               {return "sizeChanged";}
    static get TRIGGERED()                  {return "triggered";}
    static get PROPERTY_ANIMATION_ENDED()   {return "propertyAnimationEnded";}
    
    static get LOAD_COMPLETE()              {return "loadComplete";}
    static get LOAD_ERROR()                 {return "loadError";}
    static get LOAD_PROGRESS()              {return "loadProgress";}
    static get LOAD_ABORTED()               {return "loadAborted";}
    static get SCROLL_DIRECTION_CHANGED()   {return "scrollDirectionChanged";}
    static get APPLICATION_LOAD_COMPLETE()  {return "applicationLoadComplete";}
    static get SHOW_COMPLETE()              {return "showComplete";}
    static get HIDE_COMPLETE()              {return "hideComplete";}
    static get IS_ON_LAST_SCREEN_CHANGED()  {return "isOnLastScreenChanged";}
    static get LIST_ITEM_SELECTED()         {return "listItemSelected";};
    static get SELECTED_INDEX_CHANGED()     {return "selectedIndexChanged";}
    static get SELECTED_ITEM_CHANGED()      {return "selectedItemChanged";};
    static get PATH_CHANGED()               {return "pathChanged";};
    static get PATH_LEVEL_COUNT_CHANGED()   {return "pathLevelCountChanged";};
    static get FIRST_LEVEL_CHANGED()        {return "firstLevelChanged";};
    static get SECOND_LEVEL_CHANGED()       {return "secondLevelChanged";};
    static get THIRD_LEVEL_CHANGED()        {return "thirdLevelChanged";};
    static get FOURTH_LEVEL_CHANGED()       {return "fourthLevelChanged";};
    static get FIFTH_LEVEL_CHANGED()        {return "fifthLevelChanged";};

    static get TRAILERS_FILTER_CHANGED()    {return "trailersFilterChanged";};
    static get TRAILERS_SUB_FILTER_CHANGED(){return "trailersSubFilterChanged";};
    static get MOVIES_FILTER_CHANGED()      {return "moviesFilterChanged";};
    static get MOVIES_SUB_FILTER_CHANGED()  {return "moviesSubFilterChanged";};
    static get ACTORS_FILTER_CHANGED()      {return "actorsFilterChanged";};
    static get ACTORS_SUB_FILTER_CHANGED()  {return "actorsSubFilterChanged";};

    static get FIRST_LEVEL_INDEX_CHANGED()  {return "firstLevelIndexChanged";};
}