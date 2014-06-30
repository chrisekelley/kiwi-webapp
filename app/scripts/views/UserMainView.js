define([
    'backbone',
    'marionette',
    "templates",
    "dust"
],

function (Backbone, Marionette, compiledTemplates, dust) {

    return Backbone.Marionette.ItemView.extend({


        template: 'UserMainView',

//        el: "#userMenu",

//        className: 'app ui-content', // this class will be added to the wrapping div when you render the view

        events: {
            'click #registrationLink': "submitRegistration",
            'click #newReportLink': "newReportLink"
        },

        initialize: function () {
//            $('input[type=checkbox]').button();
//            $(function() {
//                $(":checkbox").checkbox();
//            });
        },

        submitRegistration: function() {
            console.log("submitRegistration")
            App.trigger("userScan")
        },

        newReportLink: function() {
            console.log("newReportLink")
            App.trigger("displayReportMenu")
        },

        ui: {
            checkboxes: "input[type=checkbox]"
        },

//        render: function(){
//            var html = this.template();
//            var newElement = $(html)
//            this.$el.replaceWith(newElement);
//            this.setElement(newElement);
//            return this;
//        },
//        render: function(){
//            var self = this;
//            dust.render('UserReportMenu', {name:'world'}, function(err,out){
////                self.$el.html(out);
//                console.log("dust: " + out)
//                var newElement = $(out)
////                self.$el.replaceWith(newElement);
////                $('#main-region').replaceWith(newElement);
//                $('body').append(newElement);
////                self.setElement(newElement);
//            });
//            return this;
//        }

//        onRender: function() {
//            if (this.ui.checkboxes != null) {
//            this.ui.checkboxes.each(
//              function(){
//                  var id = $(this).attr('id');
//                  console.log("testo" + id);
////                  var label = $("label[for='"+ id +"']")
////                  var label =$("label[for='checkboxImmunization']")
////                  label.addClass( "ui-checkbox-off" );
////                  if(label = $("label[for="+$(this).attr('id')+"]")) {
////                      console.log("label: " + id);
////                      label.click(function(){
////                          //ui-checkbox-off
////                          console.log("clicked");
//////                          $(this).toggleClass('checked');
//////                          $("input[id="+$(this).attr('for')+"]").click(function(){ $(this).attr("checked"); });
////                      });
////                  }
//              }
//            );
////                this.ui.checkbox.addClass('checked');
//            }
//        }

    });
});
