var Nav = function() {

  var nav = this,
    navItems = nav.children[0].children,
    sections = document.getElementsByTagName('section'),
    btn = document.createElement('div'),
    container = document.getElementById('container'),
    open = false;


  this.open = function() {
    container.style.left = "320px";
    open = true;
  };

  this.close = function() {
    container.style.left = "0px";
    open = false;
  };

  this.toggleNav = function() {
    if (open === false) {
      nav.open();
    } else {
      nav.close();
    }
  };

  this.showSection = function(id,toggle){
    nav.hideSections();

    document.getElementById(id).style.opacity = 1.0;
    document.getElementById(id).style.zIndex = 50;
    document.getElementById(id).style.display = "block";

  };

  this.hideSections = function() {
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.opacity = 0.0;
      sections[i].style.zIndex = 0;
      sections[i].style.display = 'none';

    }
  };

  this.createButtons = function() {

    btn.classList.add('hamburger');

    btn.addEventListener('mousedown', nav.toggleNav);

    container.appendChild(btn);

    // add eventListeners to navItems;

    for (var i = 0; i < navItems.length; i++) {

      navItems[i].addEventListener("mousedown", function(ev) {

        var id = ev.target.dataset.section;
        nav.showSection(id);
        nav.toggleNav();

      });

    }


  };


  this.init = function() {
    nav.hideSections();
    nav.createButtons();

    nav.addEventListener('change', function(ev) {

      var id = ev.detail.view;

      nav.showSection(id);

    }, false);

    nav.showSection('slider',false);



  };

  this.init();
};
