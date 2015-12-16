/*global define*/

define([
  //libs
  'jquery',
  'underscore',
  'backbone',
  //views
  'views/employeeSelection',
  //templates
  'templates'
], function ($, _, Backbone, EmployeeSelectionView, JST) {
  'use strict';

  var BoxView = Backbone.View.extend({
    template: JST['app/scripts/templates/box.ejs'],

    events: {
      'click .btn': 'onClick'
    },    

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    onClick: function(){
      var that = this,
      employeeSelectionView;

      if ( !(employeeSelectionView = that.employeeSelectionView)) {
        employeeSelectionView = that.employeeSelectionView = new EmployeeSelectionView();
      }
      employeeSelectionView.show();
    }
  });

  return BoxView;
});
