<template>
  <router-view></router-view>
</template>

<style>
.link {
  color: var(--white);
  display: flex;
  text-decoration: none;
}

:root {
  /* CONSTANTS */
  --white: #ffffff;
  --red: #ec1f27;

  /* STANDARD */
  --bg: #f2f2f2;
  --section1: #ffffff;
  --section2: #f2f2f2;
  --text: #000000;

  /* HOME PAGE */
  --dropdown: #ffffff;
  --filter: #ffffff;
  --statBox: #ffffff;

  /* SETTINGS PAGE */
  --slide: #808080;
  --toggle: #e6e6e6;
  --thinLine: #a6a6a6;
}

html.dark-mode {
  /* STANDARD */
  --bg: #1c1c1c;
  --section1: linear-gradient(#262626, #1c1c1c);
  --section2: linear-gradient(#2b2b2b, #1c1c1c);
  --text: #ffffff;

  /* HOME PAGE */
  --dropdown: #323232;
  --filter: linear-gradient(#383838, #2c2c2c);
  --statBox: linear-gradient(to bottom right, #383838, #212121);

  /* SETTINGS PAGE */
  --slide: #d9d9d9;
  --toggle: #404040;
  --thinLine: #666666;
}
</style>
