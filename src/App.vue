<template>
  <router-view></router-view>
</template>

<style>
.link {
  color: #ffffff;
  display: flex;
  text-decoration: none;
}

:root {
  --bg: #fff;
  --color: #000000;
}

html.dark-mode {
  --bg: #232b32;
  --color: #ddd8ca;
}

body {
  background-color: var(--bg);
  color: var(--color);
}
</style>
