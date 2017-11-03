class Node {
  constructor(letter) {
    this.letter = letter;
    this.child =  {};
    this.endWord = false;
    this.popularity = 0;  
  }
}


module.exports= Node;