I originally used the [Polymer generator](https://github.com/yeoman/generator-polymer); however, it is currently not working for me.

For future reference:

    npm install generator-polymer -g

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
    
Use your new element in your dust template (example from AdminUserRegistration.dust):

    <admin-registration-form pouch = {PouchDB|s}></admin-registration-form>