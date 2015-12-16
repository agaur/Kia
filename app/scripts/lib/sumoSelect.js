'use strict';
define([
  'jquery',
  './sumoSelect/main',
], function ($, SumoSelectMain) {
  if (!$.fn.sumoSelect) {
    $.fn.sumoSelect = function (options) {
      var args = arguments;
      options = options || {};

      if(typeof options === 'object'){
        this.each(function () {
          new SumoSelectMain($(this), $.extend(true, {}, options));
        });
      } else if(typeof options === 'string') {

        this.each(function () {
          var instance = $(this).data('sumoSelect');
          if (instance === null) {
            console.error('sumoSelect not initialised');
          }
          instance[options].call(instance, args[1]);
        });
      }
    }
  }
});
