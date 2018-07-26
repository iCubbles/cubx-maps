/* globals CubxComponent, L */
(function () {
  'use strict';

  CubxComponent({
    is: 'cubx-maps',
    _currentMarkers: [],

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    connected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is dettached to the document.
     */
    disconnected: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    contextReady: function () {
      /*
      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(mymap);
      var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ]).addTo(mymap);
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      circle.bindPopup("I am a circle.");
      polygon.bindPopup("I am a polygon.");
      */
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'mapInitOptions' has changed ...
     */
    modelMapInitOptionsChanged: function (initOptions) {
      this.map = L.map(this.$$('#mapDiv'), initOptions);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'tileLayer' has changed ...
     */
    modelTileLayerChanged: function (tileLayer) {
      if (this._isValidTaleLayerValue(tileLayer)) {
        L.tileLayer(tileLayer.url, tileLayer.options).addTo(this.map);
      } else {
        console.error('The provided tileLayer is not valid. It should be like: {"url": , "options": (optional)}.',
          'See https://leafletjs.com/reference-1.3.2.html#tilelayer');
      }
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'markers' has changed ...
     */
    modelMarkersChanged: function (markers) {
      if (this._isValidMarkersSlotValue(markers)) {
        if (markers.hasOwnProperty('clearCurrentMarkers') && markers.clearCurrentMarkers === true) {
          this._clearCurrentMarkers();
        }
        markers.list.forEach(function (marker) {
          this._addMarkerToMap(marker);
        }.bind(this));
      } else {
        console.error(
          'The provided marker is not valid.',
          'It should be like: {"list": [], "clearCurrentMarkers": (optional)}.',
          markers
        );
      }
    },

    _addMarkerToMap: function (marker) {
      if (this._isValidMarkerValue(marker)) {
        var lMarker = L.marker(marker.latlng, marker.options);
        if (marker.hasOwnProperty('popUpInnerHtml') && typeof marker.popUpInnerHtml === 'string') {
          lMarker.bindPopup(marker.popUpInnerHtml);
        }
        lMarker.addTo(this.map);
        this._currentMarkers.push(lMarker);
      } else {
        console.error(
          'The provided marker is not valid.',
          'It should be like: {"latlng": , "popUpInnerHtml": (optional), "options": (optional)}.',
          'See https://leafletjs.com/reference-1.3.2.html#marker',
          marker
        );
      }
    },
    _clearCurrentMarkers: function () {
      this._currentMarkers.forEach(function (marker) {
        marker.remove();
      });
      this._currentMarkers = [];
    },

    _isValidMarkersSlotValue: function (markers) {
      return typeof markers === 'object' && markers.hasOwnProperty('list');
    },

    _isValidMarkerValue: function (marker) {
      return typeof marker === 'object' && marker.hasOwnProperty('latlng');
    },

    _isValidTaleLayerValue: function (tileLayer) {
      return typeof tileLayer === 'object' && tileLayer.hasOwnProperty('url');
    }
  });
}());
