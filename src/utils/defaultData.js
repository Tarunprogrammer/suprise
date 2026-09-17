// Default pre-populated surprise data for 3D Birthday Surprise Website

export const FRAME_STYLES = [
  { id: 'neon', name: 'Cyber Neon Glow', description: 'Futuristic glowing neon outlines with pulsing light animation', badge: 'Popular' },
  { id: 'gold', name: 'Royal Ornate Gold', description: 'Extravagant Baroque golden border with engraved ornaments', badge: 'Luxury' },
  { id: 'polaroid', name: 'Retro Polaroid', description: 'Classic physical photo with washi tape and scribbled memory notes', badge: 'Vintage' },
  { id: 'heart', name: 'Heart Sparkles', description: 'Floating glowing heart particles and sparkling magenta border', badge: 'Cute' },
  { id: 'comic', name: 'Comic Pop Art', description: 'Bold halftone pop-art borders with speech bubbles and star bursts', badge: 'Fun' },
  { id: 'holographic', name: 'Holographic Portal', description: 'Iridescent chromatic glass sheen that changes color with angle', badge: 'Sci-Fi' },
  { id: 'floral', name: 'Floral Garden', description: 'Blooming roses, vining ivy, and botanical gold foil accents', badge: 'Elegant' },
  { id: 'wood', name: 'Vintage Timber', description: 'Rustic carved wooden frame with antique brass corners', badge: 'Classic' }
];

export const THEME_PRESETS = [
  {
    id: 'cosmic',
    name: 'Cosmic Galaxy',
    bgGradient: 'from-slate-950 via-indigo-950 to-purple-950',
    clearColor: '#0a0a1a',
    particleColor: '#a78bfa',
    fogColor: '#0d0d26',
    ambientLight: 0.7,
    directionalColor: '#c084fc',
    accentColor: '#8b5cf6'
  },
  {
    id: 'gold',
    name: 'Golden Celebration',
    bgGradient: 'from-amber-950 via-yellow-950 to-stone-950',
    clearColor: '#1c1305',
    particleColor: '#fbbf24',
    fogColor: '#180e03',
    ambientLight: 0.8,
    directionalColor: '#fef08a',
    accentColor: '#f59e0b'
  },
  {
    id: 'cyberpunk',
    name: 'Cyber Neon Night',
    bgGradient: 'from-gray-950 via-slate-900 to-pink-950',
    clearColor: '#080811',
    particleColor: '#ec4899',
    fogColor: '#0a0518',
    ambientLight: 0.6,
    directionalColor: '#06b6d4',
    accentColor: '#ec4899'
  },
  {
    id: 'sunset',
    name: 'Romantic Sunset',
    bgGradient: 'from-rose-950 via-orange-950 to-purple-950',
    clearColor: '#1a0510',
    particleColor: '#f43f5e',
    fogColor: '#1c0814',
    ambientLight: 0.8,
    directionalColor: '#fdba74',
    accentColor: '#f43f5e'
  },
  {
    id: 'candy',
    name: 'Candy Dreamland',
    bgGradient: 'from-pink-950 via-purple-900 to-sky-950',
    clearColor: '#16081d',
    particleColor: '#f472b6',
    fogColor: '#180a21',
    ambientLight: 0.9,
    directionalColor: '#fbcfe8',
    accentColor: '#38bdf8'
  }
];

export const PRESET_AUDIO_TRACKS = [
  { id: 'festive_upbeat', name: '🎉 Festive Celebration BGM', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73b88.mp3?filename=happy-birthday-111075.mp3' },
  { id: 'acoustic_warm', name: '🎸 Warm Acoustic Melody', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=sweet-acoustic-18967.mp3' },
  { id: 'lofi_chill', name: '☕ Birthday Chill Lofi Beats', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3' },
  { id: 'magical_piano', name: '🎹 Magical Birthday Waltz', url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939b4b9b4.mp3?filename=magical-piano-124976.mp3' }
];

export const DEFAULT_SURPRISE_DATA = {
  recipient: {
    name: "Alex",
    nickname: "Birthday Star ⭐",
    age: "25",
    title: "Happy 25th Birthday Alex!",
    subtitle: "Welcome to your personalized 3D World filled with memories, secret gifts, & wishes from everyone who loves you!",
    pinCode: ""
  },
  theme: {
    presetId: "cosmic",
    bgMusicUrl: PRESET_AUDIO_TRACKS[0].url,
    candleCount: 5,
    cakeColor: "#ff4081",
    frostingColor: "#ffffff",
    balloonCount: 16
  },
  photos: [
    {
      id: "photo_1",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      title: "The Ultimate Celebration!",
      caption: "Surrounded by lights and laughter - one of our favorite nights ever!",
      hiddenMemory: "We stayed up till 4 AM laughing about the funny cake mixup. Never change!",
      frameStyle: "neon",
      date: "New Year's Eve",
      position: [-3.2, 1.8, -1.2],
      rotation: [0, 0.35, 0]
    },
    {
      id: "photo_2",
      url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      title: "Golden Hour Memories",
      caption: "Chasing sunsets on the beach during our summer trip.",
      hiddenMemory: "You dropped your ice cream 5 seconds after taking this photo! 😂",
      frameStyle: "gold",
      date: "July 2025",
      position: [3.2, 1.8, -1.2],
      rotation: [0, -0.35, 0]
    },
    {
      id: "photo_3",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      title: "Road Trip Adventures",
      caption: "Spontaneous mountain getaway with non-stop tunes.",
      hiddenMemory: "Best 8-hour playlist session of the year!",
      frameStyle: "polaroid",
      date: "Autumn 2025",
      position: [-4.2, 0.4, 1.2],
      rotation: [0, 0.6, 0]
    },
    {
      id: "photo_4",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      title: "Party Sparkles & Joy",
      caption: "Shining bright and spreading positivity everywhere you go.",
      hiddenMemory: "You truly make every room brighter just by being in it!",
      frameStyle: "heart",
      date: "Birthday Flashback",
      position: [4.2, 0.4, 1.2],
      rotation: [0, -0.6, 0]
    },
    {
      id: "photo_5",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      title: "Concert Night Blast",
      caption: "Front row at your favorite band's live show!",
      hiddenMemory: "You lost your voice singing every single word!",
      frameStyle: "comic",
      date: "Spring 2025",
      position: [0, 3.2, -3.5],
      rotation: [0.1, 0, 0]
    }
  ],
  wishes: [
    {
      id: "wish_1",
      senderName: "Mom & Dad",
      relation: "Parents ❤️",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      message: "Happy Birthday our dearest child! Seeing you grow into such a kind, talented, and beautiful soul brings us endless pride and joy every single day. May this year bring you all the love and happiness you deserve!",
      audioUrl: "",
      position: [-2.2, 2.8, 0.5],
      envelopeColor: "#ec4899"
    },
    {
      id: "wish_2",
      senderName: "Sam & Jordan",
      relation: "Best Friends 🚀",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      message: "To the undisputed legend! 🥂 Thank you for always bringing the wild energy, late-night wisdom, and unforgettable memories. Let's make this 25th year the most epic one yet!",
      audioUrl: "",
      position: [2.2, 2.8, 0.5],
      envelopeColor: "#3b82f6"
    },
    {
      id: "wish_3",
      senderName: "Maya (Sis)",
      relation: "Sister 💖",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      message: "Happy Birthday to my favorite partner in crime! Who else would I share secret snacks and late-night gossip with? Love you tons!",
      audioUrl: "",
      position: [-1.2, 0.8, -2.8],
      envelopeColor: "#8b5cf6"
    },
    {
      id: "wish_4",
      senderName: "Uncle David & Aunt Clara",
      relation: "Family 🌟",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      message: "Sending you huge hugs, warmest birthday wishes, and prayers for health, success, and prosperity! Keep shining bright!",
      audioUrl: "",
      position: [1.2, 0.8, -2.8],
      envelopeColor: "#eab308"
    }
  ],
  gifts: [
    {
      id: "gift_1",
      title: "🎁 Mystery Box #1: VIP Ticket",
      content: "✨ SURPRISE! You got 2 VIP tickets to your dream concert / trip weekend! Get ready to pack your bags!",
      boxColor: "#ec4899",
      ribbonColor: "#fde047",
      position: [-2.0, -1.0, -0.5]
    },
    {
      id: "gift_2",
      title: "🎁 Mystery Box #2: Wish Coupon",
      content: "📜 GOLDEN TICKET: Good for 1 free dinner anywhere you choose + 1 unlimited movie night treat pass!",
      boxColor: "#8b5cf6",
      ribbonColor: "#38bdf8",
      position: [2.0, -1.0, -0.5]
    }
  ]
};
