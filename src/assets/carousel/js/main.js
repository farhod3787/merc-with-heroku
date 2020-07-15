 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

 jQuery(document).ready(function($) {

 	"use strict"; 
 	var siteCarousel = function () {
 		if ( $('.slide-one-item').length > 0 ) {
 			$('.slide-one-item').owlCarousel({
 				center: false,
 				items: 1,
 				loop: true,
 				stagePadding: 0,
 				smartSpeed: 1000,
 				margin: 0,
 				autoplay: true,
 				pauseOnHover: false,
 				animateOut: 'fadeOut',
 				animateIn: 'fadeIn',
 				nav: true,
 				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">']
 			});
 		}
 	};
 	siteCarousel();

 	var siteStellar = function() {
 		$(window).stellar({
 			responsive: false,
 			parallaxBackgrounds: true,
 			parallaxElements: true,
 			horizontalScrolling: false,
 			hideDistantElements: false,
 			scrollProperty: 'scroll'
 		});
 	};
 	siteStellar();

 	var siteCountDown = function() {

 		if ( $('#date-countdown').length > 0 ) {
 			$('#date-countdown').countdown('2020/10/10', function(event) {
 				var $this = $(this).html(event.strftime(''
 					+ '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
 					+ '<span class="countdown-block"><span class="label">%d</span> days </span>'
 					+ '<span class="countdown-block"><span class="label">%H</span> hr </span>'
 					+ '<span class="countdown-block"><span class="label">%M</span> min </span>'
 					+ '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
 			});
 		}
 		
 	};
 	siteCountDown();
 });