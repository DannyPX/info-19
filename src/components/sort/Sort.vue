<template>
  <div class="sort" :style="'margin: ' + marginY + 'px ' + marginX + 'px;'">
    <span class="title">{{ title }}</span>
    <div class="box">
      <span class="active">Reported</span>
      <span>Hospitalized</span>
      <span>Deceased</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: {
    title: String,
    marginY: Number,
    marginX: Number,
  },
};
</script>

<style scoped>
.sort {
  display: flex;
  flex-flow: column nowrap;
}

.title {
  color: var(--text);
  font-weight: 500;
  font-size: 1.05rem;
}

.box {
  width: 100%;
  margin-top: 10px;
  background: var(--filter);
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
}

.box span {
  color: var(--text);
  padding: 10px 20px;
  border-radius: 12px;
  font-size: clamp(0.95rem, 3vw, 1.4rem);
}

.box span.active {
  background: var(--red);
  color: var(--white);
}

@media only screen and (max-width: 350px) {
  .box span {
    padding: 10px;
  }
}
</style>
