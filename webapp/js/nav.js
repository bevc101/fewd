Element.prototype.Nav = function(){

  var nav = this,
      container = document.getElementById('container'),
      position = 0,
      width = window.innerWidth,
      navIcon = document.createElement('div');

  this.toggleNav = function(){
    if(position === 0) {
      position = (width * 0.2);
      container.style.marginLeft = position +'px';
    }else{
      position = 0;
      container.style.marginLeft = position;
    }
  };

  this.createButton = function(){

    navIcon.classList.add('hamburger');
    container.insertBefore(navIcon,document.getElementById('slider'));

    navIcon.addEventListener('click', nav.toggleNav);

    });

};


  this.init = function(){
    nav.createButton();
  };

  this.init();

};
