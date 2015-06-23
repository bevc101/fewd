Element.prototype.Nav = function(){

  var nav = this,
      container = document.getElementById('container'),
      position = 0,
      width = window.innerWidth,
      navIcon = document.createElement('div');

  this.createButtons = function(){

    navIcon.classList.add('hamburger');
    container.insertBefore(navIcon,document.getElementById('slider'));

    navIcon.addEventListener('click', function(){
      if(position === 0) {
        position = (width * 0.2);
        container.style.marginLeft = position +'px';
      }else{
        position = 0;
        container.style.marginLeft = position;
      }

    });

};


  this.init = function(){
    nav.createButtons();
  };

  this.init();

};
