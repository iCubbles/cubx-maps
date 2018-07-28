/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  window.cubxMapsDemo_auxFunctions = {

    parseResultToMarkers: function (result, next) {
      if (result.hasOwnProperty('records') && Array.isArray(result.records)) {
        var markers = [];
        result.records.forEach(function (record) {
          if (record.hasOwnProperty('fields') && record.fields.hasOwnProperty('kartenansicht')) {
            var marker = {};
            marker.latlng = this.extractLatLngFromUrl(record.fields.kartenansicht);
            markers.push(marker);
          }
        }.bind(window.cubxMapsDemo_auxFunctions));
        next({ list: markers });
      }
    },

    extractLatLngFromUrl: function (url) {
      var latLngRegExp = new RegExp('center=\\d+\\.\\d+,\\d+\\.\\d+', 'g');
      var latLngMatch = url.match(latLngRegExp);
      if (latLngMatch) {
        var latLng = latLngMatch[0].replace('center=', '');
        latLng = latLng.split(',');
        return [parseFloat(latLng[1]), parseFloat(latLng[0])];
      }
      return null;
    }
  };
})();
