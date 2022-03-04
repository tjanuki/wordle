import Word from "./word";

export default class Checker {
  constructor(words) {
    this.answer = 'happy'
    this.words = words
    this.results = []
  }

  getWord() {
    return this.words.map((item) => item.word).join('')
  }

  isValidWord() {
    return wordList.includes(this.getWord())
  }

  isCleared() {
    let exactAnswers = this.results.filter((result) => {
      return result.status === 'exact'
    })

    return exactAnswers.length === 5;
  }

  getResults() {
    for (let i in this.words) {
      if (!this.isValidWord()) {
        this.results.push(new Word(this.words[i].word, 'checked'))
        continue
      }

      // console.log('answer', this.words[i].word);
      // console.log('word', this.answer.substr(i, 1));
      if (this.words[i].word === this.answer.substr(i, 1)) {
        // console.log(this.words[i].word, 'exact');
        this.results.push(new Word(this.words[i].word, 'exact'))
        continue;
      }

      if (this.answer.indexOf(this.words[i].word) > 0) {
        // console.log(this.words[i].word, 'used');
        this.results.push(new Word(this.words[i].word, 'used'))
        continue;
      }

      // console.log(this.words[i].word, 'unknown');
      // this.results.push('invalid')
      this.results.push(new Word(this.words[i].word, 'invalid'))
    }

    return this.results;
  }
}

const wordList = [
  'happy',
  'hello',
  'puppy',
  'audio',
  'under',
  'sunny',
  'kitty',
  'apple'
]