var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
  
/***************************************************
	HEADER
***************************************************/
	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 200;
			document.querySelector( 'header' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 250 );
				}
			}, false );
		}
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
	})();

/*****************************************************************************
	CSS3 ANIMATIONS
*****************************************************************************/
	jQuery(' .bounceindown').appear(function() {
		$(this).addClass("animated bounceInDown");
	});
	
	jQuery('.hi-icon,  .event, .bouncein').appear(function() {
		$(this).addClass("animated  bounceIn");
	});
	
	jQuery('fadeInDown').appear(function() {
		$(this).addClass("animated fadeInDown");
	});
	
	jQuery('.fadeInUp').appear(function() {
		$(this).addClass("animated fadeInUp");
	});
	
	jQuery('.fadeinleftbig').appear(function() {
		$(this).addClass("animated fadeInLeftBig");
	});
	
	jQuery('.fadeinrightbig').appear(function() {
		$(this).addClass("animated fadeInRightBig");
	});
	
	jQuery('.fadein').appear(function() {
		$(this).addClass("animated fadeIn");
	});
	
/***************************************************
		TOOLTIP & POPOVER
***************************************************/
$("[rel=tooltip]").tooltip();
$("[data-rel=tooltip]").tooltip();

/***************************************************
		HOVERS
***************************************************/
	$(".hover_colour").on('mouseover',function(){
			var info=$(this).find("img");
			info.stop().animate({opacity:0.1},300);
		}
	);
	$(".hover_colour").on('mouseout',function(){
			var info=$(this).find("img");
			info.stop().animate({opacity:1},200);
		}
	);
	
/***************************************************
	IFRAME
***************************************************/
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});


/*****************************************************************************
	PARALLAX SECTIONS
*****************************************************************************/	
	
	jQuery('#big_quote .well').parallax("50%", 0.1);
		jQuery('#review_quote .well').parallax("50%", 0.1);
		jQuery('#project_parallax2 .well').parallax("50%", 0.1);
		jQuery('#project_parallax4 .well').parallax("50%", 0.1);
		jQuery('#project_parallax-full1 .well').parallax("50%", 0.1);
		jQuery('#project_parallax-full3 .well').parallax("50%", 0.1);
		jQuery('#project_parallax-timeline .well').parallax("50%", 0.1);
		
	var iOS = false,
		p = navigator.platform;
	if (p === 'iPad' || p === 'iPhone' || p === 'iPod') { iOS = true; }

/***************************************************
		BACK TO TOP LINK
***************************************************/
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					$('.go-top').fadeIn(200);
				} else {
					$('.go-top').fadeOut(200);
				}
			});
			
			// Animate the scroll to top
			$('.go-top').click(function(event) {
				event.preventDefault();
				
				$('html, body').animate({scrollTop: 0}, 300);
			})
		});	

