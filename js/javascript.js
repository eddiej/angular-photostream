$(document).ready(runscript)
$(document).on('page:load', runscript)

function runscript() {
 $(window).on("throttledresize", reposition); 
 reposition();
 Stripe.setPublishableKey('YOUR-KEY-COMES-HERE');
}

function reposition( event ){
  scale = $(window).height() / (( $('#theroom').attr('data-topheight')*1) +  589)
  $('#theroom').css('transform',"scale("+scale+")")
  console.info($('#theroom').size())
}