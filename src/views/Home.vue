<template>
  <div id="home">
    <CircleDiagram :mockApiData=loadData />
  </div>
</template>

<script>
import * as d3 from "d3";

import CircleDiagram from "../components/Chart.vue";

export default {
  name: "home",
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
