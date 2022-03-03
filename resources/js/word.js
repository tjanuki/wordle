export default class Word {
  constructor(word = '', status = '') {
    this.word = word;
    this.status = status;
  }

  isEmpty() {
    return ! this.word
  }

  isDraft() {
    return this.status === 'draft'
  }

  isExact() {
    return this.status === 'exact'
  }

  isUsed() {
    return this.status === 'used'
  }

  isInvalid() {
    return this.status === 'invalid'
  }

  isFixed() {
    return ! this.isEmpty() && ! this.isDraft()
  }
}


