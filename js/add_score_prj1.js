console.log("adding score to prj 1");

function updateScoreIndex(load_result){

	var lr_1_1 = typeof load_result["1.1"] !== 'undefined' ? load_result["1.1"] : 0;
	var lr_1_2 = typeof load_result["1.2"] !== 'undefined' ? load_result["1.2"] : 0;
	var lr_1_3 = typeof load_result["1.3"] !== 'undefined' ? load_result["1.3"] : 0;
	var lr_1_4 = typeof load_result["1.4"] !== 'undefined' ? load_result["1.4"] : 0;

	$('#assignment1_1').find("p").text("1.1 "+"=="+lr_1_1 );
	$('#assignment1_2').find("p").text("1.2 "+"=="+lr_1_2 );
	$('#assignment1_3').find("p").text("1.3 "+"=="+lr_1_3 );
	$('#assignment1_4').find("p").text("1.4 "+"=="+lr_1_4 );

}


$('document').ready(function() {

	$.ajax({
                url: server_url+"/auth/username",
                type: 'GET',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },
                 success: function(data){

                  if(data.length >= 2){
                  currentUname = data;
                  $("#username-button").text(currentUname);
                  var u_info_url1 = server_url + "/user/?username="+currentUname
                  $("#user-info-link").attr("href", u_info_url1);
                  sg_game.load_state('adv_island_prj1', updateScoreIndex);
                  }
                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                },

       });



        
    });
