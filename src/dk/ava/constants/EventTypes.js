export default class EventTypes
{
    static get WIDTH_CHANGED()              {return "widthChanged";}
    static get HEIGHT_CHANGED()             {return "heightChanged";}
    static get SIZE_CHANGED()               {return "sizeChanged";}
    static get TRIGGERED()                  {return "triggered";}
    static get PROPERTY_ANIMATION_ENDED()   {return "propertyAnimationEnded";}
    static get SELECTED_INDEX_CHANGED()     {return "selectedIndexChanged";}
    static get LOAD_COMPLETE()              {return "loadComplete";}
    static get LOAD_ERROR()                 {return "loadError";}
    static get LOAD_PROGRESS()              {return "loadProgress";}
    static get LOAD_ABORTED()               {return "loadAborted";}
    static get SCROLL_DIRECTION_CHANGED()   {return "scrollDirectionChanged";}
    static get APPLICATION_LOAD_COMPLETE()  {return "applicationLoadComplete";}
    static get SHOW_COMPLETE()              {return "showComplete";}
    static get HIDE_COMPLETE()              {return "hideComplete";}
    static get IS_ON_LAST_SCREEN_CHANGED()  {return "isOnLastScreenChanged";}
}