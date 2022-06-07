(function(p,i,g,e,o,n,s){p[o]=p[o]||function(){(p[o].q=p[o].q||[]).push(arguments)},
	n=i.createElement(g),s=i.getElementsByTagName(g)[0];n.async=1;n.src=e;
	s.parentNode.insertBefore(n,s);})
	(window,document,'script','https://static.pigeonhole.at/widget/pigeon-widget.js','phl');

	var qanda = {
		width: "520px",
		height: "420px",
		passcode: "4FXSRX",
		className: "pigeon-ifrm",
		sessionId: 1992431,
		current: true,
		disableBackButton: false
	};

	phl("create", qanda);
/*
function generatePigeonHoles(obj) {
	for(var prop in obj) {
		if(typeof obj[prop] === 'object' && obj[prop] !== null) {

			//console.log(obj['code']);
			//console.log(obj[prop]['width']);
			//console.log(obj[prop]['height']);
			//console.log(obj[prop]['className']);
			//console.log(obj[prop]['sessionId']);

			phl("create", {
				width: obj[prop]['width'],
				height: obj[prop]['height'],
				passcode: obj['code'],
				className: obj[prop]['className'],
				sessionId: obj[prop]['sessionId'], // 0 here indicates that the widget will load the agenda.
				current: true,
				disableBackButton: false
			});
		}
	}
}
*/

function load_pigeon(ele) {
	var url = document.location.origin + "/challenge/" + ele.dataset.challenge;
	document.getElementById("ajax_live").src = url;
}

function dismiss_pigeonhole() {
	document.getElementById("ajax_live").src = "";
}

function load_video(ele) {
	if(ele != null && typeof(ele) != 'undefined') {
		document.getElementById("ajax_live").src = ele.dataset.video + "?autoplay=0&mute=0&enableapis=1";
	}
}

function clear_video() {
	document.getElementById("ajax_live").src = "";
}

$(window).load(function() {

	var wprmenu = document.getElementById("wprmenu_bar");

	if(wprmenu != null && typeof(wprmenu) != 'undefined') {
		wprmenu.remove();
	}
	
	var play = $('.play-btn');
	var join = $('.join-btn');
	
	play.click(function(evt) { load_video(this); });
	join.click(function(evt) { load_pigeon(this); });
});
