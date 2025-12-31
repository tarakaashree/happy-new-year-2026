
export type Page = 
  | 'HUB' 
  | 'HEAR_ME' 
  | 'POLAROIDS' 
  | 'PLAYLIST' 
  | 'CLICK_ME' 
  | 'VIRTUAL_KISS' 
  | 'TIMELINE' 
  | 'MOOD_CARDS' 
  | 'LOVE_LETTER' 
  | 'STORY'
  | 'ENDING';

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface PolaroidItem {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
}

export interface MoodCardItem {
  id: string;
  label: string;
  message: string;
  photoUrl: string;
  bgColor: string;
}

export interface Song {
  id: string;
  title: string;
  url: string;
}

export interface SiteConfig {
  // Global/Hub
  homeTitle: string;
  homeSubtext: string;
  navHomeText: string;
  finalMessage: string;
  
  // Card Labels
  hubHearMeLabel: string;
  hubMemoriesLabel: string;
  hubPlaylistLabel: string;
  hubMissMeLabel: string;
  hubKissLabel: string;
  hubTimelineLabel: string;
  hubMoodsLabel: string;
  hubLetterLabel: string;

  // Hear Me
  hearMeTitle: string;
  voiceUrl: string;
  voiceCaption: string;

  // Story
  storyVideoUrl: string;
  storyCaption: string;

  // Virtual Kiss
  kissTitle: string;
  kissDesc: string;
  kissButtonText: string;
  kissImageUrl: string;

  // Polaroids
  polaroidsTitle: string;
  polaroidsAddText: string;

  // Playlist
  playlistTitle: string;
  playlistSubtitle: string;
  playlistManageText: string;

  // Click Me
  clickMeTitle: string;
  clickMeDesc: string;

  // Timeline
  timelineTitle: string;
  timelineAddText: string;

  // Mood Cards
  moodCardsTitle: string;
  moodCardsDesc: string;
  moodCardsNoteTitle: string;

  // Love Letter
  letterEnvelopeText: string;
  letterOpenText: string;
  letterCloseText: string;
  letterContent: string;

  // Data Lists
  timeline: TimelineItem[];
  polaroids: PolaroidItem[];
  moodCards: MoodCardItem[];
  playlist: Song[];
  missMeMessages: string[];
}
