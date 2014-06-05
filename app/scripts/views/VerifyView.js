define([
    'backbone',
    'marionette',
    "templates",
    "dust",
    'app'
],

function (Backbone, Marionette, compiledTemplates, dust, App) {

    return Backbone.Marionette.ItemView.extend({

        template: 'VerifyView',

        events: {
            'click #verify': "revealSlider"
        },

        initialize: function () {},

        revealSlider: function() {
            $( "#slider" ).show();
            $( "#slider" ).parent().find('input').hide();
            $( "#slider" ).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
            $( "#slider" ).parent().find('.ui-slider-handle').hide();
            $( "#slider" ).slider();
            var i = 1;
            var interval = setInterval(function(){
                App.progressBar.setValue('#slider',i);
                if(i === 50) {
                    console.log("Go to next page.")
                    $( "#message").html("Scanning complete!")
                    window.setTimeout(function() { App.trigger("registration")}, 2000);
                    clearInterval(interval);
                }
                i++;
            },50);
        }

//        initSlider: function () {
//            $('<input>').appendTo('[ data-role="content"]').attr({'name':'slider','id':'slider','data-highlight':'true','min':'0','max':'100','value':'50','type':'range'}).slider({
//                create: function( event, ui ) {
//                    $(this).parent().find('input').hide();
//                    $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
//                    $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
//                    $(this).parent().find('.ui-slider-handle').hide();
//                }
//            }).slider("refresh");
//
//            // Test
//            var i = 1;
//            var interval = setInterval(function(){
//                App.progressBar.setValue('#slider',i);
//                if(i === 99) {
//                    console.log("Go to next page.")
//                    $( "#message").html("Scanning complete!")
//                    clearInterval(interval);
//                }
//                i++;
//            },100);
//        }

    });

});
