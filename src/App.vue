<template>
  <router-view />
</template>

<style lang="scss">
@import "./styles/style";

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
input,
textarea,
select,
button {
  font-family: $font-family;
  font-size: 13px;
  font-weight: $normal;
  line-height: 17px;
  color: $base-grey;
}

input::placeholder {
  color: $base-grey;
  font-family: $font-family;
  font-size: 13px;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  height: 100vh;
  overflow: hidden;
}

body {
  background-color: $sub-white;
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
