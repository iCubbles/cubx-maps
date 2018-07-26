/* globals CubxComponent, L */
(function () {
  'use strict';

  CubxComponent({
    is: 'cubx-maps',
    _currentElements: {
      markers: [],
      circles: []
    },

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
      this._addElementsToMap(markers, 'marker');
    },

    _addElementsToMap: function (elements, type) {
      if (this._isValidMapElementSlotValue(elements, type)) {
        if (elements.hasOwnProperty('clearCurrent') && elements.clearCurrent === true) {
          this._clearElementsOfAType(type);
        }
        elements.list.forEach(function (marker) {
          this._addMapElement(marker, type);
        }.bind(this));
      } else {
        console.error(
          'The provided elements value is not valid.',
          'It should be like: {"list": [], "clearCurrent": (optional)}.',
          elements
        );
      }
    },

    _addMapElement: function (element, type) {
      if (this._isValidElementValue(element, type)) {
        var lElement = L.marker(element.latlng, element.options);
        if (element.hasOwnProperty('popUpInnerHtml') && typeof element.popUpInnerHtml === 'string') {
          lElement.bindPopup(element.popUpInnerHtml);
        }
        lElement.addTo(this.map);
        this._getListOfElementType(type).push(lElement);
      }
    },

    _createElementOfAType: function (type, element) {
      switch (type) {
        case 'marker': return L.marker(element.latlng, element.options);
      }
    },

    _clearElementsOfAType: function (type) {
      var elementsList = this._getListOfElementType(type);
      elementsList.forEach(function (element) {
        element.remove();
      });
      elementsList = [];
    },

    _isValidMapElementSlotValue: function (elements, type) {
      switch (type) {
        case 'marker': return typeof elements === 'object' && elements.hasOwnProperty('list');
        default: return false;
      }
    },

    _isValidElementValue: function (marker) {
      return typeof marker === 'object' && marker.hasOwnProperty('latlng');
    },

    _isValidTaleLayerValue: function (tileLayer) {
      return typeof tileLayer === 'object' && tileLayer.hasOwnProperty('url');
    },

    _getListOfElementType: function (type) {
      return this._currentElements[type + 's'];
    }
  });
}());
