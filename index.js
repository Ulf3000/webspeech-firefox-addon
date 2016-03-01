//// written by Alexander Mehler //// lol
////MPL 2.0 license///
const { Cc, Ci } 	= require("chrome");
var	cm 				= require("sdk/context-menu"),
	ss 				= require("sdk/simple-storage"),
	panel			= require("sdk/panel"),
	actionButton	= require("sdk/ui/button/action");

if (!ss.storage.langs)
	ss.storage.langs = [];
if (!ss.storage.volume)	
	ss.storage.volume = 1;
if (!ss.storage.rate)
	ss.storage.rate = 1;
if (!ss.storage.pitch)
	ss.storage.pitch = 1;

////Button////////
var optionsButton = actionButton.ActionButton({
	id:			"TTSSettings",
	label:		"TTS Settings",
	icon: 		{
					"16": "./icon-16.png",
					"32": "./icon-32.png",
					"64": "./icon-64.png"
				},
	onClick:	handleClick
});
//EDITOR//////////
var optionsPanel = panel.Panel({
	width:				500,
	height:				370,
	contentURL:			"./optionsPanel.html",
	contentScriptFile:	"./optionsPanel.js",
});
function handleClick(state) {
	optionsPanel.show();
};
optionsPanel.on("show", function() {
	optionsPanel.port.emit("allData", ss.storage.langs, ss.storage.volume, ss.storage.rate, ss.storage.pitch);
});
optionsPanel.port.on("text-entered", function (selVoices, volume, rate, pitch) {
	ss.storage.langs	= selVoices;
	ss.storage.volume	= volume;
	ss.storage.rate		= rate;
	ss.storage.pitch	= pitch;
	// destroy cm entrys //
	while ( ilf.parentMenu !== null && ilf.parentMenu !== undefined){
		ilf.parentMenu.items[0].destroy();
	};
	// add new cm entrys //
	langslength = selVoices.length;
	addItems();
});		
	
var langslength = ss.storage.langs.length;
var ilf = [];

addItems = function(){
	var i = 0 ; 
	while  (i < langslength){
		ilf = cm.Item({
			label: 				["Read Text" + " " + ss.storage.langs[i].name],
			data: 				[ss.storage.langs[i].name, ss.storage.volume, ss.storage.rate, ss.storage.pitch],
			context: 			cm.SelectionContext(),
			contentScriptFile: 	"./speak.js",
		});
		i++;
	};
};
///// enable the hidden preference "media.webspeech.synth.enabled" in about:config 
var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("media.webspeech.synth.");
prefs.setBoolPref("enabled", true); 
	
addItems();




