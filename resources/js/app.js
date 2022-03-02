require('./bootstrap');


import { createApp } from 'vue'
import PuzzleBase from './components/PuzzleBase'


const app = createApp({
  components: {
    PuzzleBase
  }
})

app.mount('#app');
