<template>
  <div id="section2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Section2",
  props: {
    height: Number
  }
};
</script>
