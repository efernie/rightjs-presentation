$(document).onReady(function(){

  var dialogHtml = '<pre class="brush: js;">new Dialog({title : "",html : "html goes here"});</pre>';
  var dialogDemo = new Dialog({
    title : 'Dialog',
    html : dialogHtml,
    onOk : function(){
      this.hide();
    }
  });

  $('demoDialog').onClick(function(){
    dialogDemo.show();
  });

  new Calendar().assignTo('date-triggered', 'date-trigger');
  
  $('demoHighlight').onClick(function(){
    this.highlight('blue');
  });
  
  $('demoFade').onClick(function(){
    this.fade().fade();
  });

  $('demoSlide').onClick(function(){
    this.morph({
      fontSize: '40px',
      background: 'green',
      color: 'yellow'
    }, {duration: 'long'});
  });

});