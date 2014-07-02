define([
    'backbone',
    'marionette',
    "templates",
    "dust"
//    "polymer",
//    "platform"
//     'wc!../../bower_components/paper-progress/paper-progress.html!dec!polymer'
//     'wc!../../bower_components/paper-progress/paper-progress.html!dec,'
],

function (Backbone, Marionette, compiledTemplates, dust) {
//function (Backbone, Marionette, compiledTemplates, dust, polymer, platform, paper_progress) {
//function (Backbone, Marionette, compiledTemplates, dust, platform, paper_progress) {

    return Backbone.Marionette.ItemView.extend({

        template: 'VerifyView',

        className: 'itemView', // this class will be added to the wrapping div when you render the view

        events: {
            'click #verify': "scan",
            'click #scan': "scanNewIndividual",
            'click #verifyYes': "displayNewUserRegistration",
            'click #verifyNo': "diplayNewReportMenu"
        },

        initialize: function () {
        },

        displayNewUserRegistration: function () {
            App.trigger("userRegistration")
        },

        diplayNewReportMenu: function () {
        },

        scanNewIndividual: function() {
            this.scan("userRegistration", "#sliderNewIndividual");
        },

        scan: function(next, sliderId) {
            console.log('Register clicked ');
            var display = function(message) {
                console.log("display message: " + message);
                var display = document.getElementById("message"), // the message div
                  lineBreak = document.createElement("br"),     // a line break
                  label = document.createTextNode(message);     // create the label

                display.appendChild(lineBreak);          // add a line break
                display.appendChild(label);              // add the message node
            };
            var revealSlider = function(next, sliderId) {
                console.log("revealSlider")

//                var thisSliderId = "#slider";
                var progress = document.querySelector('paper-progress');
                var button = document.querySelector('paper-button');
                if (typeof sliderId !== 'undefined') {
                    thisSliderId = sliderId;
                }

//                progress.show();

                startProgress();

                var repeat, maxRepeat = 5;

                function nextProgress() {
                    if (progress.value < progress.max) {
                        progress.value += (progress.step || 1);
                        requestAnimationFrame(nextProgress);
                    } else {
//                        if (++repeat >= maxRepeat) {
////                            button.disabled = false;
//                            return;
//                        }
//                        progress.value = progress.min;
//                        Platform.flush();
                        window.setTimeout(function() {
                            App.trigger("registration")
//                            Platform.flush();
                            return;
                        }, 500);
                    }
                }

                function startProgress() {
                    repeat = 0;
                    progress.value = progress.min;
//                    button.disabled = true;
                    nextProgress();
                }
                addEventListener('polymer-ready', function() {
                    startProgress();
                });
            };
            if (!typeof cordova == 'undefined') {
                cordova.plugins.SecugenPlugin.register(function(results) {
//                display(JSON.stringify(results));
                    $( "#message").html(results);
//                revealSlider();
                }, function(e) {
                    console.log("Error: " + e);
                    $( "#message").html("Error:" + results);
//                display("Error: " + e);
                });
            } else {
                console.log("Cordova is not initialised. Plugins will not work.")
                revealSlider(next, sliderId);
            }
        },

//        revealSlider: function(e) {
//            console.log("click scan.")
//
//            $( "#slider" ).show();
//
//            $( "#slider" ).parent().find('input').hide();
//            $( "#slider" ).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
//            $( "#slider" ).parent().find('.ui-slider-handle').hide();
//            $( "#slider" ).slider({
//                value: 0
//                // setup the rest ...
//            });
//
//            var i = 1;
//            var interval = setInterval(function(){
//                App.progressBar.setValue('#slider',i);
//                if(i === 50) {
//                    console.log("Go to next page.")
//                    $( "#message").html("Scanning complete!")
//                    window.setTimeout(function() { App.trigger("registration")}, 2000);
//                    clearInterval(interval);
//                }
//                i++;
//            },50);
//        },

        /*
         appends @message to the message div:
         */
        display: function(message) {
            console.log("display message.")
            var display = document.getElementById("message"), // the message div
              lineBreak = document.createElement("br"),     // a line break
              label = document.createTextNode(message);     // create the label

            display.appendChild(lineBreak);          // add a line break
            display.appendChild(label);              // add the message node
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
