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
            marker.popUpInnerHtml = this.generateInnerHtmlForMarker(record.fields);
            markers.push(marker);
          }
        }.bind(window.cubxMapsDemo_auxFunctions));
        next({ list: markers, autoFit: true });
      }
    },

    generateInnerHtmlForMarker: function (fields) {
      var fieldsVerbose = [
        {label: 'Adresse', value: (fields.strasse || '-') + ' ' + (fields.hausnummer || '-') + ',' + (fields.postleitzahl || '-')},
        {label: 'Telefonnummer', value: (fields.tel_nr || '-')},
        {label: 'Email', value: (fields.e_mail_trager || '-')}
      ];
      var innerHtml = '<h2>' + (fields.trager || '-');
      if (fields.homepage_des_tragers) {
        innerHtml += ' <a target="_blank" href="' + (fields.homepage_des_tragers || '#') + '">&#128279;</a>';
      }
      innerHtml += '</h2><dl>';
      fieldsVerbose.forEach(function (field) {
        innerHtml += '<dt><b>' + field.label + '</b></dt>' + '<dd>' + field.value + '</dd>';
      });
      innerHtml += '</dl>';
      return innerHtml;
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
