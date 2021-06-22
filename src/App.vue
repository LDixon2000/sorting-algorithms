<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
$mushroom: #f3f2e4;
$forest: #304040;
html,
body {
  background: $forest !important;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $mushroom;
}
</style>
