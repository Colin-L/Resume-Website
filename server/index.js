const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
const axios = require('axios');



var token = '';
var client_id = '';
var client_secret = '';

async function activate() {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  token = await getAuthKey();
}

app.get('/api/sots/getPlaylist', async (req, res) => {
  const playlist = await getPlaylist();
  res.json(playlist);
});


async function getPlaylist() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const playlist = (await fetchWebApi(
    'v1/playlists/3cEYpjA9oz9GiPac4AsH4n ', 'GET'
  ));
  return playlist;
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



async function fetchWebApi(endpoint, method, body) {
  try {
    const response = await axios({
      method: method,
      url: `https://api.spotify.com/${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: body
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


function getAuthKey() {
  // Using Spotify's Client Credentials Flow
  return new Promise((resolve, reject) => {
    var authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      data: 'grant_type=client_credentials'
    };

    axios(authOptions)
      .then(function (response) {
        var data = response.data;
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



activate();