import { Howl, Howler } from 'howler';

// Sound effect URLs from reliable royalty-free CDN sources
const SFX_URLS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3', // balloon pop / gift open
  cheer: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // birthday cheering
  blow: 'https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3', // wind/blow candle
  magic: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // sparkle photo zoom
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'  // button click
};

const sounds = {};
let bgmHowl = null;

// Preload SFX
Object.keys(SFX_URLS).forEach((key) => {
  try {
    sounds[key] = new Howl({
      src: [SFX_URLS[key]],
      volume: 0.5,
      html5: true
    });
  } catch (err) {
    console.warn(`Failed to preload sound ${key}`, err);
  }
});

export function playSfx(name) {
  if (sounds[name]) {
    try {
      sounds[name].stop();
      sounds[name].play();
    } catch (e) {
      console.warn('SFX play failed', e);
    }
  }
}

export function playBgm(musicUrl) {
  if (bgmHowl) {
    bgmHowl.stop();
    bgmHowl.unload();
  }

  if (!musicUrl) return;

  try {
    bgmHowl = new Howl({
      src: [musicUrl],
      html5: true,
      loop: true,
      volume: 0.35,
      onloaderror: (id, err) => console.warn('BGM load error:', err),
      onplayerror: (id, err) => console.warn('BGM play error:', err)
    });
    bgmHowl.play();
  } catch (e) {
    console.warn('Failed to start BGM', e);
  }
}

export function stopBgm() {
  if (bgmHowl) {
    bgmHowl.stop();
  }
}

export function setBgmVolume(val) {
  if (bgmHowl) {
    bgmHowl.volume(val);
  }
}

export function toggleGlobalMute(isMuted) {
  Howler.mute(isMuted);
}
