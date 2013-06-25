define([
    // Application.
    'app', 'backbone.stickit', "text!templates/detail.html", "text!templates/item.html"
],

    function( app, stickit, detailTemplate, itemTemplate ) {

        var Contact = app.module();

        Contact.Model = M.Model.extend({
            idAttribute: '_id',
            urlRoot: 'http://nerds.mway.io:8100/contact',
            url: 'http://nerds.mway.io:8100/contact',
            defaults: {
                firstname: '',
                lastname: ''
            }
        });

        Contact.Collection = M.Collection.extend({
            model: Contact.Model,
            url: 'http://nerds.mway.io:8100/contact'
        });

        Contact.Views.Item = Backbone.View.extend({

            template: _.template(itemTemplate),
            tagName: 'div',
            className: 'contact-container',

            bindings: {
                '.firstname': {
                    observe: 'firstname'
                },
                '.lastname': {
                    observe: 'lastname'
                },
                'h1': {
                    observe: ['firstname', 'lastname'],
                    onGet: function( values ) {
                        return values[0] + ' - ' + values[1]
                    }
                }
            },

            //USE THIS WITH STANDARD BACKBONE OR HAMMER JS
//            events: {
//                "tap": "userSelected",
//                "click": "clickuserSelected"
//            },

            clickuserSelected: function( a, b, c ) {

                //Backbone.history.navigate('detail/' + this.model.id, true);
                //  console.log('click auf elem');
                $('#log').append('click auf elem <br>');
                a.preventDefault();
                a.stopPropagation();
            },

            userSelected: function( a, b, c ) {
                Backbone.history.navigate('detail/' + this.model.id, true);
            },

            initialize: function() {
                this.MID = M.ViewManager.getNewId();
                this.model.on('destroy', this.destroy, this);
                var that = this;
                M.EventDispatcher.registerEvent({
                    type: 'touchstart',
                    source: this
                });

//                this.el.addEventListener('click', function(){
//                    that.userSelected();
//                });


            },

            getEventHandler: function(a){
                var that = this;
                return function(){
                    that.userSelected();
                }
            },

            getId: function(){
                return this.MID;
            },

            beforeRender: function() {
                return this;
            },

            afterRender: function() {
                this.$el.attr('id', this.getId());
                this.stickit();
                return this;
            },

            destroy: function() {
                this.unstickit();
                this.remove();
            },

            serialize: function() {
                return this.model.toJSON();
            }
        });

        Contact.Views.List = Backbone.View.extend({
            template: 'list',

            initialize: function() {
                this.listenTo(this.options.contacts, 'add', this.addOne);
                this.listenTo(this.options.contacts, 'fetch', function() {
                    this.addAll();
                });
            },

            beforeRender: function() {
                this.addAll();
            },

            addOne: function( model, render ) {
                var view = this.insertView(new Contact.Views.Item({ model: model }));

                // Only trigger render if it not inserted inside `beforeRender`.
                if( render !== false ) {
                    view.render();
                }
            },

            addAll: function() {
                this.options.contacts.each(function( model ) {
                    this.addOne(model, false);
                }, this);
            }
        });

        Contact.Views.Detail = Backbone.View.extend({
            first: true,

            template: _.tpl(detailTemplate),

//            events: {
//                "click .back": "back"
//            },

            bindings: {
                '[data-binding="firstname"]': {
                    observe: 'firstname'
                },
                '[data-binding="input-firstname"]': {
                    observe: 'firstname'
                }
            },

            initialize: function() {
                //              this.listenTo(this.model, 'change', this.change);
            },

            // provide data to the template
            serialize: function() {
                return this.model.toJSON();
            },

            back: function() {
                this.$el.remove();
                Backbone.history.navigate("/", true);
            },

            afterRender: function() {
                this.stickit();
                return this;
            }
        })


        // Required, return the module for AMD compliance.
        return Contact;

    });