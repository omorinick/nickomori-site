export type Priority = 'must' | 'plan' | 'flex' | 'skip' | 'fixed'
export type CalloutType = 'weather' | 'tip' | 'reserve' | 'eat' | 'good' | 'nap' | 'flag'

export interface Activity {
  id: string
  time?: string
  timeMinutes?: number
  name: string
  priority: Priority
  note?: string
}

export interface Callout {
  type: CalloutType
  content: string
}

export interface TripCard {
  id: string
  calendarDate: string
  date: string
  title: string
  subtitle: string
  city: 'tokyo' | 'hakone' | 'kyoto' | 'hiroshima' | 'transit'
  continuesFrom?: string
  activities: Activity[]
  callouts: Callout[]
}

export interface TravelSegment {
  id: string
  from: string
  to: string
  afterCardId: string
  rows: { label: string; value: string }[]
}

export interface TripData {
  id: string
  tripName: string
  dateRange: string
  cities: { name: string; nights: string }[]
  preTripItems: { type: 'reserve' | 'tip'; content: string }[]
  omakaseNote: string
  overallAssessment: string
  cards: TripCard[]
  travelSegments: TravelSegment[]
}

export const JAPAN_2026: TripData = {
  id: 'japan-2026',
  tripName: 'Japan Trip — April 2026',
  dateRange: 'Apr 19–30 · SFO → NRT/HND · 11 nights',
  cities: [
    { name: 'Tokyo', nights: '4n' },
    { name: 'Hakone', nights: '1n' },
    { name: 'Kyoto', nights: '4n' },
    { name: 'Hiroshima', nights: '1n' },
    { name: 'Tokyo', nights: '1n' },
  ],

  omakaseNote: "Short answer: Don't move the night — fix the booking issue. April 29 (Shōwa Day) is your only real dinner option in the second Tokyo leg since you fly Thursday at 6:15pm. \"Another night in Tokyo\" would require adding hotel nights, which isn't worth it just for this.\n\nThe holiday doesn't ruin the dining experience — it just tightens booking availability. The best path forward is two-track:\n\nTrack A (ideal): Book omakase for April 29 right now via omakase.in or tableall.com. Mid-range omakase (¥15–30k/person) will have better availability than Michelin 3-star. Your hotel concierge is also worth calling. It's 15 days out on a holiday — tight but not impossible.\n\nTrack B (backup): If you can't land a great omakase for Apr 29, make Monday Apr 27 in Kyoto your special dinner night instead. Kyoto kaiseki at a top restaurant is every bit as memorable as Tokyo omakase — and easier to book further in advance. Then do a great (but less precious) sushi counter or yakitori dinner in Tokyo on Apr 29.\n\nEither way, a fine-dining dinner in Japan is worth planning around — just don't let it be the thing that slips through the cracks.",

  overallAssessment: "Pacing: Well-calibrated for a family with a young child. The built-in midday breaks on the early-start days (Sat/Mon) are exactly right. Don't cut them for more sightseeing.\n\nBest nap structure: Sat and Mon hotel naps (after 6am starts) are the most important — they make the afternoons possible. Everything else is stroller or train naps that lose you nothing.\n\nStrongest days: Tue (Harajuku/Shibuya flow), Sat (Fushimi Inari dawn + Higashiyama), Mon (Arashiyama early). These are genuinely well-built.\n\nMain gap: Kiyomizu-dera is missing from Saturday — add it. It's in the exact area you're visiting and is unmissable.\n\nOmakase: Book April 29 now. If it falls through, move the special dinner to Monday Apr 27 Kyoto kaiseki instead.\n\nThis plan is realistic and right-sized for a family trip. The biggest thing it needs is a few reservations locked down — not agenda changes.",

  preTripItems: [
    { type: 'reserve', content: 'Omakase dinner: Book via omakase.in or tableall.com NOW. Or contact hotel concierge. Have a Kyoto kaiseki backup on Mon Apr 27.' },
    { type: 'reserve', content: 'Hiroshima Peace Museum: Pre-book timed entry via Klook. Aim for morning (7:30–8:30am) or evening (5:30pm+) reserved slots — midday is very crowded.' },
    { type: 'tip', content: 'JR Pass: Hakone→Kyoto + Kyoto→Hiroshima + Hiroshima→Tokyo Shinkansen. A 14-day pass for 2 adults likely pays for itself. Buy online before departure.' },
    { type: 'tip', content: 'Suica on Apple Wallet: Set up at home. Skip airport kiosk lines entirely.' },
    { type: 'tip', content: 'Luggage forwarding (Takuhaibin): Arrange with Andaz front desk the night before Thursday checkout. Luggage arrives Kyoto hotel Friday. Yamato Transport handles it.' },
    { type: 'tip', content: 'Odakyu Romancecar seats: Book in advance at odakyu.jp for Shinjuku → Hakone-Yumoto. Reserved seating is comfortable and scenic — especially with a stroller/young child.' },
    { type: 'tip', content: 'Owakudani ropeway: Follow @hakone_navi on X for current volcanic status. Check 2–3 days before your Hakone visit.' },
    { type: 'tip', content: 'Miyajima tide times: Look up specific tide tables for April 28, 2026. Low tide mid-afternoon → rising tide at sunset is the ideal sequence.' },
  ],

  cards: [
    // ── Outbound Flight ──────────────────────────────────────────────────────
    {
      id: 'c01',
      calendarDate: '2026-04-19',
      date: 'Sun Apr 19',
      title: 'SFO → Tokyo',
      subtitle: '~10–11hr flight',
      city: 'transit',
      activities: [
        { id: 'c01-depart-sfo', time: '2:30 PM PST', name: 'Depart SFO', priority: 'fixed' },
        { id: 'c01-arrive-tokyo', time: '4:30 PM JST', timeMinutes: 990, name: 'Arrive Tokyo', priority: 'fixed', note: 'Narita or Haneda. ~11hr flight + date line crossing. Times in your notes are accurate.' },
      ],
      callouts: [
        { type: 'weather', content: 'Weather on arrival side: Tokyo is currently projecting a mild spring arrival window around 64° / 51° for Apr 20. Expect a comfortable evening, but not truly warm after dark — light layers are the move when you land.' },
        { type: 'tip', content: 'Set up Suica on Apple Wallet and download Google Maps offline before boarding. Both take 5 min at home but are a hassle at a busy airport.' },
        { type: 'tip', content: 'Sleep on the plane as much as possible. For Dahlia, the overnight flight is a natural sleep window — lean into it.' },
      ],
    },

    // ── Tokyo: Day 1 (Arrival) ───────────────────────────────────────────────
    {
      id: 'c02',
      calendarDate: '2026-04-20',
      date: 'Mon Apr 20',
      title: 'Arrival Day',
      subtitle: 'Land, check in, stay up — that\'s the job',
      city: 'tokyo',
      activities: [
        { id: 'c02-checkin-andaz', time: '4:30 PM', timeMinutes: 990, name: 'Arrive, check in to Andaz', priority: 'plan', note: 'Andaz Toranomon Hills — excellent choice. Modern, polished, English-friendly, great service. Toranomon Hills area is walkable and well-connected.' },
        { id: 'c02-stay-up', time: 'Evening', name: 'Stay up as late as possible', priority: 'must', note: '7pm JST = 2am PST. Push to at least 9–10pm JST. This shapes the rest of the trip.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: about 64° / 51°. Mild spring arrival day. Evening should feel pleasant, but once the sun drops it will feel a bit cool for a long outdoor wander — good night for a short walk, konbini run, and early-ish reset.' },
        { type: 'nap', content: 'Hotel sleep tonight — obvious. Dahlia will likely knock out on the plane and wake up on arrival, so don\'t stress a formal nap. Just let her follow your rhythm tonight.' },
        { type: 'tip', content: 'Convenience store dinner tonight (7-Eleven or FamilyMart). Japanese konbini food is genuinely excellent — onigiri, hot food counter, sandwiches. Fun intro to a uniquely Japanese experience, zero decision fatigue on arrival night.' },
      ],
    },

    // ── Tokyo: Day 2 (Meiji / Harajuku) ─────────────────────────────────────
    {
      id: 'c03',
      calendarDate: '2026-04-21',
      date: 'Tue Apr 21',
      title: 'Meiji / Harajuku / Omotesando / Shibuya',
      subtitle: 'First full day — lighter than it looks, no swap needed',
      city: 'tokyo',
      activities: [
        { id: 'c03-meiji-shrine', time: '8–9 AM', timeMinutes: 480, name: 'Meiji Shrine', priority: 'must', note: 'Arrive early — the forested approach is genuinely soothing for jet-lagged brains. Shaded gravel path, flat, quiet. A calm way to start your first real day.' },
        { id: 'c03-yoyogi-park', time: 'Morning', name: 'Yoyogi Park', priority: 'flex', note: 'Right next to Meiji. Nice but easy to skip if you want to get to Harajuku earlier. Good if Dahlia needs to run around after the stroller.' },
        { id: 'c03-takeshita', time: 'Midday', name: 'Takeshita Street (Harajuku)', priority: 'flex', note: 'Chaotic and very crowded. 15–20 min max. Stroller can work but narrow — be prepared.' },
        { id: 'c03-cat-street', time: 'Midday', name: 'Cat Street (Ura-Harajuku)', priority: 'plan', note: 'More interesting, far less crowded than Takeshita. Smooth pavement, pleasant walking. Better stroller experience.' },
        { id: 'c03-omotesando', time: 'Midday–PM', name: 'Omotesando', priority: 'must', note: 'Broad, tree-lined boulevard — probably the most pleasant stroller push in Tokyo. Easy, beautiful, unhurried.' },
        { id: 'c03-onitsuka-tiger', time: 'PM', name: 'Onitsuka Tiger Omotesando Flagship', priority: 'plan' },
        { id: 'c03-shibuya-crossing', time: 'Afternoon–Dusk', name: 'Shibuya Crossing', priority: 'must', note: 'Rush hour (5–7pm) is the most electric, but don\'t hold out for it if you\'re fading. Shibuya Crossing is still worth it at 3pm or 4pm — the density is lower but the energy is real any time. Treat it as \'whenever you arrive\' not a hard 5pm target.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 70° / 53°. One of your nicest Tokyo weather days. Cool morning, very comfortable afternoon. Great day for long walking outdoors; you probably will not need heavy layers beyond the morning.' },
        { type: 'good', content: 'Keep this day as Tuesday. Swapping Tue/Wed doesn\'t help — Wednesday\'s Senso-ji ideally requires an even earlier start (before 8am) and involves three separate geographic clusters, which is harder to navigate on jet-lagged Day 1. Tuesday\'s Meiji → Harajuku → Omotesando → Shibuya is a single walkable strip, and Meiji Shrine is a gentle forested walk — genuinely kind to tired brains.' },
        { type: 'flag', content: 'Don\'t force the 5–7pm rush hour window if jet lag has caught up by late afternoon. Hitting Shibuya at 4pm is a fine trade for not being miserable. The adrenaline of the first day will carry you further than expected — but have permission to wrap early.' },
        { type: 'nap', content: 'Stroller nap — Omotesando/Cat Street walk (recommended). Andaz is 25–30 min from Omotesando. Going back for a hotel nap burns nearly an hour of round-trip transit. Instead: let Dahlia nap in the stroller during the Cat Street → Omotesando stretch. Flat pavement, shaded walking, pleasant noise level.' },
        { type: 'eat', content: 'Dinner: izakaya in Shibuya or a conveyor belt sushi (kaiten-zushi) for a fun, affordable first-night sushi intro. Basement food halls (depachika) of any department store are also excellent — Tokyu Food Show in Shibuya is one of the best.' },
        { type: 'tip', content: 'Shibuya Sky rooftop observatory is worth booking in advance for elevated views. Not essential but great for photos.' },
      ],
    },

    // ── Tokyo: Day 3 (Senso-ji / Yanaka) ────────────────────────────────────
    {
      id: 'c04',
      calendarDate: '2026-04-22',
      date: 'Wed Apr 22',
      title: 'Senso-ji / Yanaka / Kameido',
      subtitle: 'Old Tokyo feels — temples, wisteria, neighborhood walks',
      city: 'tokyo',
      activities: [
        { id: 'c04-sensoji', time: 'Before 8 AM', timeMinutes: 420, name: 'Senso-ji Temple + Nakamise-dori', priority: 'must', note: 'Magical at dawn with incense smoke and low crowds. The main approach (Nakamise-dori) is flat and stroller-accessible. Budget 60–90 min, not 25–35.' },
        { id: 'c04-yanaka', time: 'Late AM', name: 'Yanaka / Nezu', priority: 'plan', note: 'Authentic old Tokyo feel. Some uneven stone paths in Yanaka — manageable with a stroller on the main roads. Cemetery paths are mostly smooth. Very un-touristy.' },
        { id: 'c04-kameido', time: 'PM', name: 'Kameido Tenjin Wisteria', priority: 'flex', note: 'Festival Apr 4–30. Late April bloom still good. Check visitor reports closer to date. Garden is flat and stroller-friendly.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 68° / 56°. Slightly milder morning than Tuesday. Good temple/walking weather. Early start still makes sense, but this one looks a bit less crisp at dawn and more evenly comfortable through the day.' },
        { type: 'nap', content: 'Stroller nap during subway transit (recommended). Asakusa → Yanaka is ~20 min by transit. That\'s a natural window. The Yanaka walk itself, down quieter streets, can also extend the nap — low traffic, shaded, calm.' },
        { type: 'flag', content: 'Three geographic clusters (Asakusa → Yanaka → Kameido) can feel rushed. If energy is low or naps are tricky, Senso-ji + Yanaka is a complete, satisfying day. Cut Kameido without regret.' },
        { type: 'eat', content: 'Lunch in Yanaka: small teishoku (set meal) restaurant. Simple, local, seasonal. Yanaka Ginza shopping street also has sweet potato ice cream and melon pan worth grabbing.' },
      ],
    },

    // ── Tokyo: Day 4 morning (Checkout / Travel to Hakone) ──────────────────
    {
      id: 'c05',
      calendarDate: '2026-04-23',
      date: 'Thu Apr 23',
      title: 'Checkout + Travel to Hakone',
      subtitle: 'Pack, forward luggage, head to your ryokan',
      city: 'tokyo',
      activities: [
        { id: 'c05-forward-luggage', time: 'Morning', name: 'Pack one-day bag + forward luggage to Kyoto', priority: 'must', note: 'Confirm with Andaz front desk the evening prior. Luggage arrives at your Kyoto hotel Friday. Hotel handles the Yamato/Kuroneko booking.' },
        { id: 'c05-travel-hakone', time: '~Noon', timeMinutes: 720, name: 'Travel to Matsuzakaya Honten ryokan, Hakone', priority: 'plan', note: '~1.5–2hrs from central Tokyo. Your ryokan for the night — head straight there.' },
      ],
      callouts: [
        { type: 'weather', content: 'Tokyo side forecast: about 68° / 56°. Hakone / Motohakone side: about 65° / 54°. Not a huge daytime difference, but Hakone will feel cooler and damper, especially at night and near the water. Bring the light jacket out again once you arrive.' },
        { type: 'nap', content: 'Stroller/lap nap on the Romancecar or train to Hakone (recommended). Romancecar from Shinjuku is ~85 min — a great natural nap window. Arrives into your hotel nap (already in your plan) for a full rest afternoon.' },
        { type: 'tip', content: 'Matsuzakaya Honten is a historic ryokan in Hakone — confirm check-in time when booking so you know whether to kill time locally before your room is ready, or if they\'ll hold your bags and let you use the facilities early.' },
      ],
    },

    // ── Hakone: Day 4 evening ────────────────────────────────────────────────
    {
      id: 'c06',
      calendarDate: '2026-04-23',
      date: 'Thu Apr 23 (cont\'d)',
      title: 'Arrive, Onsen, Settle',
      subtitle: 'This is a rest stop — lean all the way into it',
      city: 'hakone',
      continuesFrom: 'c05',
      activities: [
        { id: 'c06-onsen-nap', time: 'Afternoon', name: 'Check in, onsen, nap, decompress', priority: 'must', note: 'This is the whole point of Hakone.' },
        { id: 'c06-kaiseki-dinner', time: 'Evening', name: 'Kaiseki hotel dinner', priority: 'must', note: 'If staying at a ryokan, dinner is typically a multi-course kaiseki meal. Don\'t skip for outside food — this is a highlight.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 65° / 54° in Motohakone. This is the first place where the evening chill becomes real. Onsen weather, basically. Once the sun drops, it\'ll feel meaningfully cooler than Tokyo.' },
        { type: 'nap', content: 'Hotel nap — this is already in your plan and it\'s right. After a morning of logistics and ~2hrs of transit, this is a genuine rest stop for everyone. Full hotel nap with no compromise.' },
        { type: 'tip', content: 'Confirm whether dinner and breakfast are included in your stay — most traditional Hakone ryokans include both as part of the experience.' },
        { type: 'tip', content: 'Onsen etiquette: wash thoroughly before entering, no swimwear, full immersion. If either of you has tattoos, check the ryokan\'s policy — private in-room baths are almost always available regardless.' },
      ],
    },

    // ── Hakone: Day 5 morning ────────────────────────────────────────────────
    {
      id: 'c07',
      calendarDate: '2026-04-24',
      date: 'Fri Apr 24',
      title: 'One Scenic Item + Travel to Kyoto',
      subtitle: 'One view, then head northeast',
      city: 'hakone',
      activities: [
        { id: 'c07-lake-ashi', time: 'Morning', name: 'Lake Ashi — scenic boat + Fuji view', priority: 'flex', note: 'Calmer, lower-friction. Pirate boats, lakeside walk, Hakone Shrine torii gate at the water. Good stroller experience on the flat lakeside paths.' },
        { id: 'c07-owakudani', time: 'Morning', name: 'Owakudani Ropeway', priority: 'flex', note: 'More dramatic — volcanic valley, sulfur vents, black eggs. Stroller not usable on the ropeway itself (gondola, carry child). Check volcanic status before committing.' },
        { id: 'c07-travel-kyoto', time: 'Late AM', name: 'Travel to Kyoto', priority: 'plan', note: 'Leave by 10–11am to arrive mid-afternoon.' },
      ],
      callouts: [
        { type: 'weather', content: 'Hakone forecast: about 57° / 49° in the morning — noticeably cooler than the cities. Kyoto forecast on arrival: about 70° / 56°. This is your biggest same-day weather swing of the trip: cool scenic morning, then warm city afternoon.' },
        { type: 'nap', content: 'Lap/stroller nap on Shinkansen to Kyoto (recommended). ~2–2.5hrs on the train is a perfect nap window. Hotel nap after Kyoto check-in is already in your plan too — Dahlia gets both without giving anything up.' },
        { type: 'flag', content: 'Mt. Fuji views from Hakone depend on weather. Late April can be hazy. Don\'t plan your morning around seeing Fuji — treat it as a bonus.' },
        { type: 'flag', content: 'Owakudani ropeway: check @hakone_navi the days before. Volcanic activity can close it with no warning. Default to Lake Ashi if uncertain.' },
        { type: 'good', content: 'One scenic item for a one-night stop is exactly the right call. This is a rest and culture stop, not a theme park.' },
      ],
    },

    // ── Kyoto: Day 5 evening ─────────────────────────────────────────────────
    {
      id: 'c08',
      calendarDate: '2026-04-24',
      date: 'Fri Apr 24 (cont\'d)',
      title: 'Arrive, Evening Wander',
      subtitle: 'Settle in, eat well, first-night drift',
      city: 'kyoto',
      continuesFrom: 'c07',
      activities: [
        { id: 'c08-checkin-nap', time: 'Afternoon', name: 'Check in, nap, reset', priority: 'plan', note: 'Good Nature Hotel — excellent central location. Shijo-Kawaramachi puts you 10–15 min walk from everything.' },
        { id: 'c08-nishiki', time: '4–6 PM', timeMinutes: 960, name: 'Nishiki Market', priority: 'plan', note: 'Aim for 4–5:30pm, not 5–8:30pm. Most stalls close by 6pm. Narrow covered arcade — stroller possible but tight on busy afternoons. This is a walking/eating experience, not a sit-down.' },
        { id: 'c08-shijo-browse', time: 'Evening', name: 'Shijo/Kawaramachi browse', priority: 'plan', note: 'Right outside your hotel — good first-night wander.' },
        { id: 'c08-gion-drift', time: 'Evening', name: 'Gion fringe drift', priority: 'plan', note: 'Hanamikoji-dori area. Beautiful at dusk, atmospheric, no agenda needed.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 70° / 56°. Comfortable arrival evening. Warm enough for an easy city wander, but still pleasant rather than hot.' },
        { type: 'nap', content: 'Hotel nap already in your plan — right call. After two travel legs (Hakone → Odawara → Shinkansen → Kyoto), everyone needs a proper rest. Don\'t abbreviate this. Dahlia\'s afternoon hotel sleep here sets up a good evening walk.' },
        { type: 'flag', content: 'Nishiki Market hours: most shops close by 6pm, some by 5pm. Arrive by 4pm to see it properly. Your original 5–8:30pm plan risks finding much of it quiet.' },
        { type: 'reserve', content: 'Pontocho Alley for Friday dinner — narrow lantern-lit lane across the Kamogawa River, 5 min walk from your hotel. Some of Kyoto\'s best restaurants. Book in advance for a Friday night.' },
        { type: 'tip', content: 'If you see a geiko or maiko in Gion: respectful distance, no blocking, no close photography. Locals appreciate this.' },
        { type: 'eat', content: 'Pontocho or Gion for dinner. Kyoto kaiseki if you want something formal, izakaya for relaxed first-night eating.' },
      ],
    },

    // ── Kyoto: Day 6 (Fushimi Inari / Higashiyama) ──────────────────────────
    {
      id: 'c09',
      calendarDate: '2026-04-25',
      date: 'Sat Apr 25',
      title: 'Fushimi Inari Dawn + Higashiyama/Gion Afternoon',
      subtitle: 'Biggest day of the Kyoto leg — structured perfectly',
      city: 'kyoto',
      activities: [
        { id: 'c09-leave-6am', time: '6:15 AM', timeMinutes: 375, name: 'Leave hotel', priority: 'must' },
        { id: 'c09-fushimi-inari', time: '6:45–8:45 AM', timeMinutes: 405, name: 'Fushimi Inari Taisha', priority: 'must', note: '2 hours is enough to reach the Yotsutsuji viewpoint and back (~45 min up). Open 24/7 — no entry fee. JR Nara Line from Kyoto Station, 5 min. Dawn here is genuinely special.' },
        { id: 'c09-midday-reset', time: '9 AM–2 PM', timeMinutes: 540, name: 'Return, nap, lunch, midday reset', priority: 'plan', note: 'Natural break before the afternoon push.' },
        { id: 'c09-leave-3pm', time: '3:30 PM', timeMinutes: 930, name: 'Leave for Higashiyama/Kiyomizu', priority: 'must' },
        { id: 'c09-kiyomizudera', time: '3:30–5:30 PM', timeMinutes: 930, name: 'Kiyomizu-dera Temple', priority: 'must', note: 'One of Kyoto\'s top 3 sights. Wooden stage over the hillside is stunning. Hours: 6am–6pm. Add as your first afternoon stop. Some steps to the main hall — carry Dahlia up, stroller parks at base.' },
        { id: 'c09-ninenzaka', time: '5–6:30 PM', timeMinutes: 1020, name: 'Ninenzaka & Sannenzaka lanes', priority: 'must', note: 'Stone-paved lanes between Kiyomizu and Gion. Perfect for photos, ceramics, matcha soft-serve. Mostly stroller-manageable on the smoother sections but can be steep/cobbled in spots.' },
        { id: 'c09-yasaka', time: 'Dusk', name: 'Yasaka Shrine', priority: 'plan', note: 'Free, 24/7. Beautiful at dusk with lanterns. Natural end of Higashiyama walk.' },
        { id: 'c09-gion-evening', time: '6–7 PM', timeMinutes: 1080, name: 'Gion evening walk (Hanamikoji)', priority: 'must', note: 'The classic Kyoto evening. Walk slowly, watch the light change.' },
        { id: 'c09-gion-corner', time: 'Evening', name: 'Gion Corner (formal arts performance)', priority: 'skip', note: '¥3,150/person. Mixed reviews — many find it packaged and underwhelming. Skip unless you specifically want an intro to tea ceremony/koto/ikebana. The neighborhood is the real performance.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 75° / 56°. Warm afternoon. Your dawn start is even better given the temperature curve; the 9 AM–2 PM reset will help you avoid the warmest part of the day.' },
        { type: 'nap', content: 'Hotel nap during 9am–2pm midday break (strongly recommended). Early 6:15am start + two hours of uphill shrine walking = a tired child by 9am. The midday break is already built into your plan — use it for a full hotel nap. You lose nothing; you gain a refreshed Dahlia for the afternoon. This is the best nap setup of the whole trip.' },
        { type: 'flag', content: 'Kiyomizu-dera is missing from your original Saturday plan. It\'s in the exact area you\'re already visiting. Add it as your first afternoon stop before Ninenzaka. Closes 6pm.' },
        { type: 'good', content: 'The Fushimi Inari dawn plan is one of the strongest calls in the entire itinerary. You\'ll have that shrine nearly to yourselves.' },
        { type: 'eat', content: 'Matcha soft-serve and yatsuhashi (cinnamon rice sweets) on Ninenzaka. Dinner: book Gion-area restaurant ahead for Saturday evening — it fills up.' },
      ],
    },

    // ── Kyoto: Day 7 (Nara) ──────────────────────────────────────────────────
    {
      id: 'c10',
      calendarDate: '2026-04-26',
      date: 'Sun Apr 26',
      title: 'Nara Day Trip',
      subtitle: 'Deer, Great Buddha, old shrines — a good day trip',
      city: 'kyoto',
      activities: [
        { id: 'c10-leave-nara', time: '8:15–8:45 AM', timeMinutes: 495, name: 'Leave for Nara', priority: 'plan', note: '~50–70 min via Kintetsu Limited Express (most comfortable) or JR from Kyoto Station.' },
        { id: 'c10-church', time: '~10 AM', timeMinutes: 600, name: 'Church service', priority: 'fixed', note: 'Research English-language services in Nara before the trip — options are limited. Confirm Sunday timing and location align with your Nara route.' },
        { id: 'c10-nara-deer', time: 'AM–PM', name: 'Nara deer (Nara Park)', priority: 'must', note: 'Wild, sacred, bold. Great with a young child — endlessly entertaining. Don\'t wave senbei crackers unless ready to be surrounded.' },
        { id: 'c10-todaiji', time: 'AM–PM', name: 'Todai-ji Temple (Great Buddha)', priority: 'must', note: 'Opens 7:30am. One of Japan\'s most genuinely impressive sights. Worth the entry fee.' },
        { id: 'c10-kasuga', time: 'Optional', name: 'Kasuga Taisha Shrine', priority: 'flex', note: 'Often overlooked. Thousands of lanterns on a forested path. 20–30 min add-on.' },
        { id: 'c10-return-kyoto', time: 'By 3:30 PM', timeMinutes: 930, name: 'Return to Kyoto', priority: 'plan' },
        { id: 'c10-imperial-palace', time: 'Late PM', name: 'Kyoto Imperial Palace Park', priority: 'flex', note: 'Open 24/7, free. Good flexible breather if energy allows. 2-min walk from Kyoto Kawaramachi Station.' },
      ],
      callouts: [
        { type: 'weather', content: 'Kyoto-area forecast: around 74° / 57°. Another comfortably warm day. Good for Nara, but expect the midday deer-park walk to feel sunnier and warmer than the numbers suggest if you\'re exposed for a while.' },
        { type: 'nap', content: 'Stroller nap in Nara Park (recommended) — or train nap on the return. Nara Park has flat, smooth main paths between the deer area and Todai-ji. A mid-morning stroller push through the park is a natural nap window. If she doesn\'t sleep then, the ~70 min train ride back to Kyoto is another clean window.' },
        { type: 'flag', content: 'English-language Sunday church services in Nara need advance research. Confirm the service time and location align with your Nara routing before building the day around it.' },
        { type: 'eat', content: 'Kaki (persimmon) sweets and warabi mochi are the Nara specialties. Simple soba or teishoku for lunch near the park — the food scene is modest, don\'t overthink it.' },
      ],
    },

    // ── Kyoto: Day 8 (Arashiyama) ────────────────────────────────────────────
    {
      id: 'c11',
      calendarDate: '2026-04-27',
      date: 'Mon Apr 27',
      title: 'Arashiyama + Last Kyoto Evening',
      subtitle: 'Bamboo grove at dawn, then the best free evening of the trip',
      city: 'kyoto',
      activities: [
        { id: 'c11-leave-6am', time: '6:15 AM', timeMinutes: 375, name: 'Leave for Arashiyama', priority: 'must' },
        { id: 'c11-bamboo-grove', time: '7:00 AM', timeMinutes: 420, name: 'Bamboo Grove (Sagano)', priority: 'must', note: 'At 7am you\'ll have it to yourselves. By 9am it\'s shoulder-to-shoulder. Early wake is completely worth it. Stroller on the main bamboo path is possible but narrow — check width vs. your stroller. Pushing at dawn on a quiet path is honestly magical.' },
        { id: 'c11-togetsukyo', time: 'AM', name: 'Togetsukyo Bridge + riverside', priority: 'plan', note: 'Beautiful in morning light. Easy stroller push on the riverside.' },
        { id: 'c11-tenryuji', time: '8:30 AM+', timeMinutes: 510, name: 'Tenryu-ji Temple Garden', priority: 'plan', note: 'Opens 8:30am. UNESCO-listed. Small entry fee. Serene garden — gravel paths, manageable with stroller on main routes.' },
        { id: 'c11-okochi-sanso', time: 'AM', name: 'Okochi Sanso Villa', priority: 'flex', note: 'Less visited, very lovely garden and teahouse. Includes matcha tea and wagashi. Some sloped paths — manageable but check.' },
        { id: 'c11-riverside-lunch', time: 'Midday', name: 'Riverside lunch, wander', priority: 'plan', note: 'Good lunch options in Arashiyama. Take your time before heading back.' },
        { id: 'c11-midday-reset', time: 'Afternoon', name: 'Return to hotel, midday reset', priority: 'plan' },
        { id: 'c11-last-evening', time: 'Evening', name: 'Free — best Kyoto dinner + light shopping', priority: 'plan', note: 'Pontocho, Gion, or Nishiki area. Your best evening for a proper Kyoto dinner. Also good for last-night souvenir shopping on Shijo.' },
        { id: 'c11-kinkakuji', time: 'Optional', name: 'Kinkaku-ji (Golden Pavilion)', priority: 'skip', note: 'Beautiful but awkwardly located, daytime-only (closes 5pm), very crowded, and doesn\'t pair naturally with Arashiyama. Skip unless you have a specific open afternoon slot.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 74° / 49°. This one has a bigger temperature swing than the prior two Kyoto days. Dawn in Arashiyama should feel genuinely cool; afternoon and dinner hours should be excellent.' },
        { type: 'nap', content: 'Hotel nap during midday return from Arashiyama (strongly recommended). Second early start in a row (6:15am again). Back by ~noon, everyone needs a reset before the final Kyoto evening.' },
        { type: 'reserve', content: 'If you\'re doing your special dinner Monday night (Track B omakase backup): book a top Kyoto kaiseki restaurant for this evening now. This is your most relaxed, unscheduled evening in Kyoto and the best slot for a long, memorable meal.' },
        { type: 'good', content: 'Arashiyama plan is excellent. Early bamboo grove + Tenryu-ji is one of the strongest mornings in the trip.' },
        { type: 'eat', content: 'If this is your big dinner night: Kyoto kaiseki, a Gion sushi counter, or yudofu (Kyoto\'s tofu hot pot). All worth booking ahead.' },
      ],
    },

    // ── Hiroshima: Day 9 (Miyajima) ──────────────────────────────────────────
    {
      id: 'c12',
      calendarDate: '2026-04-28',
      date: 'Tue Apr 28',
      title: 'Travel + Miyajima',
      subtitle: 'Quick Shinkansen south, then the island and the gate',
      city: 'hiroshima',
      activities: [
        { id: 'c12-depart-kyoto', time: '8:30–9:30 AM', timeMinutes: 510, name: 'Depart Kyoto for Hiroshima', priority: 'plan', note: '~45–70 min depending on train. Very fast.' },
        { id: 'c12-checkin-nap', time: 'Afternoon', name: 'Check in, optional nap or go straight to Miyajima', priority: 'plan', note: 'Hotel to Miyajima is ~55–65 min total (hotel → Hiroshima Station → JR to Miyajimaguchi → ferry). Starting by 2pm gives you plenty of time for the sunset window.' },
        { id: 'c12-miyajima-shrine', time: '~3–5 PM', timeMinutes: 900, name: 'Miyajima / Itsukushima Shrine', priority: 'must', note: 'Low tide in the afternoon. Walk the flat main path near the gate and shrine. Stroller works well on the flat paved approach.' },
        { id: 'c12-sunset-torii', time: '~5–7 PM', timeMinutes: 1020, name: 'Sunset + rising tide at Torii Gate', priority: 'must', note: 'Sunset ~6:43pm. Your tide timing (low-ish 5pm → high tide 7:30–8pm) is excellent. This is the shot and the mood.' },
        { id: 'c12-peace-park-night', time: 'Evening', name: 'Return to Hiroshima, Peace Park night walk', priority: 'flex', note: 'The Dome and cenotaph at night are quiet and powerful. Optional but adds a lot.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 71° / 56°. Very good Miyajima day on paper. Afternoon should be comfortable, but by the torii/sunset window you should expect it to cool off enough that a light outer layer will probably feel right.' },
        { type: 'nap', content: 'Stroller nap on the Hiroshima-bound Shinkansen (recommended). Even at ~45–70 min, positioning Dahlia for a nap on the train is the right call — it\'s a travel day with a big afternoon ahead. If she needs more, a quick hotel nap on arrival before heading to Miyajima is fine; just leave by 2pm to hit the tide window.' },
        { type: 'reserve', content: 'Hiroshima Peace Memorial Museum: Pre-book timed entry via Klook. April is peak season, midday is very crowded. Aim for 7:30–8:30am or 5:30pm+ reserved slots.' },
        { type: 'good', content: 'Your tide timing research for Miyajima is one of the most thoughtful pieces of planning in the whole trip.' },
        { type: 'eat', content: 'Hiroshima oysters: end of season, so you\'re arriving at the perfect moment. Try all formats: raw, grilled, and kaki furai (breaded fried). Don\'t miss this.' },
        { type: 'eat', content: 'Hiroshima-style okonomiyaki: layered, not mixed — completely different from Osaka\'s. Okonomimura is the local institution (multi-floor building of okonomiyaki restaurants downtown). Make time for this.' },
        { type: 'tip', content: 'Momiji manju on Miyajima: maple-leaf cakes filled with sweet bean paste. Get freshly baked from a street stall near the ferry, not the packaged souvenir version.' },
      ],
    },

    // ── Hiroshima: Day 10 (Museum / Shinkansen) ──────────────────────────────
    {
      id: 'c13',
      calendarDate: '2026-04-29',
      date: 'Wed Apr 29',
      title: 'Museum + Shinkansen to Tokyo',
      subtitle: 'Shōwa Day (national holiday)',
      city: 'hiroshima',
      activities: [
        { id: 'c13-peace-museum', time: 'Morning', name: 'Peace Memorial Museum', priority: 'must', note: 'If not visited Tuesday, do it this morning. One of the most important and moving museums anywhere. 1.5–2 hours. Stroller accessible throughout.' },
        { id: 'c13-peace-park', time: 'Morning', name: 'Peace Park walk', priority: 'plan', note: 'Atomic Bomb Dome, cenotaph, Children\'s Peace Monument. All within the flat park. 45–60 min. Fully stroller-accessible.' },
        { id: 'c13-shinkansen', time: '1:18 PM', timeMinutes: 798, name: 'Shinkansen to Tokyo (booked ✓)', priority: 'fixed', note: '~4hrs. Arrives ~5:15pm. Heading toward Tokyo on Shōwa Day goes against the main outbound crowd flow — less packed than feared, but stations will be busy.' },
      ],
      callouts: [
        { type: 'weather', content: 'Hiroshima forecast: about 68° / 56°. Tokyo arrival forecast: about 72° / 59°. Mild morning in Hiroshima, then a slightly warmer Tokyo evening once you arrive.' },
        { type: 'nap', content: 'Shinkansen nap on the way to Tokyo (recommended). 4-hour train ride is the ideal nap slot of the day. Position Dahlia early after boarding. Parents can rest too.' },
        { type: 'flag', content: 'April 29 is Shōwa Day — a national holiday. Arrive at Hiroshima Station early for your 1:18pm train. Platforms and concourses will be busy.' },
        { type: 'tip', content: 'Golden Week\'s main 5-day block in 2026 is actually May 2–6, not immediately following April 29. Your Tokyo return (Apr 29–30) won\'t be full GW chaos — April 29 is a standalone holiday.' },
      ],
    },

    // ── Tokyo Return: Day 10 evening ─────────────────────────────────────────
    {
      id: 'c14',
      calendarDate: '2026-04-29',
      date: 'Wed Apr 29 (cont\'d)',
      title: 'Arrive + Dinner',
      subtitle: 'Check in, then the meal you\'ve been planning',
      city: 'tokyo',
      continuesFrom: 'c13',
      activities: [
        { id: 'c14-checkin', time: '~5:15 PM', timeMinutes: 1035, name: 'Arrive Tokyo, check in', priority: 'plan' },
        { id: 'c14-omakase', time: 'Evening', name: 'Omakase or special dinner', priority: 'must', note: 'A perfect bookend to the trip. April 29 is your only dinner option in this leg — lean in.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 72° / 59°. Pleasant dinner weather. Best Tokyo evening temperatures of the trip; probably your easiest night for dressing lightly.' },
        { type: 'reserve', content: 'BOOK NOW via omakase.in or tableall.com. 15 days out on a national holiday is tight. If unavailable: make Monday Apr 27 in Kyoto your special dinner night (kaiseki) and do a great but less precious sushi counter or yakitori bar tonight instead.' },
        { type: 'flag', content: 'National holiday restaurants will be busy. Don\'t arrive expecting walk-in availability anywhere good. Have this locked.' },
        { type: 'nap', content: 'Hotel sleep tonight — natural. Long travel day. Let Dahlia crash when she\'s ready, and don\'t push a late bedtime. No nap strategy needed here.' },
      ],
    },

    // ── Tokyo: Last Day ──────────────────────────────────────────────────────
    {
      id: 'c15',
      calendarDate: '2026-04-30',
      date: 'Thu Apr 30',
      title: 'Last Morning + Fly Home',
      subtitle: 'Relaxed final morning — don\'t over-schedule it',
      city: 'tokyo',
      activities: [
        { id: 'c15-tsukiji', time: 'Early AM', timeMinutes: 360, name: 'Tsukiji Outer Market breakfast', priority: 'flex', note: 'Stalls open from ~5–6am, best before 9am. More atmosphere and variety than Toyosu for a casual visit. Fresh sushi, tamagoyaki, street food crawl. Flat, easy stroller territory.' },
        { id: 'c15-toyosu', time: 'Morning', name: 'Toyosu Market', priority: 'flex', note: 'If you want the bigger seafood restaurant experience (Sushi Dai, etc.), Toyosu has it — but expect waits. Tsukiji outer market is the easier, more atmospheric choice for a last morning.' },
        { id: 'c15-last-wander', time: 'Morning–PM', name: 'Last wander — Ginza, Shibuya, or local', priority: 'flex', note: 'No need to pack this. Keep it light.' },
        { id: 'c15-depart-airport', time: '~4:30–5 PM', timeMinutes: 990, name: 'Depart for airport', priority: 'must', note: '6:15pm flight. Airport by 4:30pm. Some Golden Week traveler congestion expected on transit.' },
      ],
      callouts: [
        { type: 'weather', content: 'Forecast: around 72° / 58°. Very workable last day. Good market/wandering weather. No obvious weather reason to change the plan — just keep one light layer for morning or air-conditioned transit.' },
        { type: 'nap', content: 'Stroller nap whenever it happens naturally this morning. Last day, flexible pace. If Dahlia naps in the stroller at the market or on the transit to the airport, that\'s fine. No strategy needed — just go with it.' },
        { type: 'flag', content: 'Build in extra airport time. Early Golden Week means elevated Narita/Haneda congestion. 4:30pm airport arrival for a 6:15pm flight is the right call.' },
        { type: 'tip', content: 'Narita and Haneda both have excellent airside food halls and souvenir shops. Don\'t stress last-day food gift shopping — the airport has you covered.' },
      ],
    },

    // ── Return Flight ────────────────────────────────────────────────────────
    {
      id: 'c16',
      calendarDate: '2026-04-30',
      date: 'Thu Apr 30',
      title: 'Tokyo → SFO',
      subtitle: '~10hr flight, date line crossing',
      city: 'transit',
      activities: [
        { id: 'c16-depart-tokyo', time: '6:15 PM JST', timeMinutes: 1095, name: 'Depart Tokyo', priority: 'fixed' },
        { id: 'c16-arrive-sfo', time: '11:30 AM PST', name: 'Arrive SFO', priority: 'fixed', note: 'Same calendar day. Times in your notes are accurate.' },
      ],
      callouts: [
        { type: 'weather', content: 'Departure-day note: Tokyo is projected to stay mild into the evening, so airport transit should be easy from a weather standpoint — no real storm/cold concern showing up in the long-range outlook yet.' },
        { type: 'nap', content: 'Long flight home — Dahlia\'s sleep on the plane is genuinely helpful for re-adjusting westbound. No tricks needed; just let her sleep when she wants.' },
      ],
    },
  ],

  travelSegments: [
    {
      id: 't-tokyo-hakone',
      from: 'Tokyo (Shinjuku)',
      to: 'Hakone',
      afterCardId: 'c05',
      rows: [
        { label: 'Best option', value: 'Odakyu Romancecar — Shinjuku → Hakone-Yumoto, ~85 min direct. Reserved seating, scenic, comfortable with a child. Book seats at odakyu.jp in advance.' },
        { label: 'Alternative', value: 'JR Shinkansen to Odawara (~35 min) then Hakone Tozan Railway (~40 min). Faster but more transfers — harder with luggage or a stroller.' },
        { label: 'From Hakone', value: 'Hakone Tozan or local bus to your accommodation. The Hakone Free Pass (Odakyu) covers all of this — train, bus, ropeway, ferry. Buy with your Romancecar ticket.' },
        { label: 'Baggage', value: "You've forwarded main luggage to Kyoto, so you're traveling light. Stroller + one-day bags on the Romancecar is easy." },
        { label: 'JR Pass', value: 'Romancecar is NOT covered by JR Pass. Hakone Tozan Railway is partially covered. Hakone Free Pass is the cleaner option.' },
      ],
    },
    {
      id: 't-hakone-kyoto',
      from: 'Hakone',
      to: 'Kyoto',
      afterCardId: 'c07',
      rows: [
        { label: 'Route', value: 'Hakone Tozan Railway (or bus) → Odawara Station (~40 min). Then Tokaido Shinkansen (Nozomi or Hikari) Odawara → Kyoto (~2hrs).' },
        { label: 'Total time', value: '~2.5–3hrs door to door, including Odawara connection.' },
        { label: 'Shinkansen', value: 'Nozomi is fastest but NOT covered by JR Pass. Hikari is ~20 min slower and IS covered. Book reserved seats either way — great window seats for Dahlia.' },
        { label: 'Luggage', value: 'Your main luggage will have been forwarded from Tokyo already. Picking it up at the Kyoto hotel Friday evening.' },
        { label: 'On the train', value: 'Reserve a 3-seat row (A-B-C side) for more room. Many families find the Shinkansen ride itself one of the highlights of Japan — Dahlia will love the speed.' },
      ],
    },
    {
      id: 't-kyoto-hiroshima',
      from: 'Kyoto',
      to: 'Hiroshima',
      afterCardId: 'c11',
      rows: [
        { label: 'Route', value: 'JR Kyoto Station → Hiroshima Station. Nozomi: ~45 min. Hikari: ~70 min.' },
        { label: 'JR Pass', value: 'Nozomi NOT covered by JR Pass. Hikari IS covered and only 25 min slower — smart choice with a pass.' },
        { label: 'Departure', value: 'Leave Kyoto 8:30–9:30am. Arrive Hiroshima by ~10–10:30am — full day ahead.' },
        { label: 'On the train', value: 'Short enough ride that a nap might not fully happen — but worth positioning Dahlia to try. Smooth, fast, quiet.' },
        { label: 'With stroller', value: 'Strollers roll on easily at Kyoto Station. Large shinkansen cars have a luggage area near rear seats (reserve these when booking).' },
      ],
    },
    {
      id: 't-hiroshima-tokyo',
      from: 'Hiroshima',
      to: 'Tokyo',
      afterCardId: 'c13',
      rows: [
        { label: 'Route', value: 'JR Hiroshima → Tokyo (Shinagawa or Tokyo Station). Nozomi: ~4hrs. Hikari: ~4.5hrs.' },
        { label: 'Already booked', value: '1:18pm departure, ~5:15pm arrival. ✓' },
        { label: 'JR Pass', value: 'Nozomi NOT covered. Hikari IS covered. Check which train you have booked.' },
        { label: 'On the train', value: 'Station bento (ekiben) from Hiroshima Station is excellent — Momiji-shaped ones are fun for a child. This is a long enough ride to eat, nap, and enjoy the scenery.' },
        { label: 'Mt. Fuji view', value: 'On the right side (N seat) heading Tokyo-bound, Mt. Fuji appears around Shizuoka (~2.5hrs in). Worth pointing out to Dahlia if skies are clear.' },
      ],
    },
  ],
}
