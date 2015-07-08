Element.prototype.Contact = function(){
  var contact = this,
      form = document.getElementById('c_form'),
      submit = document.getElementById('contact-submit'),
      wrapper = document.getElementById('form-wrapper');



  this.send = function() {
    //collect and send via email, leave some feedback that the form
    //has been submitted
    var link =  'mailto:bevc4jm@gmail.com?subject=Message from ' +
                form.children[0].value+
               '&body=' + form.children[3].value;
    console.log(link);
    window.location.href = link;
    wrapper.innerHTML = '<div class="center"><h2>Thanks!</h2></div>'

  };

  this.init = function() {
    //add an eventlistener on the button which sends the form!
    submit.addEventListener('click', function(ev){
      ev.preventDefault();
      contact.send();
    });


  };

  this.init();

};
