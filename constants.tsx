
import { SiteConfig } from './types';

export const DEFAULT_CONFIG: SiteConfig = {
  homeTitle: "Our 2026 Universe 💫",
  homeSubtext: "A magical space built just for my favorite human",
  navHomeText: "Home = You",
  finalMessage: "Walking into 2026 along with a boy that I met in 2021 💛✨",
  
  hubHearMeLabel: "Hear Me",
  hubMemoriesLabel: "Memories",
  hubPlaylistLabel: "Our Beat",
  hubMissMeLabel: "Miss Me?",
  hubKissLabel: "The Kiss",
  hubTimelineLabel: "Our Path",
  hubMoodsLabel: "Moods",
  hubLetterLabel: "Letter",

  hearMeTitle: "Hear My Heart 💌",
  voiceUrl: "",
  voiceCaption: "Click the heart to hear my voice, I have something to tell you...",
  
  storyVideoUrl: "", 
  storyCaption: "Our beautiful journey together...",
  
  kissTitle: "Virtual Kiss 💋",
  kissDesc: "Click anywhere for a sweet surprise!",
  kissButtonText: "KISS ME 💌",
  kissImageUrl: "", 

  polaroidsTitle: "Memory Lane 📸",
  polaroidsAddText: "Add Polaroid",

  playlistTitle: "Our 2026 Soundtrack",
  playlistSubtitle: "Our Special Playlist",
  playlistManageText: "Manage Tracks",

  clickMeTitle: "Miss Me? 💌",
  clickMeDesc: "Click the heart to get a little reminder of my love.",

  timelineTitle: "Our Timeline 🕰️",
  timelineAddText: "Add Milestone",

  moodCardsTitle: "Mood Cards ✨",
  moodCardsDesc: "How is my boy feeling today? Pick a card to see what I have to say.",
  moodCardsNoteTitle: "A little note for you...",

  letterEnvelopeText: "For my favorite person",
  letterOpenText: "Open Me",
  letterCloseText: "Close Letter",
  letterContent: `My Dearest,

Looking back at where we started in 2021, I never could have imagined how much my life would change for the better. You are my rock, my best friend, and my greatest adventure.

As we walk into 2026, my only wish is to keep growing alongside you, to keep laughing at your jokes, and to keep loving you with everything I have.

Thank you for being the boy I met in 2021 who became the man I love today.

Forever yours,
Me ❤️`,

  timeline: [
    { id: '1', date: 'Sept 2021', title: 'The First Message 💬', description: 'Where it all began... I still remember how my heart skipped a beat.' },
    { id: '2', date: 'Dec 26, 2021', title: 'First Meeting 🌹', description: 'The day my world changed forever. 26 Dec will always be special.' },
  ],
  polaroids: [
    { id: '1', url: 'https://picsum.photos/seed/love1/400/500', caption: 'That sunny day by the beach 🌊', type: 'image' },
    { id: '2', url: 'https://picsum.photos/seed/love2/400/500', caption: 'Your sleepy morning face ☀️', type: 'image' },
  ],
  moodCards: [
    { id: 'lonely', label: 'Lonely 🥺', message: 'I am always just a call away. I love you!', photoUrl: 'https://picsum.photos/seed/lonely/400/400', bgColor: 'bg-blue-100' },
    { id: 'happy', label: 'Happy 😊', message: 'Keep that beautiful smile on! It lights up my whole world.', photoUrl: 'https://picsum.photos/seed/happy/400/400', bgColor: 'bg-yellow-100' },
    { id: 'sad', label: 'Sad 😢', message: 'I wish I could hold you right now. Remember how strong you are.', photoUrl: 'https://picsum.photos/seed/sad/400/400', bgColor: 'bg-indigo-100' },
    { id: 'tired', label: 'Tired 😴', message: 'Rest well, my love. I will be here when you wake up.', photoUrl: 'https://picsum.photos/seed/tired/400/400', bgColor: 'bg-slate-100' },
  ],
  playlist: [
    { id: '1', title: 'Our Song - Artist Name', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  ],
  missMeMessages: [
    "I'm hugging you in my thoughts right now! 🤗",
    "Close your eyes and feel my kiss on your forehead. 💋",
    "Thinking about your smile and it's making me smile too. ✨",
    "I love you more than all the stars in 2026! 🌟",
  ],
};
