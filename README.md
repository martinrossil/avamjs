# avamjs is a technical proof of concept.

## Goal, create a Progessive Web App with the following properties:

* Get a Lighthouse Audit score of 100 in all 5 categories.
* No use of external libraries.
* No use of CSS or HTML string literals.
* Implement Googles Material Design principles with Theming support.
* 100% pure Javascript implementation.
* Use Web Components, written in ES6 Classes, exported as Modules.
* First meaningful paint in less than 2 second.
* Time to interactive in less than 2 seconds.
* Total gzipped size below 30 Kb.
* Offline capabilities.
* Deeplink and routing support.
* Completely decoupled business logic.
* Native feel.

## Solution:

1. Create a base Web Component library, written in pure Javascript as ES6 Classes, exported as Modules.
2. Create Single Page Application ( PWA ), using this library, using best Object Oriented principles, composition and inheritance.
3. Create a static read layer, using json.
4. Bundle and deploy on a fast CDN.

## Screenshots and website

Web Application here: [ava.dk](https://ava.dk)

|Trailers|Movies|Actors|
|---|---|---|
|<img src="/screenshots/phone_trailers.png"/>|<img src="/screenshots/phone_movies.png"/>|<img src="/screenshots/phone_actors.png"/>|

|Filters|Movie Info|
|---|---|
|<img src="/screenshots/phone_movies_drawer.png"/>|<img src="/screenshots/phone_movie_info.png"/>

|Playback|
|---|
|<img src="/screenshots/phone_trailer_playback.png"/>|
