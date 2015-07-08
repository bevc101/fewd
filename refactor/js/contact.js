var Contact = function(){

  var contact = this,
      form = document.getElementById('c_form'),
      submit = document.getElementById('contact-submit'),
      wrapper = document.getElementById('form-wrapper'),
      isValid = false;



  this.send = function(){

   var link = 'mailto:steveblue@gmail.com?subject=Message from '+
              form.children[0].value+
              '&body='+
              form.children[4].value;

       window.location.href = link;
       wrapper.innerHTML = '<div class="center"><h2>Thanks!</h2></div>';

  };



  this.init = function(){
    submit.addEventListener("mousedown",function(){
        contact.send();
    });
  };

  this.init();

};
