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
    var x = ev.target.parentNode.classList;
    console.log(x);
    x.add('flipped');
    y = setTimeout(function(){x.toggle('flipped')},3000);
    z = document.getElementsByClassName('flipped');
    if (z.length === 2) {
      firstc = z[0].innerHTML;
      secondc = z[1].innerHTML;
      if (firstc === secondc) {
        console.log('matcht')
        clearTimeout(y);
      }
    }
  }
};

var Controller = function(){
  this.model = [];
};


Controller.prototype = {
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
        function Shuffle(o) {
	        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	        return o;
        };
        card = Shuffle(model.cards);
        model.cards.forEach(function(card){
           var c;
           c = new Card('div',document.getElementById('container'),'cards');
           c.setContent('<div class="back"></div><div class="front"><div class='
           + card.suit + '>');
           self.model.push(c);

        });
      }
    };
    xhr.send();
  }
};

var appController = new Controller();
appController.fetchCards();
