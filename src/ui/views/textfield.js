(function(scope){

    M.TextfieldView = M.View.extend({

        _type: 'M.TextfieldView',

        label: null,

        _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),

        _assignTemplateValues: function() {
            M.View.prototype._assignTemplateValues.apply(this);
            this._templateData['label'] = this.label || '';
        },

        initialize: function() {
            M.View.prototype.initialize.apply(this);
        }

    });

    M.SearchfieldView = M.TextfieldView.extend({

        _type: 'M.SearchfieldView',

        placeholder: 'Search',

        _template: _.tmpl(M.TemplateManager.get('M.SearchfieldView')),

        initialize: function() {
            M.View.prototype.initialize.apply(this);
        },

        _assignTemplateValues: function() {
            M.TextfieldView.prototype._assignTemplateValues.apply(this);
            this._templateData['placeholder'] = this.placeholder || '';
        }


    });

})(this);