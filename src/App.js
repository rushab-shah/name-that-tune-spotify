/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = '';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const AlbumCover = ({track}) => {
  const src = track.album.images[0].url;
  return (
    <img src={src} style={{ width:400, height: 400}}></img>
  );
}

const App = () => {
  const [ text, setText ] = useState('');
  const [ tracks, setTracks ] = useState('');
  const [ songsLoaded, setLoaded ] = useState(false);

  let trackCount = 0;
  console.log('Making fetch call');
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      // console.log('Response '+data);
      setTracks(data.items);
      setLoaded(true);
      trackCount = tracks.length;
      currentTrack = tracks[0].track;
      setText('Current Song: '+currentTrack.name);
    })
  }, []);

  if(!songsLoaded) {
    return (
      <div className="App">
      <header className="App-header">
        <img src={loading} className="App-logo" alt="loading" />
      </header>
      </div>
    );
  }

  let currentTrack = tracks[0].track;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Name that Tune</h1>
      </header>
      <div className="App-images">
        <p>{text}</p>
        <AlbumCover track={currentTrack}></AlbumCover>
      </div>
      <div className="App-buttons">
      </div>
    </div>
  );
};

export default App;
