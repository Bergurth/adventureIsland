function dragDrop1_1(inputData) {

		var totalAnswers = 0,
		rightAnswers = 0,
		insertedAnswers = 0,
		noColumns = 2,
		assignmentHeight = 0,
		assignmentHeightOld = 370,
		categories = [],
		count = "";
		result= "";
	


$.getJSON(inputData, function() {

	}).done(function(data) {


		buildModuleContainer();
		

		function buildModuleContainer() {

			$('<div class="assignmentInfo"><p>' + data.setting.instruction + '</p></div>').appendTo('.assignmentContainer')
			$('<div class="assignmentContainer2"></div>').appendTo('.assignmentContainer')
			$('<div class="soundContainer"></div>').appendTo('.assignmentContainer2')
			$('<div class="dragContainer"></div>').appendTo('.assignmentContainer2')
			$('<div class="imgContainer"></div>').appendTo('.assignmentContainer2')
			$('<div class="scoreBar"></div>').appendTo('.assignmentContainer')
			$('<div class="closeAssignment"></div>').appendTo('.assignmentContainer')
			$('<div class="checkScore">Check</div>').appendTo('.scoreBar')
			$('<div class="score"></div>').appendTo('.scoreBar')


				for (var i = 0; i < data.audio.length; i++) {

					$('<div id="listen' + i + '"class="listen">' + data.audio[i].listen + ' </div>').appendTo('.soundContainer');
					
				};

				for (var k = 0; k < data.drag.length; k++) {

					totalAnswers = data.drag.length;


					$('<div id="dragImg' + k + '"class="dragImg"><img src="' + data.drag[k].img + '"/></div>').appendTo('.imgContainer');
					$('#dragImg' + k + '').attr("data", "" + data.drag[k].name + "");
					$('<div id="dragDropImg' + k + '"class="dragDropImg">' + data.drag[k].dropImg + ' </div>').appendTo('.dragContainer');
					$('#dragDropImg' + k + '').attr("data", "" + data.drag[k].name + "");
					$('<div id="dragDropName' + k + '"class="dragDropName">' + data.drag[k].dropName + ' </div>').appendTo('#dragDropImg' + k);
					$('#dragDropName' + k + '').attr("data", "" + data.drag[k].name + "");
					

				};

			for (var x = 0; x < data.drag.length; x++) {

				$('<div id="dragName' + x + '"class="dragName">' + data.drag[x].name + ' </div>').appendTo('.imgContainer');
				$('#dragName' + x + '').attr("data", "" + data.drag[x].name + "");

				};
			 
			}

				//variable zoomscale differs on screensize to adapt draggable (bug in jquery)

				var zoomScale = 1;

					function checkWidth() {

					var windowSize = $(window).width();

					if (windowSize <= 880) {
					zoomScale = 0.5;
            		console.log(zoomScale);
			        }
			        else if (windowSize <= 1050) {
			        zoomScale = 0.6;
			        console.log(zoomScale);
			        }
			        else if (windowSize <= 1330) {
			        zoomScale = 0.7;
			        console.log(zoomScale);
			        }
			        else if (windowSize <= 1439) {
			        zoomScale = 0.9;
			        console.log(zoomScale);
			        }
			        else if (windowSize >= 1440) {
			        zoomScale = 1;
           			 console.log(zoomScale);
        			}

        		}

        		checkWidth()

        	//adapt droppable to screen size (bug in jquery)


        		function resizeDrop(){


        			$.ui.ddmanager.prepareOffsets = function( t, event ) {
					    var i, j,
					        m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
					        type = event ? event.type : null, // workaround for #2317
					        list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

					    droppablesLoop: for ( i = 0; i < m.length; i++ ) {

					        // No disabled and non-accepted
					        if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
					            continue;
					        }

					        // Filter out elements in the current dragged item
					        for ( j = 0; j < list.length; j++ ) {
					            if ( list[ j ] === m[ i ].element[ 0 ] ) {
					                m[ i ].proportions().height = 0;
					                continue droppablesLoop;
					            }
					        }

					        m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
					        if ( !m[ i ].visible ) {
					            continue;
					        }

					        // Activate the droppable if used directly from draggables
					        if ( type === "mousedown" ) {
					            m[ i ]._activate.call( m[ i ], event );
					        }

					        m[ i ].offset = m[ i ].element.offset();
					        m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth * zoomScale, height: m[ i ].element[ 0 ].offsetHeight * zoomScale });
					    }

					};

        		}

        		resizeDrop()
		

			$(window).resize(function() {
					
					checkWidth()
					resizeDrop()
					

			   		});



		function setDragDrop() {


			$('.dragDropImg').droppable({
				hoverClass: "drag-hover",
				accept:".dragImg",
				tolerence: 'pointer',


				drop: function(event, ui) {

						var dropped = $(ui.draggable).clone();
						var droppedTemp = $(ui.draggable)
						//$(dropped).appendTo(this);
						 $(this).append(dropped);
						 dropped.css({ top:-40 , left: -20 })
						 $(droppedTemp).fadeTo( "fast", 0 );
						 $(droppedTemp).draggable( "disable" );
						 $(this).droppable( "disable" );
						 $(this).css('border','0px solid #ccc')

						console.log("Þetta er data úr drag " + $(this).attr('data'))
						console.log("Þetta er data úr drop " + ui.draggable.attr('data'))
							
							if ($(this).attr('data') == ui.draggable.attr('data')) {

							console.log("já");
							count ++;

							console.log("count" + count)
							//updateDiv();
							//updateTries(data.data);

							} else {
								console.log("nei")
							}
						}
				});

					
						//alert("asd")
					
				
					

				$('.dragImg').draggable({
				
				revert: 'invalid',

				start: function(event, ui) { 

				},
			
				drag: function(event,ui){

						//adapt droppable to screen size to prevent cursor moving faster
						function startFix(event, ui) {
							   ui.position.left = 0;
							   ui.position.top = 0;
							   console.log("keyrir" + zoomScale);

							}
			 
								function dragFix(event, ui) {
								    var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
								    var newLeft = ui.originalPosition.left + changeLeft / zoomScale; // adjust new left by our zoomScale
								 
								    var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
								    var newTop = ui.originalPosition.top + changeTop / zoomScale; // adjust new top by our zoomScale
								 
								    ui.position.left = newLeft;
								    ui.position.top = newTop;
								}

								$(this).draggable({
								    start: startFix,
								    drag: dragFix
								});


				$(ui.helper).css("background-color", "orange");
					      
					  

				},


				stop: function() {
					//$(this).css('background-color', 'white').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0.0)').css('border-radius', '0').css('border', '0px solid #ccc').css('opacity', '1');
					//$(this).css({opacity:0.1});						//updateTries(data.data);
					//updateDiv()

					}


			});

				$('.dragDropName').droppable({
				hoverClass: "drag-hover",
				accept:".dragName",
				tolerence: 'pointer',

				drop: function(event, ui) {
				var dropped = $(ui.draggable).clone();
				var droppedTemp = $(ui.draggable)
				//$(dropped).appendTo(this);
				 $(this).append(dropped);
				 dropped.css({ top:-48 , left: -20 })
				 $(droppedTemp).fadeTo( "slow", 0 );
				 $(droppedTemp).draggable( "disable" );
				 $(this).droppable( "disable" );
				 $(this).css('border', '0px solid #ccc')

				console.log("Þetta er data úr drag " + $(this).attr('data'))
				console.log("Þetta er data úr drop " + ui.draggable.attr('data'))
					
					if ($(this).attr('data') == ui.draggable.attr('data')) {

					console.log("já");
					count ++;

					console.log("count" + count)
					//updateDiv();
					//updateTries(data.data);

					} else {

						console.log("nei")
					}
				}
			});

				$('.dragName').draggable({
				
				revert: 'invalid',

				start: function(event, ui) { 

				},
			
				drag: function(event,ui){

						//adapt droppable to screen size to prevent cursor moving faster
						function startFix(event, ui) {
							   ui.position.left = 0;
							   ui.position.top = 0;
							   console.log("keyrir" + zoomScale);

							}
			 
								function dragFix(event, ui) {
								    var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
								    var newLeft = ui.originalPosition.left + changeLeft / zoomScale; // adjust new left by our zoomScale
								 
								    var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
								    var newTop = ui.originalPosition.top + changeTop / zoomScale; // adjust new top by our zoomScale
								 
								    ui.position.left = newLeft;
								    ui.position.top = newTop;
								}

								$(this).draggable({
								    start: startFix,
								    drag: dragFix
								});


				$(ui.helper).css("background-color", "orange");
					      
					  

				},


				stop: function() {
					//$(this).css('background-color', 'white').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0.0)').css('border-radius', '0').css('border', '0px solid #ccc').css('opacity', '1');
					//$(this).css({opacity:0.1});						//updateTries(data.data);
					//updateDiv()

					}


			});
			 
		}



		setDragDrop();


		$('.listen').on('click', function() {
		var tempSound = $(this).attr("id");
		console.log(tempSound)
		createjs.Sound.play(tempSound)
		console.log(createjs.Sound.play(tempSound))

		})

		function checkScore() {
			//$('.showRightAnswers').addClass('Right');
			//$('.showWrongAnswers').addClass('Wrong');
			console.log("checkScore hittin");

		}

		function calculateScore() {
			//rightAnswers = $('.showRightAnswers').size();
			
		}

		function scoreBar() {

				//assign click functions.
				$('#ScoreBar-retry').on('click', function() {
					$('.DragDrop1-draggable-list').draggable('enable');
					$('.showRightAnswers').removeClass('Right');
					$('.showWrongAnswers').removeClass('Wrong');
				});


			}

		$('.checkScore').on('click', function() {

		//console.log("count" + count)
		//console.log("totalAnswers" + totalAnswers)
		//$('.DragDrop1-draggable-list').draggable('disable');
		
		result = Math.round(((count / totalAnswers) * 100) * 10) / 20;
		console.log(result);


		function saveIfBigger(load_result){
			if (load_result < result){

				var text = '{"1.1": '+
							String(result)+					
							'}';
				var jsn1 = JSON.parse(text);
				sg_game.save_state(jsn1,sg_game.gamename);
			}
		}


		sg_game.load_state(sg_game.gamename, saveIfBigger);
		console.log("state comming!");
		//console.log(load_result);
		// saekja hjer allan project 1 streng usersins og baeta result inn a rjettan stad.


		//console.log(load_result);
		//checkScore();
		//calculateScore();

			$('.score').text(result + '%');

		});

	$('.closeAssignment').on('click', function() {
		//alert("clicked")hide
			
		$(".assignmentContainer").remove();

		});


	});


	}