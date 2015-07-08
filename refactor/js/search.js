var Search = function(){

  var search = this,
      input = search.childNodes[1],
      gallery = document.getElementById("gallery");

  this.searchResults = function(query){


    var event = new CustomEvent("filter", {
      "detail": {
        "query": query
      }
    });

    gallery.dispatchEvent(event);


  };

  this.init = function(){

    input.addEventListener("focus",function(ev){
      ev.target.value = "";
    });

    window.addEventListener("keydown",function(ev){

      if(ev.keyCode === 13){
        search.searchResults(input.value);
      }

    });

  };

  this.init();

};
