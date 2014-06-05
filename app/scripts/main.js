/*jshint -W109 */

require([
    "jquery",
    "backbone",
    "app",
    "marionette",
    "jquerymobile"
],

function ($, Backbone, App) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    console.log("Starting App")
    App.start();

    // Trigger the initial route and enable HTML5 History API support
//    Backbone.history.start({ pushState: true, root: App.root });

    if(Backbone.history.fragment === ""){
        Backbone.history.navigate("home");
        App.List.Controller.listContacts();
    }

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function (e) {
        // Get the absolute anchor href.
        var href = {
                prop: $(this).prop("href"),
                attr: $(this).attr("href")
            },
            root = location.protocol + "//" + location.host + App.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop && href.prop.slice(0, root.length) === root) {
            e.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    $(document).on("click", "a[data-bypass]", function (e) {
        e.preventDefault();
    });

//    $(document).on('pagebeforeshow', '#index', function(){
//        $('<input>').appendTo('[ data-role="content"]').attr({'name':'slider','id':'slider','data-highlight':'true','min':'0','max':'100','value':'50','type':'range'}).slider({
//            create: function( event, ui ) {
//                $(this).parent().find('input').hide();
//                $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
//                $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
//                $(this).parent().find('.ui-slider-handle').hide();
//            }
//        }).slider("refresh");
//
//        // Test
//        var i = 1;
//        var interval = setInterval(function(){
//            progressBar.setValue('#slider',i);
//            if(i === 100) {
//                clearInterval(interval);
//            }
//            i++;
//        },100);
//    });
//
//    var progressBar = {
//        setValue:function(id, value) {
//            $(id).val(value);
//            $(id).slider("refresh");
//        }
//    }

});
