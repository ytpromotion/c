 var r = window.location.search;
      var LockedLink;
  		var YtLink;
      var CLink;
      var DecodedTime;
      var linkKey = r.slice(1);

    // const firebaseConfig = {
    //         apiKey: "AIzaSyBLPnH9twfHvo-ngUTPEGZIsqIONLmEOvk",
    //         authDomain: "ytlinks-c2703.firebaseapp.com",
    //         databaseURL: "https://ytlinks-c2703-default-rtdb.firebaseio.com",
    //         projectId: "ytlinks-c2703",
    //         storageBucket: "ytlinks-c2703.appspot.com",
    //         messagingSenderId: "343214293780",
    //         appId: "1:343214293780:web:99f635cb644e0e33d13801"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);

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

        firebase.database().ref('links/'+linkKey).on('value', function(snapshot){
                YtLink = snapshot.val().Videolink;
                CLink = snapshot.val().channellink;
                LockedLink = snapshot.val().LockedLink;
                DecodedTime = snapshot.val().Time;
            });
      var org,country,region,ip;
    $.get('https://ipinfo.io',function(response){
      ip = response.ip;
      region = response.region;
      country = response.country;
      org = response.org;
    },'jsonp');

    window.onload = function() {
      test();
      function test() {
        (() => {
          const intervalId = setInterval(() => {
            if (DecodedTime != null) {
              document.getElementById('timer').innerHTML = DecodedTime;
              document.getElementById("step").innerHTML = "Please play the video for "+DecodedTime+" seconds to unlock the Link.";
              clearInterval(intervalId);
            } else {
              document.getElementById("dot-pulse2").setAttribute("style", "display: block; margin-top: 0px;");
              document.getElementById("dot-pulse3").setAttribute("style", "display: block; margin-top: 0px;");
            }
      }, 1000);
        })();
      };
    }


      document.addEventListener("visibilitychange", function() {
					console.log(document.hidden);
			});

			function watchNow(){

        if (YtLink != null) {
          window.open(YtLink,'_blank');
          var time = DecodedTime;
          var x = setInterval(function(){
          document.getElementById("timer").innerHTML = time;
          if (document.hidden) {
            time = time - 1;
          }
          
          if(time < 0){
            clearInterval(x);
            document.getElementById("btnC").style.display="block";
            document.getElementById("lastStep").style.display="block";
          }
        },1000);
          document.getElementById("dot-pulse").style.display = "none";
      } else {
        document.getElementById("dot-pulse").style.display = "block";
        var time = 0;
        (() => {
          const intervalId = setInterval(() => {
              time = time + 1;
              if (time > 10) {
                alert("Link is not loading! Please try again");
                document.getElementById("dot-pulse").style.display = "none";
                clearInterval(intervalId);
              }
          }, 1000);
        })();
      }
					
			}

      function subscribe() {
        window.open(CLink,'_blank');
        document.getElementById("btn").style.display="block";
        document.getElementById("loader").style.display="none";
        document.getElementById("done").style.display="block";
      }

      function getLink(){
        firebase.database().ref('xGotLink').push({
          IP: ip,
          Region: region,
          Country: country,
          Org: org
        });
     	  window.location.href = LockedLink;
      }