import React, { Component } from 'react';
import Player from './Player';

export const TRACKS = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://firebasestorage.googleapis.com/v0/b/testfirebasess-c763b.appspot.com/o/YHSpdtaDABYcPE6vWB3dS6DfYYp2%2FFROZENLet%20It%20Go%20Sing-alongOfficial%20Disney%20UK.mp3?alt=media&token=f35b5541-9668-499d-af61-79083c443c45",
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/testfirebasess-c763b.appspot.com/o/YHSpdtaDABYcPE6vWB3dS6DfYYp2%2Fambai%20-%20Copy.mp3?alt=media&token=bc1db9f9-e5a1-4b35-b0e8-a3763f21696a',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/testfirebasess-c763b.appspot.com/o/LFg9IDFiAtQEmFEA8pT52Xfhuo02%2Fjames%202%20-%20Copy.mp3?alt=media&token=86696e45-b257-464e-8315-3e969add0317',
  },
];

export default class App extends Component {
  render() {
    return <Player tracks={TRACKS} />
  }
}