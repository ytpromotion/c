      var r = window.location.search;
      var LockedLink;
      var YtLink;
      var CLink;
      var DecodedTime;
      var linkKey = r.slice(1);
      var vidLink = linkKey.slice(2,13);

    const firebaseConfig = {
            apiKey: "AIzaSyBLPnH9twfHvo-ngUTPEGZIsqIONLmEOvk",
            authDomain: "ytlinks-c2703.firebaseapp.com",
            databaseURL: "https://ytlinks-c2703-default-rtdb.firebaseio.com",
            projectId: "ytlinks-c2703",
            storageBucket: "ytlinks-c2703.appspot.com",
            messagingSenderId: "343214293780",
            appId: "1:343214293780:web:99f635cb644e0e33d13801"
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
              document.getElementById("step").innerHTML = "Please Watch the above video for "+DecodedTime+" seconds to unlock the Link.";
              getIndex();
              clearInterval(intervalId);
            } else {
              document.getElementById("dot-pulse3").setAttribute("style", "display: block; margin-top: 0px;");
            }
      }, 1000);
        })();
        firebase.database().ref('traffic/').push({
          IP: ip,
          Region: region,
          Country: country,
          Org: org
        });
      };
    }

  
    // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '150',
          width: '300',
          videoId: vidLink,
          playerVars: {
            'playsinline': 1,
            'controls': 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
          const intervalId = setInterval(() => {
              if(player.getCurrentTime()-1 < DecodedTime){
                document.getElementById('timer').innerHTML = Math.floor(player.getCurrentTime());
              } else {
                clearInterval(intervalId);
                document.getElementById("btnC").style.display="block";
                document.getElementById("lastStep").style.display="block";
              }
          }, 1000);
        }
      }

      function subscribe() {
        firebase.database().ref('watched/'+region).set({
          Country: country
        });
        window.open(CLink,'_blank');
        document.getElementById("btn").style.display="block";
        document.getElementById("loader").style.display="none";
        document.getElementById("done").style.display="block";
      }

      function getLink(){
        firebase.database().ref('xGotLink/'+region).set({
          Country: country
        });
        window.location.href = LockedLink;
      }