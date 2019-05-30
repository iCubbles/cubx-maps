const assert = require("assert");

module.exports = webpackageName => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description:
      "Compound component to show the use of RTE 3.0 using cubx-mpas and ajax component",
    runnables: [
      {
        name: "demo",
        path: "/SHOWROOM.html",
        description: "Demo app..."
      },
      {
        name: "docs",
        path: "/DOCS.html",
        description: "Show the interface and dataflow of this component."
      }
    ],
    resources: [
      "element.html"
    ],
    dependencies: [
      {
        artifactId: "cubx-maps-element"
      },
      {
        webpackageId: "com.incowia.ajax@1.0.0-SNAPSHOT",
        artifactId: "ajax-request"
      },
      {
        webpackageId: "generic-mapper@2.0.0-SNAPSHOT",
        artifactId: "cubx-generic-mapper"
      }
    ],
    slots: [
      {
        slotId: "markersMapFunction",
        description:
          "Slot to set the function that will map the result from the request into markers for the map",
        type: "string",
        direction: ["input"]
      },
      {
        slotId: "mapWidth",
        type: "string",
        direction: ["input"],
        description:
          "Width for the displayed map. It should be css valid (e.g. 400px, 30em, 30%, 100vw, 100vh)"
      },
      {
        slotId: "mapHeight",
        type: "string",
        direction: ["input"],
        description:
          "Width for the displayed map. It should be css valid (e.g. 400px, 30em, 30%, 100vw, 100vh)"
      }
    ],
    members: [
      {
        memberId: "map",
        artifactId: "cubx-maps-element"
      },
      {
        memberId: "requester",
        artifactId: "ajax-request"
      },
      {
        memberId: "markersMapper",
        artifactId: "cubx-generic-mapper"
      }
    ],
    connections: [
      {
        connectionId: "markersMappingFunction",
        source: {
          slot: "markersMapFunction"
        },
        destination: {
          memberIdRef: "markersMapper",
          slot: "mapperFunction"
        }
      },
      {
        connectionId: "markersMapping",
        source: {
          memberIdRef: "requester",
          slot: "result"
        },
        destination: {
          memberIdRef: "markersMapper",
          slot: "inputObject"
        }
      },
      {
        connectionId: "markersCon",
        source: {
          memberIdRef: "markersMapper",
          slot: "mappedObject"
        },
        destination: {
          memberIdRef: "map",
          slot: "markers"
        }
      },
      {
        connectionId: "mapWidthCon",
        source: {
          slot: "mapWidth"
        },
        destination: {
          memberIdRef: "map",
          slot: "mapWidth"
        }
      },
      {
        connectionId: "mapHeightCon",
        source: {
          slot: "mapHeight"
        },
        destination: {
          memberIdRef: "map",
          slot: "mapHeight"
        }
      }
    ],
    inits: [
      {
        slot: "tileLayer",
        value: {
          url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          options: {
            attribution:
              'Map data &copy; &lt;a href="https://www.openstreetmap.org/"&gt;OpenStreetMap&lt;/a&gt; contributors, &lt;a href="https://creativecommons.org/licenses/by-sa/2.0/"&gt;CC-BY-SA&lt;/a&gt;',
            maxZoom: 18
          }
        },
        memberIdRef: "map"
      },
      {
        slot: "config",
        value: {
          url:
            "https://opendata.potsdam.de/api/records/1.0/search/?dataset=kitaboerse-20161108&rows=140"
        },
        memberIdRef: "requester"
      },
      {
        slot: "markersMapFunction",
        value: "window.cubx_maps_demo_markersMapFunction"
      }
    ]
  };
};
