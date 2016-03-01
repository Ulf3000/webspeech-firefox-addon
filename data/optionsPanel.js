//// vars and stuff////
var saveButton 		= document.getElementById("saveBtn");
var volumeSlider 	= document.getElementById("volume");
var rateSlider 		= document.getElementById("rate");
var pitchSlider 	= document.getElementById("pitch");

function setSelectedIndex(s, v) {
	for ( var i = 0; i < s.options.length; i++ ) {
		for ( var u = 0; u < v.length; u++){
			if ( s.options[i].text == v[u].lang ) {
				s.options[i].selected = true;
				break;
			}	
		}
	}
};

self.port.on("allData", function (langs, volume, rate, pitch) {
	setSelectedIndex(document.getElementById('voice'),langs)
	volumeSlider.value = volume;
	rateSlider.value = rate;
	pitchSlider.value = pitch;
});

//// save options and send to main.js and hide////
saveBtn.addEventListener('click', function (event) {
	selVoices = [];
	for (var i=0, len=voiceSelect.options.length; i<len; i++) {
        opt = voiceSelect.options[i];
        if ( opt.selected ) {
            // add to array of option elements 
            var newVoice = {lang: opt.value};
			newVoice.name = opt.textContent;
			selVoices.push(newVoice);
		};
	};
	volume = parseFloat(volumeSlider.value);
	rate = parseFloat(rateSlider.value);
	pitch = parseFloat(pitchSlider.value);

    self.port.emit("text-entered", selVoices, volume, rate, pitch);
}, false);

var voiceSelect = document.getElementById('voice'); // get the voice select element

// add voices 
function loadVoices() {
	var voices = speechSynthesis.getVoices();
	voices.forEach(function(voice, i) {
		var option = document.createElement('option');
		option.value = voice.name;
		option.textContent = voice.name;
		voiceSelect.appendChild(option);
	});
}
speechSynthesis.onvoiceschanged = loadVoices();
// setTimeout(loadVoices(), 10000); //run

