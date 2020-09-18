<template>
  <div id="statistics">
    <div class="header">
      <span class="title">Statistics</span>
      <span class="date">{{ date }}</span>
    </div>
    <div class="wrap">
      <div class="box">
        <span class="change">{{ rep_change > 0 ? "+" + rep_change : "" }}</span>
        <span class="number">{{ reported }}</span>
        <span class="type">Reported</span>
      </div>
      <div class="box">
        <span class="change">{{ hos_change > 0 ? "+" + hos_change : "" }}</span>
        <span class="number">{{ hospitalized }}</span>
        <span class="type">Hospitalized</span>
      </div>
      <div class="box">
        <span class="change">{{ dec_change > 0 ? "+" + dec_change : "" }}</span>
        <span class="number">{{ deceased }}</span>
        <span class="type">Deceased</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  props: {
    date: String,
    reported: Number,
    hospitalized: Number,
    deceased: Number,
    rep_change: Number,
    hos_change: Number,
    dec_change: Number,
  },
};
</script>

<style scoped>
#statistics {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  color: var(--text);
  font-weight: 500;
  font-size: 1.05rem;
}

.header .date {
  color: var(--text);
  font-size: 0.9rem;
}

.wrap {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 31% 31% 31%;
  justify-content: space-between;
}

.wrap .box {
  position: relative;
  background: var(--statBox);
  padding: 15px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.box .change {
  position: absolute;
  color: var(--red);
  top: 0;
  right: 0;
  margin: 2px 6px;
  font-size: clamp(1rem, 4vw, 1.8rem);
}

.box .number {
  color: var(--red);
  font-weight: 500;
  font-size: clamp(1.7rem, 8vw, 3rem);
}

.box .type {
  color: var(--text);
  font-size: clamp(0.95rem, 3vw, 1.4rem);
}
</style>
