<template>
  <div>
    <Topbar title="MAP" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Sort :marginY="10" :marginX="20"></Sort>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Sort from "@/components/sort/Sort.vue";

export default {
  name: "Map",
  components: {
    Topbar,
    Section1,
    Sort,
  },
};
</script>
