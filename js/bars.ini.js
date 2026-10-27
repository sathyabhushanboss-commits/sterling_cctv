(function($){
$(document).ready(function(){
  $('#bars').waypoint(function() {
   $('.progress-bar').each(function(index) {
  	var slidewidth = $(this).delay(200).attr('data-width');
  	$(this).delay(index*100).animate({width:slidewidth}, 300);
 			});
 		}, {offset: '100%'});
	});
})(jQuery);
