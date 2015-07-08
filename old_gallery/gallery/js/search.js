Element.prototype.Search= function(){
  var search = this,
      input = this.children[0],
      gallery = document.getElementById('gallery');


  this.init = function(){
    input.addEventListener('focus', function(){
      this.value = '';
      console.log(this.value);
    });

    input.addEventListener('keyup', function(ev){
      if(ev.keyCode === 13) {
        var query = input.value;
        gallery.filterPhotos(query);
      };
    });

  };

  this.init();

};
//  gallery.getFilteredLis();

//when the user focuses on the input, clear its contents
//after the user presses enter "enter/return", filter the gallery <li> using tags from the JSON model.

/*  this.getPhotoList = function(searchtxt) {
    console.log(searchtxt);
    var photos = gallery.children[0];
    photolists = photos.getElementsByTagName('li');
   for (var i=0; i < photolists.length; i++) {
      if (photolists[i].dataset.tags.indexOf(searchtxt) !== -1) {
      console.log(photolists[i]);

    }
  }
  };

  this.getText = function() {
    search.addEventListener('keypress', function(e){
      var keycode = e.which;
      if (keycode === 13) {
    //  console.log(searchtxt.value);
      this.getPhotoList(searchtxt.value);
      }
   });

  };

  this.init = function() {
    search.addEventListener('focus', function() {
      searchtxt.removeAttribute('placeholder');
      search.getText();
    },true);

  }; */
