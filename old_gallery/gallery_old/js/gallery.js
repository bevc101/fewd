//Define prototypical Gallery function
Element.prototype.Gallery = function(){
  var gallery = this;
  var ul = gallery.children[0];
  var photos = {};
  var photo = document.createElement('div');
  var container = document.getElementById('container');
  var closebtn = document.createElement('div');

  // Define global variables


  this.singlePhoto = function(ev){
    photo.classList.add('single-photo');
    photo.style.backgroundImage = ev.srcElement.style.backgroundImage;
    photo.style.opacity = 1;
    document.getElementById('gallery').style.opacity = 0;
    document.getElementById('slider').style.opacity = 0;
    photo.innerHTML = ev.srcElement.innerHTML;
    container.appendChild(photo);
    closebtn.classList.add('close');
    photo.appendChild(closebtn);
    closebtn.addEventListener('click', function(){
        photo.style.opacity = 0;
        document.getElementById('gallery').style.opacity = 1;
        container.removeChild(photo);
    });
    //gallery.layoutPhotos();
  };

  this.layoutPhotos = function(){
      // add logic for each photo in here

    photos.forEach(function(photo,index){
  //   console.log(photo);
      var li = document.createElement('li');
      li.style.backgroundImage = 'url("'+photo.image_url+'")';
      li.style.backgroundSize = 'cover';
      li.innerHTML = '<div class="meta"><h5>'+
                     photo.name+
                     '</h5><h6>'+
                     photo.user.fullname+
                     '</h6></div><div class="stats"><div>'+
                     photo.rating+'</div></div>'+
                     '</div>';
    li.addEventListener('mousedown', gallery.singlePhoto);
    ul.appendChild(li);

    });


  };

  this.connect = function(){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "./models/popular-photos.json", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var response = JSON.parse(xhr.responseText);
          photos = response.photos;
          gallery.layoutPhotos();


          // JSON.parse does not evaluate the attacker's scripts via xhr.responseText.

        }
      }
      xhr.send();
  };

  this.init = function(){

    this.connect();

  };


  this.init(); // do tasks on initialization.


};
/* end Gallery */
