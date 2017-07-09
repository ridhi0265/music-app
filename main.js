var Playingnumber = 0  ;
var shuffle=0;
var equal = 0;


var fileNames = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];

$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    var message = "Welcome, " + name;
    $('.main .user-name').text(message); //isse jo b msg dala hoga vo display hoga
    $('.welcome-screen').addClass('hidden'); //phla section hide hojega and dusra display
    $('.main').removeClass('hidden');
});

//play and pause events ke liye
function toggleSong() { //togglesong naam ka fnctn bnaya.
    var song = document.querySelector('audio'); //var declare kia song naam ka nd usme document.querySelector lagaya
    if (song.paused == true) { // paused aur pausing me diff. hai.
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    } else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}
var songs = [{
    'name': 'Badri Ki Dulhania (Title Track)',
    'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
    'album': 'Badrinath ki Dulhania',
    'duration': '2:56',
    'fileName': 'song1.mp3',
    'image':'song1.jpg',
}, {
    'name': 'Humma Song',
    'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
    'album': 'Ok Jaanu',
    'duration': '3:15',
    'fileName': 'song2.mp3',
    'image':'song2.jpg',

}, {
    'name': 'Nashe Si Chadh Gayi',
    'artist': 'Arijit Singh',
    'album': 'Befikre',
    'duration': '2:34',
    'fileName': 'song3.mp3',
    'image':'song3.jpg',
}, {
    'name': 'The Breakup Song',
    'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
    'album': 'Ae Dil Hai Mushkil',
    'duration': '2:29',
    'fileName': 'song4.mp3',
    'image':'song4.jpg',
}]
window.onload = function() { //it means wait for the website to load and once it is loaded ,run everthing inside the function

//to make the DataTable

//functions to show the image.
function changeCurrentSongDetails(songObj) //function in which we pass an argument songObj.
  {
$('.current-song-image').attr('src','img/' + songObj.image)//it means select .current-song-image and change it attribute to src to img
$('.current-song-name').text(songObj.name)//
$('.current-song-album').text(songObj.album)

}

        for (var i = 0; i < songs.length; i++) {
            var obj = songs[i];
            var name = '#song' + (i+1);
            var song = $(name);
            song.find('.song-name').text(obj.name);
            song.find('.song-artist').text(obj.artist);
            song.find('.song-album').text(obj.album);
            song.find('.song-length').text(obj.duration);
            addSongNameClickEvent(obj, i+1)

            updateCurrentTime();
            setInterval(function() {
                updateCurrentTime();
            }, 1000);
        }

//a machine where we have 2 buttons ..songName and position ke liye..Ise we can choose different songs
        function addSongNameClickEvent(songObj, position)
        {   var songName = songObj.fileName;
            var id = '#song' + position;
            $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;
                if (currentSong.search(songName) != -1) {
                    toggleSong();
                } else {
                    audio.src = songName;
                    toggleSong();
                    changeCurrentSongDetails(songObj);
                }
            });
        }

        $('#songs').DataTable({
              paging: false
          });


        function fancyTimeFormat(time) {

            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

//remaining time and elapsed time display krvane ke liye
        function updateCurrentTime() {
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);
            currentTime = fancyTimeFormat(currentTime);
            var duration = Math.floor(song.duration);
            duration = fancyTimeFormat(duration);
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
        }


        $('.welcome-screen button').on('click', function() {
            var name = $('#name-input').val();
            if (name.length > 2) {
                var message = "Welcome, " + name;
                $('.main .user-name').text(message);
                $('.welcome-screen').addClass('hidden');
                $('.main').removeClass('hidden');
            } else {
                $('#name-input').addClass('error');
            }
        });

          //click event
                  $('.play-icon').on('click', function() {
                      toggleSong();
                  });

                  //key event
                  $('body').on('keypress', function(event) {
                      if (event.keyCode == 32 && target.tagName !='INPUT') {
                          toggleSong();
                      }
                  });
                }
function updateTimer(){
var song=document.querySelector('audio');
var cs=song.currentTime();
var td=song.duration();
var percentage=(cs/td)*100;
$(".progress-filled").css('width',percentage+"%");
}


$(".fa-step-forward clickable").click(function(){

if(Playingnumber == songs.length-1){
Playingnumber = 0;
changeSong();

}

else {
console.log(Playingnumber);
  Playingnumber++;
changeSong();
}
})

$(".fa-step-backward clickable").click(function(){

if(Playingnumber == 0){
Playingnumber = (songs.length-1);
changeSong();
}

else {
console.log(Playingnumber);
  Playingnumber--;
changeSong();
}

})


      $(".fa-bar-chart").click(function(){

      $(this).toggleClass("active");
      if(equal==0)
      {

      equal=1;

      $("svg").css("display","inline-block");
      $(".content").css("display","none");
      $(".contain").css("display","inline-block");
      $(".contain").css("background","black");

      }
      else{
      equal=0;
      $("svg").css("display","none");
      $(".content").css("display","inline-block");
      $(".contain").css("display","none");
      }
      })
//shuffle//
      $('.fa-random').on('click',function() {
          $('.fa-random').toggleClass('disabled')
          willShuffle = 1 - willShuffle;// change the value of 0 to 1 and from 1 to 0
      });

      function timeJump() {
      var song = document.querySelector('audio')
      song.currentTime = song.duration - 5;
  }
  $('audio').on('ended',function() {
      var audio = document.querySelector('audio');
      if (willShuffle == 1) {
          var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
          var nextSongObj = songs[nextSongNumber-1];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber = nextSongNumber;
      }
      else if(currentSongNumber < 4) {
          var nextSongObj = songs[currentSongNumber];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber = currentSongNumber + 1;
      }
      else if(willLoop == 1) {
          var nextSongObj = songs[0];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber =  1;
      }
      else {
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          audio.currentTime = 0;
      }
  });
