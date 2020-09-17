<template>
  <div>
    <Topbar title="SETTINGS" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Block
        :location="true"
        title="Location"
        option="Automatic"
        :slide2="true"
        option2="Manual"
        currentLocation="Eindhoven"
        :toggle="false"
      ></Block>
      <Block
        :notification="true"
        title="Notifications"
        option="Push notifications"
        :toggle="false"
      ></Block>
      <Block
        :theme="true"
        title="Theme"
        option="Dark mode"
        :darkToggle="true"
      ></Block>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Block from "@/components/settings/Block.vue";

export default {
  name: "Settings",
  components: {
    Topbar,
    Section1,
    Block,
  },
};
</script>
