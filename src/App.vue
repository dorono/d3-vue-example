<template>
  <div id="app">
    <CircleDiagram :mockApiData=loadData />
  </div>
</template>

<script>
import * as d3 from "d3";

import CircleDiagram from "./components/Chart.vue";

export default {
  name: "app",
  components: {
    CircleDiagram
  },
  data: function() {
    return {
      loadData: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./testData.json");
      this.loadData = data;
    }
  }
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
