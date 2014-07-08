# Kiwi-webapp

This is the webapp for [kiwi-cordova](https://github.com/chrisekelley/kiwi-cordova).

# Development

## Runnning

Launch the web server:

    grunt server

View the app using the [Ripple plugin for Chrome](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en).

## Bootstrapping

This was bootstrapped using the [Generator Maryo](https://github.com/simonblee/generator-maryo). It uses the [Bootstrap](http://getbootstrap.com/) 
responsive framework and [theme](http://getbootstrap.com/examples/theme/).

## Support for web components

This project uses [polymer](http://www.polymer-project.org/) elements to implement web components such as progress bar and 
forms. Records are persisted via PouchDB directly from the form javascript, instead of from backbone.js-managed objects.

    bower install Polymer/paper-progress
    bower install Polymer/paper-checkbox
    
### Forms are Polymer custom elements

Forms are custom web component elements. Usage and demo info are in each element's README:
 - [report-form](https://github.com/chrisekelley/kiwi-webapp/tree/master/app/elements/report-form) 
 
Kudos to [Alf Eaton](https://github.com/hubgit) - his [vege-table](https://github.com/hubgit/vege-table) was a critical 
resource for figuring out the pouchdb persistence. I'm using his [Pouchdb polymer element](https://github.com/hubgit/pouch-db).

### Creating a new form.

Make sure yeoman is installed. 
Install the Polymer generator:

    npm install generator-polymer -g
    
Generate the code:

    cd elements
    mkdir my-new-form && cd $_
    yo polymer:element my-new-form
    
Polymer provider [two-way data binding](http://www.polymer-project.org/docs/polymer/databinding.html) which makes it 
remarkably easy to manage data.

First add an import form your new custom element to your app's main .index.html file in the header section:

    <html lang="en">
    <head>
          <link rel="import" href="elements/my-new-form/my-new-form.html">

Open your new form's .html file - my-new-form/my-new-form.html

Delete or comment-out the polymer import.

    <!--<link rel="import" href="../polymer/polymer.html">-->

Add the pouch-db element, an input field, and a submit button to your form:

    <polymer-element name="my-new-form" attributes="notitle">
    
      <template>

          <app-globals id="globals"></app-globals>
          <pouch-db id="pouch" name="report-form"></pouch-db>
          <input type="text" name="name" id="name" placeholder="Name" value="{{theData.name}}"/>
          <p><a data-role="button" id="submitAdminRegistration" class="btn btn-primary btn-lg" on-click="{{updateModel}}">Press to Register</a></p>
          
When the dom is ready, init pouchdb. This is a bit harder in this case, because the Chrome webview, the target container, 
does not handle attached scripts very well. To compensate, we pass App.PouchDB to the pouch container.

        domReady: function() {
            console.log("domReady ....");
            this.isDomReady = true;
            // wait for bindings are all setup
            if (this.pouch) {
                this.$.pouch.PouchDB = App.PouchDB;
                // wait for bindings are all setup
                this.async('pouchChanged');
            }
        }
      
Note that App context, created when the application was initialised, is available to forward the user to the next page:

    App.trigger("userMain");
    
### Developing elements and bower

Some of the elements I've developed will be used in other projects. When sorting out bugs, it is useful to do a 'bower link' 
in the element's source and then in this project link it to the element source. 

    source/polymer-app-globals]$ bower link  
    source/kiwi-webapp]$ bower link app-globals    
    
Unfortunately these bower linked elements don't get built when deploying to cordova ('cordova run android') so it is necessary 
to wipe the bower-components dir and 'bower install' to get ehe elements to your app.

## Backbone

Backbone.js and Marrionette.js are used to provide route and view management.
  
### Resources

- http://www.html5rocks.com/en/tutorials/webcomponents/yeoman/ - It is a bit out-of-date on how the yeoman polymer element 
generator works, but it provides a useful background.
- https://www.dartlang.org/docs/tutorials/forms/ - Client-server tutorial featuring Dart.
- [Getting Started With Web Components and polymer.js - II]
(http://4waisenkinder.de/blog/2013/10/05/getting-started-with-web-components-and-polymer-dot-js-ii/) - defining styles, 
dealing with shadow DOM issues ([souce](https://github.com/stefanjudis/webComponents-tutorial-II/blob/gh-pages/index.html)
- Addy Osmani - Componentize the Web - LXJS 2014 - [slides](http://addyosmani.github.io/lxjs-slides/#124) and 
[video](https://www.youtube.com/watch?v=GOPXVLxp9Nc)
    
## Lint

The generator does not produce 100% lint-happy code. See .jshintrc for more info. 

Also added the following code to some of the generated js to ignore "quotmark": "single"

    /*jshint -W109 */ 
    
Added the following to config.js to force recognition of require

    /*global require   */

Removed "indent":2

Changed the following to false:

    "strict": true,
    "trailing": true,




