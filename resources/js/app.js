import Checker from "./checker";

require('./bootstrap');

import {createApp} from 'vue'
import {createStore} from 'vuex'

import PuzzleBase from './components/PuzzleBase'
import Word from './word.js'

const store = createStore({
  state() {
    return {
      answers: [[]],
      currentRow: 0,
      message: '',
    }
  },
  // getters: {
  //   currentAnswers(state) {
  //     return state.answers[state.answers.length] || []
  //   }
  // },
  mutations: {
    addAnswer(state, payload) {
      // if (Array.isArray(state.answers[state.currentRow])) {
      state.answers[state.currentRow].push(payload)
      // } else {
      //   state.answers[state.currentRow] = [payload]
      // }
    },
    deleteAnswer(state) {
      // state.answers[state.currentRow].pop()
      state.answers[state.currentRow].pop()
    },
    updateAnswer(state, payload) {
      state.answers[state.currentRow] = payload
    },
    incrementCurrentRow(state) {
      console.log('increment', state.currentRow);
      state.currentRow++
      state.answers[state.currentRow] = []
    },
    updateMessage(state, payload) {
      state.message = payload
    },
  },
  actions: {
    clickButton(context, payload) {
      let currentAnswers = context.state.answers[context.state.currentRow]
      if (currentAnswers && currentAnswers.length >= 5) {
        return
      }

      context.commit('addAnswer', new Word(payload.key, 'draft'))
    },
    deleteAnswer(context) {
      if (context.state.answers[context.state.currentRow] <= 0) {
        return
      }
      context.commit('deleteAnswer')
    },
    enterRow(context) {
      if (context.state.answers[context.state.currentRow].length !== 5) {
        return
      }

      if (context.state.currentRow > 5) {
        return
      }

      let checker = new Checker(context.state.answers[context.state.currentRow])
      if (!checker.isValidWord()) {
        context.commit('updateMessage', 'Not in word list')
        setTimeout(() => {
          context.commit('updateMessage', '')
        }, 1000)
        return false;
      }

      let results = checker.getResults()
      console.log(results);
      context.commit('updateAnswer', results)


      context.commit('incrementCurrentRow')

      if (context.state.currentRow > 5) {
        console.log('You are done!');
      }
    }
  },
})

const app = createApp({
  components: {
    PuzzleBase
  }
})

app.use(store)
app.mount('#app');
