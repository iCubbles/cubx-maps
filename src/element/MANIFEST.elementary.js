const assert = require("assert");

module.exports = webpackageName => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description:
      "Cubx component to use interactive maps within the Cubbles platform",
    runnables: [
      {
        name: "demo",
        path: "/SHOWROOM.html",
        description: "Demo app..."
      },
      {
        name: "docs",
        path: "/DOCS.html",
        description: "Show the interface of this component."
      }
    ],
    resources: ["element.html"],
    dependencies: [
      {
        webpackageId: "cubx.core.rte@3.0.0",
        artifactId: "cubxcomponent"
      },
      {
        webpackageId: "leaflet-1-0-3@1.0.0-SNAPSHOT",
        artifactId: "leaflet-1-0-3-util"
      }
    ],
    slots: [
      {
        slotId: "mapInitOptions",
        type: "object",
        direction: ["input"],
        description:
          "JSON object containing initial options for the map. See: https://leafletjs.com/reference-1.0.3.html#map"
      },
      {
        slotId: "tileLayer",
        type: "object",
        direction: ["input"],
        description:
          "JSON object with two properties 'url': string with the url to request the layer and 'leafLetOptions'(optional) JSON object containing options for the layer. See https://leafletjs.com/reference-1.0.3.html#tilelayer"
      },
      {
        slotId: "markers",
        type: "object",
        direction: ["input"],
        description:
          'JSON object containing the list of markers to be added and saying if current markers should be removed: {"list": [{"latlng": array|object, "leafletOptions": object, "popUpInnerHtml": string}, ...], "clearCurrent": boolean, "autoFit": boolean}. See https://leafletjs.com/reference-1.0.3.html#marker'
      },
      {
        slotId: "circles",
        type: "object",
        direction: ["input"],
        description:
          'JSON object containing the list of circles to be added and saying if current circles should be removed: {"list": [{"latlng": array|object, "leafletOptions": object, "popUpInnerHtml": string}, ...], "clearCurrent": boolean, "autoFit": boolean}. See https://leafletjs.com/reference-1.0.3.html#circle'
      },
      {
        slotId: "polygons",
        type: "object",
        direction: ["input"],
        description:
          'JSON object containing the list of polygons to be added and saying if current polygons should be removed: {"list": [{"latlngs": array, "leafletOptions": object, "popUpInnerHtml": string}, ...], "clearCurrent": boolean, "autoFit": boolean}. See https://leafletjs.com/reference-1.0.3.html#polygon'
      },
      {
        slotId: "polylines",
        type: "object",
        direction: ["input"],
        description:
          'JSON object containing the list of polylines to be added and saying if current polylines should be removed: {"list": [{"latlngs": array, "leafletOptions": object, "popUpInnerHtml": string}, ...], "clearCurrent": boolean, "autoFit": boolean}. See https://leafletjs.com/reference-1.0.3.html#polyline'
      },
      {
        slotId: "rectangles",
        type: "object",
        direction: ["input"],
        description:
          'JSON object containing the list of rectangles to be added and saying if current rectangles should be removed: {"list": [{"bounds": array, "leafletOptions": object, "popUpInnerHtml": string}, ...], "clearCurrent": boolean, "autoFit": boolean}. See https://leafletjs.com/reference-1.0.3.html#rectangle'
      },
      {
        slotId: "mapWidth",
        type: "string",
        direction: ["input"],
        description:
          "Width for the displayed map. It should be css valid (e.g. 400px, 30em, 30%, 100vw, 100vh)",
        value: "auto"
      },
      {
        slotId: "mapHeight",
        type: "string",
        direction: ["input"],
        description:
          "Width for the displayed map. It should be css valid (e.g. 400px, 30em, 30%, 100vw, 100vh)",
        value: "400px"
      },
      {
        slotId: "selectedElement",
        type: "object",
        direction: ["output"],
        description: "Currently selected (clicked) element. It is a JSON object like {element: the element as provided through an input slot, type: 'marker'|'circle|'rectangle'|'polygon'|'polyline'}; e.g., { element: { latlng: [ 51.5, -0.09 ], leafLetOptions: { title: 'Fixed Marker' } }, type: 'marker' }"
      }
    ]
  };
};
