define([
  'jquery',
  'underscore',
  'lib/sumoSelect/dropDown'
], function ($, _, DropDown) {
  var SumoSelect = function (jEl, options) {
    var that = this,
    jContainer;

    that.jEl = jEl;
    that.id = _.uniqueId();
    that.options = options = options || {};
    that.dropDown = new DropDown(jEl, options);

    that.render();
    that.attachEvents();

    jEl
    .data('sumoSelect', this)
    .hide();
  };

  _.extend(SumoSelect.prototype, {
    initVars: function() {
      var that = this,
      jContainer = that.jContainer;

      that.jPlaceholder = jContainer.find('.placeholder');
      that.jDropDownWrapper = jContainer.find('.dropdown-wrapper');
    },

    render: function() {
      var that = this,
      jEl = that.jEl,
      jContainer;
      that.placeholderText = jEl.attr('placeholder'),

      that.jContainer = jContainer = $(JST["app/scripts/templates/sumoSelect/container.ejs"]());
      jContainer.addClass(jEl.attr('class'));

      that.initVars();

      that.jPlaceholder.text(that.placeholderText);
      that.jDropDownWrapper.html(that.dropDown.render().jEl);

      that.insertContainer(jContainer);

      return jContainer;
    },

    insertContainer: function (jContainer){
      var jEl = this.jEl,
      width = jEl.outerWidth(false);
      jContainer.insertAfter(jEl);

      if (width != null) {
        jContainer.css('width', width);
      }
    },

    setSelected: function(params) {
      var that = this,
      jPlaceholder = that.jPlaceholder;

      if(params){
        that.selected = true;
        jPlaceholder.text(params.label);
      } else {
        jPlaceholder.text(that.placeholderText);
      }

      that.jContainer.toggleClass('empty', !params)

      that.jEl.val(params ? params.id: null).trigger('change');
    },

    attachEvents: function() {
      var that = this,
      jContainer = that.jContainer;

      jContainer.on('click', function(e){
        if(!$(e.target).closest('.dropdown-wrapper')[0]){
          that.dropDown.toggle();
        }
      });

      jContainer.delegate('.sumoSelect-clear', 'click', function(e){
        that.setSelected(null);
        that.dropDown.reset(true);
        e.stopPropagation();
      });

      that.dropDown.jEl.on('update:value', function(e, params){
        that.setSelected(params);
      });


    },

    data: function(items) {
      var that = this;
      that.dropDown.setItems(items);
    }
  });

  return SumoSelect;
});
