<template>
  <div id="app">
    <div>
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'counting'}">Counting Page</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store';

export default {
  name: 'app',
  store,
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
