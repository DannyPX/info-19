<template>
  <div>
    <Topbar :title="locale.map" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Geomap></Geomap>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Geomap from "@/components/map/Geomap.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Map",
  computed: {
    ...mapGetters("data", ["locale"])
  },
  components: {
    Topbar,
    Section1,
    Geomap
  }
};
</script>
