require('./bootstrap');

import {createApp} from 'vue'

import PuzzleBase from './components/PuzzleBase'

const app = createApp({
  components: {
    PuzzleBase
  }
})

import store from "./store";
app.use(store)
app.mount('#app');
