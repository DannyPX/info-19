<template>
  <div id="graph">
    <span class="title">Graph</span>
    <div class="filter">
      <span class="active">Reported</span>
      <span>Hospitalized</span>
      <span>Deceased</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graph",
};
</script>

<style scoped>
#graph {
  display: flex;
  flex-flow: column nowrap;
}

.title {
  font-weight: 500;
  font-size: 1.05rem;
}

.filter {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
}

.filter span {
  color: #000000;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: clamp(0.95rem, 3vw, 1.4rem);
}

.filter span.active {
  background: #ec1f27;
  color: #ffffff;
}

@media only screen and (max-width: 350px) {
  .filter span {
    padding: 10px;
  }
}
</style>
