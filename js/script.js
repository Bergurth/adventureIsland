$(document).ready(function() {

var tempProject = "";


	//RECALCULATE WINDOW SIZE

// var maxWidth  = $('.project').width();
// var maxHeight = $('.project').height();

// $(window).resize(function(evt) {
//     var $window = $(window);
//     var width = $window.width();
//     var height = $window.height();
//     var scale;

//     // early exit
//     if(width >= maxWidth && height >= maxHeight) {
//         $('.project').css({'-webkit-transform': ''});
//         $('.content').css({ width: '', height: '' });
//         return;
//     }
    
//     scale = Math.min(width/maxWidth, height/maxHeight);
    
//     $('.project').css({'-webkit-transform': 'scale(' + scale + ')'});
//     $('.content').css({ width: maxWidth * scale, height: maxHeight * scale });
// });

// $(window).load(function(evt) {
//     var $window = $(window);
//     var width = $window.width();
//     var height = $window.height();
//     var scale;

//     // early exit
//     if(width >= maxWidth && height >= maxHeight) {
//         $('.project').css({'-webkit-transform': ''});
//         $('.content').css({ width: '', height: '' });
//         return;
//     }
    
//     scale = Math.min(width/maxWidth, height/maxHeight);
    
//     $('.project').css({'-webkit-transform': 'scale(' + scale + ')'});
//     $('.content').css({ width: maxWidth * scale, height: maxHeight * scale });
// });




 		jQuery.fn.center = function(parent) {
			    if (parent) {
			        parent = this.parent();
			    } else {
			        parent = window;
			    }
			    this.css({
			        "position": "absolute",
			        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
			    });

			return this;
		}



		$(window).resize(function() {


			$("div.map").center(true);

			$("div.project").center(true);

		});


		$(window).load(function() {


			$("div.map").center(true);

			$("div.project").center(true);

		});




		


			$(".level").click(function(){

				//$(".map").hide()
				var tempProject= $(this).attr("id").slice(5,6);
				//alert(tempProject)
				//window.open("project" + tempProject + ".html","_self");
				window.location.href=("project" + tempProject + ".html");

				// jQuery('<div/>', {
				// id: ('project'+ tempProject),
				// class: ('project')
				// }).appendTo('.content');

				// jQuery('<div/>', {
				// id: ('text'+ tempProject),
				// class: ('text')
				// }).appendTo('#project'+tempProject);

				// jQuery('<div/>', {
				// id: ('audio'+ tempProject),
				// class: ('audio'),
				// html:'<p>Listen</p>'
				// }).appendTo('#text'+tempProject);

				// jQuery('<div/>', {
				// id: ('home'+ tempProject),
				// class: ('home'),
				// html:'<p>Home</p>'
				// }).appendTo('#project'+tempProject);

			});

			$(".home").click(function(){
			window.location.href="index.html";
			});

			$(".textButton").click(function(){
			$(".textButton").toggle();
			$(".text"+ tempProject).slideToggle(100);

			//$(".textButton").toggle();
			});


			$(".assignment").on('click', function() {

				var tempProject= $(this).attr("id").slice(10,11);
				console.log(tempProject)
				
				jQuery('<div/>', {
				class: ('assignmentContainer')
				}).appendTo('.project');


					console.log("clicked")
					//clearInterval(interval);
					//cleanContent();
					//cleanSide();

					eval(($(this).attr('dataFun')) + '("' + ($(this).attr('dataPath')) + '")');

					if ($(this).attr('dataInfo') == "none") {
						$('#ScoreBar-help').hide();
					} else {
						$('#ScoreBar-help').show();
					};
					currentInfo = $(this).attr('dataInfo');

					
				});







});