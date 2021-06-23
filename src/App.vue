<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
$forest: #304040;
html,
body {
  height: 100%;
  width: 100%;
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
  color: $forest;
}
</style>
