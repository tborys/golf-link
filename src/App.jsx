import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ───
const theme = {
  bg: "#FAF9F7",
  card: "#FFFFFF",
  border: "#E8E4DF",
  text: "#1A1A1A",
  textSecondary: "#6B6560",
  textMuted: "#9E9891",
  green: "#2D5A3D",
  greenLight: "#3A7250",
  greenPale: "#E8F0EB",
  greenDark: "#1E3D29",
  gold: "#B8963E",
  goldPale: "#FBF5E8",
  goldDark: "#8A6F2E",
  cream: "#F5F2ED",
  charcoal: "#2C2C2C",
  danger: "#C0392B",
  white: "#FFFFFF",
};

// ─── ICON COMPONENTS ───
const Icon = ({ name, size = 20, color = theme.textSecondary }) => {
  const icons = {
    home: <><path d="M3 12l9-9 9 9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    search: <><circle cx="11" cy="11" r="8" fill="none" stroke={color} strokeWidth="2"/><path d="M21 21l-4.35-4.35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    heartFill: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={color} stroke={color} strokeWidth="2"/>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeWidth="2"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="4" y1="22" x2="4" y2="15" stroke={color} strokeWidth="2"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    starFill: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke={color} strokeWidth="2"/>,
    check: <polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="10" r="3" fill="none" stroke={color} strokeWidth="2"/></>,
    camera: <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="13" r="4" fill="none" stroke={color} strokeWidth="2"/></>,
    award: <><circle cx="12" cy="8" r="7" fill="none" stroke={color} strokeWidth="2"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill="none" stroke={color} strokeWidth="2"/></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    settings: <><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke={color} strokeWidth="2"/></>,
    compass: <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" stroke={color} strokeWidth="2"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" fill="none" stroke={color} strokeWidth="2"/><circle cx="9" cy="7" r="4" fill="none" stroke={color} strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87" fill="none" stroke={color} strokeWidth="2"/><path d="M16 3.13a4 4 0 010 7.75" fill="none" stroke={color} strokeWidth="2"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke={color} strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke={color} strokeWidth="2"/></>,
    globe: <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2"/><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={color} strokeWidth="2"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 010-5H6" fill="none" stroke={color} strokeWidth="2"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18" fill="none" stroke={color} strokeWidth="2"/><path d="M4 22h16" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22h10c0-2-0.85-3.25-2.03-3.79A1.07 1.07 0 0114 17v-2.34" fill="none" stroke={color} strokeWidth="2"/><path d="M18 2H6v7a6 6 0 0012 0V2z" fill="none" stroke={color} strokeWidth="2"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{icons[name]}</svg>;
};

// ─── MOCK DATA ───
const COURSES = [
  { id: 1, name: "Wentworth Club", location: "Virginia Water, Surrey", par: 72, rating: 4.8 },
  { id: 2, name: "Sunningdale Golf Club", location: "Sunningdale, Berkshire", par: 70, rating: 4.7 },
  { id: 3, name: "The Belfry", location: "Sutton Coldfield, Warwickshire", par: 72, rating: 4.6 },
  { id: 4, name: "St Andrews Old Course", location: "St Andrews, Fife", par: 72, rating: 4.9 },
  { id: 5, name: "Royal Birkdale", location: "Southport, Merseyside", par: 70, rating: 4.8 },
  { id: 6, name: "Gleneagles", location: "Auchterarder, Perthshire", par: 72, rating: 4.7 },
  { id: 7, name: "Celtic Manor", location: "Newport, Wales", par: 71, rating: 4.5 },
  { id: 8, name: "Turnberry", location: "Ayrshire, Scotland", par: 70, rating: 4.8 },
  { id: 9, name: "Royal Troon", location: "Troon, Ayrshire", par: 71, rating: 4.7 },
  { id: 10, name: "Carnoustie", location: "Angus, Scotland", par: 72, rating: 4.6 },
];

const INTEGRATION_PROVIDERS = [
  { id: "england_golf", name: "England Golf", status: "connected", lastSync: "2 hours ago", handicap: true },
  { id: "scottish_golf", name: "Scottish Golf", status: "available", lastSync: null, handicap: true },
  { id: "wales_golf", name: "Wales Golf", status: "available", lastSync: null, handicap: true },
  { id: "igolf", name: "iGolf", status: "connected", lastSync: "1 day ago", handicap: true },
  { id: "howdidido", name: "HowDidiDo", status: "available", lastSync: null, handicap: false },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
];

const GOLF_PHOTOS = [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1592919505780-303950717480?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1632435499152-18838be77960?w=600&h=400&fit=crop",
];

const USERS = [
  {
    id: 1, name: "James Whitfield", avatar: AVATARS[0], bio: "Low handicapper, weekend warrior. Member at Wentworth since 2018. Always happy to host visitors.",
    handicap: 4.2, level: "Low", homeClub: COURSES[0], coursesPlayed: [COURSES[0], COURSES[1], COURSES[3], COURSES[4], COURSES[5]],
    interests: ["Matchplay", "Links golf", "Course architecture", "Single malt"],
    availability: "Weekends, occasional Fridays", hosting: true, hostingCourses: [COURSES[0]],
    region: "Surrey", badges: ["Host Badge", "Course Explorer"], provider: "england_golf",
    recentRounds: [{ course: "Wentworth Club", score: 74, date: "28 Mar 2026" }, { course: "Sunningdale GC", score: 72, date: "21 Mar 2026" }],
    completeness: 95,
  },
  {
    id: 2, name: "Sophie Marchetti", avatar: AVATARS[1], bio: "Cat 1 golfer with an obsession for links courses. Building my Scottish bucket list one round at a time.",
    handicap: 6.8, level: "Low-Mid", homeClub: COURSES[3], coursesPlayed: [COURSES[3], COURSES[5], COURSES[7], COURSES[8], COURSES[9]],
    interests: ["Links golf", "Tournament play", "Photography", "Travel golf"],
    availability: "Flexible schedule", hosting: true, hostingCourses: [COURSES[3]],
    region: "Fife", badges: ["Host Badge"], provider: "scottish_golf",
    recentRounds: [{ course: "St Andrews Old", score: 79, date: "25 Mar 2026" }, { course: "Carnoustie", score: 82, date: "18 Mar 2026" }],
    completeness: 88,
  },
  {
    id: 3, name: "Marcus Chen", avatar: AVATARS[2], bio: "Tech founder by day, golfer every other chance I get. Working my way down from 12. Would love more playing partners in the Midlands.",
    handicap: 11.5, level: "Mid", homeClub: COURSES[2], coursesPlayed: [COURSES[2], COURSES[6], COURSES[0]],
    interests: ["Stroke play", "Golf tech", "Fitness", "Networking"],
    availability: "Weekday mornings, Sundays", hosting: true, hostingCourses: [COURSES[2]],
    region: "West Midlands", badges: [], provider: "igolf",
    recentRounds: [{ course: "The Belfry", score: 85, date: "30 Mar 2026" }],
    completeness: 72,
  },
  {
    id: 4, name: "Eleanor Voss", avatar: AVATARS[3], bio: "Club captain at Royal Birkdale. Passionate about growing women's golf and creating welcoming playing environments.",
    handicap: 8.1, level: "Low-Mid", homeClub: COURSES[4], coursesPlayed: [COURSES[4], COURSES[3], COURSES[7], COURSES[8]],
    interests: ["Women's golf", "Club governance", "Junior development", "Coastal links"],
    availability: "Tue/Thu/Sat", hosting: true, hostingCourses: [COURSES[4]],
    region: "Merseyside", badges: ["Host Badge", "Club Connector"], provider: "england_golf",
    recentRounds: [{ course: "Royal Birkdale", score: 80, date: "29 Mar 2026" }, { course: "Royal Troon", score: 83, date: "15 Mar 2026" }],
    completeness: 91,
  },
  {
    id: 5, name: "David Park", avatar: AVATARS[4], bio: "Semi-pro ambitions, currently grinding on the amateur circuit. Looking for quality practice rounds and serious playing partners.",
    handicap: 1.3, level: "Elite", homeClub: COURSES[1], coursesPlayed: [COURSES[0], COURSES[1], COURSES[3], COURSES[4], COURSES[5], COURSES[7], COURSES[8], COURSES[9]],
    interests: ["Tournament prep", "Course management", "Swing analysis", "Mental game"],
    availability: "Most days", hosting: false, hostingCourses: [],
    region: "Berkshire", badges: ["Course Explorer"], provider: "england_golf",
    recentRounds: [{ course: "Sunningdale GC", score: 68, date: "31 Mar 2026" }, { course: "Wentworth Club", score: 70, date: "27 Mar 2026" }],
    completeness: 85,
  },
  {
    id: 6, name: "Rhiannon Hughes", avatar: AVATARS[5], bio: "Member at Celtic Manor. Love hosting visitors from across the UK. Golf should be social first, competitive second.",
    handicap: 14.2, level: "Mid", homeClub: COURSES[6], coursesPlayed: [COURSES[6], COURSES[2], COURSES[4]],
    interests: ["Social golf", "Mixed groups", "Golf holidays", "Wine"],
    availability: "Weekends preferred", hosting: true, hostingCourses: [COURSES[6]],
    region: "South Wales", badges: ["Host Badge"], provider: "wales_golf",
    recentRounds: [{ course: "Celtic Manor", score: 90, date: "26 Mar 2026" }],
    completeness: 78,
  },
];

const CURRENT_USER = USERS[0];

const FEED_POSTS = [
  {
    id: 1, user: USERS[1], image: GOLF_PHOTOS[0], caption: "Sunrise round at the Old Course. The light on the 18th was something else this morning.", likes: 47, comments: [
      { user: USERS[3], text: "Stunning. St Andrews in the early morning is unbeatable." },
      { user: USERS[4], text: "Playing there next month. Cannot wait." },
    ], time: "3h ago", course: "St Andrews Old Course",
  },
  {
    id: 2, user: USERS[2], image: GOLF_PHOTOS[1], caption: "First time at the Brabazon course. Thanks to the GolfLink community for connecting me with a host. Brilliant day.", likes: 32, comments: [
      { user: USERS[0], text: "Glad it worked out. The Brabazon is a proper test." },
    ], time: "5h ago", course: "The Belfry (Brabazon)",
  },
  {
    id: 3, user: USERS[3], image: GOLF_PHOTOS[2], caption: "Running the junior open at Royal Birkdale today. 48 kids, perfect conditions. This is what golf should be about.", likes: 89, comments: [
      { user: USERS[5], text: "Amazing work Eleanor. Wish more clubs did this." },
      { user: USERS[1], text: "Wonderful initiative." },
    ], time: "8h ago", course: "Royal Birkdale",
  },
  {
    id: 4, user: USERS[4], image: GOLF_PHOTOS[3], caption: "68 at Sunningdale today. Course was in perfect shape. Putting finally clicked on the back nine.", likes: 124, comments: [
      { user: USERS[0], text: "Monster round. Those greens are not easy." },
      { user: USERS[2], text: "68 is ridiculous. What was the putt count?" },
    ], time: "1d ago", course: "Sunningdale GC",
  },
  {
    id: 5, user: USERS[5], image: GOLF_PHOTOS[4], caption: "Hosted two guests from London at Celtic Manor today. Both joined through GolfLink. Great company, great golf.", likes: 56, comments: [
      { user: USERS[2], text: "This is exactly what the app is for. Love it." },
    ], time: "1d ago", course: "Celtic Manor",
  },
];

const BADGES_ALL = [
  { id: "host", name: "Host Badge", desc: "Hosted 3+ guest rounds", icon: "shield", earned: true, color: theme.green },
  { id: "explorer", name: "Course Explorer", desc: "Played 10+ different courses", icon: "compass", earned: true, color: theme.gold },
  { id: "streak", name: "Guest Round Streak", desc: "3 guest rounds in 30 days", icon: "star", earned: false, color: theme.textMuted },
  { id: "improver", name: "Handicap Improver", desc: "Reduced handicap by 2+ in a season", icon: "trophy", earned: false, color: theme.textMuted },
  { id: "social", name: "Most Social Golfer", desc: "Connected with 20+ golfers", icon: "users", earned: false, color: theme.textMuted },
  { id: "connector", name: "Club Connector", desc: "Active in 3+ club communities", icon: "globe", earned: false, color: theme.textMuted },
];

const MATCHES = [
  { id: 1, user: USERS[1], matched: true, lastMessage: "Would love to play the Old Course. Are you available on the 12th?" },
  { id: 2, user: USERS[3], matched: true, lastMessage: "Great connecting! I can host at Royal Birkdale most Saturdays." },
];

// ─── STYLES ───
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-swing: cubic-bezier(0.34, 1.56, 0.64, 1);
}

body { font-family: var(--font-body); background: ${theme.bg}; color: ${theme.text}; -webkit-font-smoothing: antialiased; }

.app-container {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${theme.bg};
  position: relative;
  overflow-x: hidden;
}

@media (min-width: 768px) {
  .app-container { max-width: 430px; border-left: 1px solid ${theme.border}; border-right: 1px solid ${theme.border}; }
}

/* Animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes swingPulse { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(3deg); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes heartPop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
@keyframes slideLeft { from { opacity: 1; transform: translateX(0) rotate(0deg); } to { opacity: 0; transform: translateX(-120%) rotate(-12deg); } }
@keyframes slideRight { from { opacity: 1; transform: translateX(0) rotate(0deg); } to { opacity: 0; transform: translateX(120%) rotate(12deg); } }

.animate-fade-up { animation: fadeUp 0.5s var(--ease-out) forwards; }
.animate-fade-in { animation: fadeIn 0.3s ease forwards; }
.animate-slide-in { animation: slideIn 0.5s var(--ease-out) forwards; }
.animate-scale-in { animation: scaleIn 0.4s var(--ease-swing) forwards; }
.animate-heart { animation: heartPop 0.3s var(--ease-swing); }
.animate-swipe-left { animation: slideLeft 0.4s var(--ease-out) forwards; }
.animate-swipe-right { animation: slideRight 0.4s var(--ease-out) forwards; }

.stagger-1 { animation-delay: 0.05s; opacity: 0; }
.stagger-2 { animation-delay: 0.1s; opacity: 0; }
.stagger-3 { animation-delay: 0.15s; opacity: 0; }
.stagger-4 { animation-delay: 0.2s; opacity: 0; }
.stagger-5 { animation-delay: 0.25s; opacity: 0; }

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Badge shimmer */
.badge-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 3s ease infinite;
}

/* Swipe card */
.swipe-card {
  touch-action: pan-y;
  user-select: none;
  transition: transform 0.1s ease;
}

/* Nav pill */
.nav-pill {
  transition: all 0.3s var(--ease-out);
}
.nav-pill.active {
  color: ${theme.green};
}
.nav-pill.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: ${theme.green};
  border-radius: 50%;
}

/* Feed image */
.feed-img {
  transition: transform 0.3s ease;
}
.feed-img:hover { transform: scale(1.01); }

/* Button hover */
.btn-primary {
  background: ${theme.green};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}
.btn-primary:hover { background: ${theme.greenLight}; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(45,90,61,0.2); }

.btn-secondary {
  background: transparent;
  color: ${theme.green};
  border: 1.5px solid ${theme.green};
  padding: 11px 24px;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover { background: ${theme.greenPale}; }

.btn-ghost {
  background: transparent;
  color: ${theme.textSecondary};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-ghost:hover { background: ${theme.cream}; color: ${theme.text}; }

/* Card styles */
.card {
  background: ${theme.card};
  border-radius: 16px;
  border: 1px solid ${theme.border};
  overflow: hidden;
  transition: all 0.2s ease;
}
.card:hover { box-shadow: 0 2px 16px rgba(0,0,0,0.04); }

.card-elevated {
  background: ${theme.card};
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  overflow: hidden;
}

/* Mocked badge */
.mock-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: #FFF3CD;
  color: #856404;
  border: 1px solid #FFEAA7;
}

/* Tab bar */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  border-top: 1px solid ${theme.border};
  display: flex;
  justify-content: space-around;
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  z-index: 100;
}
`;

// ─── COMPONENTS ───

const Avatar = ({ src, size = 40, ring = false }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", overflow: "hidden",
    border: ring ? `2px solid ${theme.green}` : `1px solid ${theme.border}`,
    flexShrink: 0,
  }}>
    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = theme.cream; }} />
  </div>
);

const HandicapBadge = ({ value, size = "md" }) => {
  const sizes = { sm: { fs: 11, p: "2px 8px" }, md: { fs: 13, p: "4px 12px" }, lg: { fs: 15, p: "6px 16px" } };
  const s = sizes[size];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: theme.greenPale, color: theme.green, borderRadius: 8,
      padding: s.p, fontSize: s.fs, fontWeight: 600, letterSpacing: "0.02em",
    }}>
      HCP {value}
    </span>
  );
};

const MockedLabel = () => (
  <span className="mock-badge">Simulated</span>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: theme.text, lineHeight: 1.2 }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>{sub}</p>}
  </div>
);

// ─── LOGIN SCREEN ───
const LoginScreen = ({ onLogin }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: 32, background: `linear-gradient(175deg, ${theme.greenDark} 0%, ${theme.green} 40%, ${theme.greenLight} 100%)` }}>
      <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 40, fontFamily: "var(--font-display)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>
          GolfLink
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 8, fontWeight: 400, letterSpacing: "0.04em" }}>
          Connect. Play. Belong.
        </p>
      </div>
      <div className="animate-fade-up stagger-2" style={{ background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 16, fontWeight: 500 }}>Select a demo persona</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {USERS.slice(0, 4).map((u, i) => (
            <button key={u.id} onClick={() => setSelected(u.id)}
              className={`animate-fade-up stagger-${i + 2}`}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                background: selected === u.id ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                border: selected === u.id ? "1.5px solid rgba(255,255,255,0.5)" : "1.5px solid transparent",
                borderRadius: 14, cursor: "pointer", transition: "all 0.2s ease", textAlign: "left",
              }}>
              <Avatar src={u.avatar} size={36} />
              <div>
                <div style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{u.name}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>HCP {u.handicap} · {u.homeClub.name}</div>
              </div>
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => onLogin(selected || 1)}
          style={{ width: "100%", marginTop: 20, background: "white", color: theme.green, fontWeight: 700, padding: 14 }}>
          Enter Demo
        </button>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 12 }}>
          This is a proof of concept. No real authentication.
        </p>
      </div>
    </div>
  );
};

// ─── FEED SCREEN ───
const FeedScreen = ({ onProfile, onUserProfile }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const toggleLike = (postId) => {
    setLikedPosts(p => ({ ...p, [postId]: !p[postId] }));
  };
  const [expandedComments, setExpandedComments] = useState({});
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(250,249,247,0.92)", backdropFilter: "blur(16px)", zIndex: 50 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: theme.green, letterSpacing: "-0.02em" }}>GolfLink</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onProfile} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Avatar src={CURRENT_USER.avatar} size={32} ring /></button>
        </div>
      </div>

      {/* Stories/recent activity */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 12, padding: "8px 20px 16px", overflowX: "auto" }}>
        {USERS.filter(u => u.id !== CURRENT_USER.id).map((u, i) => (
          <button key={u.id} onClick={() => onUserProfile(u)} className={`animate-fade-up stagger-${i + 1}`}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", minWidth: 64 }}>
            <div style={{ padding: 2, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.green}, ${theme.gold})` }}>
              <div style={{ padding: 2, borderRadius: "50%", background: theme.bg }}>
                <Avatar src={u.avatar} size={48} />
              </div>
            </div>
            <span style={{ fontSize: 11, color: theme.textSecondary, maxWidth: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Posts */}
      {FEED_POSTS.map((post, i) => (
        <div key={post.id} className={`card animate-fade-up stagger-${Math.min(i + 1, 5)}`} style={{ margin: "0 16px 16px", borderRadius: 16 }}>
          {/* Post header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px" }}>
            <button onClick={() => onUserProfile(post.user)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Avatar src={post.user.avatar} size={36} />
            </button>
            <div style={{ flex: 1 }}>
              <button onClick={() => onUserProfile(post.user)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: theme.text }}>{post.user.name}</button>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{post.course} · {post.time}</div>
            </div>
            <HandicapBadge value={post.user.handicap} size="sm" />
          </div>
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={post.image} alt="" className="feed-img" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; e.target.parentNode.style.height = "280px"; e.target.parentNode.style.background = theme.cream; }} />
          </div>
          {/* Actions */}
          <div style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <button onClick={() => toggleLike(post.id)} className={likedPosts[post.id] ? "animate-heart" : ""}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: likedPosts[post.id] ? theme.danger : theme.textSecondary, fontWeight: 500, transition: "color 0.2s" }}>
                <Icon name={likedPosts[post.id] ? "heartFill" : "heart"} size={18} color={likedPosts[post.id] ? theme.danger : theme.textSecondary} />
                {post.likes + (likedPosts[post.id] ? 1 : 0)}
              </button>
              <button onClick={() => setExpandedComments(p => ({...p, [post.id]: !p[post.id]}))}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: theme.textSecondary, fontWeight: 500 }}>
                <Icon name="message" size={18} /> {post.comments.length}
              </button>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: theme.text }}>{post.caption}</p>
            {/* Comments */}
            {expandedComments[post.id] && post.comments.map((c, ci) => (
              <div key={ci} style={{ display: "flex", gap: 8, marginTop: 10, paddingTop: 10, borderTop: ci === 0 ? `1px solid ${theme.border}` : "none" }}>
                <Avatar src={c.user.avatar} size={24} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{c.user.name} </span>
                  <span style={{ fontSize: 13, color: theme.textSecondary }}>{c.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── DISCOVERY SCREEN ───
const DiscoveryScreen = ({ onUserProfile }) => {
  const discoverUsers = USERS.filter(u => u.id !== CURRENT_USER.id);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swiping, setSwiping] = useState(null); // "left" | "right" | null
  const [matchPopup, setMatchPopup] = useState(null);
  const [filters, setFilters] = useState({ hosting: false });

  const handleSwipe = (dir) => {
    setSwiping(dir);
    const current = filtered[currentIdx];
    setTimeout(() => {
      if (dir === "right" && current && (current.id === 2 || current.id === 4)) {
        setMatchPopup(current);
      }
      setSwiping(null);
      setCurrentIdx(p => p + 1);
    }, 400);
  };

  const filtered = discoverUsers.filter(u => !filters.hosting || u.hosting);
  const currentUser = filtered[currentIdx];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: theme.green }}>Discover</div>
        <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>Find your next playing partner</p>
      </div>

      {/* Filters */}
      <div className="no-scrollbar" style={{ display: "flex", gap: 8, padding: "8px 20px 16px", overflowX: "auto" }}>
        <button onClick={() => setFilters(f => ({ ...f, hosting: !f.hosting }))}
          style={{
            padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${filters.hosting ? theme.green : theme.border}`,
            background: filters.hosting ? theme.greenPale : "transparent",
            color: filters.hosting ? theme.green : theme.textSecondary,
            whiteSpace: "nowrap", transition: "all 0.2s",
          }}>
          <span style={{ marginRight: 4 }}>🏠</span> Hosts only
        </button>
        {["Low HCP", "Links lovers", "My region"].map(f => (
          <button key={f} style={{
            padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${theme.border}`, background: "transparent", color: theme.textSecondary,
            whiteSpace: "nowrap",
          }}>{f}</button>
        ))}
      </div>

      {/* Card */}
      <div style={{ padding: "0 20px", minHeight: 480 }}>
        {currentUser ? (
          <div className={`card-elevated animate-scale-in ${swiping === "left" ? "animate-swipe-left" : swiping === "right" ? "animate-swipe-right" : ""}`}
            key={currentUser.id} style={{ position: "relative" }}>
            <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
              <img src={currentUser.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => { e.target.parentNode.style.background = theme.cream; e.target.style.display = "none"; }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 20px 20px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 26, fontFamily: "var(--font-display)", fontWeight: 700, color: "white" }}>{currentUser.name}</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                  <HandicapBadge value={currentUser.handicap} size="sm" />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 8, backdropFilter: "blur(8px)" }}>{currentUser.region}</span>
                  {currentUser.hosting && (
                    <span style={{ fontSize: 12, color: theme.gold, background: "rgba(184,150,62,0.15)", padding: "3px 10px", borderRadius: 8, backdropFilter: "blur(8px)" }}>
                      Can host
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: theme.textSecondary, marginBottom: 12 }}>{currentUser.bio}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {currentUser.interests.slice(0, 4).map(i => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 600, color: theme.green, background: theme.greenPale, padding: "4px 10px", borderRadius: 8 }}>{i}</span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>
                <Icon name="mapPin" size={14} color={theme.textMuted} /> {currentUser.homeClub.name} · {currentUser.coursesPlayed.length} courses played
              </div>
            </div>
          </div>
        ) : (
          <div className="card animate-fade-in" style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⛳</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 6 }}>All caught up</p>
            <p style={{ fontSize: 13, color: theme.textMuted }}>Check back for new golfers in your area</p>
            <button className="btn-secondary" onClick={() => { setCurrentIdx(0); setFilters({ hosting: false }); }} style={{ marginTop: 16 }}>Start again</button>
          </div>
        )}
      </div>

      {/* Swipe buttons */}
      {currentUser && (
        <div style={{ display: "flex", justifyContent: "center", gap: 24, padding: "24px 20px" }}>
          <button onClick={() => handleSwipe("left")}
            style={{
              width: 56, height: 56, borderRadius: "50%", border: `2px solid ${theme.border}`, background: "white",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.2s",
            }}>
            <Icon name="x" size={24} color={theme.textMuted} />
          </button>
          <button onClick={() => onUserProfile(currentUser)}
            style={{
              width: 48, height: 48, borderRadius: "50%", border: `2px solid ${theme.border}`, background: "white",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.2s", alignSelf: "center",
            }}>
            <Icon name="user" size={20} color={theme.textSecondary} />
          </button>
          <button onClick={() => handleSwipe("right")}
            style={{
              width: 56, height: 56, borderRadius: "50%", border: `2px solid ${theme.green}`, background: theme.greenPale,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(45,90,61,0.12)", transition: "all 0.2s",
            }}>
            <Icon name="heart" size={24} color={theme.green} />
          </button>
        </div>
      )}

      {/* Match popup */}
      {matchPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}
          onClick={() => setMatchPopup(null)}>
          <div className="animate-scale-in" onClick={e => e.stopPropagation()}
            style={{ background: "white", borderRadius: 24, padding: 32, textAlign: "center", maxWidth: 340, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: -8, marginBottom: 16 }}>
              <Avatar src={CURRENT_USER.avatar} size={64} ring />
              <div style={{ marginLeft: -12 }}><Avatar src={matchPopup.avatar} size={64} ring /></div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: theme.green, marginBottom: 6 }}>It's a match!</h3>
            <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 20 }}>You and {matchPopup.name} both want to play</p>
            <button className="btn-primary" onClick={() => setMatchPopup(null)} style={{ width: "100%", marginBottom: 8 }}>View profile</button>
            <button className="btn-ghost" onClick={() => setMatchPopup(null)} style={{ width: "100%" }}>Keep browsing</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MATCHES / MESSAGES SCREEN ───
const MatchesScreen = ({ onUserProfile }) => (
  <div style={{ paddingBottom: 80 }}>
    <div style={{ padding: "16px 20px 8px" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: theme.green }}>Matches</div>
      <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>Your mutual connections</p>
    </div>
    <div style={{ padding: "8px 16px" }}>
      {MATCHES.map((m, i) => (
        <button key={m.id} onClick={() => onUserProfile(m.user)}
          className={`card animate-fade-up stagger-${i + 1}`}
          style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, marginBottom: 8, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${theme.border}`, borderRadius: 16, background: "white" }}>
          <Avatar src={m.user.avatar} size={48} ring />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{m.user.name}</span>
              <HandicapBadge value={m.user.handicap} size="sm" />
            </div>
            <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.lastMessage}</p>
          </div>
          <Icon name="chevronRight" size={18} color={theme.textMuted} />
        </button>
      ))}
      {/* Mocked messaging */}
      <div className="card animate-fade-up stagger-3" style={{ padding: 20, marginTop: 8, textAlign: "center", border: `1px dashed ${theme.border}` }}>
        <Icon name="message" size={28} color={theme.textMuted} />
        <p style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 8 }}>Messaging coming soon</p>
        <p style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>Matched golfers will be able to message directly. For now, matches unlock profiles and guest request flows.</p>
        <MockedLabel />
      </div>
    </div>

    {/* Guest/host flow preview */}
    <div style={{ padding: "20px 16px 0" }}>
      <SectionTitle sub="Request or offer guest rounds">Guest play</SectionTitle>
      <div className="card animate-fade-up stagger-4" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: theme.goldPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="flag" size={20} color={theme.gold} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Host request from Marcus Chen</p>
            <p style={{ fontSize: 12, color: theme.textMuted }}>Wants to play The Belfry · Apr 12, 2026</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" style={{ flex: 1, padding: 10, fontSize: 13 }}>Accept</button>
          <button className="btn-secondary" style={{ flex: 1, padding: 10, fontSize: 13 }}>Decline</button>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: theme.cream, borderRadius: 10 }}>
          <p style={{ fontSize: 11, color: theme.textMuted, textAlign: "center" }}>
            <MockedLabel /> Guest flow is simulated for this proof of concept
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── PROFILE SCREEN ───
const ProfileScreen = ({ user, isOwn = false, onBack }) => {
  const u = user || CURRENT_USER;
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ position: "relative" }}>
        <div style={{ height: 160, background: `linear-gradient(135deg, ${theme.greenDark}, ${theme.green})` }} />
        {onBack && (
          <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="chevronLeft" size={20} color="white" />
          </button>
        )}
        <div style={{ marginTop: -48, padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div style={{ borderRadius: "50%", border: "3px solid white", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
              <Avatar src={u.avatar} size={88} />
            </div>
            <div style={{ paddingBottom: 8, flex: 1 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>{u.name}</h1>
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                <HandicapBadge value={u.handicap} />
                <span style={{ fontSize: 12, color: theme.textSecondary, background: theme.cream, padding: "4px 10px", borderRadius: 8 }}>{u.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: theme.textSecondary }}>{u.bio}</p>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {u.interests.map(i => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: theme.green, background: theme.greenPale, padding: "4px 10px", borderRadius: 8 }}>{i}</span>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", padding: "0 20px 16px", gap: 8 }}>
        {[
          { label: "Home club", value: u.homeClub.name.split(" ").slice(0, 2).join(" ") },
          { label: "Courses", value: u.coursesPlayed.length },
          { label: "Available", value: u.availability.split(",")[0] },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, padding: "12px 10px", background: theme.cream, borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Hosting */}
      {u.hosting && (
        <div style={{ margin: "0 20px 16px", padding: 16, background: theme.goldPale, borderRadius: 14, border: `1px solid ${theme.gold}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Icon name="flag" size={16} color={theme.gold} />
            <span style={{ fontSize: 13, fontWeight: 700, color: theme.goldDark }}>Available to host</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {u.hostingCourses.map(c => (
              <span key={c.id} style={{ fontSize: 12, color: theme.goldDark, background: "rgba(184,150,62,0.12)", padding: "4px 10px", borderRadius: 8 }}>{c.name}</span>
            ))}
          </div>
          {!isOwn && (
            <button className="btn-primary" style={{ marginTop: 12, width: "100%", background: theme.gold, fontSize: 13, padding: 10 }}>Request guest round</button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${theme.border}`, margin: "0 20px", gap: 0 }}>
        {["overview", "courses", "badges", "sync"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: "10px 0", fontSize: 12, fontWeight: 600, textTransform: "capitalize",
              color: activeTab === tab ? theme.green : theme.textMuted,
              borderBottom: activeTab === tab ? `2px solid ${theme.green}` : "2px solid transparent",
              background: "none", border: "none", cursor: "pointer", transition: "all 0.2s",
            }}>{tab}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: 20 }}>
        {activeTab === "overview" && (
          <div className="animate-fade-in">
            <SectionTitle>Recent rounds</SectionTitle>
            {u.recentRounds.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < u.recentRounds.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.course}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{r.date}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)", color: theme.green }}>{r.score}</div>
              </div>
            ))}
            {/* Completeness */}
            {isOwn && (
              <div style={{ marginTop: 20, padding: 16, background: theme.cream, borderRadius: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Profile completeness</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.green }}>{u.completeness}%</span>
                </div>
                <div style={{ height: 6, background: theme.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${u.completeness}%`, background: `linear-gradient(90deg, ${theme.green}, ${theme.greenLight})`, borderRadius: 3, transition: "width 0.8s var(--ease-out)" }} />
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "courses" && (
          <div className="animate-fade-in">
            <SectionTitle sub={`${u.coursesPlayed.length} courses on record`}>Courses played</SectionTitle>
            {u.coursesPlayed.map((c, i) => (
              <div key={c.id} className={`animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: theme.greenPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="flag" size={18} color={theme.green} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{c.location}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="starFill" size={12} color={theme.gold} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>{c.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "badges" && (
          <div className="animate-fade-in">
            <SectionTitle sub="Earn badges through activity">Achievements</SectionTitle>
            {BADGES_ALL.map((b, i) => (
              <div key={b.id} className={`animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: 14, marginBottom: 8,
                  background: b.earned ? "white" : theme.cream, borderRadius: 14,
                  border: `1px solid ${b.earned ? theme.border : "transparent"}`,
                  opacity: b.earned ? 1 : 0.6,
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  background: b.earned ? `${b.color}15` : theme.border, position: "relative", overflow: "hidden",
                }}>
                  <Icon name={b.icon} size={22} color={b.earned ? b.color : theme.textMuted} />
                  {b.earned && <div className="badge-shimmer" style={{ position: "absolute", inset: 0 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: b.earned ? theme.text : theme.textMuted }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{b.desc}</div>
                </div>
                {b.earned ? (
                  <Icon name="check" size={18} color={theme.green} />
                ) : (
                  <Icon name="lock" size={16} color={theme.textMuted} />
                )}
              </div>
            ))}
            <div style={{ marginTop: 12, padding: 14, background: theme.cream, borderRadius: 14, textAlign: "center" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>More badges planned</p>
              <p style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Handicap Improver, Most Social Golfer, Guest Round Streak, Club Connector</p>
            </div>
          </div>
        )}
        {activeTab === "sync" && (
          <div className="animate-fade-in">
            <SectionTitle sub="Connect your golf identity">Handicap sync</SectionTitle>
            <div style={{ padding: 12, background: theme.cream, borderRadius: 12, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <MockedLabel />
              <span style={{ fontSize: 12, color: theme.textMuted }}>Integration data is simulated for this POC</span>
            </div>
            {INTEGRATION_PROVIDERS.map((p, i) => (
              <div key={p.id} className={`animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: 14, marginBottom: 8,
                  background: "white", borderRadius: 14, border: `1px solid ${theme.border}`,
                }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: p.status === "connected" ? theme.greenPale : theme.cream,
                }}>
                  <Icon name="link" size={18} color={p.status === "connected" ? theme.green : theme.textMuted} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>
                    {p.status === "connected" ? `Synced ${p.lastSync}` : "Not connected"}
                    {p.handicap && " · Handicap data"}
                  </div>
                </div>
                <button style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: p.status === "connected" ? theme.greenPale : "transparent",
                  color: p.status === "connected" ? theme.green : theme.textSecondary,
                  border: p.status === "connected" ? "none" : `1.5px solid ${theme.border}`,
                  cursor: "pointer",
                }}>
                  {p.status === "connected" ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community section */}
      {isOwn && (
        <div style={{ padding: "0 20px 20px" }}>
          <SectionTitle sub="Club and community features">Communities</SectionTitle>
          <div className="card" style={{ padding: 20, border: `1px dashed ${theme.border}`, textAlign: "center" }}>
            <Icon name="users" size={32} color={theme.textMuted} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginTop: 10 }}>Club communities</p>
            <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 6, lineHeight: 1.5 }}>
              Future feature: clubs can create branded communities, host events, enable member discovery and manage guest play at scale.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              {["Club pages", "Events", "Member directory", "Guest management"].map(f => (
                <span key={f} style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, background: theme.cream, padding: "4px 10px", borderRadius: 8 }}>{f}</span>
              ))}
            </div>
            <div style={{ marginTop: 14 }}><MockedLabel /></div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN APP ───
export default function GolfLinkApp() {
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("feed");
  const [viewingUser, setViewingUser] = useState(null);

  const handleLogin = (userId) => {
    setScreen("app");
    setTab("feed");
  };

  const openUserProfile = (user) => {
    setViewingUser(user);
    setScreen("userProfile");
  };

  const goBack = () => {
    setViewingUser(null);
    setScreen("app");
  };

  if (screen === "login") {
    return (
      <>
        <style>{css}</style>
        <div className="app-container">
          <LoginScreen onLogin={handleLogin} />
        </div>
      </>
    );
  }

  if (screen === "userProfile") {
    return (
      <>
        <style>{css}</style>
        <div className="app-container">
          <ProfileScreen user={viewingUser} onBack={goBack} />
        </div>
      </>
    );
  }

  const tabs = [
    { id: "feed", icon: "home", label: "Feed" },
    { id: "discover", icon: "compass", label: "Discover" },
    { id: "matches", icon: "heart", label: "Matches" },
    { id: "profile", icon: "user", label: "Profile" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app-container">
        {tab === "feed" && <FeedScreen onProfile={() => setTab("profile")} onUserProfile={openUserProfile} />}
        {tab === "discover" && <DiscoveryScreen onUserProfile={openUserProfile} />}
        {tab === "matches" && <MatchesScreen onUserProfile={openUserProfile} />}
        {tab === "profile" && <ProfileScreen isOwn onBack={null} />}

        <div className="tab-bar">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`nav-pill ${tab === t.id ? "active" : ""}`}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                background: "none", border: "none", cursor: "pointer", padding: "4px 16px",
                position: "relative",
              }}>
              <Icon name={t.icon} size={22} color={tab === t.id ? theme.green : theme.textMuted} />
              <span style={{ fontSize: 10, fontWeight: 600, color: tab === t.id ? theme.green : theme.textMuted }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
