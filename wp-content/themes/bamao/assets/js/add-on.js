$(document).ready(function() {

    var width = $(window).width();

    if (width < 769) { // Mobile


    	$(".the-post-data").removeClass("d-flex"); $(".our-penn").removeClass("d-flex"); } else { $(".the-post-data").addClass("d-flex"); $(".our-penn").addClass("d-flex");


    }

    if (width < 1030) { // Tablet

    	var href = "/"

    	if (window.location.href.indexOf("/en/") > -1) { href = "/en/"; }


      $('html').css("cssText", "padding-top: 0px !important;");

    } 

    if (width < 1200) {

    	var lang = $('html').attr('lang');
    	if (lang == 'vi') {
    		var contact_url = "lien-he-phong-tuyen-sinh";
    		var contact_text = "Tư vấn ngay";
    	} else {
    		var contact_url = "en/admission-inquiry";
    		var contact_text = "Register now";
    	}
    	
    	//$('#wprmenu_bar .menu_title').html('<a href="'+ href +'"><img class="logo-penn bar_logo" src="/wp-content/uploads/2022/02/logo-penn-v2.png"></a><div id="btn-tu-van-mobile"> <a class="btn btn-tu-van-mobile" href="/'+ contact_url +'">'+ contact_text +'</a> </div>');
		$('#wprmenu_bar .menu_title').html('<a href="'+ href +'"><img class="logo-penn bar_logo" src="/wp-content/uploads/2022/03/penn-wass-logo.png"></a><div id="btn-tu-van-mobile"> <a class="btn btn-tu-van-mobile" href="/'+ contact_url +'">'+ contact_text +'</a> </div>');

    } else { // Desktop

	    $('li.menu-item-has-children').find('.sub-menu').addClass('top-menu');
	    $('li.menu-item-has-children').find('.sub-menu').each(function() {
	        $( this ).find('.menu-item').wrapAll("<div class='container'><div class='row snd-sub-menu'><div class='col-md-9' /></div></div>");
	    });
	    $('li.menu-item-has-children').find('.sub-menu').each(function() {
	        var sub_title = $( this ).parent().children().first().html();
	        $( this ).find('.snd-sub-menu').prepend('<div class="sub-menu-title col-md-3"><h3>'+ sub_title +'</h3></div>');
	    });

      ////////////////////////////////////////////////////////
  		///                 SCROLL-NAV                       ///
  		////////////////////////////////////////////////////////
  		$(window).scroll(function() {    
  		    var scroll = $(window).scrollTop();
  		     //>=, not <=
  		    if (scroll >= 45) {
  		        //clearHeader, not clearheader - caps H
  		        $("#nav-main").addClass("navbar-fixed-top");
  		        $('li.menu-item-has-children').find('.sub-menu').removeClass('top-menu');
  		        $('li.menu-item-has-children').find('.sub-menu').addClass('top-scroll-menu');
  		    } else {
  		        //clearHeader, not clearheader - caps H
  		        $("#nav-main").removeClass("navbar-fixed-top");
  		        $('.specialprice').find('.priceis').addClass('strike');
  		        $('li.menu-item-has-children').find('.sub-menu').removeClass('top-scroll-menu');
  		        $('li.menu-item-has-children').find('.sub-menu').addClass('top-menu');
  		    }
  		});
  // 		////////////////////////////////////////////////////////

		// $('body').find('img').each(function() {

  //       //if($(this).attr("class") !== "programs-thumbs" && $(this).attr("class") !== "gallery-img") {
		// 	var attr = $(this).attr("src");
		// 	if(attr != "" && typeof(attr) != 'undefined') {
		// 		var type = attr.substr(attr.length - 4);
		// 		//var new_attr = attr.replace(type,'-150x150'+type);
		// 		$(this).attr('src','');
		// 		$(this).attr('data-src',attr);
		// 		//$(this).attr('loading','lazy');
		// 		$(this).addClass('lazyload');
		// 	}
		// //}

  //     });

      //$('img.lazy').lazy();

    } //All Screen

    if (window.location.href.indexOf("/en/home") > -1 || window.location.href == 'https://pennschool.edu.vn/') {
		//Homgepage

		$(window).scroll(function() {    
  		    var scroll = $(window).scrollTop();
  		    if (scroll >= 500) {
  		    	var bg_our_services = $('#bg-our-services').text();
  		    	var good_reasons_image = $('#good-reasons-image').text();

  		    	$('.bg-our-services').css({"background":"url("+bg_our_services+") no-repeat", "background-size":"cover", "background-position":"center center"});
  		    	$('.good-reasons-image').css({"background":"url("+good_reasons_image+") no-repeat", "background-size":"cover", "background-position":"center center"});
  		    }
  		});

		$("#programs-carousel").owlCarousel({
			autoplay: true,
			loop: true, /* use rewind if you don't want loop */
			margin: 5,
			/*
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			*/
			responsiveClass: true,
			autoHeight: true,
			nav: false,
			dots: false,
			autoplayTimeout: 6000,
			smartSpeed: 800,
			responsive: {
				0: {
					items: 1
				},

				480: {
					items: 2
				},

				768: {
					items: 3
				},

				1024: {
					items: 3
				},

				1360: {
					items: 4
				}
			}
		});

		$('.counter-started').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 5000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});

    } else {// Not homepage

		//Auto-click to mimic user-click to play video
		var video_wrapper = document.getElementsByClassName('video-wrapper');
		var childs, iframe;
		
		for(var i = 0; i < video_wrapper.length; i++) {
			childs = video_wrapper[i].childNodes;
			for(var j = 0; j < childs.length; j++) {
				if(typeof(childs[j]) == 'object' && childs[j].nodeName == 'IFRAME') {
					console.log(childs[j]);
				}
			}
		}
		
		var myConfObj = {
			iframeMouseClick : false
		};
		window.addEventListener('blur', function(){
			if(myConfObj.iframeMouseClick){
				console.log('Wow! Iframe Click!');
			}
		});
		
		iframe = document.getElementById('ifrmOpenHouse');
		
		if(iframe != undefined && iframe != null) {
			iframe.addEventListener('mouseover', function(){
				myConfObj.iframeMouseClick = true;
			});
			document.getElementById('ifrmOpenHouse').addEventListener('mouseout', function(){
				myConfObj.iframeMouseClick = false;
			});
			document.getElementById('ifrmOpenHouse').addEventListener('click', function(){
				myConfObj.iframeMouseClick = false;
			});
		}

/*
        var vid = $.get(
			"https://www.googleapis.com/youtube/v3/search",{
			part : 'snippet',
			maxResults: 6, 
			channelId : 'UCQOTIhSF11fdZpwLd9ulQYw',
			type : 'video',
			key: 'AIzaSyBE-yJGsbMfnk1ddkKe84fTDI9PDTpr4Uw'},
			function(data) {
				$.each( data.items, function( i, item ) {
					var on_Click = "document.getElementById('vid_frame').src='https://www.youtube.com/embed/"+ item.id.videoId +"?autoplay=1&rel=0&showinfo=0&autohide=1'";
					$('#vid-list').append('<div class="vid-item" onClick="'+ on_Click +'"><div class="thumb"><img src="https://img.youtube.com/vi/'+ item.id.videoId +'/mqdefault.jpg" alt="" /><img class="yt-play" src="/wp-content/themes/penn/assets/images/youtube-play.png" /></div></div>');}
				)
			});

		$.when(vid).then(function () {

			$("#vid-list").owlCarousel({
				autoplay: true,
				loop: true, // use rewind if you don't want loop
				margin: 10,
//				animateOut: 'fadeOut',
//				animateIn: 'fadeIn',
				responsiveClass: true,
				autoHeight: true,
				nav: true,
				dots: false,
				autoplayTimeout: 8000,
				smartSpeed: 800,
				navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
				responsive: {
					0: {
						items: 2
					},

					480: {
					  items: 2
					},

					768: {
					  items: 3
					},

					1024: {
					  items: 3
					},

					1360: {
					  items: 4
					}
				}
			});
		});
*/

		$("#company").focusout(function() {
			  var x = $("#company").val();
			  var firstName = x.substr(0, x.indexOf(" "));
			  var lastName = x.substr(x.indexOf(" ") + 1);
			  $("#first_name").val(firstName);
			  $("#last_name").val(lastName);
		});

		// Configure/customize these variables.
		var showChar = 200;  // How many characters are shown by default
		var ellipsestext = "...";
		var moretext = $('#read_more').text();
		var lesstext = $('#read_less').text();

		$('.more').each(function() {
			var content = $(this).html();
	 
			if(content.length > showChar) {
	 
				var c = content.substr(0, showChar);
				var h = content.substr(showChar, content.length - showChar);
	 
				var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
	 
				$(this).html(html);
			}
	 
		});
	 
		$(".morelink").click(function(){
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).parent().prev().toggle();
			$(this).prev().toggle();
			return false;
		});
    }

    //Any page

	$("#gallery-carousel").owlCarousel({
	  autoplay: true,
	  loop: true, /* use rewind if you don't want loop */
	  margin: 10,
	   /*
	  animateOut: 'fadeOut',
	  animateIn: 'fadeIn',
	  */
	  responsiveClass: true,
	  autoHeight: true,
	  nav: false,
	  dots: false,
	  autoplayTimeout: 6000,
	  smartSpeed: 800,
	  responsive: {
	    0: {
	      items: 1
	    },

	    480: {
	      items: 2
	    },

	    768: {
	      items: 3
	    },

	    1024: {
	      items: 3
	    },

	    1310: {
	      items: 4
	    }
	  }
	});

  if (window.location.href.indexOf(".html") > -1) {

    //on post page
    $('.the-post-content').find('img').each(function() {

      var src = $(this).attr('src');
      $(this).parent().attr('data-lightbox',src);

    });

  }



});

(function ($) {
	$(function () {
		if($('.match-height-label .wpforms-field-label').length > 0) {
			$('.match-height-label .wpforms-field-label').matchHeight();
		}
	});
})(jQuery);