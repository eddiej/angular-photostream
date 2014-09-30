$(document).ready(runscript)
$(document).on('page:load', runscript)

function runscript() {
 reposition();
 $(window).on("throttledresize", reposition); 
}

function reposition( event ){
  scale = $(window).height() / (( $('#theroom').attr('data-topheight')*1) +  589)
  $('#theroom').css('transform',"scale("+scale+")")
  
  otherscale = $(window).height() / (( $('#nonroom').attr('data-topheight')*1) +  589)
  $('#nonroom').css('transform',"scale("+otherscale*0.9+")")
  
}