$( document ).ready(function() {


/*---------------------checkNumber---------------------*/

 createjs.Sound.alternateExtensions = ["ogg"];
 createjs.Sound.addEventListener("fileload",handleFileLoad);
 createjs.Sound.registerManifest(
   [{id:"listen0", src:"music01.mp3",data:'1'},
	{id:"listen1", src:"music02.mp3",data:'1'},
	{id:"listen2", src:"music03.mp3",data:'1'},
	],
	"audio/");


// remove when sounds have loaded
function handleFileLoad(event) {

console.log("Preloaded:");


	}
    



});