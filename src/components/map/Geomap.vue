<template>
  <div>
    <Sort @changeActive="changeMap"></Sort>
    <div class="map-wrap">
      <iframe
        class="localfocusvisual"
        frameborder="0"
        style="width:100%;height:550px;overflow:hidden"
        :src="src"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Sort from "@/components/sort/Sort.vue";

export default {
  name: "Map",
  data() {
    return {
      theme: localStorage.getItem("themeColor"),
      src: "https://localfocuswidgets.net/5f6dd9b6f2be6"
    };
  },
  methods: {
    switchType(id, rep, hos, dec) {
      switch (id) {
        case "rep":
          this.src = rep;
          break;
        case "hos":
          this.src = hos;
          break;
        case "dec":
          this.src = dec;
          break;
      }
    },
    changeMap(clicked) {
      if (this.theme == "dark-mode") {
        this.switchType(
          clicked.id,
          "https://localfocuswidgets.net/5f6dd9b6f2be6",
          "https://localfocuswidgets.net/5f6dd9dc51de6",
          "https://localfocuswidgets.net/5f6dda059c5f3"
        );
      } else {
        this.switchType(
          clicked.id,
          "https://localfocuswidgets.net/5f6dcfee36092",
          "https://localfocuswidgets.net/5f6dbe6b4a836",
          "https://localfocuswidgets.net/5f6dbe670aadb"
        );
      }
    }
  },
  mounted() {
    this.theme == "dark-mode"
      ? (this.src = "https://localfocuswidgets.net/5f6dd9b6f2be6")
      : (this.src = "https://localfocuswidgets.net/5f6dcfee36092");
  },
  components: {
    Sort
  }
};
</script>

<style scoped>
.map-wrap {
  width: auto;
  height: 459px;
  margin: 0 20px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transform: translateZ(0px);
  overflow: hidden;
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
