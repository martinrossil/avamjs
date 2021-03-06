import HistoryBehavior from "./HistoryBehavior.js";
import FilterDrawerBehavior from "./FilterDrawerBehavior.js";
import NavigationBehavior from "./NavigationBehavior.js";
import ListDataBehavior from "./ListDataBehavior.js";
import TrailerPlaybackBehavior from "./TrailerPlaybackBehavior.js";
import MovieInfoBehavior from "./MovieInfoBehavior.js";
import ActorInfoBehavior from "./ActorInfoBehavior.js";
export default class AppBehavior
{
    constructor()
    {
        new HistoryBehavior();
        new FilterDrawerBehavior();
        new NavigationBehavior();
        new ListDataBehavior();
        new TrailerPlaybackBehavior();
        new MovieInfoBehavior();
        new ActorInfoBehavior();
    }
}