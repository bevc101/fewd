//Define prototypical Gallery function
var Gallery = function() {

  // Define global variables

  var gallery = this,
    ul = gallery.children[0],
    nav = document.getElementById('nav'),
    single = document.getElementById('single-photo'),
    container = document.getElementById('container');

  this.photos = [];

  this.displaySinglePhoto = function(li) {

    var photo = gallery.photos[li.dataset.index];
    var event = new CustomEvent('change', {
      'detail': {
        'view': 'single-photo',
        'photo': gallery.photos[li.dataset.index]
      }
    });

    single.style.background = 'url("' + photo.image_url + '")';
    single.style.backgroundPosition = 'center center';
    single.style.backgroundSize = 'contain';
    single.style.backgroundRepeat = 'no-repeat';

    single.innerHTML = '<div class="meta"><h2>' +
      photo.name +
      '</h2><h3>' +
      photo.user.fullname +
      '</h3><p>'+
      photo.description+
      '</p><div class="stats"><div>' +
      photo.rating + '</div></div></div>' +
      '</div>';


    var close = document.createElement('div');
    close.classList.add('close');
    single.appendChild(close);

    close.addEventListener('mousedown',function(){
      var event = new CustomEvent('change', {
        'detail': {
          'view': 'gallery'
        }
      });
      nav.dispatchEvent(event);
    });
    container.style.maxHeight = gallery.offsetHeight;
    container.scrollTop = 0;
    nav.dispatchEvent(event);

  };

  this.filterPhotos = function(query){
   var filtered = [];

    for(var i=0;i<ul.children.length;i++){

      var tags = ul.children[i].dataset.tags;
      var arr = tags.split(',');
      var matched = false;

      arr.forEach(function(tag){
        if(tag === query){

           ul.children[i].style.display = 'block';
           matched = true;

           console.log(ul.children[i]);
        }
      });
      if(matched === false){
        ul.children[i].style.display = 'none';
      }
      if(query === 'all'){
        ul.children[i].style.display = 'block';
      }

    };


  };

  this.layoutPhotos = function() {
    gallery.photos.forEach(function(photo, index) {
      var li = document.createElement('li');
      var tags = [];
      li.style.background = 'url("' + photo.image_url + '")';
      li.style.backgroundSize = 'cover';
      li.dataset.index = index;

      li.innerHTML = '<div class="meta"><h5>' +
        photo.name +
        '</h5><h6>' +
        photo.user.fullname +
        '</h6></div><div class="stats"><div>' +
        photo.rating + '</div></div>' +
        '</div>';


      li.addEventListener('mousedown', function() {
        gallery.displaySinglePhoto(this);
      });

      photo.tags.forEach(function(tag){
        tags.push(tag.toLowerCase());
      });
      li.dataset.tags = tags;


      ul.appendChild(li);

    });
  };

  this.connect = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./models/popular-photos.json", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        var photoEv = new CustomEvent('photos');

        gallery.photos = resp.photos;
        gallery.layoutPhotos();

        window.dispatchEvent(photoEv);
      }
    }
    xhr.send();
  };

  this.init = function() {

    this.connect();

    gallery.addEventListener('filter', function(ev) {

      gallery.filterPhotos(ev.detail.query);

    }, false);


  };


  this.init(); // do tasks on initialization.


};
/* end Gallery */
