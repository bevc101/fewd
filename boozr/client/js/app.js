var showLogin = function(){
  document.getElementById('login-form').style.display='block';
  document.getElementById('signup-form').style.display='none';
  document.getElementById('welcome').style.display='none';
  document.getElementById('logout').style.display='none';
  if(document.body.classList.contains('welcome-page')){
    document.body.classList.remove('welcome-page');
  }
};

var showHome = function(){
  document.getElementById('login-form').style.display='none';
  document.getElementById('signup-form').style.display='none';
  document.getElementById('welcome').style.display='block';
  document.getElementById('logout').style.display='block';
  document.getElementById('searchfield').style.display='block';
  document.body.classList.toggle('welcome-page');
  document.getElementById('bg').style.display='none';
  getUsers();
};


var showSignup = function(){
  document.getElementById('login-form').style.display='none';
  document.getElementById('signup-form').style.display='block';
  document.getElementById('welcome').style.display='none';
  document.getElementById('logout').style.display='none';
  if(document.body.classList.contains('welcome-page')){
    document.body.classList.remove('welcome-page');
  }
  var canvas = document.getElementById("sf-image-canvas");
  var context = canvas.getContext("2d");
  context.font = "20px Roboto Font";
  context.textAlign = "center";
  context.fillStyle = "#d7d7d7";
  context.fillText("Upload Pic",  canvas.width/2, canvas.height/2);
};

var getUsers = function(){
    var container = document.getElementById('welcome');
    this.xhr.request('user','GET').then(function(res){
      console.log(res);
      res.forEach(function(card){
          var div = document.createElement('div');
          div.id = card.username;
          div.classList.add('card', 'mdl-card', 'mdl-shadow--2dp', 'demo-card-wid');
          var img = new Image();
          img.src = 'http://localhost:4444/'+card.avatar.image;
          img.classList.add('photo');
          div.appendChild(img);
          var h3 = document.createElement('h3');
          h3.innerHTML = card.firstName+' '+card.lastName;
          div.appendChild(h3);
          var h4 = document.createElement('h4');
          h4.innerHTML = '<p>Favorite bar: '+card.bar+'<br>'+
                         'Favorite Drink: '+card.drink+'<br>'+
                         'Age: '+card.age+'<br>'+
                         'Location: '+card.location+'<br>'+
                         '</p>';
          div.appendChild(h4);
          var button = document.createElement('message-btn');
          button.classList.add('mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent');
          button.id = 'message-btn'
          button.innerHTML = 'message';
          div.appendChild(button);
          container.appendChild(div);
        });
        searchButton = document.getElementById('searchfield');
        searchButton.addEventListener("keydown",function(ev){

            if(ev.keyCode === 13){
              query = document.getElementById('search').value.toLowerCase();
              console.log(query);
              arr = res;

              for (var i=0; i < arr.length; i++) {
                obj = arr[i];
                   var match = false;
                   for (var key in obj) {

                    if (obj.hasOwnProperty(key)) {
                     var val = obj[key].toString();
                       console.log(val);
                       if (val.toLowerCase().includes(query)){
                         document.getElementById(obj.username).style.display = "block";
                         match = true;
                       } else{
                         if(match===false){
                              document.getElementById(obj.username).style.display = "none";
                         }
                       }

                  /*if (object.hasOwnProperty(key)) {
                    var val = object[key].toString();
                      if (!val.toLowerCase().includes(query)){
                        arr.splice(i, 1)
                      }
                  } */
               };
             };
          };
           console.log(arr);
        };
    });
 });
 };



var signup = function(){

  var that = this;

  this.canvas = document.getElementById('sf-image-canvas');
  this.ctx = this.canvas.getContext('2d');
  this.currentUser = {};
  this.xhr = new xhrHandler();
  this.user = {};
  this.image;

  this.createUser = function(user){
    console.log(user);
    this.xhr.request('signup','POST',user).then(function(res){
      that.currentUser = res;
      showLogin();
    });

  };

  this.handleImage = function(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            that.canvas.width = 200;
            that.canvas.height = 200;
            that.ctx.drawImage(img,0,0);
            setTimeout(function(){
                var data = that.canvas.toDataURL("image/jpeg", 0.8);
                that.image = data;
            },1000);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);

  };

  this.init = function(){

    var imageLoader = document.getElementById('sf-image-loader');
    imageLoader.addEventListener('change', that.handleImage, false);

    var submit = document.getElementById('sf-submit');
    submit.addEventListener("mousedown",function(ev){

      ev.preventDefault();

      that.user.email = document.getElementById('sf-email').value,
      that.user.firstName = document.getElementById('sf-fname').value,
      that.user.lastName = document.getElementById('sf-lname').value,
      that.user.username = document.getElementById('sf-username').value,
      that.user.password = document.getElementById('sf-password').value;
      that.user.bar = document.getElementById('sf-bar').value;
      that.user.drink = document.getElementById('sf-drink').value;
      that.user.age = document.getElementById('sf-age').value;
      that.user.location = document.getElementById('sf-location').value;
      that.user.avatar = {
          image : that.image
      };
      that.createUser(that.user);


      return false;
  },false);

  };

};


var signupForm = document.getElementById('signup-form');
if(signupForm){
  signup.call(signupForm);
  signupForm.init();
}
document.getElementById('sf-link').addEventListener('mousedown',showLogin);




var login = function(){

  var that = this;

  this.currentUser = {};

  this.init = function(){
    console.log('login form is online.');
    var that = this;


    var submit = document.getElementById('lf-submit');
    submit.addEventListener("mousedown",function(ev){
      var xhr = new xhrHandler();
      ev.preventDefault();

      var user = {
        username: document.getElementById('lf-username').value,
        password: document.getElementById('lf-password').value
      }

      xhr.request('login','POST',user).then(function(res){
        if(res.responseText==''){
          error = document.getElementById('error')
          error.innerHTML='<h1>Incorrect Username or Password</h1><a id="close">[close]</a>';
          close = document.getElementById("close");
          close.addEventListener('click', function() {
            error.style.display = 'none';
           }, false);
        }
        else if( typeof(res) === 'object' && res.username === user.username ){
              showHome();
        }

        document.getElementById('lf-username').value = "";
        document.getElementById('lf-password').value = "";
      });


      return false;
    });

  };

};

var loginForm = document.getElementById('login-form');
if(loginForm){
  login.call(loginForm);
  loginForm.init();
}
document.getElementById('lf-link').addEventListener('mousedown',showSignup);



var logoutButton = document.getElementById('logout');
if(logoutButton){
  logoutButton.addEventListener("mousedown",function(ev){
      var xhr = new xhrHandler();
      document.getElementById('bg').style.display='block';
      xhr.request('logout','GET').then(function(res){
        showLogin();
        // clean up cards
        var cards = document.querySelectorAll('.card');
        for(var i=0; i < cards.length; i++){
            cards[i].parentNode.removeChild(cards[i]);
        }
      });

    });
}


var xhr = new xhrHandler();
xhr.request('user','GET').then(function(res){
  console.log(res);
});


showLogin();
