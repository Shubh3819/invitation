"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    eyebrow: "INAUGURATION (PANCHAMI)",
    dayName: "Thursday, Oct 15",
    title: "Grand Inauguration & Cultural Programme",
    date: "Thursday, 15.10.2026 at 04:45 pm",
    venue: "at Colvin Court, Railway Officers’ Club, Howrah",
    extra:
      "Inaugurated by Ms Gitika Pandey (General Manager, Eastern Railway) followed by Cultural Programme & High Tea at Colvin Court.",
    icon: "🪔",
    details:
      "Auspicious Inauguration ceremony on sacred Panchami tithi by Ms Gitika Pandey (General Manager, Eastern Railway), followed by Cultural Programme & High Tea at Colvin Court.",
    calendarTitle: "Inauguration (Panchami) - Colvin Court Durga Puja 2026",
    calendarDetails:
      "Inaugurated by Ms Gitika Pandey (General Manager, Eastern Railway). Events: Inauguration Followed by Cultural Programme & High Tea at Colvin Court.",
    calendarStart: "20261015T111500Z",
    calendarEnd: "20261015T140000Z",
  },
  {
    eyebrow: "MAHASAPTAMI",
    dayName: "Sunday, Oct 18",
    title: "Bhajan Sandhya & Dandiya",
    date: "Sunday, 18.10.2026 at 7:30 pm",
    venue: "at Riviera, Railway Officers’ Club",
    extra: "Followed by Festive Dinner at Riviera",
    icon: "✧",
    details:
      "Nabapatrika Prabesh (Kola Bou Snan) at dawn, Mahasaptami Puja, and grand evening Bhajan Sandhya & Dandiya followed by Dinner at Riviera.",
    calendarTitle: "Saptami Bhajan Sandhya & Dandiya - Colvin Court Durga Puja",
    calendarDetails:
      "Bhajan Sandhya & Dandiya at 7:30 pm followed by Festive Dinner at Riviera.",
    calendarStart: "20261018T140000Z",
    calendarEnd: "20261018T173000Z",
  },

  {
    eyebrow: "DASHMI & SINDUR KHELA",
    dayName: "Wednesday, Oct 21",
    title: "Sindur Khela & Cultural Programme",
    date: "Wednesday, 21.10.2026 at 10:30 am",
    venue: "at Colvin Court (Lunch at Riviera)",
    extra:
      "To be graced by Ms. Gitika Pandey (President/ERWWO) · 12:30 pm Cultural Programme followed by Lunch at RIVIERA",
    icon: "✺",
    details:
      "Dashmi & sacred Sindur Khela at Colvin Court at 10:30 am, to be graced by Ms. Gitika Pandey (President/ERWWO). Followed by Cultural Programme at 12:30 pm and Lunch at RIVIERA.",
    calendarTitle: "Dashmi & Sindur Khela - Colvin Court Durga Puja",
    calendarDetails:
      "Sindur Khela at Colvin Court (10:30 am) graced by Ms Gitika Pandey (President/ERWWO), Cultural Programme at 12:30 pm, followed by Lunch at Riviera. Dress Code: Ladies: Saree (Laal Paar) | Gents: Kurta Pyjama.",
    calendarStart: "20261021T050000Z",
    calendarEnd: "20261021T093000Z",
  },
];

// Google Calendar URL Generator
function getGoogleCalendarUrl(
  title: string,
  details: string,
  location: string,
  start: string,
  end: string,
) {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: details,
    location: location,
    dates: `${start}/${end}`,
  });
  return `${baseUrl}?${params.toString()}`;
}

// Lotus Petal Icon Component
function LotusPetalIcon() {
  return (
    <svg
      viewBox="0 0 100 65"
      className="lotus-flower-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 50 5 C 40 25 35 48 50 60 C 65 48 60 25 50 5 Z"
        fill="#e67389"
        stroke="#d4af37"
        strokeWidth="1.2"
      />
      <path
        d="M 36 18 C 22 30 20 46 42 58 C 36 44 38 28 36 18 Z"
        fill="#f4b4be"
        stroke="#d4af37"
        strokeWidth="1"
      />
      <path
        d="M 64 18 C 78 30 80 46 58 58 C 64 44 62 28 64 18 Z"
        fill="#f4b4be"
        stroke="#d4af37"
        strokeWidth="1"
      />
      <path
        d="M 22 32 C 10 40 12 52 32 58 C 24 48 24 38 22 32 Z"
        fill="#ea9ea7"
        stroke="#d4af37"
        strokeWidth="1"
      />
      <path
        d="M 78 32 C 90 40 88 52 68 58 C 76 48 76 38 78 32 Z"
        fill="#ea9ea7"
        stroke="#d4af37"
        strokeWidth="1"
      />
      <circle cx="50" cy="58" r="3.5" fill="#d4af37" />
    </svg>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [music, setMusic] = useState(false);
  const [pushpanjaliCount, setPushpanjaliCount] = useState(108);
  const [showBlessing, setShowBlessing] = useState(false);

  // Audio Ref using the audio file in public/
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Enter Gate and play audio from start
  const handleEnter = () => {
    setEntered(true);
    setMusic(true);
    if (audioRef.current) {
      const el = audioRef.current;
      el.currentTime = 0;
      el.play().catch((err) => {
        console.warn("Autoplay error:", err);
      });
    }
  };

  // Toggle Music Play / Pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    const el = audioRef.current;
    if (music) {
      el.pause();
      setMusic(false);
    } else {
      el.play().catch(() => {});
      setMusic(true);
    }
  };

  // Pushpanjali Floral Offering Action
  const handlePushpanjali = () => {
    setPushpanjaliCount((prev) => prev + 1);
    setShowBlessing(true);
    setTimeout(() => setShowBlessing(false), 4500);
  };

  return (
    <main>
      {/* Background Audio Element from public folder (starts from 3s) */}
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop playsInline />

      {/* Falling Lotus, Hibiscus & Marigold Flower Petals */}
      <div className="petals-container">
        {Array.from({ length: 18 }).map((_, i) => {
          const petalTypes = ["lotus", "hibiscus", "marigold"];
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
              <small>
                Maa Durga’s divine blessings are bestowed upon you and your
                loved ones!
              </small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          LANDING GATE: Featuring the exact poster artwork with
          custom coded interactive button positioned seamlessly
          ========================================================= */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="landing-gate"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.85, ease: "easeInOut" },
            }}
          >
            <div className="landing-ambient-glow" />

            <motion.div
              className="poster-container"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* Cleaned Artwork without static button */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/durga_landing_clean.jpg"
                alt="Colvin Court Durga Puja Sharadotsav 2026 Poster"
                className="poster-image"
              />

              {/* Real Interactive Button */}
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
        <div className="hero-showcase-bg" />
        <div className="hero-showcase-overlay" />
        <div className="hero-content">
          <div className="temple-arch-motif">✧ ॐ ✧</div>
          <p className="kicker-label">RAILWAY OFFICERS’ CLUB · HOWRAH</p>

          <h1 className="hero-sharadotsav">शरदोत्सव</h1>

          <div className="hero-venue-heading">
            COLVIN COURT
            <em>Sarbojanin Durga Puja</em>
          </div>

          <div className="hero-year-badge">2026</div>

          <LotusPetalIcon />
        </div>
      </section>

      {/* Sacred Mantra Section */}
      <section
        className="section-wrapper"
        style={{ paddingTop: 30, paddingBottom: 12 }}
      >
        <motion.div
          className="arch-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: 8, marginBottom: 8 }}
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
            &ldquo;Sarva-mangala-mangalye Shive Sarvaartha-saadhike, Sharanye
            Tryambake Gauri Naaraayani Namo-stu Te.&rdquo;
          </p>
          <p className="shloka-meaning">
            Salutations to the Divine Mother Narayani, the embodiment of
            auspiciousness, the fulfiller of all pure desires, the eternal
            refuge of the universe.
          </p>
          <LotusPetalIcon />
        </motion.div>
      </section>

      {/* Virtual Pushpanjali Offering Ritual */}
      <section
        className="section-wrapper"
        style={{ paddingTop: 50, paddingBottom: 35 }}
      >
        <div className="pushpanjali-card">
          <p className="kicker-label">VIRTUAL DEVOTIONAL RITUAL</p>
          <h2
            style={{
              fontFamily: "Noto Serif Devanagari",
              color: "var(--maroon)",
              fontSize: 32,
              margin: "10px 0 6px",
            }}
          >
            माँ दुर्गा के चरणों में पुष्पांजलि
          </h2>
          <p
            style={{
              fontFamily: "Cormorant Garamond",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--maroon-rich)",
            }}
          >
            Offer fresh fragrant Hibiscus, Lotus petals, and Belpatra to Maa
            Durga.
          </p>

          <button
            className="offer-btn"
            onClick={handlePushpanjali}
            style={{ marginTop: "25px" }}
          >
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
          <p
            style={{
              fontFamily: "Cormorant Garamond",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--maroon-rich)",
            }}
          >
            at
          </p>
          <h3 className="programme-sub">COLVIN COURT — 2026</h3>
          <div className="programme-rule" />

          <p className="kicker-label">INAUGURATION (PANCHAMI)</p>
          <p className="programme-script">
            Colvin Court Sarbojanin Durga Puja, Howrah
          </p>

          <div className="by-honor">
            Inaugurated by <strong>Ms Gitika Pandey</strong>
            <span>(General Manager, Eastern Railway)</span>
          </div>

          <p className="event-date-text">Thursday, 15.10.2026 at 04:45 pm</p>
          <p className="event-follow-text">
            Events: Inauguration Followed by Cultural Programme &amp; High Tea
            at Colvin Court
          </p>

          <div className="action-group">
            <a
              href={getGoogleCalendarUrl(
                "Inauguration (Panchami) - Colvin Court Durga Puja 2026",
                "Inaugurated by Ms Gitika Pandey (General Manager, Eastern Railway). Events: Inauguration Followed by Cultural Programme & High Tea at Colvin Court.",
                "Railway Officers Club, Colvin Court, Howrah",
                "20261015T111500Z",
                "20261015T140000Z",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              📅 Save Inauguration Date
            </a>
            <a
              href="https://maps.app.goo.gl/HhW5qtDgqxCnPGJr6?g_st=ac"
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
        <h2
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "clamp(32px, 7vw, 46px)",
            color: "var(--maroon)",
            margin: "6px 0 10px",
          }}
        >
          Sacred Rituals &amp; Celebrations
        </h2>

        {/* All Panchang dates shown vertically in chronological order */}
        <div className="panchang-scroll-list">
          {fullPanchang.map((item) => (
            <motion.div
              key={item.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="arch-card"
              style={{ maxWidth: 580 }}
            >
              <div
                style={{
                  fontSize: 48,
                  color: "var(--gold-dark)",
                  marginBottom: 8,
                }}
              >
                {item.icon}
              </div>
              <p className="kicker-label">{item.eyebrow}</p>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: "clamp(28px, 6vw, 40px)",
                  color: "var(--maroon)",
                  margin: "8px 0",
                }}
              >
                {item.title}
              </h2>
              <p className="event-date-text">{item.date}</p>
              <p className="programme-script">{item.venue}</p>
              <p className="event-follow-text" style={{ marginTop: 6 }}>
                {item.extra}
              </p>

              <p
                style={{
                  fontSize: 14,
                  color: "#4a1924",
                  marginTop: 14,
                  lineHeight: 1.55,
                  fontWeight: 500,
                }}
              >
                {item.details}
              </p>

              {item.dayName.includes("Oct 21") && (
                <div className="dress-box">
                  <span className="dress-title">✨ DRESS CODE</span>
                  <p
                    style={{ margin: "6px 0 0", fontWeight: 600, fontSize: 15 }}
                  >
                    <strong>Ladies:</strong> Saree (Laal Paar) &nbsp;•&nbsp;{" "}
                    <strong>Gents:</strong> Kurta Pyjama
                  </p>
                </div>
              )}

              <div className="action-group">
                <a
                  href={getGoogleCalendarUrl(
                    item.calendarTitle,
                    item.calendarDetails,
                    "Railway Officers Club, Howrah",
                    item.calendarStart,
                    item.calendarEnd,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary"
                >
                  📅 Add {item.dayName} to Google Calendar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <section className="section-wrapper" style={{ paddingBottom: 100 }}>
        <LotusPetalIcon />
        <p className="kicker-label" style={{ marginTop: 12 }}>
          माँ का आशीर्वाद · हमारा मिलन
        </p>
        <h2
          style={{
            fontFamily: "Noto Serif Devanagari",
            color: "var(--maroon)",
            fontSize: "clamp(26px, 6vw, 42px)",
            lineHeight: 1.5,
            margin: "14px 0",
          }}
        >
          आइए, माँ के चरणों में
          <br />
          <span
            style={{
              display: "block",
              fontSize: "clamp(22px, 5.2vw, 36px)",
              fontWeight: 600,
              color: "var(--maroon-rich)",
              marginTop: 8,
            }}
          >
            एक साथ आनंद और मिलन का उत्सव मनाएं।
          </span>
        </h2>
        <p
          style={{
            fontFamily: "Noto Serif Devanagari",
            fontSize: "clamp(18px, 4.5vw, 24px)",
            color: "var(--maroon-rich)",
            margin: "10px 0",
          }}
        >
          आपकी गरिमामयी उपस्थिति हमारे इस पावन उत्सव की शोभा बढ़ाएगी!
        </p>

        <div className="programme-rule" />

        <p className="kicker-label" style={{ marginBottom: 4 }}>
          सादर प्रणाम एवं शारदीय शुभकामनाएं
        </p>
      </section>

      {/* Clean Floating Audio Controls Pill */}
      {entered && (
        <div className="music-pill">
          {music && (
            <div className="audio-wave">
              <span />
              <span />
              <span />
            </div>
          )}

          <span>{music ? "♫ Ambient Audio" : "🔇 Muted"}</span>

          <button onClick={toggleMusic} aria-label="Toggle background audio">
            {music ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </main>
  );
}
