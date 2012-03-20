Dialog.include({
  check: function (error) {
    var that = this;
    var email_parent_elem = $('email').parent();
    var first_parent_elem = $('firstName').parent();
    var parentArr = [email_parent_elem, first_parent_elem];

    _.each(parentArr, function (elem) {
      if (elem.children('#error').length === 1) {
        elem.children('#error')[0].remove();
      }
    });

    _.each(error, function (err) {
      errMess(err)
    });

    function errMess(error) {
      switch (error) {
        case 'Email_Format':
          $('email').highlight('yellow', 'red');
          email_parent_elem.append('<div id="error">Please Enter a Email Address</div>');
          break;
        case 'First_Name':
          $('firstName').highlight('yellow', 'red');
          first_parent_elem.append('<div id="error">Please Enter a First Name</div>');
          break;
      }
    }
  }
});

emailDialog.check(response);


// Lock tagBar to the top of the screen when scrolling
  var $tagBar     = $$('.dealBar')[0]
    , tagBarTop   = $tagBar.position().y
    ;


  var onScrollFunc = function(e){ 

    if( ( window.scrollY || window.pageYOffset || document.documentElement.scrollTop ) > tagBarTop ){
      $tagBar.setStyle({
        position  :'fixed',
        top       : 0,
        marginTop : 0
      });
    }else{
      $tagBar.setStyle({
        position  :'absolute',
        top       : 'auto',
        marginTop : '20px'
      });
    }
  }

  if (!document.addEventListener) {       
    window.attachEvent("onscroll", onScrollFunc);
  }
  else {
    document.addEventListener("scroll", onScrollFunc, false);
  }

}