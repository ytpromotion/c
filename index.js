
var shortenLink;
var link;
var sharedLink;
var channelLink;
var linkKey;

// const firebaseConfig = {
//             apiKey: "AIzaSyBLPnH9twfHvo-ngUTPEGZIsqIONLmEOvk",
//             authDomain: "ytlinks-c2703.firebaseapp.com",
//             databaseURL: "https://ytlinks-c2703-default-rtdb.firebaseio.com",
//             projectId: "ytlinks-c2703",
//             storageBucket: "ytlinks-c2703.appspot.com",
//             messagingSenderId: "343214293780",
//             appId: "1:343214293780:web:99f635cb644e0e33d13801"
//         };
//         // Initialize Firebase
//         firebase.initializeApp(firebaseConfig);

var firebaseConfig = {
    apiKey: "AIzaSyDHX7RnqpxxkZAf3y25iuuoQB4I52Y-hoE",
    authDomain: "ytlinks-2.firebaseapp.com",
    projectId: "ytlinks-2",
    storageBucket: "ytlinks-2.appspot.com",
    messagingSenderId: "795792677639",
    appId: "1:795792677639:web:2ef1e99122fe697f2943a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var ytlink, ytchannel, lockedlink, time;
function ready(){
            ytlink;
            ytchannel;
            lockedlink;
            time = document.getElementById("mySelect").value;
        }

function getYtVideo(){
	link = document.getElementById("ytlink").value;
	if(link.length == 28){
		//https://youtu.be/GUEATeewqqI
		shortenLink = link.slice(17, 28);
		document.getElementById("myframe").style.display="block";
		document.getElementById("myframe").src="https://www.youtube.com/embed/"+shortenLink+"?version=3&enablejsapi=1&controls=0";
		ytlink = link;
	} else if(link.length == 43) {
		//https://www.youtube.com/watch?v=GUEATeewqqI
		shortenLink = link.slice(32, 43);
		document.getElementById("myframe").style.display="block";
		document.getElementById("myframe").src="https://www.youtube.com/embed/"+shortenLink+"?version=3&enablejsapi=1&controls=0";
		ytlink = link;
	} else {
		alert("Invalid url!");
	}
}

function getShareLink(){
	sharedLink = document.getElementById("sharelink").value;
	var htp = sharedLink.startsWith("https://");
	if(sharedLink.length > 0){
		if (htp) {
			document.getElementById("show").style.display = "block";
			lockedlink = sharedLink;
		} else {
			document.getElementById("show").style.display = "block";
			lockedlink = "https://" + sharedLink;
		}
	} else {
		alert("Please paste the link that you want to share.");
	}
}

function getYtChannel() {
	channelLink = document.getElementById("channellink").value;
	if(channelLink.startsWith("https://")){
		document.getElementById("showChannel").style.display = "block";
		ytchannel = channelLink;
	} else {
		alert("Invalid url!");
	}
}

function generateURL(){
	if(sharedLink != null && link != null){
			ready();
            firebase.database().ref('links').push({
                Videolink: ytlink,
                channellink: ytchannel,
                LockedLink: lockedlink,
                Time: time
            });
            makeLink();

    		(() => {

    			const intervalId = setInterval(() => {
        			// update countdown timer
        			if (linkKey != null) {
            			var genLink = "https://ytpromotion.github.io/c/sharable.html?"+linkKey;
						document.getElementById("RealLink").value = genLink;
						document.getElementById("dot-pulse").style.display = "none";
            			clearInterval(intervalId);
        			} else {
        				document.getElementById("dot-pulse").style.display = "block";
        			}

    			}, 1000);

			})();

		} else {
			alert("Please fill the above fields.");
		}

}

function makeLink(){
    firebase.database().ref('links').on('value', gotdata, errData);
}

function gotdata(data){
    var scores = data.val();
    var keys = Object.keys(scores);
    console.log(keys[keys.length - 1]);
    linkKey = keys[keys.length - 1];
}

function errData(err){
    console.log("Error");
    console.log(err);
}

function copyURL(){
	const realLink = document.getElementById("RealLink");
	var linkVar = document.getElementById("RealLink").value;

	realLink.select();
	document.execCommand("Copy");

	if(linkVar.length <= 0){
		alert("Generate a URL first.");
	}
}