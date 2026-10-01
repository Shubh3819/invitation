'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Event Data
const events = [
  {
    eyebrow: 'SAPTAMI',
    title: 'Bhajan Sandhya & Dandiya',
    date: 'Sunday, 18.10.2026 at 7:30 pm',
    venue: 'at Riviera',
    extra: 'Followed by Dinner',
    icon: '✧',
    calendarTitle: 'Bhajan Sandhya & Dandiya - Colvin Court Durga Puja',
    calendarDetails: 'Bhajan Sandhya & Dandiya at Riviera, followed by Dinner.',
    calendarStart: '20261018T140000Z',
    calendarEnd: '20261018T173000Z',
  },
  {
    eyebrow: 'DASHAMI & SINDUR KHELA',
    title: 'A Celebration of Togetherness',
    date: 'Wednesday, 21.10.2026 at 10:30 am at Colvin Court',
    venue: 'Cultural Programme at 12:30 pm',
    extra: 'Followed by Lunch at RIVIERA',
    icon: '✺',
    calendarTitle: 'Dashami & Sindur Khela - Colvin Court Durga Puja',
    calendarDetails: 'Sindur Khela at Colvin Court (10:30 am), Cultural Programme (12:30 pm), followed by cdLunch at Riviera.',
    calendarStart: '20261021T050000Z',
    calendarEnd: '20261021T093000Z',
  }
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

// Decorative Lotus Component
function Lotus({ small = false }: { small?: boolean }) {
  return (
    <div className={`lotus ${small ? 'small' : ''}`} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  );
}

// Vector SVG Durga Eye Motif
function DurgaEye() {
  return (
    <svg viewBox="0 0 200 110" className="durga-eye-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Curved Eyebrows */}
      <path d="M 20 40 Q 60 12 100 28 Q 140 12 180 40" stroke="#661f32" strokeWidth="6" strokeLinecap="round" fill="none" />
      
      {/* Top Eye Contours */}
      <path d="M 15 52 Q 60 30 100 48 Q 140 30 185 52" stroke="#661f32" strokeWidth="3" fill="none" />
      <path d="M 15 52 Q 60 74 100 56 Q 140 74 185 52" stroke="#661f32" strokeWidth="3" fill="none" />
      
      {/* Main Pupil Base */}
      <circle cx="100" cy="52" r="16" fill="#4c1528" />
      <circle cx="100" cy="52" r="10" fill="#d4af37" />
      <circle cx="100" cy="52" r="5" fill="#160a10" />
      <circle cx="98" cy="49" r="2" fill="#ffffff" />
      
      {/* Third Eye (Trinetra) & Tilak */}
      <path d="M 100 8 Q 106 20 100 26 Q 94 20 100 8 Z" fill="#cf6f76" stroke="#661f32" strokeWidth="1" />
      <circle cx="100" cy="17" r="2.5" fill="#d4af37" />
      
      {/* Decorative Dots */}
      <circle cx="85" cy="24" r="1.5" fill="#d4af37" />
      <circle cx="115" cy="24" r="1.5" fill="#d4af37" />
      <circle cx="70" cy="30" r="1.5" fill="#d4af37" />
      <circle cx="130" cy="30" r="1.5" fill="#d4af37" />
    </svg>
  );
}

// Vector SVG Trishul Motif
function Trishul() {
  return (
    <svg viewBox="0 0 60 90" className="trishul-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 5 L 30 85" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
      {/* Center Spear */}
      <path d="M 30 5 L 36 20 L 24 20 Z" fill="#d4af37" />
      {/* Left Prongs */}
      <path d="M 30 38 C 12 35 10 18 10 15 L 14 15 C 15 25 24 28 30 28" fill="#d4af37" stroke="#d4af37" strokeWidth="1" />
      <path d="M 10 15 L 14 20 L 7 20 Z" fill="#d4af37" />
      {/* Right Prongs */}
      <path d="M 30 38 C 48 35 50 18 50 15 L 46 15 C 45 25 36 28 30 28" fill="#d4af37" stroke="#d4af37" strokeWidth="1" />
      <path d="M 50 15 L 46 20 L 53 20 Z" fill="#d4af37" />
      {/* Base Ornament */}
      <circle cx="30" cy="42" r="4" fill="#661f32" stroke="#d4af37" strokeWidth="2" />
    </svg>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [music, setMusic] = useState(false);
  const { scrollYProgress } = useScroll();
  const glow = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75, 1], [0.25, 0.55, 0.35, 0.45, 0.2]);

  // Audio Context Ref for ambient sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Start Ambient Tanpura Synth Sound
  const startAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop existing oscillators if any
      stopAudio();

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Base Tanpura Drone Frequencies (C#3 = 138.59Hz, G#3 = 207.65Hz, C#4 = 277.18Hz)
      const freqs = [138.59, 207.65, 277.18, 554.37];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle LFO modulation for warm organic drone
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1;
        lfoGain.gain.value = 2;
        lfo.connect(osc.frequency);
        lfo.start();

        const baseGain = idx === 0 ? 0.08 : 0.04 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(baseGain, now + 3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorsRef.current.push(osc, lfo);
      });
    } catch {
      // Audio playback fallback gracefully if restricted
    }
  };

  const stopAudio = () => {
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

  useEffect(() => {
    if (music) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => {
      stopAudio();
    };
  }, [music]);

  useEffect(() => {
    document.body.classList.toggle('locked', !entered);
    return () => document.body.classList.remove('locked');
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
    setMusic(true);
  };

  return (
    <main>
      {/* Falling Flower Petals Animation */}
      <div className="petals-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${(i * 8.5 + 3) % 95}%`,
              animationDuration: `${7 + (i % 5) * 2.5}s`,
              animationDelay: `${(i % 4) * 1.5}s`,
              width: `${10 + (i % 3) * 4}px`,
              height: `${14 + (i % 3) * 5}px`,
            }}
          />
        ))}
      </div>

      {/* Entrance Gate Overlay */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="gate-orbit" />
            <Lotus />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="tiny"
            >
              RAILWAY OFFICERS’ CLUB · HOWRAH
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <span>शुभ</span> आरम्भ
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="gate-sub"
            >
              Colvin Court Sarbojanin Durga Puja · 2026
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 }}
              onClick={handleEnter}
            >
              TAP TO ENTER <span>↗</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 1.6 }}
              className="sound"
            >
              ♪ Sound on for the ambient experience
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero">
        <motion.div className="ambient" style={{ opacity: glow }} />
        <div className="frame">
          <div className="top-ornament">✧</div>

          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={entered ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <DurgaEye />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <Trishul />
          </motion.div>

          <div className="hero-copy">
            <p>WITH THE BLESSINGS OF THE DIVINE MOTHER</p>
            <h2>
              COLVIN COURT
              <br />
              <em>Sarbojanin Durga Puja</em>
            </h2>
            <span>2026</span>
          </div>

          <Lotus small />
        </div>

        <div className="scroll-hint">
          SCROLL TO EXPERIENCE <span>↓</span>
        </div>
      </section>

      {/* Mantra Section */}
      <section className="mantra section">
        <div className="petal-field" />
        <p className="kicker">THE DIVINE MOTHER</p>
        <h2>
          या देवी सर्वभूतेषु
          <br />
          <em>शक्ति-रूपेण संस्थिता।</em>
        </h2>
        <p className="mantra2">नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥</p>
        <Lotus small />
      </section>

      {/* Main Programme Section */}
      <section className="programme section">
        <div className="arch-om">ॐ</div>
        <p className="kicker">PROGRAMME OF</p>
        <h2>SHRI SHRI DURGA PUJA</h2>
        <p className="at">at</p>
        <h3>COLVIN COURT — 2026</h3>
        <div className="rule" />

        <p className="kicker">INAUGURATION OF</p>
        <p className="script">Colvin Court Sarbojanin Durga Puja, Howrah</p>

        <p className="by">
          by <strong>Ms Gitika Pandey</strong>
          <span>(PRESIDENT / ERWWO)</span>
        </p>

        <p className="date">Thursday, 15.10.2026 · 4:45 pm</p>
        <p className="follow">followed by Cultural Programme &amp; High Tea at Colvin Court.</p>

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
            className="action-btn"
          >
            📅 Save Inauguration Date
          </a>
          <a
            href="https://maps.google.com/?q=Railway+Officers+Club+Howrah"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
          >
            📍 Get Directions
          </a>
        </div>
      </section>

      {/* Event Cards Section */}
      {events.map((e, i) => (
        <section className={`event section event-${i}`} key={e.eyebrow}>
          <div className="event-mark">{e.icon}</div>
          <p className="kicker">{e.eyebrow}</p>
          <h2>{e.title}</h2>
          <p className="date">{e.date}</p>
          <p className="script">{e.venue}</p>
          <p className="follow">{e.extra}</p>

          {i === 1 && (
            <div className="dress">
              <b>Dress Code</b>
              <br />
              Ladies: Saree (Laal Paar) &nbsp;|&nbsp; Gents: Kurta Pyjama
            </div>
          )}

          <div className="action-group">
            <a
              href={getGoogleCalendarUrl(
                e.calendarTitle,
                e.calendarDetails,
                'Railway Officers Club, Howrah',
                e.calendarStart,
                e.calendarEnd
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn"
            >
              📅 Add {e.eyebrow} to Calendar
            </a>
          </div>
        </section>
      ))}

      {/* Closing Section */}
      <section className="closing section">
        <Lotus />
        <p className="kicker">MAA’S BLESSINGS · OUR TOGETHERNESS</p>
        <h2>
          आइए, माँ के आशीर्वाद में
          <br />
          <em>एक साथ उत्सव मनाएं।</em>
        </h2>
        <p className="close-en">We look forward to welcoming you and celebrating together!</p>
        <div className="rule" />
        <p className="kicker" style={{ marginBottom: 4 }}>
          Warm regards
        </p>
        <strong>RAILWAY OFFICERS’ CLUB, HOWRAH</strong>

        <div className="action-group" style={{ marginTop: 32 }}>
          <a
            href="https://maps.google.com/?q=Railway+Officers+Club+Howrah"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            style={{ background: 'var(--maroon)', color: '#fff' }}
          >
            📍 Location: Railway Officers’ Club, Howrah
          </a>
        </div>
      </section>

      {/* Music Toggle Pill */}
      {entered && (
        <div className="music-pill">
          {music && (
            <div className="audio-wave">
              <span />
              <span />
              <span />
            </div>
          )}
          <span>{music ? '♫ Ambient Music' : '🔇 Muted'}</span>
          <button onClick={() => setMusic(!music)} aria-label="Toggle background music">
            {music ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </main>
  );
}
