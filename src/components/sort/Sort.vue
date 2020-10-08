<template>
  <div class="sort">
    <span class="title">{{ title }}</span>
    <div class="box">
      <span id="rep" @click="changeActive('rep')" class="active">{{ locale.reported}}</span>
      <span id="hos" @click="changeActive('hos')">{{ locale.hospitalized }}</span>
      <span id="dec" @click="changeActive('dec')">{{ locale.deceased }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Sort",
  computed: {
    ...mapGetters("data", ["locale"])
  },
  props: {
    title: String
  },
  methods: {
    changeActive(info) {
      let clicked = document.getElementById(info);
      let active = document.querySelector(".active");

      if (active != clicked) {
        active.classList.remove("active");
        clicked.classList.add("active");
        this.$emit("changeActive", clicked);
      }
    }
  }
};
</script>

<style scoped>
.sort {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 10px;
  margin: 10px 20px;
}

.title {
  color: var(--statText100);
  font-weight: 500;
  font-size: 1.05rem;
}

.box {
  width: 100%;
  margin-top: 10px;
  background: var(--statBox);
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
}

.box span {
  border: 1px solid transparent;
  background: none;
  color: var(--statText60);
  padding: 8px 20px;
  border-radius: 12px;
  font-size: clamp(0.95rem, 3vw, 1.4rem);
}

.box span.active {
  border: 1px solid var(--red);
  background: var(--sortBackground);
  color: var(--sortActive);
  transition: 0.3s ease-out;
}

@media only screen and (max-width: 350px) {
  .box span {
    padding: 10px;
  }
}
</style>
