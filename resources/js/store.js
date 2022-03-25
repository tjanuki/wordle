import Checker from './checker'
import { createStore } from 'vuex'
import Word from './word.js'
import { dict } from './dict'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      answers: [[]],
      answer: '',
      currentRow: 0,
      message: '',
      gameStatus: '',
      isLoading: false
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
    updateIsLoading(state, payload) {
      state.isLoading = payload
    },
    updateAnswer(state, payload) {
      state.answer = payload
    }
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
      console.log('deleteAnswer')
      if (context.state.gameStatus) {
        return
      }
      console.log(context.state.answers[context.state.currentRow])
      if (context.state.answers[context.state.currentRow].length <= 0) {
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
                word: new Word(word.word, 'completed')
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
        context.commit('updateIsLoading', false)
      }, 1500)
    },

    async solve(context) {
      if (context.state.gameStatus) {
        return
      }

      context.commit('updateIsLoading', true)
      context.dispatch('clearInput')

      let answers = context.state.answers.map(answer => {
        let jointWord = answer.map(word => {
          return word.word
        }).join('')

        let jointStatus = answer.map(word => {
          return word.status.substring(0, 1)
        }).join('')

        return jointWord + '-' + jointStatus

      }).filter(answer => answer !== '-')

      try {
        const data = await axios.get('/api/solver', {
          params: {
            answers
          }
        })

        let nextWord = data.data
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            context.dispatch('clickButton', { key: nextWord.charAt(i) })
          }, i * 300)
        }

        setTimeout(() => {
          context.dispatch('enterRow')
        }, 1550)
      } catch (error) {
        console.log(error)
      }
    },

    clearInput(context) {
      const input = context.state.answers[context.state.currentRow].length
      for (let i = 0; i < input; i++) {
        context.dispatch('deleteAnswer')
      }
    }
  }
})

export default store
