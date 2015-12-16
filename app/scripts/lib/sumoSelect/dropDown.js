define([
  'jquery',
  'underscore'
], function ($, _) {

  var filter = function(searchString, items){

    return _.filter(items, function(item){
      return item.label.indexOf(searchString) > -1;
    });

  },

  DropDown = function(jEl, options){
    var that = this;
    that.jEl = jEl;
    that.template = JST["app/scripts/templates/sumoSelect/dropDown.ejs"];
    that.itemsTemplate = JST["app/scripts/templates/sumoSelect/dropDownItems.ejs"];
    that.options = options;
  }

  _.extend(DropDown.prototype, {

    getItems: function(){
      var that = this,
      jEl = that.jEl,
      items = that.options.data;

      if(!items){
        items = _.map(jEl.find('option'), function(optionEl){
          var jOption = $(optionEl);
          return {
            id: jOption.attr('value'),
            label: jOption.text()
          };
        })
      }

      return (that.items = items);
    },

    render: function() {
      var that = this;

      that.jEl = $(that.template({
        items: that.getItems(),
        selected: that.getSelectedItem(),
        dropDownItemsTemplate: that.itemsTemplate
      }));

      that.initVars();
      that.attachEvents();

      return that;
    },

    getSelectedItem: function (){
      return this.selected;
    },

    setSelectedItem: function(selected) {
      this.selected = selected;
    },

    setItems: function(items) {
      var that = this;
      that.items = items;
      that.refreshItems('');
    },

    reset: function(removeSelected){
      var that = this;

      that.refreshItems('');
      that.jSearch.val('').focus();

      if(removeSelected) {
        that.setSelectedItem(null);
      }
    },

    toggle: function(){
      var that = this,
      jEl = that.jEl;

      jEl.toggleClass('hide');
      if(!jEl.hasClass('hide')){
        that.reset(false);
      }
    },

    filterItems: function(searchString) {
      var that = this,
      filterFunc = that.options.filter || filter;

      return filterFunc(searchString, that.items);
    },

    refreshItems: function(searchString){
      var that = this,
      filteredItems = that.filterItems(searchString),
      selected = that.getSelectedItem();

      that.jItemContainer.html(that.itemsTemplate({
        items: filteredItems,
        selected: that.getSelectedItem()
      }));

      if(!_.findWhere(filteredItems, {id: selected})){
        that.setSelectedItem(null);
        that.updateValue(null);
      }
    },

    initVars: function() {
      var that = this,
      jEl = that.jEl;

      that.jSearch = jEl.find('.ss-search-field');
      that.jItemContainer = jEl.find('.ss-options');
      that.jItems = jEl.find('.ss-result-option')
    },

    updateValue: function(obj) {
      var that = this;
      that.jEl.trigger('update:value', obj);
    },

    attachEvents: function() {
      var that = this;

      that.jSearch.on('keyup', function(){
        that.refreshItems(that.jSearch.val());
      });


      that.jEl.delegate('.ss-result-option', 'click', function(e){
        var jTarget = $(e.target).closest('.ss-result-option'),
        id = jTarget.attr('data-id');
        that.setSelectedItem(id);
        that.updateValue({
          id: id,
          label: jTarget.text()
        });
        that.toggle();
      });
    }

  });


  return DropDown;
});
