/* globals CubxComponent, L */
(function () {
  'use strict';

  CubxComponent({
    is: 'cubx-maps',
    _currentElements: {
      markers: [],
      circles: [],
      polygons: [],
      polylines: [],
      rectangles: []
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

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'circles' has changed ...
     */
    modelCirclesChanged: function (circles) {
      this._addElementsToMap(circles, 'circle');
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'polygons' has changed ...
     */
    modelPolygonsChanged: function (polygons) {
      this._addElementsToMap(polygons, 'polygon');
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'polylines' has changed ...
     */
    modelPolylinesChanged: function (polylines) {
      this._addElementsToMap(polylines, 'polyline');
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'rectangles' has changed ...
     */
    modelRectanglesChanged: function (rectangles) {
      this._addElementsToMap(rectangles, 'rectangle');
    },

    _addElementsToMap: function (elements, type) {
      if (this._isValidMapElementSlotValue(elements, type)) {
        if (elements.hasOwnProperty('clearCurrent') && elements.clearCurrent === true) {
          this._clearElementsOfAType(type);
        }
        elements.list.forEach(function (element) {
          this._addMapElement(element, type);
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
        var lElement = this._createLElementOfAType(type, element);
        if (lElement) {
          if (element.hasOwnProperty('popUpInnerHtml') && typeof element.popUpInnerHtml === 'string') {
            lElement.bindPopup(element.popUpInnerHtml);
          }
          lElement.addTo(this.map);
          this._getListOfElementType(type).push(lElement);
        } else {
          console.error(
            'The provided', type, 'could not be created.',
            element
          );
        }
      } else {
        console.error(
          'The provided', type, 'is not valid.',
          'It should be like: ' + this._validTypeStringSample(type),
          'Given:', element
        );
      }
    },

    _validTypeStringSample: function (type) {
      var prefix;
      switch (type) {
        case 'polyline':
        case 'polygon': prefix = '{ "latlngs": [[lat, lng], ... ,[lat, lng]]'; break;
        case 'rectangle': prefix = '{ "bounds": [[lat, lng], [lat, lng]]'; break;
        default: prefix = '{ "latlng": [lat, lng]';
      }
      return prefix + ', "options": { "key": value ... }, "popUpInnerHtml": "code" }. "options" and "popUpInnerHtml" are optional.';
    },

    _createLElementOfAType: function (type, element) {
      switch (type) {
        case 'marker': return L.marker(element.latlng, element.options);
        case 'circle': return L.circle(element.latlng, element.options);
        case 'polygon': return L.polygon(element.latlngs, element.options);
        case 'polyline': return L.polyline(element.latlngs, element.options);
        case 'rectangle': return L.rectangle(element.bounds, element.options);
        default: return null;
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
      return typeof elements === 'object' && elements.hasOwnProperty('list');
    },

    _isValidElementValue: function (element, type) {
      switch (type) {
        case 'polyline':
        case 'polygon': return typeof element === 'object' && element.hasOwnProperty('latlngs');
        case 'rectangle': return typeof element === 'object' && element.hasOwnProperty('bounds');
        default: return typeof element === 'object' && element.hasOwnProperty('latlng');
      }
    },

    _isValidTaleLayerValue: function (tileLayer) {
      return typeof tileLayer === 'object' && tileLayer.hasOwnProperty('url');
    },

    _getListOfElementType: function (type) {
      return this._currentElements[type + 's'];
    }
  });
}());
