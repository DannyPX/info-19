<template>
  <div>
    <Bigtopbar title="INFO-19"></Bigtopbar>
    <Section1 :top="165">
      <Statistics
        date="17/09"
        :reported="8522"
        :hospitalized="934"
        :deceased="347"
        :rep_change="22"
        :hos_change="13"
        :dec_change="18"
      ></Statistics>
      <Section2>
        <Graph></Graph>
      </Section2>
    </Section1>
  </div>
</template>

<script>
import Bigtopbar from "@/components/nav/Bigtopbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Statistics from "@/components/home/Statistics.vue";
import Section2 from "@/components/sections/Section2.vue";
import Graph from "@/components/home/Graph.vue";

export default {
  name: "Home",
  components: {
    Bigtopbar,
    Section1,
    Statistics,
    Section2,
    Graph,
  },
};
</script>
