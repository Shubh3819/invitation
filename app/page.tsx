'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Event & Panchang Schedule Data
interface EventItem {
  eyebrow: string;
  dayName: string;
  title: string;
  date: string;
  venue: string;
  extra: string;
  icon: string;
  details: string;
  calendarTitle: string;
  calendarDetails: string;
  calendarStart: string;
  calendarEnd: string;
}

const fullPanchang: EventItem[] = [
  {
    eyebrow: 'MAHASHASHTHI & INAUGURATION',
    dayName: 'Thursday, Oct 15',
    title: 'Bodhon & Grand Inauguration',
    date: 'Thursday, 15.10.2026 at 4:45 pm',
    venue: 'at Colvin Court, Railway Officers’ Club, Howrah',
    extra: 'Inauguration by Ms Gitika Pandey (President / ERWWO) followed by Cultural Programme & High Tea.',
    icon: '🪔',
    details: 'Devi Bodhon, Adhibas & Kalparambha to warmly welcome the Divine Mother to our midst.',
    calendarTitle: 'Inauguration & Shashthi - Colvin Court Durga Puja 2026',
    calendarDetails: 'Bodhon & Grand Inauguration by Ms Gitika Pandey (President/ERWWO), followed by Cultural Programme & High Tea.',
    calendarStart: '20261015T111500Z',
    calendarEnd: '20261015T140000Z',
  },
  {
    eyebrow: 'MAHASAPTAMI',
    dayName: 'Sunday, Oct 18',
    title: 'Bhajan Sandhya & Dandiya Raas',
    date: 'Sunday, 18.10.2026 at 7:30 pm',
    venue: 'at Riviera, Railway Officers’ Club',
    extra: 'Followed by Festive Dinner',
    icon: '✧',
    details: 'Nabapatrika Prabesh (Kola Bou Snan) at dawn, Mahasaptami Puja, and grand evening Bhajan Sandhya & Dandiya.',
    calendarTitle: 'Mahasaptami Bhajan Sandhya & Dandiya - Colvin Court Durga Puja',
    calendarDetails: 'Bhajan Sandhya & Dandiya at Riviera, followed by Dinner.',
    calendarStart: '20261018T140000Z',
    calendarEnd: '20261018T173000Z',
  },
  {
    eyebrow: 'MAHAASHTAMI & SANDHI PUJA',
    dayName: 'Monday, Oct 19',
    title: 'Kumari Puja & Dhunuchi Aarti',
    date: 'Monday, 19.10.2026 · Anjali at 9:30 am',
    venue: 'at Colvin Court Mandap',
    extra: 'Sandhi Puja Mahurat at Evening · Dhunuchi Dance Competition',
    icon: '🪷',
    details: 'The pinnacle of devotion with Kumari Puja, Mahaashtami Pushpanjali, and Sandhi Puja illuminated by 108 glowing pradips and 108 fresh lotuses.',
    calendarTitle: 'Mahaashtami & Sandhi Puja - Colvin Court Durga Puja',
    calendarDetails: 'Mahaashtami Pushpanjali, Kumari Puja, Dhunuchi Naach, and auspicious Sandhi Puja.',
    calendarStart: '20261019T040000Z',
    calendarEnd: '20261019T143000Z',
  },
  {
    eyebrow: 'MAHANAVAMI',
    dayName: 'Tuesday, Oct 20',
    title: 'Navami Homa & Bhog Prasad',
    date: 'Tuesday, 20.10.2026 · Homa at 11:00 am',
    venue: 'at Colvin Court Mandap',
    extra: 'Grand Bhog Prasad Distribution for all devotees',
    icon: '🔱',
    details: 'Mahanavami Yajna & Homa in reverence to Mahishasura Mardini, followed by sacred Khichuri Bhog Prasad distribution.',
    calendarTitle: 'Mahanavami Homa & Bhog Prasad - Colvin Court Durga Puja',
    calendarDetails: 'Mahanavami Homa and Bhog Prasad distribution at Colvin Court.',
    calendarStart: '20261020T053000Z',
    calendarEnd: '20261020T083000Z',
  },
  {
    eyebrow: 'VIJAYA DASHAMI & SINDUR KHELA',
    dayName: 'Wednesday, Oct 21',
    title: 'A Celebration of Togetherness',
    date: 'Wednesday, 21.10.2026 at 10:30 am',
    venue: 'Colvin Court (Cultural Programme at 12:30 pm)',
    extra: 'Followed by Festive Lunch at RIVIERA',
    icon: '✺',
    details: 'Devi Bisharjan, sacred Sindur Khela among married women, exchanging sweet Bijoya Shubhechha and festive togetherness.',
    calendarTitle: 'Dashami & Sindur Khela - Colvin Court Durga Puja',
    calendarDetails: 'Sindur Khela at Colvin Court (10:30 am), Cultural Programme (12:30 pm), followed by Lunch at Riviera.',
    calendarStart: '20261021T050000Z',
    calendarEnd: '20261021T093000Z',
  },
];

// Helper to generate Google Calendar Link
function getGoogleCalendarUrl(title: string, details: string, location: string, start: string, end: string) {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    location: location,
    dates: `${start}/${end}`,
  });
  return `${baseUrl}?${params.toString()}`;
}

// Lotus Petal SVG Motif
function LotusPetalIcon() {
  return (
    <svg viewBox="0 0 100 65" className="lotus-flower-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 5 C 40 25 35 48 50 60 C 65 48 60 25 50 5 Z" fill="#e67389" stroke="#d4af37" strokeWidth="1.2" />
      <path d="M 36 18 C 22 30 20 46 42 58 C 36 44 38 28 36 18 Z" fill="#f4b4be" stroke="#d4af37" strokeWidth="1" />
      <path d="M 64 18 C 78 30 80 46 58 58 C 64 44 62 28 64 18 Z" fill="#f4b4be" stroke="#d4af37" strokeWidth="1" />
      <path d="M 22 32 C 10 40 12 52 32 58 C 24 48 24 38 22 32 Z" fill="#ea9ea7" stroke="#d4af37" strokeWidth="1" />
      <path d="M 78 32 C 90 40 88 52 68 58 C 76 48 76 38 78 32 Z" fill="#ea9ea7" stroke="#d4af37" strokeWidth="1" />
      <circle cx="50" cy="58" r="3.5" fill="#d4af37" />
    </svg>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [music, setMusic] = useState(false);
  const [soundMode, setSoundMode] = useState<'tanpura' | 'dhak' | 'shankh'>('tanpura');
  const [pushpanjaliCount, setPushpanjaliCount] = useState(108);
  const [showBlessing, setShowBlessing] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Personalized Greeting State
  const [guestName, setGuestName] = useState('');
  const [customMsgCopied, setCustomMsgCopied] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio Synth Generator (Tanpura, Bengali Dhak, Shankha Naad)
  const startAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopAudio();

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      if (soundMode === 'tanpura') {
        // Tanpura Drone Frequencies (C#3, G#3, C#4, G#4)
        const freqs = [138.59, 207.65, 277.18, 415.3];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.16 + idx * 0.08;
          lfoGain.gain.value = 1.6;
          lfo.connect(osc.frequency);
          lfo.start();

          const baseGain = idx === 0 ? 0.08 : 0.035 / (idx + 1);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(baseGain, now + 3);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          oscillatorsRef.current.push(osc, lfo);
        });

        // Periodic Temple Bell Gong
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
          const bCtx = audioCtxRef.current;
          const bTime = bCtx.currentTime;
          const bellOsc = bCtx.createOscillator();
          const bellGain = bCtx.createGain();
          bellOsc.type = 'sine';
          bellOsc.frequency.setValueAtTime(1480, bTime);
          bellGain.gain.setValueAtTime(0.08, bTime);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, bTime + 2.5);
          bellOsc.connect(bellGain);
          bellGain.connect(bCtx.destination);
          bellOsc.start();
          bellOsc.stop(bTime + 2.5);
        }, 6000);
      } else if (soundMode === 'dhak') {
        // Bengali Dhak Drum Rhythm Synthesizer
        let beat = 0;
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
          const dCtx = audioCtxRef.current;
          const dTime = dCtx.currentTime;

          // Dhak Bass Drum
          const drumOsc = dCtx.createOscillator();
          const drumGain = dCtx.createGain();
          drumOsc.type = 'sine';
          const isAccent = beat % 4 === 0;
          drumOsc.frequency.setValueAtTime(isAccent ? 140 : 180, dTime);
          drumOsc.frequency.exponentialRampToValueAtTime(50, dTime + 0.15);

          drumGain.gain.setValueAtTime(isAccent ? 0.25 : 0.12, dTime);
          drumGain.gain.exponentialRampToValueAtTime(0.001, dTime + 0.2);

          drumOsc.connect(drumGain);
          drumGain.connect(dCtx.destination);
          drumOsc.start();
          drumOsc.stop(dTime + 0.2);

          // Kansor (Metallic Plate Chime)
          if (beat % 2 === 1) {
            const kOsc = dCtx.createOscillator();
            const kGain = dCtx.createGain();
            kOsc.type = 'triangle';
            kOsc.frequency.setValueAtTime(2400, dTime);
            kGain.gain.setValueAtTime(0.05, dTime);
            kGain.gain.exponentialRampToValueAtTime(0.001, dTime + 0.4);
            kOsc.connect(kGain);
            kGain.connect(dCtx.destination);
            kOsc.start();
            kOsc.stop(dTime + 0.4);
          }

          beat = (beat + 1) % 8;
        }, 320);
      } else if (soundMode === 'shankh') {
        // Resonant Shankha (Conch Shell Drone)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(220, now);
        osc2.frequency.setValueAtTime(440, now);

        osc1.frequency.linearRampToValueAtTime(245, now + 2);
        osc1.frequency.linearRampToValueAtTime(220, now + 4);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        oscillatorsRef.current.push(osc1, osc2);
      }
    } catch {
      // Audio fallback gracefully
    }
  };

  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorsRef.current.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // Safe catch
      }
    });
    oscillatorsRef.current = [];
  };

  // Play Flower Offering Chime
  const playChime = () => {
    try {
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      [1046.5, 1318.5, 1567.98, 2093].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.06, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.2);
      });
    } catch {
      // Safe catch
    }
  };

  useEffect(() => {
    if (music) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [music, soundMode]);

  useEffect(() => {
    document.body.classList.toggle('locked', !entered);
    return () => document.body.classList.remove('locked');
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
    setMusic(true);
  };

  // Pushpanjali Action
  const handlePushpanjali = () => {
    setPushpanjaliCount(prev => prev + 1);
    setShowBlessing(true);
    playChime();
    setTimeout(() => setShowBlessing(false), 4500);
  };

  // Personalized Share text generator
  const getShareText = () => {
    const nameStr = guestName.trim() ? `Personalized Invitation for ${guestName}` : 'Durga Puja Invitation';
    return `🪔 *Colvin Court Sarbojanin Durga Puja 2026* 🪔\n${nameStr}\n\nJoin us in celebrating Sharadotsav & the homecoming of Maa Durga at Railway Officers’ Club, Howrah.\n\n📅 Date: Oct 15 - Oct 21, 2026\n📍 Location: Railway Officers’ Club, Howrah\n\nMay Maa Durga bless you and your family with boundless joy, peace, & health! Shubho Sharadiya!`;
  };

  const handleCopyGreeting = () => {
    navigator.clipboard.writeText(getShareText());
    setCustomMsgCopied(true);
    setTimeout(() => setCustomMsgCopied(false), 3000);
  };

  return (
    <main>
      {/* Falling Lotus, Hibiscus & Marigold Flower Petals */}
      <div className="petals-container">
        {Array.from({ length: 18 }).map((_, i) => {
          const petalTypes = ['lotus', 'hibiscus', 'marigold'];
          const type = petalTypes[i % 3];
          return (
            <div
              key={i}
              className={`petal ${type}`}
              style={{
                left: `${(i * 5.8 + 2) % 96}%`,
                animationDuration: `${6.5 + (i % 5) * 2.2}s`,
                animationDelay: `${(i % 5) * 1.1}s`,
                width: `${12 + (i % 4) * 4}px`,
                height: `${16 + (i % 4) * 5}px`,
              }}
            />
          );
        })}
      </div>

      {/* Pushpanjali Toast Blessing Notification */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div
            className="blessing-toast"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
          >
            <span>🪷</span>
            <div>
              <strong>पुष्पांजलि गृहीत्वा शुभं भवतु!</strong>
              <br />
              <small>Maa Durga’s divine blessings are bestowed upon you and your loved ones!</small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          LANDING GATE: Featuring the exact uploaded poster artwork
          with our custom coded interactive button placed seamlessly
          ========================================================= */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="landing-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.85, ease: 'easeInOut' } }}
          >
            <div className="landing-ambient-glow" />

            <motion.div
              className="poster-container"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              {/* Cleaned Artwork without static button */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/durga_landing_clean.jpg"
                alt="Colvin Court Durga Puja Sharadotsav 2026 Poster"
                className="poster-image"
              />

              {/* Real Interactive Button & Sound Hint Layer */}
              <div className="poster-interactive-layer">
                <motion.button
                  className="coded-enter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnter}
                >
                  <span>TAP TO ENTER</span>
                  <span className="arrow-icon">→</span>
                </motion.button>

                <div className="coded-sound-hint">
                  <span>♫</span>
                  <span>SOUND ON FOR THE FULL EXPERIENCE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN INVITATION EXPERIENCE ALIGNED WITH POSTER AMBIANCE
          ========================================================= */}

      {/* Hero Section */}
      <section className="hero-showcase">
        <div className="hero-content">
          <div className="temple-arch-motif">✧ ॐ ✧</div>
          <p className="kicker-label">RAILWAY OFFICERS’ CLUB · HOWRAH</p>
          
          <h1 className="hero-sharadotsav">शरदोत्सव</h1>

          <div className="hero-venue-heading">
            COLVIN COURT
            <em>Sarbojanin Durga Puja</em>
          </div>

          <div className="hero-year-badge">2026 · 1433 B.S.</div>

          <LotusPetalIcon />
        </div>
      </section>

      {/* Sacred Mantra Section */}
      <section className="section-wrapper">
        <motion.div
          className="arch-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="kicker-label">DEVI MAHATMYS &amp; AGAMANI</p>
          <div className="shloka-main">
            सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके।
            <em>शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥</em>
          </div>
          <div className="shloka-sub">
            या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता।
            <br />
            नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥
          </div>
          <p className="shloka-translit">
            &ldquo;Sarva-mangala-mangalye Shive Sarvaartha-saadhike,
            Sharanye Tryambake Gauri Naaraayani Namo-stu Te.&rdquo;
          </p>
          <p className="shloka-meaning">
            Salutations to the Divine Mother Narayani, the embodiment of auspiciousness, the fulfiller of all pure desires, the eternal refuge of the universe.
          </p>
          <LotusPetalIcon />
        </motion.div>
      </section>

      {/* Virtual Pushpanjali Offering Ritual */}
      <section className="section-wrapper" style={{ paddingTop: 20, paddingBottom: 50 }}>
        <div className="pushpanjali-card">
          <p className="kicker-label">VIRTUAL DEVOTIONAL RITUAL</p>
          <h2 style={{ fontFamily: 'Noto Serif Devanagari', color: 'var(--maroon)', fontSize: 32, margin: '10px 0 6px' }}>
            माँ दुर्गा के चरणों में पुष्पांजलि
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 20, color: 'var(--maroon-rich)' }}>
            Offer fresh fragrant Hibiscus, Lotus petals, and Belpatra to Maa Durga.
          </p>

          <div>
            <div className="offering-counter">
              🪷 {pushpanjaliCount} Pushpanjali Offerings Made
            </div>
          </div>

          <button className="offer-btn" onClick={handlePushpanjali}>
            <span>🪷</span> OFFER PUSHPANJALI (पुष्पांजलि अर्पित करें)
          </button>
        </div>
      </section>

      {/* Main Inauguration & Programme Section */}
      <section className="section-wrapper">
        <div className="arch-card" style={{ maxWidth: 640 }}>
          <div className="temple-arch-motif">ॐ</div>
          <p className="kicker-label">AUSPICIOUS PROGRAMME OF</p>
          <h2 className="programme-title">SHRI SHRI DURGA PUJA</h2>
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 20, color: 'var(--maroon-rich)' }}>
            at
          </p>
          <h3 className="programme-sub">COLVIN COURT — 2026</h3>
          <div className="programme-rule" />

          <p className="kicker-label">GRAND INAUGURATION OF</p>
          <p className="programme-script">Colvin Court Sarbojanin Durga Puja, Howrah</p>

          <div className="by-honor">
            by <strong>Ms Gitika Pandey</strong>
            <span>(PRESIDENT / ERWWO)</span>
          </div>

          <p className="event-date-text">Thursday, 15.10.2026 · 4:45 pm</p>
          <p className="event-follow-text">followed by Cultural Programme &amp; High Tea at Colvin Court.</p>

          <div className="action-group">
            <a
              href={getGoogleCalendarUrl(
                'Inauguration - Colvin Court Durga Puja 2026',
                'Inauguration by Ms Gitika Pandey (President/ERWWO) followed by Cultural Programme & High Tea.',
                'Railway Officers Club, Colvin Court, Howrah',
                '20261015T111500Z',
                '20261015T140000Z'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              📅 Save Inauguration Date
            </a>
            <a
              href="https://maps.google.com/?q=Railway+Officers+Club+Howrah"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn"
            >
              📍 Get Venue Directions
            </a>
          </div>
        </div>
      </section>

      {/* Day-by-Day Sacred Panchang Schedule Selector */}
      <section className="section-wrapper">
        <p className="kicker-label">SHARADIYA PANCHANG</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(32px, 7vw, 46px)', color: 'var(--maroon)', margin: '6px 0 10px' }}>
          Sacred Rituals &amp; Celebrations
        </h2>

        <div className="panchang-tabs">
          {fullPanchang.map((item, idx) => (
            <button
              key={item.eyebrow}
              className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {item.icon} {item.dayName}
            </button>
          ))}
        </div>

        {/* Active Panchang Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="arch-card"
            style={{ maxWidth: 580 }}
          >
            <div style={{ fontSize: 48, color: 'var(--gold-dark)', marginBottom: 8 }}>{fullPanchang[activeTab].icon}</div>
            <p className="kicker-label">{fullPanchang[activeTab].eyebrow}</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px, 6vw, 40px)', color: 'var(--maroon)', margin: '8px 0' }}>
              {fullPanchang[activeTab].title}
            </h2>
            <p className="event-date-text">{fullPanchang[activeTab].date}</p>
            <p className="programme-script">{fullPanchang[activeTab].venue}</p>
            <p className="event-follow-text" style={{ marginTop: 6 }}>{fullPanchang[activeTab].extra}</p>

            <p style={{ fontSize: 14, color: '#4a1924', marginTop: 14, lineHeight: 1.55, fontWeight: 500 }}>
              {fullPanchang[activeTab].details}
            </p>

            {activeTab === 4 && (
              <div className="dress-box">
                <b>Traditional Attire Recommended</b>
                <br />
                Ladies: Traditional Saree (Laal Paar / White &amp; Red) &nbsp;|&nbsp; Gents: Kurta Pyjama / Dhoti
              </div>
            )}

            <div className="action-group">
              <a
                href={getGoogleCalendarUrl(
                  fullPanchang[activeTab].calendarTitle,
                  fullPanchang[activeTab].calendarDetails,
                  'Railway Officers Club, Howrah',
                  fullPanchang[activeTab].calendarStart,
                  fullPanchang[activeTab].calendarEnd
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                📅 Add {fullPanchang[activeTab].dayName} to Google Calendar
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Personalized Invitation & Shubho Sharadiya Greetings */}
      <section className="section-wrapper">
        <div className="greeting-card-generator">
          <p className="kicker-label">PERSONALIZED BLESSINGS</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'var(--maroon)', margin: '8px 0' }}>
            Share Shubho Sharadiya Wishes
          </h2>
          <p style={{ fontSize: 14, color: 'var(--maroon-rich)' }}>
            Personalize this sacred invitation with your family name to invite friends and relatives!
          </p>

          <input
            type="text"
            className="greeting-input"
            placeholder="e.g. Mukherjee Family / Rohan & Sreya"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />

          <div style={{ background: '#fff8f2', border: '1px dashed var(--gold-warm)', padding: 16, borderRadius: 12, marginBottom: 20, textAlign: 'left' }}>
            <p style={{ fontSize: 13, color: 'var(--maroon)', fontWeight: 700, marginBottom: 4 }}>
              Preview Invitation Message:
            </p>
            <p style={{ fontSize: 13, color: '#3f1a23', whiteSpace: 'pre-line', lineHeight: 1.45 }}>
              {getShareText()}
            </p>
          </div>

          <div className="action-group">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(getShareText())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
              style={{ background: '#25D366', borderColor: '#25D366' }}
            >
              💬 Share on WhatsApp
            </a>
            <button className="action-btn" onClick={handleCopyGreeting}>
              {customMsgCopied ? '✓ Copied to Clipboard!' : '📋 Copy Invitation'}
            </button>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="section-wrapper" style={{ paddingBottom: 100 }}>
        <LotusPetalIcon />
        <p className="kicker-label" style={{ marginTop: 12 }}>MAA’S BLESSINGS · OUR TOGETHERNESS</p>
        <h2 style={{ fontFamily: 'Noto Serif Devanagari', color: 'var(--maroon)', fontSize: 'clamp(26px, 6vw, 42px)', lineHeight: 1.5, margin: '14px 0' }}>
          आइए, माँ के चरणों में
          <br />
          <em style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', display: 'block' }}>
            এক সাথে আনন্দ ও মিলনের উৎসব উদযাপন করি।
          </em>
        </h2>
        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(20px, 4.5vw, 26px)', color: 'var(--maroon-rich)', fontStyle: 'italic' }}>
          We warmly anticipate your auspicious presence to celebrate together!
        </p>

        <div className="programme-rule" />

        <p className="kicker-label" style={{ marginBottom: 4 }}>
          Warm Regards &amp; Shubho Sharadiya
        </p>
        <strong style={{ fontFamily: 'Cormorant Garamond', letterSpacing: '0.15em', color: 'var(--maroon)', fontSize: 20 }}>
          RAILWAY OFFICERS’ CLUB, HOWRAH
        </strong>

        <div className="action-group" style={{ marginTop: 28 }}>
          <a
            href="https://maps.google.com/?q=Railway+Officers+Club+Howrah"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn primary"
          >
            📍 Venue Location: Railway Officers’ Club, Howrah
          </a>
        </div>
      </section>

      {/* Floating Audio Controls Pill */}
      {entered && (
        <div className="music-pill">
          {music && (
            <div className="audio-wave">
              <span />
              <span />
              <span />
            </div>
          )}

          <select
            value={soundMode}
            onChange={(e) => setSoundMode(e.target.value as 'tanpura' | 'dhak' | 'shankh')}
            aria-label="Select devotional audio mode"
          >
            <option value="tanpura">🎶 Tanpura &amp; Bell</option>
            <option value="dhak">🥁 Bengali Dhak Rhythm</option>
            <option value="shankh">🐚 Shankha Conch Sound</option>
          </select>

          <button onClick={() => setMusic(!music)} aria-label="Toggle background audio">
            {music ? 'Pause' : 'Play Sound'}
          </button>
        </div>
      )}
    </main>
  );
}
