<template>
  <div>
    <h1>Circle Diagram in Vue + D3</h1>
    <svg
      :height="dynamicHeight"
      :width="width + margin['left'] + margin['right']"
    >
      <g :transform="diagramPosition">
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
  props: ["mockApiData"],
  data() {
    return {
      height: 550,
      width: 600,
      margin: {
        top: 75,
        right: 50,
        bottom: 50,
        left: 50,
      },
    };
  },
  methods: {
    treeChart() {
      const output = this.tree(this.treeData).descendants();
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
          textAnchor: 'middle',
          textFontSize: '15px',
        };
      });
    },
    links() {
      const links = this.tree(this.treeData).links();

      return links.map(d => {
        return {
          d: this.linkGenerator(d),
          linkId: `link-${d.source.x}-${d.target.x}`,
        }
      });
    },
  },
  computed: {
    diagramPosition() {
      return `translate(${this.margin['left']},${this.margin['top']})`
    },
    dynamicHeight() {
      const treeHeight = this.tree(this.treeData).height;
      const treeExtension = treeHeight < 3
        ? this.height
        : this.height + ((treeHeight - 2) * 75);
      return treeExtension + this.margin['top'] + this.margin['bottom'];
    },
    tree() {
      return d3.tree()
        .size([
          this.width - this.margin['left'] - this.margin['right'],
          this.height - this.margin['top'] - this.margin['bottom']
        ]);
    },
    linkGenerator() {
      return d3.linkVertical()
        .x(function(d) { return d.x })
        .y(function(d) { return d.y; });
    },
    treeData() {
      return d3
        .hierarchy(this.mockApiData)
    },
    setMargins() {
      return 600;
    },
    output() {
      return  {
        nodes: this.treeChart(),
        links: this.links(),
      }
    }
  }
};
</script>

<style>

svg {
  border: 1px solid red;
}

.link {
	fill: none;
	stroke: #555;
	stroke-opacity: 0.4;
	stroke-width: 1.5px;
}
</style>
