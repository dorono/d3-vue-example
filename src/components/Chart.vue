<template>
  <div>
    <h1>Circle Pack in D3</h1>
    <h2>{{ msg }}</h2>
    <svg
      :height='height'
      :width='width'
    >
      <g transform="translate(50,50)">
        <path
          v-for="p in output.links"
          class="link"
          :key="p.linkId"
          :d="p.d"
        ></path>

        <g
          v-for="c in output.nodes"
          :transform="c.transformCoords"
          :key="c.nodeId"
        >
          <circle
            :stroke="c.stroke"
            :fill="c.circleFill"
            :r="c.r"
          >
          </circle>

          <text
            :fill="c.textFill"
            :x="c.textX"
            :y="c.textY"
            :text-anchor="c.textAnchor"
            :font-size="c.textFontSize"
          >
            {{c.text}}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "treeChart",
  props: ["tweetData"],
  data() {
    return {
      msg: "👋 from the Chart Component",
      height: 600,
      width: 600
    };
  },
  methods: {
    treeChart() {
      console.log('this.packData', this.packData);
      // treeChart.padding(10);
      const output = this.tree(this.packData).descendants();
      console.log('output', output);
      return output.map(d => {
        return {
          transformCoords: `translate(${d.x}, ${d.y})`,
          nodeId: `node-${d.x}-${d.y}`,
          r: 50,
          circleFill: 'white',
          stroke: 'black',
          text: d.data.name,
          textFill: 'black',
          textX: 0,
          textY: 0,
          textAnchor: 'start',
          textFontSize: '15px',
        };
      });
    },
    links() {
      const links = this.tree(this.packData).links();
      return links.map((d, i) => {
        return {
          d: d3.linkVertical()
          .x(function(d) { return d.x })
          .y(function(d) { return d.y; }),
          linkId: i,
        }
      });
    },
  },
  computed: {
    tree() {
      return d3.tree()
        .size([500, 500]);
    },
    linkGenerator(linkData) {
      return d3.linkVertical()
        .x(function(linkData) { return linkData.x })
        .y(function(linkData) { return linkData.y; });
    },
    packData() {
      // const nestedTweets = d3
      //   .nest()
      //   .key(d => d.user)
      //   .entries(this.tweetData);

      // const packableTweets = { id: "All Tweets", values: nestedTweets };
      return d3
        .hierarchy(this.tweetData)
        // .sum(d =>
        //   d.retweets ? d.retweets.length + d.favorites.length + 1 : 1
        // );
    },
    output() {
      return  {
        nodes: this.treeChart(),
        // links: this.links(),
      }
    }
  }
};
</script>

<style>
</style>
