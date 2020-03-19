<template>
  <div id="counting">
    Count: {{count}}
    <hr>
    <button v-on:click="increment">INCREMENT</button> | <button v-on:click="decrement">DECREMENT</button>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: "counting",
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
    increment() {
      store.commit('increment');
    },
    decrement() {
      store.commit('decrement');
    }
  }
};
</script>