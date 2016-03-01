self.on("click", function (node, data) {
		dataArray = data.split(",");
		var su 		= new SpeechSynthesisUtterance();
		su.voice 	= window.speechSynthesis.getVoices().filter(function(voice) { return voice.name == dataArray[0]; })[0];
		su.volume 	= dataArray[1];
		su.rate 	= dataArray[2];
		su.pitch 	= dataArray[3];
		su.text = document.getSelection().toString();
		window.speechSynthesis.speak(su);
		
		// start and pause buttton //
		var buttonSpeechPause = document.createElement("ULF");
		buttonSpeechPause.className = "nostyle";
		buttonSpeechPause.style.cursor = "pointer";
		buttonSpeechPause.style.preventDeselect = "true";
		buttonSpeechPause.style.backgroundColor = "#ebe945";
		buttonSpeechPause.style.color = "black";
		buttonSpeechPause.style.width = "80px";
		buttonSpeechPause.style.height = "30px";
		buttonSpeechPause.style.cssFloat = "left";
		buttonSpeechPause.style.position = "fixed";
		buttonSpeechPause.style.top = "150px";
		buttonSpeechPause.style.left = "20px";
		buttonSpeechPause.style.border = "none";
		buttonSpeechPause.style.display = "table-cell";
		buttonSpeechPause.style.verticalAlign = "middle";
		buttonSpeechPause.style.textAlign = "center";
		
		buttonSpeechPause.style.borderRadius = "5px";
		buttonSpeechPause.style.boxShadow = "5px 5px 5px black"
		buttonSpeechPause.style.zIndex = "90000";
		buttonSpeechPause.textContent = "Pause";
		buttonSpeechPause.onmousedown = function(e){
			e = e || window.event;
			e.preventDefault();
		};
		
		document.body.appendChild(buttonSpeechPause);
		buttonSpeechPause.onclick = function(){
		
			if ( buttonSpeechPause.textContent == "ULF" ){
				window.speechSynthesis.pause();
				buttonSpeechPause.textContent = "Play";
				buttonSpeechPause.style.backgroundColor = "#97eb45";
			}else if ( buttonSpeechPause.textContent == "Play" ){
				window.speechSynthesis.resume();
				buttonSpeechPause.textContent = "Pause";
				buttonSpeechPause.style.backgroundColor = "#ebe945";
			};
		};
		
		// stop button //
		var buttonSpeechStop = document.createElement("ULF");
		buttonSpeechStop.className = "nostyle";
		buttonSpeechStop.style.cursor = "pointer";
		buttonSpeechStop.style.preventDeselect = "true";
		buttonSpeechStop.style.backgroundColor = "#eb6845";
		buttonSpeechStop.style.color = "black";
		buttonSpeechStop.style.width = "80px";
		buttonSpeechStop.style.height = "30px";
		buttonSpeechStop.style.cssFloat = "left";
		buttonSpeechStop.style.position = "fixed";
		buttonSpeechStop.style.top = "150px";
		buttonSpeechStop.style.left = "105px";
		buttonSpeechStop.style.borderRadius = "5px"
		buttonSpeechStop.style.border = "none";
		buttonSpeechStop.style.boxShadow = "5px 5px 5px black"
				buttonSpeechStop.style.display = "table-cell";
		buttonSpeechStop.style.verticalAlign = "middle";
		buttonSpeechStop.style.textAlign = "center";

		buttonSpeechStop.style.zIndex = "90000";
		buttonSpeechStop.textContent = "Stop";
		buttonSpeechStop.onmousedown = function(e){
			e = e || window.event;
			e.preventDefault();
		};
		
		document.body.appendChild(buttonSpeechStop);
		buttonSpeechStop.onclick = function(){
			window.speechSynthesis.cancel();
			document.body.removeChild(buttonSpeechPause);
			document.body.removeChild(buttonSpeechStop);
		};
	// remove buttons onend//
	su.onend = function(){
		document.body.removeChild(buttonSpeechPause);
		document.body.removeChild(buttonSpeechStop);
		su = null;
	};
	window.addEventListener("beforeunload", function () {
		window.speechSynthesis.cancel(); // auto triggers su.onend
	});
});

