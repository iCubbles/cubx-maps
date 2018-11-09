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
    mapId: 'mapDiv',

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
      this.map = L.map(this.$$('#' + this.mapId));
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
      this._resetMap();
      this.map = L.map(this._getMapHtmlElement(), initOptions);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'tileLayer' has changed ...
     */
    modelTileLayerChanged: function (tileLayer) {
      if (this._isValidTaleLayerValue(tileLayer)) {
        L.tileLayer(tileLayer.url, tileLayer.leafLetOptions).addTo(this.map);
      } else {
        console.error('The provided tileLayer is not valid. It should be like: {"url": , "leafLetOptions": (optional)}.',
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

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'mapWidth' has changed ...
     */
    modelMapWidthChanged: function (mapWidth) {
      this._adjustMapWidth(mapWidth);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'mapHeight' has changed ...
     */
    modelMapHeightChanged: function (mapHeight) {
      this._adjustMapHeight(mapHeight);
    },

    _getMapHtmlElement: function () {
      return this.$$('#mapDiv');
    },

    _adjustMapWidth: function (mapWidth) {
      this._getMapHtmlElement().style.width = mapWidth;
    },

    _adjustMapHeight: function (mapHeight) {
      this._getMapHtmlElement().style.height = mapHeight;
    },

    _resetMap: function () {
      this.map.remove();
    },

    _addElementsToMap: function (elements, type) {
      if (this._isValidMapElementSlotValue(elements, type)) {
        if (elements.hasOwnProperty('clearCurrent') && elements.clearCurrent === true) {
          this._clearElementsOfAType(type);
        }
        elements.list.forEach(function (element) {
          this._addMapElement(element, type);
        }.bind(this));
        if (elements.hasOwnProperty('autoFit') && elements.autoFit === true) {
          this.map.fitBounds(this._extractLatLngs(elements.list, type));
        }
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

    _extractLatLngs: function (elements, type) {
      var latLngs = [];
      switch (type) {
        case 'polyline':
        case 'polygon': elements.forEach(function (element) {
          latLngs.concat(element.latlngs);
        }); break;
        case 'rectangle': elements.forEach(function (element) {
          latLngs.concat(element.bounds);
        }); break;
        default: elements.forEach(function (element) {
          latLngs.push(element.latlng);
        });
      }
      return latLngs;
    },

    _validTypeStringSample: function (type) {
      var prefix;
      switch (type) {
        case 'polyline':
        case 'polygon': prefix = '{ "latlngs": [[lat, lng], ... ,[lat, lng]]'; break;
        case 'rectangle': prefix = '{ "bounds": [[lat, lng], [lat, lng]]'; break;
        default: prefix = '{ "latlng": [lat, lng]';
      }
      return prefix + ', "leafLetOptions": { "key": value ... }, "popUpInnerHtml": "code" }. "leafLetOptions" and "popUpInnerHtml" are optional.';
    },

    _createLElementOfAType: function (type, element) {
      switch (type) {
        case 'marker': return L.marker(element.latlng, element.leafLetOptions);
        case 'circle': return L.circle(element.latlng, element.leafLetOptions);
        case 'polygon': return L.polygon(element.latlngs, element.leafLetOptions);
        case 'polyline': return L.polyline(element.latlngs, element.leafLetOptions);
        case 'rectangle': return L.rectangle(element.bounds, element.leafLetOptions);
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
