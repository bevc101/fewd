var Card = function(elem,parent,className) {
  var self = this;
  this.element = document.createElement(elem);
  this.element.classList.add(className);
  this.element.addEventListener('mousedown',self.flipCard);
  parent.appendChild(self.element);
};

Card.prototype = {
  setContent : function(content){
    this.element.innerHTML = content;
  },
  flipCard : function(ev){
     var self = this;
     console.log(ev);
    // var x = ev.target.
     setTimeout(function(){
      ev.target.classList.add('flipped');
    },1);
  }
};

var Controller = function(){
  this.model = [];
};


Controller.prototype = {
  // flipCard : function(){
  //   console.log('yo');
  //   var cardback = document.getElementsByClassName('back');
  //   cardback.addEventListener('mousedown',function(){
  //     cardback.style.opacity = 0.0;
  //     cardback.style.zIndex = 0;
  //     cardback.style.display = 'none';
  //   });
  // },
  // createView : function(){
  //   var self = this;
  //   for(x=0;x<maxset;x++){
  //     this.model.forEach(function(card){
  //       var view = new View('div',document.body,'cards');
  //       view.setContent('<div class="back"></div><div class="front"><div class="'+card.model.suit+'"</div></div>');
  //     //  self.flipCard();
  //     });
  //   }
  // },
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

           var c;
           c = new Card('div',document.getElementById('container'),'cards');
           c.setContent('<div class="back"></div><div class="front"><div class="'+card.suit+'"</div></div>');
           self.model.push(c);

        });
        //self.createView();

      }
    };
    xhr.send();
  }
};

var appController = new Controller();
appController.fetchCards();
