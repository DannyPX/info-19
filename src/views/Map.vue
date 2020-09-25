<template>
  <div>
    <Topbar title="MAP" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Sort @changeActive="changeMap" :marginY="10" :marginX="20"></Sort>
      <div class="map-wrap">
        <iframe
          class="localfocusvisual"
          frameborder="0"
          style="width:100%;height:550px;overflow:hidden"
          :src="src"
        ></iframe>
      </div>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Sort from "@/components/sort/Sort.vue";

export default {
  name: "Map",
  data() {
    return {
      theme: localStorage.getItem("themeColor"),
      src: "https://localfocuswidgets.net/5f6dd256bb608"
    };
  },
  methods: {
    changeMap(clicked) {
      if (this.theme == "dark-mode") {
        switch (clicked.id) {
          case "rep":
            this.src = "https://localfocuswidgets.net/5f6dd9b6f2be6";
            break;
          case "hos":
            this.src = "https://localfocuswidgets.net/5f6dd9dc51de6";
            break;
          case "dec":
            this.src = "https://localfocuswidgets.net/5f6dda059c5f3";
            break;
        }
      } else {
        switch (clicked.id) {
          case "rep":
            this.src = "https://localfocuswidgets.net/5f6dcfee36092";
            break;
          case "hos":
            this.src = "https://localfocuswidgets.net/5f6dbe6b4a836";
            break;
          case "dec":
            this.src = "https://localfocuswidgets.net/5f6dbe670aadb";
            break;
        }
      }
    }
  },
  mounted() {
    this.theme == "dark-mode"
      ? (this.src = "https://localfocuswidgets.net/5f6dd9b6f2be6")
      : (this.src = "https://localfocuswidgets.net/5f6dcfee36092");
  },
  components: {
    Topbar,
    Section1,
    Sort
  }
};
</script>

<style scoped>
.map-wrap {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
</style>
