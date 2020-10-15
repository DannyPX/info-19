<template>
  <div>
    <Sort @changeActive="changeMap"></Sort>
    <div class="map-wrap">
      <MglMap 
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        @load="onMapLoaded"
      >
        <MglNavigationControl position="top-right"/>
      </MglMap>
    </div>
  </div>
</template>

<script>
//import Sort from "@/components/sort/Sort.vue";
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl } from "vue-mapbox";
import { mapGetters } from 'vuex';
import Sort from "@/components/sort/Sort.vue";

export default {
  name: "Map",
  components: {
    MglMap,
    MglNavigationControl,
    Sort
  },
  computed: {
    ...mapGetters("data", ["geojson"])
  },
  data() {
    return {
      theme: localStorage.getItem("themeColor"),
      accessToken: "pk.eyJ1IjoiZGFubnlweCIsImEiOiJjazBveTZqM3kwZWU5M2dudGJ6NTVmcjRlIn0.ccataXhIdh8adNK0nuEU2g",
      mapStyle: "mapbox://styles/dannypx/ckgak5my78jw619qhnjiaip7p",
      geoJsonSource: {
      },
      geoJsonLayer: {
      },
      geoID: "DataRIVM",
      type: 'reported'
    };
  },
  created() {
    this.map = null;
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoaded(event) {
      this.map = event.map;
      const asyncActions = event.component.actions
      await asyncActions.jumpTo({
        center: [5.280, 52.312],
        zoom: 5.88,
      })
      this.map.addSource(this.geoID, this.geoJsonSource)
      let layer = this.geoJsonLayer;
      layer.id = "myLayer";
      layer.source = "DataRIVM";
      this.map.addLayer(this.geoJsonLayer);

      let _this = this;
      this.map.on('click', 'myLayer', function (e) {
        new Mapbox.Popup()
          .setLngLat(e.lngLat)
          .setText(e.features[0].properties.name + " | " + _this.type + ": " + (_this.type == "reported" ? e.features[0].properties.reported : _this.type == "hospitalized" ? e.features[0].properties.hospitalized : e.features[0].properties.deceased))
          .addTo(_this.map)
      })
    },
    changeMap(clicked) {
      switch (clicked.id) {
        case "rep":
          this.type = 'reported';
          break;
        case "hos":
          this.type = 'hospitalized';
          break;
        case "dec":
          this.type = 'deceased';
          break;
      }
      this.reloadMap();
    },
    reloadMap() {
      this.map.removeLayer("myLayer");
      this.setGeoJSON();
      let layer = this.geoJsonLayer;
      layer.id = "myLayer";
      layer.source = "DataRIVM";
      this.map.addLayer(this.geoJsonLayer);
    },
    setGeoJSON() {
      this.geoJsonLayer = {
        type: "circle",
        paint: {
          "circle-color": "rgb(255, 0, 0)",
          "circle-opacity": 0.6,
          "circle-radius": [
            'interpolate', ['linear'], ['zoom'],
            5, ['/', ['get', this.type], this.type == 'reported' ? 30 : 0.75],
            20, ['/', ['get', this.type], this.type == 'reported' ? 5 : 0.1]
          ]
        }
      }
    }
  },
  mounted() {
    let geojsondata = this.geojson;
    this.theme == "dark-mode"
      ? (this.mapStyle = "mapbox://styles/dannypx/ckgalcdtm0gwx19nxrec9x2aj")
      : (this.mapStyle = "mapbox://styles/dannypx/ckgak5my78jw619qhnjiaip7p");
    this.geoJsonSource = {
      type: 'geojson',
      data: geojsondata
    };
    this.setGeoJSON();
  },
};
</script>

<style scoped>
.map-wrap {
  width: auto;
  height: 459px;
  margin: 0 20px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
}

.localfocusvisual {
  margin-top: -50px;
  transform: scale(1.05);
}

@media only screen and (max-width: 328px) {
  .map-wrap {
    height: 440px;
  }
}
</style>
