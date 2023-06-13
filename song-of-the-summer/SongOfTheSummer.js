async function activate() {
  addListeners();
  getPlaylist();
}


function addListeners() {
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (e) {
    if (!e.target.matches('.email-content')) {
      var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  // Close the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };
}

function getPlaylist() {
  fetch('http://localhost:3000/api/sots/getPlaylist')
    .then(response => response.json())
    .then(playlist => {
      // Handle the playlist data

      var tracks = playlist.tracks.items;
      tracks.shuffle();
      document.getElementById("playlistName").innerHTML = playlist.description;

      var table = document.createElement("table");
      var musicContainer = document.getElementById("songListContainer");

      for (var i = 0; i < tracks.length; i += 2) {
        var row = document.createElement("div");
        row.classList.add("row");

        var songDiv = createTrackDiv(tracks[i].track);
        row.appendChild(songDiv);

        if (tracks[i + 1]) {
          var songDiv = createTrackDiv(tracks[i + 1].track);
          row.appendChild(songDiv);
        }
        musicContainer.appendChild(row);
      }

      var container = document.getElementById("songListContainer");
      container.appendChild(table);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showContactDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function createTrackDiv(song) {
  // Create the div for a song. Image and title
  var songDiv = document.createElement("div");
  songDiv.id = "track";
  songDiv.classList.add("song");
  songDiv.classList.add("track-name");

  songDiv.addEventListener('click', function (event) {
    // Clicking on the track opens the vote modal
    var track = event.target.parentNode;
    openModal(track);
  });

  var albumArt = document.createElement("img");
  albumArt.id = "album-art"
  albumArt.src = song.album.images[0].url;
  albumArt.style.height = 200 + "px";
  albumArt.style.width = 200 + "px";

  var songTitle = document.createElement("h2");
  songTitle.id = "song-title"
  songTitle.textContent = song.name;

  songDiv.appendChild(albumArt);
  songDiv.appendChild(songTitle);

  return songDiv;
}

function openModal(track) {

  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");
  var clonedTrack = track.cloneNode(true);
  var albumArt = clonedTrack.querySelector('#album-art');
  var songTitle = clonedTrack.querySelector('#song-title');

  // Add the content to the modal
  modalContent.appendChild(songTitle);
  modalContent.appendChild(albumArt);

  var voteButton = document.createElement('button');
  voteButton.textContent = 'Vote';
  voteButton.onclick = vote;
  voteButton.classList.add('btn');
  voteButton.classList.add('btn-primary');
  modalContent.appendChild(voteButton);

  // Show the modal
  modal.style.display = "block";
  modal.style.opacity = "1";
  modal.classList.remove('hidden');
}

// Copies my email addess to the clipboard
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


Object.defineProperty(Array.prototype, 'shuffle', {
  value: function () {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  }
});

//Modal Functions
function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.opacity = 0;
  setTimeout(function () {
    modal.style.display = 'none';

    clearModal();

  }, 500);
}

function clearModal() {
  // Empty the modal content
  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
}

function vote() {
  var timesVoted = getVotedCount();
  if (timesVoted > 0) {
    showVoteMessage(timesVoted);
  } else {
    sendVote();
  }

  incrementVotedCount();
}

function getVotedCount() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith('voted=')) {
      const cookieValue = cookie.substring('voted='.length);
      return parseInt(cookieValue);
    }
  }
  return 0;
}

function incrementVotedCount() {
  const currentCount = getVotedCount();
  const newCount = currentCount + 1;

  // Set the expiration date for the cookie (e.g., 30 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // Create the cookie string
  const cookieString = `voted=${newCount}; expires=${expirationDate.toUTCString()}; path=/`;

  // Save the updated cookie
  document.cookie = cookieString;
}

function showVoteMessage(timesVoted) {
  clearModal();

  var voteMessage = document.createElement("h2");

  switch (timesVoted) {
    case 1:
      voteMessage.textContent = "Woah there buddy it looks like you already voted";
      break;
    case 2:
      voteMessage.textContent = "Hey man, you've tried this twice. Go away";
      break;

    case 3:
      voteMessage.textContent = "Vote cast successfully";
      setTimeout(function () {
        voteMessage.textContent = "Just kidding fuckface, you really thought that would work?";
      }, 3000);
      break;
    case 4:
      voteMessage.textContent = "this you?";
      showLocation();
      break;

    default:
      showSpoopyImage();
      break;
  }
  var modalContent = document.getElementById("modal-content");
  modalContent.insertBefore(voteMessage, modalContent.firstChild);
}


function showLocation() {

  var endpoint = 'http://ip-api.com/json/?fields=57536';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.status !== 'success') {
        console.log('query failed: ' + response.message);
        return
      } else {

        var mapDiv = document.createElement("div");
        mapDiv.id = "map";
        mapDiv.style.height = "300px";
        mapDiv.style.width = "300px";
        var modalContent = document.getElementById("modal-content");
        modalContent.appendChild(mapDiv);

        var cityCoordinates = [response.lat, response.lon];

        // Create the map
        var map = L.map(mapDiv, {
          zoomControl: false // Disable the default zoom control
        }).setView(cityCoordinates, 8);

        // Add the tile layer (map background)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(map);

        // Add a red circle layer with a radius of 100 meters
        L.circle(cityCoordinates, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(map);

        // Animate zooming to the city over 4 seconds
        map.flyTo(cityCoordinates, 13, {
          animate: true,
          duration: 4
        });
      }
    };
  }
  xhr.open('GET', endpoint, true);
  xhr.send();
}

function showSpoopyImage() {
  var imageSrc = "./assets/cat.jpg"; // Replace with the actual path to your image
  var screamSound = "./assets/Scream.mp3"; // Replace with the actual path to your sound effect
  var modalContent = document.getElementById("modal-content");

  // Create an image element
  var image = new Image();
  image.classList.add("spoopy-image");
  image.src = imageSrc;

  var audio = new Audio(screamSound);

  // Append the image to the body element
  modalContent.appendChild(image);

  // Play the sound effect
  audio.play();


  setTimeout(function () {
    closeModal();
  }, 4000);
}

async function sendVote(voteData) {
  try {
    const response = await axios.post('/api/sots/vote', voteData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

activate();
