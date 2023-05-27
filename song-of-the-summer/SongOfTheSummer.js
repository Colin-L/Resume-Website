// Global Variables. Shh don't look here
var token = '';
var client_id = 'xxx';
var client_secret = 'xxx';

async function activate() {
  token = await getAuthKey();
  await addListeners();
  await getPlaylist();
}


function addListeners(){
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (e) {
      if (!e.target.matches('.email-content')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
          myDropdown.classList.remove('show');
        }
      }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showContactDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function getPlaylist() {

  // document.getElementById("songListContainer").innerHTML = "";


    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    const playlist = (await fetchWebApi(
      'v1/playlists/3cEYpjA9oz9GiPac4AsH4n ', 'GET'
    ));
    document.getElementById("playlistName").innerHTML = playlist.description;
    console.log(playlist);

    var tracks = playlist.tracks.items;
    tracks.shuffle();

    var table = document.createElement("table");

    var musicContainer = document.getElementById("songListContainer");
    var totalSongs = tracks.length;
    

    for (var i = 0; i < tracks.length; i += 2) {
      var row = document.createElement("div");
      row.classList.add("row");
      
      var image = tracks[i].track.album.images[0];
      var trackName = tracks[i].track.name;

      var song1 = tracks[i].track;
      var song2 = tracks[i + 1];

      var div1 = document.createElement("div");
      div1.classList.add("song");
      div1.classList.add("track-name");
      
      var img1 = document.createElement("img");
      img1.src = song1.album.images[0].url;
      img1.style.height = 200 + "px";
      img1.style.width = 200 + "px";

      var p1 = document.createElement("h2");
      p1.textContent = song1.name;
      
      div1.appendChild(img1);
      div1.appendChild(p1);
      row.appendChild(div1);
      
      if (song2) {
        song2 = song2.track;
        var div2 = document.createElement("div");
        div2.classList.add("song");
        div2.classList.add("track-name");
        

        var img2 = document.createElement("img");
        img2.src = song2.album.images[0].url;
        img2.style.height = 200 + "px";
        img2.style.width = 200 + "px";
        
        var p2 = document.createElement("h2");
        p2.textContent = song2.name;
        
        div2.appendChild(img2);
        div2.appendChild(p2);
        row.appendChild(div2);
      }
      
      musicContainer.appendChild(row);
    }

var container = document.getElementById("songListContainer");
container.appendChild(table);
}

function getAuthKey() {
  return new Promise((resolve, reject) => {
    var authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to get authorization key');
        }
      })
      .then(function (data) {
        var token = data.access_token;
        console.log(token);
        // Use the token as needed

        resolve(token); // Resolve the promise with the token
      })
      .catch(function (error) {
        console.error(error);
        reject(error); // Reject the promise with the error
      });
  });
}

// Copieds my email addess to the clipboard
function copyToClipboard(btn) {

  var $body = document.getElementsByTagName('body')[0];
  var emailAddress = 'colinbleslie@gmail.com'
  var $tempInput = document.createElement('INPUT');
  $body.appendChild($tempInput);
  $tempInput.setAttribute('value', emailAddress)
  $tempInput.select();
  document.execCommand('copy');
  $body.removeChild($tempInput);
  btn.style.backgroundColor = "#a1a4a8";
}


// arr.shuffle();
Object.defineProperty(Array.prototype, 'shuffle', {
  value: function() {
      for (let i = this.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
  }
});

activate();
