window.SorceryIcons = {

  /* ============================================
     LOGO MONOGRAM — circular crest with stylized
     dragon serpent coiled into "S" shape
     ============================================ */
  logo: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="32" cy="32" r="29" stroke-width="2"/>
    <circle cx="32" cy="32" r="24.5" stroke-opacity="0.35" stroke-width="0.8"/>
    <path d="M22 23 Q22 17, 28 17 Q42 17, 42 25 Q42 31, 32 31 Q22 31, 22 38 Q22 47, 36 47 Q43 47, 43 42"/>
    <circle cx="42" cy="22" r="1.2" fill="currentColor"/>
    <path d="M42 25 q -2.5 -2, -5 -1.5 M42 25 q 1.5 1, 3 0"/>
    <circle cx="32" cy="6" r="0.9" fill="currentColor"/>
    <circle cx="32" cy="58" r="0.9" fill="currentColor"/>
  </svg>`,

  /* ============================================
     HERO WATERMARK — long Eastern dragon serpent,
     S-curve flowing horizontally, scales + clouds
     ============================================ */
  dragonWatermark: `<svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Body main S-curve -->
    <path d="M40 200 Q120 90, 230 150 T440 200 Q540 220, 620 150 T780 170" stroke-width="3"/>
    <!-- Body undertone (parallel) -->
    <path d="M40 220 Q120 110, 230 170 T440 220 Q540 240, 620 170 T780 190" stroke-opacity="0.45"/>
    <!-- Spine scales along top -->
    <path d="M125 145 q5 -9 10 0 M165 125 q5 -9 10 0 M205 122 q5 -9 10 0 M245 128 q5 -9 10 0 M285 145 q5 -9 10 0 M325 168 q5 -9 10 0 M365 185 q5 -9 10 0 M405 195 q5 -9 10 0 M445 198 q5 -9 10 0 M485 195 q5 -9 10 0 M525 188 q5 -9 10 0 M565 170 q5 -9 10 0 M605 150 q5 -9 10 0 M645 145 q5 -9 10 0"/>
    <!-- Belly arcs along bottom -->
    <path d="M120 240 q15 8 30 0 M170 245 q15 8 30 0 M225 240 q15 8 30 0 M280 235 q15 8 30 0 M335 235 q15 8 30 0 M395 240 q15 8 30 0 M455 245 q15 8 30 0 M515 235 q15 8 30 0 M575 215 q15 8 30 0 M630 205 q15 8 30 0" stroke-opacity="0.6" stroke-width="1.2"/>
    <!-- Head at left -->
    <path d="M40 200 q -12 -8, -22 -4 q 6 4, 6 12 q -6 0, -10 6 q 6 0, 12 4 q -4 6, 2 11" stroke-width="2.5"/>
    <circle cx="32" cy="195" r="2.2" fill="currentColor"/>
    <!-- Whiskers -->
    <path d="M22 200 q -16 -6, -22 4 M22 212 q -14 6, -22 0"/>
    <!-- Horns -->
    <path d="M28 188 q -3 -10, 4 -16 M40 184 q 0 -10, 8 -14"/>
    <!-- Tail flame at right -->
    <path d="M780 170 q 12 -8, 18 -2 q -6 6, 0 12 q -10 -2, -12 4"/>
    <path d="M775 188 q 14 6, 22 0 q -6 6, 2 11"/>
    <!-- Cloud accents -->
    <path d="M150 70 q 10 -10, 20 0 q 5 -8, 15 -3 q 5 -5, 12 0 q 3 -3, 8 0" stroke-opacity="0.4" stroke-width="1.4"/>
    <path d="M580 80 q 10 -10, 20 0 q 5 -8, 15 -3 q 4 -3, 8 0" stroke-opacity="0.4" stroke-width="1.4"/>
    <path d="M340 310 q 10 -10, 20 0 q 5 -8, 15 -3 q 4 -3, 8 0 q 3 -2, 6 1" stroke-opacity="0.4" stroke-width="1.4"/>
    <path d="M50 320 q 10 -10, 20 0 q 4 -3, 8 0" stroke-opacity="0.35" stroke-width="1.4"/>
    <!-- Pearl (oriental dragon often chases pearl) -->
    <circle cx="50" cy="60" r="6" stroke-opacity="0.4"/>
    <circle cx="50" cy="60" r="3" stroke-opacity="0.25" fill="currentColor" fill-opacity="0.15"/>
  </svg>`,

  /* ============================================
     SECTION SEAL — circular medallion divider
     ============================================ */
  seal: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="50" cy="50" r="46" stroke-width="1"/>
    <circle cx="50" cy="50" r="40" stroke-width="0.5" stroke-opacity="0.4"/>
    <path d="M30 38 Q30 28, 40 28 Q58 28, 58 38 Q58 47, 50 49 Q40 51, 40 60 Q40 70, 58 70 Q66 70, 68 65" stroke-width="1.5"/>
    <circle cx="58" cy="34" r="1.1" fill="currentColor"/>
    <path d="M58 37 q -2 -1, -4 -1"/>
    <circle cx="50" cy="10" r="1.3" fill="currentColor"/>
    <circle cx="50" cy="90" r="1.3" fill="currentColor"/>
    <circle cx="10" cy="50" r="1.3" fill="currentColor"/>
    <circle cx="90" cy="50" r="1.3" fill="currentColor"/>
    <path d="M22 22 l3 3 M75 22 l3 3 M22 78 l3 -3 M75 78 l3 -3" stroke-opacity="0.5"/>
  </svg>`,

  /* ============================================
     FOOTER CREST — elaborate full crest
     ============================================ */
  crest: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="60" cy="60" r="56" stroke-width="1"/>
    <circle cx="60" cy="60" r="48" stroke-width="0.5" stroke-opacity="0.35"/>
    <path d="M35 48 Q35 33, 50 33 Q70 33, 70 48 Q70 60, 60 62 Q48 64, 48 74 Q48 86, 65 86 Q76 86, 80 80" stroke-width="1.5"/>
    <circle cx="70" cy="42" r="1.6" fill="currentColor"/>
    <path d="M70 46 q -3 -2, -6 -1 M70 46 q 1 3, 4 4"/>
    <path d="M64 36 q -1 -6, 3 -10 M72 38 q 2 -6, 7 -8"/>
    <path d="M40 14 q 20 -8, 40 0" stroke-width="0.8"/>
    <path d="M40 106 q 20 8, 40 0" stroke-width="0.8"/>
    <circle cx="50" cy="100" r="1" fill="currentColor"/>
    <circle cx="60" cy="102" r="1" fill="currentColor"/>
    <circle cx="70" cy="100" r="1" fill="currentColor"/>
    <path d="M14 60 l4 0 M102 60 l4 0" stroke-width="1"/>
  </svg>`,

  /* ============================================
     VALUE PROP ICONS
     ============================================ */
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h4"/></svg>`,

  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,

  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>`,

  handshake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-2-2"/><path d="M14 14l-3-3"/><path d="M17 17l-3-3"/><path d="M9 12l-2 2-3-3 5-5 3 3 2-2 5 5-3 3"/><path d="M14 9l3-3 3 3-3 3"/></svg>`,

  press: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a2 2 0 0 1 2-2h11l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,

  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
};
