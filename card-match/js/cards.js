//maxcards must be dividable by 4 - need to figure out how to make this a requirement
var maxcards = 20;
var maxset = maxcards/4;
var Card = function(card) {
    this.model = card;
};

var View = function(elem,parent,className) {
  var self = this;
  this.element = document.createElement(elem);
  this.element.classList.add(className);
  parent.appendChild(self.element);
};

View.prototype = {
  setContent : function(content){
    console.log(content);
    this.element.innerHTML = content;
  }
};

var Controller = function(){
  this.model = [];
};


Controller.prototype = {
  createView: function(){
    for(x=0;x<maxset;x++){
      this.model.forEach(function(card){
        var view = new View('div',document.body,'cards');
        view.setContent('<div class="back"></div><div class="front"><div class="'+card.model.suit+'"</div></div>');
      });
    }
  },
  fetchCards : function(){
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './model/cards.json');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        //parse our json
      //  console.log(xhr.responseText);
        var model = JSON.parse(xhr.responseText);
        model.cards.forEach(function(card){
           self.model.push(new Card(card));
        });
        self.createView();

      }
    };
    xhr.send();
  }
};

var appController = new Controller();
appController.fetchCards();
