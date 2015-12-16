/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        sumoSelect: 'lib/sumoSelect'
    }
});

require([
    'backbone',
    'bootstrap',
    'views/box'
], function (Backbone, bootstrap, BoxView) {
    var boxView;
    Backbone.history.start();
    boxView = new BoxView();
    $('#boxContainer').html(boxView.render().$el);
});
