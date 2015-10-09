 var sg_game = (function () {

    var gamename;

function initSgContext(gamename) {

    sg_game.gamename = gamename;

}

 function save_state(state,gamename) {

        var jsn1 = JSON.stringify(state);

        jsn = JSON.stringify({
          'username' : currentUname,
          'gamename': gamename,
          'newstate': jsn1
        });

        if (currentUname.length >= 1){

            $.ajax({
                url: server_url+'/state_update',
                type: 'POST',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },
                data: jsn,
                
                success: function(data){
                    console.log(data);
                    console.log("device control succeeded");
                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                },
            });
        }
        else {
            alert("not logged in.");
        }
    }

     function load_state() {
        console.log("load state hittin");
        alive = false;
        clearInterval(timeout);
        if (currentUname.length >= 1){
        uget_url = server_url+"/user/?username="+currentUname;

        $.ajax({
                url: uget_url,
                type: 'GET',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true
                },

                //headers:{"Origin" : "chrome-extention://mkhojklkhkdaghjjfdnphfphiaiohkef"},
                success: function(data){

                    data2 = data.substr(1, data.length - 2);
                    //console.log(data2);
                    obj = JSON.parse(data2);

                    // trying to put in the new state, --- not quite working yet..
                    game_state_json = obj.savedGames.gol.state;
                    var state = JSON.parse(game_state_json);
                    console.log(state);

                    graphics.initCanvas(graphics.canvasSelector);
                    life.xCells = Math.floor((graphics.canvas.width - 1) / graphics.cellSize);
                    life.yCells = Math.floor((graphics.canvas.height - 1) / graphics.cellSize);
                    graphics.ctx.fillStyle = graphics.offColour;
                    graphics.ctx.fillRect(0, 0, life.xCells * graphics.cellSize, life.yCells * graphics.cellSize);

                    for (x = 0; x < life.xCells; x++) {
                        life.prev[x] = state[x];
                        life.next[x] = [];
                        graphics.ctx.fillRect(x * graphics.cellSize, 0, 1, life.yCells * graphics.cellSize);
                        for (y = 0; y < life.yCells; y++) {
                            life.prev[x][y] = state[x][y];
                        }
                    }
                    graphics.ctx.fillRect(life.xCells * graphics.cellSize, 0, 1, life.yCells * graphics.cellSize);
                    for (y = 0; y < life.yCells; y++) {
                        graphics.ctx.fillRect(0, y * graphics.cellSize, life.xCells * graphics.cellSize, 1);
                    }
                    graphics.ctx.fillRect(0, life.yCells * graphics.cellSize, life.xCells * graphics.cellSize, 1);
                    /*
                    $(graphics.canvasSelector).mousedown(graphics.handleMouse);
                    
                    $('body').mouseup(function (e) {
                        $(graphics.canvasSelector).unbind('mousemove');
                    });
                    */
                    graphics.paint();

                    //life.initUniverse(graphics.canvasSelector);
                    //life.prev = arr;
                    console.log("device control succeeded");
                },
                error: function(){
                //console.log(data);
                    console.log("Device control failed");
                },
            });



        /*
        $.get( url, function( data ) {
            console.log( data );
            alert( "Load was performed." );
        })


        user_info = $.get(url);
        console.log(user_info);
        */
        }
        else {
            alert("not logged in.");
        }
    }    // end of load state



/*

        yCells: yCells,
        xCells: xCells,
        prev: prev,
        next: next,
        universe: prev,
        speed: speed,
        initUniverse: initUniverse,
        nextGen: nextGen,
        toggleLife: toggleLife,
        isAlive: isAlive,
        clear: clear,
        changeSpeed: changeSpeed,
        loadPattern: loadPattern,


*/

  return {
       
        gamename:  gamename,
        initSgContext: initSgContext,

      
        save_state:    save_state,
        load_state:  load_state
    };


}());