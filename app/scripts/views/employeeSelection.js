/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'const/data',
  'templates',
  'sumoSelect'
], function ($, _, Backbone, data, JST) {
  'use strict';

  var getTeams = _.once(function(){
      return _.pluck(data.teamData, 'team');
  }),
  getEmployees = _.memoize(function(team){
      return _.result(_.findWhere(data.teamData, {team: team}), 'employees');
  }),

  EmployeeSelectionView = Backbone.View.extend({
    template: JST['app/scripts/templates/employeeSelection.ejs'],

    tagName: 'div',

    id: 'employeeSelection',

    className: 'modal hide',

    events: {
      'change #team': 'onChangeTeam'
    },

    render: function(){
      var that = this;

      that.$el.html( this.template({
        teams: getTeams()
      }) );

      return that;

    },

    show: function () {
      var that = this,
      jEmployeeSelection = $( '#' + that.id );

      if ( !jEmployeeSelection[0] ) {
        that.render().$el.appendTo( 'body' );
      }
      that.$el.modal( 'show' );
      that.$('select').sumoSelect();
    },

    onChangeTeam: function() {
      var team = $('#team').val(),
      employees = getEmployees(team);

      $('#employee').sumoSelect('data', _.map(employees, function(employee){
        return {
          id: employee,
          label: employee
        };
      }));
    }
  });

  return EmployeeSelectionView;
});
