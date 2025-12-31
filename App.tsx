
import React, { useState, useEffect } from 'react';
import { Page, SiteConfig } from './types';
import { Navigation } from './components/Navigation';
import { Background } from './components/Background';
import { Hub } from './sections/Hub';
import { HearMe } from './sections/HearMe';
import { Polaroids } from './sections/Polaroids';
import { Playlist } from './sections/Playlist';
import { ClickMe } from './sections/ClickMe';
import { VirtualKiss } from './sections/VirtualKiss';
import { Timeline } from './sections/Timeline';
import { MoodCards } from './sections/MoodCards';
import { LoveLetter } from './sections/LoveLetter';
import { Story } from './sections/Story';
import { Ending } from './sections/Ending';
import { DEFAULT_CONFIG } from './constants';
import { Settings, Save, RotateCcw, Loader2 } from 'lucide-react';

// IndexedDB Utility for large storage
const DB_NAME = 'LoveSiteDB';
const STORE_NAME = 'config';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveConfig = async (config: SiteConfig) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(config, 'current');
};

const loadConfig = async (): Promise<SiteConfig | null> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).get('current');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HUB');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDBLoading, setIsDBLoading] = useState(true);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  // Load from IndexedDB on start
  useEffect(() => {
    loadConfig().then((saved) => {
      if (saved) setConfig(saved);
      setIsDBLoading(false);
    });
  }, []);

  // Save to IndexedDB when config changes
  useEffect(() => {
    if (!isDBLoading) {
      saveConfig(config).catch(err => console.error("Failed to save to DB:", err));
    }
  }, [config, isDBLoading]);

  const navigateTo = (page: Page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 400);
  };

  const updateConfig = (key: keyof SiteConfig, val: any) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  const resetConfig = () => {
    if (confirm("Are you sure you want to reset everything? This will delete all your uploaded photos and videos.")) {
      setConfig(DEFAULT_CONFIG);
      const request = indexedDB.deleteDatabase(DB_NAME);
      request.onsuccess = () => window.location.reload();
    }
  };

  if (isDBLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-rose-50">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-pink-600 font-bold uppercase tracking-widest animate-pulse">Loading Your Universe...</p>
      </div>
    );
  }

  const renderPage = () => {
    const commonProps = { config, onUpdate: updateConfig, isEditMode };
    switch (currentPage) {
      case 'HUB': return <Hub {...commonProps} onNavigate={navigateTo} />;
      case 'HEAR_ME': return <HearMe {...commonProps} />;
      case 'POLAROIDS': return <Polaroids {...commonProps} />;
      case 'PLAYLIST': return <Playlist {...commonProps} />;
      case 'CLICK_ME': return <ClickMe {...commonProps} />;
      case 'VIRTUAL_KISS': return <VirtualKiss {...commonProps} />;
      case 'TIMELINE': return <Timeline {...commonProps} />;
      case 'MOOD_CARDS': return <MoodCards {...commonProps} />;
      case 'LOVE_LETTER': return <LoveLetter {...commonProps} />;
      case 'STORY': return <Story {...commonProps} />;
      case 'ENDING': return <Ending config={config} />;
      default: return <Hub {...commonProps} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <Background variant={currentPage === 'ENDING' ? 'dark' : 'warm'} />
      
      {currentPage !== 'HUB' && currentPage !== 'ENDING' && (
        <Navigation 
          onNavigate={navigateTo} 
          config={config} 
          onUpdate={updateConfig} 
          isEditMode={isEditMode} 
        />
      )}

      <main className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[200]">
        {isEditMode && (
          <button 
            onClick={resetConfig}
            className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg text-slate-400 hover:text-red-500 transition-all active:scale-95 border border-red-50"
            title="Reset to Defaults"
          >
            <RotateCcw size={20} />
          </button>
        )}
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`p-5 rounded-[2rem] shadow-2xl transition-all active:scale-90 flex items-center gap-3 group ${isEditMode ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-pink-600 text-white shadow-pink-200'}`}
        >
          {isEditMode ? <Save size={24} /> : <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />}
          <span className="font-black text-xs uppercase tracking-[0.3em] max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700">
            {isEditMode ? 'Save Changes' : 'Customize Universe'}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 1.2s ease-out forwards; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
