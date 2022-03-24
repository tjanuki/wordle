import Checker from './checker'
import { createStore } from 'vuex'
import Word from './word.js'
import { dict } from './dict'

const store = createStore({
  state() {
    return {
      answers: [[]],
      answer: '',
      currentRow: 0,
      message: '',
      gameStatus: '',
    }
  },
  mutations: {
    addAnswers(state, payload) {
      state.answers[state.currentRow].push(payload)
    },
    deleteAnswers(state) {
      state.answers[state.currentRow].pop()
    },
    updateAnswers(state, payload) {
      state.answers[state.currentRow][payload.index] = payload.word
    },
    incrementCurrentRow(state) {
      console.log('increment', state.currentRow)
      state.currentRow++
      state.answers[state.currentRow] = []
    },
    updateMessage(state, payload) {
      state.message = payload
    },
    updateGameStatus(state, payload) {
      state.gameStatus = payload
    },
    updateAnswer(state, payload) {
      state.answer = payload
    },
  },
  actions: {
    init(context) {
      let answer = dict[Math.floor(Math.random() * dict.length)]
      context.commit('updateAnswer', answer)
    },
    clickButton(context, payload) {
      if (context.state.gameStatus) {
        return
      }
      if (context.state.answers[context.state.currentRow].length >= 5) {
        return
      }

      context.commit(
        'addAnswers',
        new Word(payload.key.toLowerCase(), 'draft')
      )
    },
    deleteAnswer(context) {
      if (context.state.gameStatus) {
        return
      }
      if (context.state.answers[context.state.currentRow] <= 0) {
        return
      }
      context.commit('deleteAnswers')
    },
    enterRow(context) {
      if (context.state.gameStatus) {
        return
      }

      if (context.state.answers[context.state.currentRow].length !== 5) {
        return
      }

      let checker = new Checker(
        context.state.answer,
        context.state.answers[context.state.currentRow]
      )
      let results = checker.getResults()
      if (!checker.isValidWord()) {
        results.forEach((word, index) => {
          context.commit('updateAnswers', { index, word })
        })

        context.commit('updateMessage', 'Not in word list')
        context.commit('updateGameStatus', 'invalid')
        setTimeout(() => {
          context.commit('updateGameStatus', '')
        }, 600)
        setTimeout(() => {
          context.commit('updateMessage', '')
        }, 1000)

        return false
      }

      results.forEach((word, index) => {
        setTimeout(() => {
          context.commit('updateAnswers', { index, word })
        }, 300 * index)
      })

      setTimeout(() => {
        if (checker.isCleared()) {
          results.forEach((word, index) => {
            setTimeout(() => {
              context.commit('updateAnswers', {
                index,
                word: new Word(word.word, 'completed'),
              })
            }, 150 * index)
          })

          context.commit('updateMessage', 'Genius!')
          setTimeout(() => {
            context.commit('updateMessage', '')
          }, 3000)

          context.commit('updateGameStatus', 'Completed')

          return
        }

        context.commit('incrementCurrentRow')
        if (context.state.currentRow > 5) {
          context.commit('updateMessage', context.state.answer.toUpperCase())
          context.commit('updateGameStatus', 'Failed')
        }
      }, 1500)
    },
    solve() {

    }
  },
})

export default store
