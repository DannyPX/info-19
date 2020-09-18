<template>
  <div>
    <Topbar
      title="INFO-19"
      :map="true"
      :settings="true"
      :dropdown="true"
    ></Topbar>
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
        <Sort title="Graph"></Sort>
      </Section2>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Statistics from "@/components/home/Statistics.vue";
import Section2 from "@/components/sections/Section2.vue";
import Sort from "@/components/sort/Sort.vue";

export default {
  name: "Home",
  components: {
    Topbar,
    Section1,
    Statistics,
    Section2,
    Sort,
  },
};
</script>
