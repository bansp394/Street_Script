/* =========================================================
   STREET SCRIPT — DATA
   ---------------------------------------------------------
   Everything the site shows comes from this file.
   To add a new street message:
     1. Drop the photo in images/messages/
     2. Copy one of the objects in MESSAGES below and edit it.
   Map position:  ll = [latitude, longitude]  ← the real spot. Easiest way to get it:
                  right-click the place in Google Maps and click the numbers to copy them.
                  map = { t, s } is only used by the backup drawn map
                  (t: 0 = Battery → 1 = Inwood, s: -1 = Hudson side → 1 = East River side)
   ========================================================= */

const CATEGORIES = {
  sign:  { id: "sign",  label: "Need a sign?",     short: "A sign",  accent: "yellow",
           blurb: "Small reminders that you're on the right path, even when it doesn't feel like it." },
  love:  { id: "love",  label: "Need some love?",  short: "Some love", accent: "red",
           blurb: "Notes left by strangers who wanted someone, anyone, to feel cared for." },
  laugh: { id: "laugh", label: "Need a laugh?",    short: "A laugh", accent: "yellow",
           blurb: "Doodles and silly scribbles that make a sidewalk feel a little lighter." },
  push:  { id: "push",  label: "Need a push?",     short: "A push",  accent: "red",
           blurb: "Chalked-up encouragement for the days you need to keep going." }
};

const MESSAGES = [
  {
    id: "trust-the-timing",
    title: "Trust the timing ♥",
    category: "sign",
    image: "images/messages/trust-the-timing.jpg",
    hood: "SoHo, Manhattan",
    date: "March 2026",
    surface: "Sidewalk",
    tags: ["hope", "uncertainty", "patience"],
    about: "Found on a sidewalk in SoHo. It stood out because of its simplicity and honesty. “Trust the timing” is something many people struggle with, especially in a city where everyone seems to be in a different phase of life. The heart at the end makes it feel warm, like someone left it for a stranger who needed it that day.",
    ll: [40.72465, -73.9988],
    map: { t: 0.14, s: 0.25 },
    meanings: [
      { quote: "I'm waiting to hear back from a job, and this reminded me that good things take time.", who: "21, Student", theme: "Career" },
      { quote: "I just moved to New York and saw this my first week. It made me feel better about the uncertainty.", who: "23, Recent mover", theme: "New beginnings" },
      { quote: "I needed this after a breakup. It felt like a sign to focus on myself for now.", who: "20, Student", theme: "Relationships" },
      { quote: "I'm graduating soon and don't know what comes next. This gave me a sense of calm.", who: "22, Student", theme: "Uncertainty" }
    ]
  },
  {
    id: "better-things-ahead",
    title: "Better things ahead",
    category: "sign",
    image: "images/messages/better-things-ahead.jpg",
    hood: "SoHo, Manhattan",
    date: "February 2026",
    surface: "Sidewalk slab",
    tags: ["hope", "future"],
    about: "Written in neat, careful capitals two blocks from a busy subway entrance, right where people look down at their phones.",
    ll: [40.7254, -74.00095],
    map: { t: 0.18, s: 0.05 },
    meanings: [
      { quote: "Read this on the worst day of my month. I took a photo and it's still my lock screen.", who: "26, Barista", theme: "Hope" },
      { quote: "It felt like the sidewalk was talking back to me.", who: "19, Student", theme: "Future" }
    ]
  },
  {
    id: "good-things-are-coming",
    title: "Good things are coming",
    category: "sign",
    image: "images/messages/good-things-are-coming.jpg",
    hood: "Chelsea, Manhattan",
    date: "April 2026",
    surface: "Lamp post",
    tags: ["hope", "patience"],
    about: "Painted on the panel of a lamp post near the High Line stairs. Someone added the little heart later, in a different hand.",
    ll: [40.7479, -74.00475],
    map: { t: 0.33, s: -0.55 },
    meanings: [
      { quote: "I was walking to a job interview. I got the job.", who: "24, Designer", theme: "Career" },
      { quote: "It made me slow down and actually look around.", who: "31, Nurse", theme: "Self growth" }
    ]
  },
  {
    id: "same-streets",
    title: "Same streets, new perspectives ♥",
    category: "sign",
    image: "images/messages/same-streets.jpg",
    hood: "West Village, Manhattan",
    date: "March 2026",
    surface: "Sidewalk",
    tags: ["perspective", "city"],
    about: "The message that started this project. You can walk the same block every day and still find something new on it, if you look down.",
    ll: [40.73505, -74.00405],
    map: { t: 0.22, s: -0.6 },
    meanings: [
      { quote: "I've lived here 10 years and this made me see my own block differently.", who: "34, Teacher", theme: "Perspective" }, { quote: "Now I look for messages on every block I walk.", who: "37, Intern", theme: "Curiosity" } ]
  },
  {
    id: "you-are-enough",
    title: "You are enough ♥",
    category: "love",
    image: "images/messages/you-are-enough.jpg",
    hood: "Union Square, Manhattan",
    date: "January 2026",
    surface: "Taped poster",
    tags: ["self-worth", "kindness"],
    about: "A handwritten note taped to a lamp post near Union Square, where thousands of people pass every hour. Three words that are easy to forget.",
    ll: [40.7359, -73.9906],
    map: { t: 0.26, s: 0.38 },
    meanings: [
      { quote: "I didn't know I needed to hear that until I read it.", who: "22, Student", theme: "Self worth" },
      { quote: "I stood there for a minute. Then I texted my sister.", who: "29, Accountant", theme: "Family" }
    ]
  },
  {
    id: "little-heart",
    title: "Just a heart",
    category: "love",
    image: "images/messages/little-heart.jpg",
    hood: "East Village, Manhattan",
    date: "May 2026",
    surface: "Sidewalk slab",
    tags: ["love", "kindness"],
    about: "No words at all, just a heart chalked on the sidewalk. Sometimes that says more than a sentence would.",
    ll: [40.7288, -73.98745],
    map: { t: 0.19, s: 0.7 },
    meanings: [
      { quote: "It reminded me that someone out there is thinking kindly about strangers.", who: "27, Writer", theme: "Kindness" }, { quote: "I was walking home from a funeral. This was gentle.", who: "19, Recent mover", theme: "Grief" } ]
  },
  {
    id: "it-will-be-okay",
    title: "It will be okay",
    category: "love",
    image: "images/messages/it-will-be-okay.jpg",
    hood: "Upper West Side, Manhattan",
    date: "February 2026",
    surface: "Utility box",
    tags: ["comfort", "reassurance"],
    about: "Chalked beside a bench near Riverside Park, with a little smiling face underneath.",
    ll: [40.7853, -73.9842],
    map: { t: 0.72, s: -0.6 },
    meanings: [
      { quote: "My dog was at the vet. It was okay.", who: "38, Musician", theme: "Comfort" },
      { quote: "Exactly the words I would want someone to say to me.", who: "20, Student", theme: "Reassurance" }
    ]
  },
  {
    id: "choose-joy",
    title: "Choose joy",
    category: "laugh",
    image: "images/messages/choose-joy.jpg",
    hood: "Upper East Side, Manhattan",
    date: "April 2026",
    surface: "Sidewalk",
    tags: ["joy", "humor"],
    about: "Chalked across a cracked sidewalk slab with a lopsided smiley underneath. Impossible to walk past without smiling back.",
    ll: [40.7735, -73.9597],
    map: { t: 0.74, s: 0.62 },
    meanings: [
      { quote: "I laughed out loud on the street and someone laughed with me.", who: "25, Chef", theme: "Joy" }, { quote: "It's the little ridiculous things that make this city.", who: "36, Retail worker", theme: "City" } ]
  },
  {
    id: "stars",
    title: "You're a star (or three)",
    category: "laugh",
    image: "images/messages/stars.jpg",
    hood: "Midtown, Manhattan",
    date: "May 2026",
    surface: "Sidewalk",
    tags: ["play", "joy"],
    about: "Wobbly stars scattered across a slab of Midtown sidewalk, as if someone was practising drawing them and got carried away.",
    ll: [40.7582, -73.9819],
    map: { t: 0.46, s: 0.35 },
    meanings: [
      { quote: "In the middle of Midtown rush hour, someone stopped to draw stars. That's the funniest thing to me.", who: "30, Lawyer", theme: "Play" }, { quote: "I texted it to my therapist. She laughed too.", who: "27, Musician", theme: "Healing" } ]
  },
  {
    id: "you-got-this",
    title: "You got this ♥",
    category: "push",
    image: "images/messages/you-got-this.jpg",
    hood: "SoHo, Manhattan",
    date: "March 2026",
    surface: "Sidewalk",
    tags: ["encouragement", "confidence"],
    about: "Big, loose letters across a SoHo sidewalk, written fast like a cheer from the sidelines.",
    ll: [40.7225, -74.0027],
    map: { t: 0.095, s: -0.05 },
    meanings: [
      { quote: "Walked past this on my way to my final review. I did have it.", who: "21, Student", theme: "School" },
      { quote: "First day at a new job. I needed exactly this.", who: "24, Analyst", theme: "Career" }
    ]
  },
  {
    id: "you-got-this-hearts",
    title: "You got this ♥♥",
    category: "push",
    image: "images/messages/you-got-this-hearts.jpg",
    hood: "Lower East Side, Manhattan",
    date: "June 2026",
    surface: "Sidewalk slab",
    tags: ["encouragement"],
    about: "The same words as the SoHo one, in different handwriting, a mile away. Nobody knows if it's the same person.",
    ll: [40.7203, -73.9894],
    map: { t: 0.1, s: 0.72 },
    meanings: [
      { quote: "Seeing it twice in one week felt like the city was on my side.", who: "28, Photographer", theme: "Confidence" }, { quote: "I was tired of waiting for permission. This was permission.", who: "40, Chef", theme: "Motivation" } ]
  },
  {
    id: "new-york-finds-a-way",
    title: "New York always finds a way",
    category: "push",
    image: "images/messages/new-york-finds-a-way.jpg",
    hood: "Lower Manhattan",
    date: "January 2026",
    surface: "Utility box",
    tags: ["resilience", "city"],
    about: "Painted on a utility box a few blocks from the Brooklyn Bridge, where the river wind always picks up. A note about the city, and maybe about the people in it.",
    ll: [40.70745, -73.9989],
    map: { t: 0.035, s: 0.3 },
    meanings: [
      { quote: "That's the most New York sentence I've ever read.", who: "45, Cab driver", theme: "Resilience" }, { quote: "It reminded me progress doesn't have to be pretty.", who: "33, Analyst", theme: "Growth" } ]
  }
];

/* Neighborhood labels drawn on the map (same t/s system as above) */
const MAP_LABELS = [
  { text: "Lower Manhattan", t: -0.025, s: 0 },
  { text: "SoHo",            t: 0.15, s: -0.55 },
  { text: "Chelsea",         t: 0.29, s: 0.1 },
  { text: "Midtown",         t: 0.42, s: -0.3 },
  { text: "Upper West Side", t: 0.65, s: -0.55, wrap: true },
  { text: "Upper East Side", t: 0.65, s: 0.6,  wrap: true },
  { text: "Central Park",    t: 0.59, s: 0.02, wrap: true },
  { text: "Harlem",          t: 0.83, s: 0 }
];

/* Neighborhoods a visitor can drop their own message into */
const DROP_SPOTS = [
  { hood: "SoHo, Manhattan",            ll: [40.7233, -74.0003], t: 0.12, s: -0.1 },
  { hood: "West Village, Manhattan",    ll: [40.7342, -74.004], t: 0.19, s: -0.5 },
  { hood: "East Village, Manhattan",    ll: [40.7265, -73.9838], t: 0.18, s: 0.5 },
  { hood: "Chelsea, Manhattan",         ll: [40.744, -73.999], t: 0.29, s: -0.3 },
  { hood: "Midtown, Manhattan",         ll: [40.7549, -73.984], t: 0.5, s: -0.2 },
  { hood: "Upper West Side, Manhattan", ll: [40.787, -73.9754], t: 0.68, s: -0.5 },
  { hood: "Upper East Side, Manhattan", ll: [40.7736, -73.9566], t: 0.68, s: 0.5 },
  { hood: "Harlem, Manhattan",          ll: [40.8116, -73.9465], t: 0.85, s: 0.1 }
];

/* Real street photos a visitor can write on.
   zone = where the writing goes, in % of the photo: [left, top, width, height]
   style = chalk (white, rough) / paint (clean white) / marker (black ink on paper) */
const SURFACES = {
  sidewalk:      { label: "Sidewalk",      image: "images/surfaces/sidewalk.jpg",      w: 1400, h: 1298, zone: [12, 10, 76, 50], style: "chalk",  rot: -8 },
  "sidewalk-slab": { label: "Sidewalk slab", image: "images/surfaces/sidewalk-slab.jpg", w: 933, h: 1400, zone: [15, 26, 76, 56], style: "chalk",  rot: -10 },
  poster:        { label: "Taped poster",  image: "images/surfaces/poster.jpg",        w: 933, h: 1400, zone: [28, 39.5, 25, 22], style: "marker", rot: -4 },
  "utility-box": { label: "Utility box",   image: "images/surfaces/utility-box.jpg",   w: 1400, h: 933, zone: [29, 25, 29, 51], style: "paint",  rot: 0 },
  "lamp-post":   { label: "Lamp post",     image: "images/surfaces/lamp-post.jpg",     w: 933, h: 1400, zone: [27, 25, 39, 37], style: "paint",  rot: 0 }
};

/* Your street photos */
MESSAGES.push(
  { id: "trust-the-timing-poster", title: "Trust the timing ♥", category: "sign", image: "images/messages/trust-the-timing-poster.jpg",
    hood: "NoMad, Manhattan", date: "October 2026", surface: "Taped poster", tags: ["hope", "patience"],
    about: "A handwritten note taped to a lamp post, with the Empire State Building at the end of the block. Someone wanted the whole avenue to slow down.",
    ll: [40.7445, -73.9880], map: { t: 0.36, s: 0.05 },
    meanings: [{ quote: "I walk past this every morning and it still gets me.", who: "25, Designer", theme: "Patience" }, { quote: "It made me slow down long enough to notice the sky.", who: "45, Grad student", theme: "Presence" } ]},
  { id: "dream-bigger", title: "Dream bigger ♥", category: "push", image: "images/messages/dream-bigger.jpg",
    hood: "Greenwich Village, Manhattan", date: "October 2026", surface: "Sidewalk", tags: ["ambition", "encouragement"],
    about: "Chalked across a sidewalk slab, right between the cracks. Two words and a heart.",
    ll: [40.7308, -73.9990], map: { t: 0.2, s: -0.1 },
    meanings: [{ quote: "I'd been playing it safe. This felt like a nudge.", who: "22, Student", theme: "Ambition" }, { quote: "I read it right before my first day at a new job.", who: "39, Social worker", theme: "New beginnings" } ]},
  { id: "you-got-this-box", title: "You got this ♥", category: "push", image: "images/messages/you-got-this-box.jpg",
    hood: "Midtown, Manhattan", date: "October 2026", surface: "Utility box", tags: ["encouragement"],
    about: "Painted on a utility box on a busy corner, steps from a café. Thousands of people pass it before work.",
    ll: [40.7560, -73.9870], map: { t: 0.46, s: -0.05 },
    meanings: [{ quote: "Saw it on the way to an interview. I got the job.", who: "27, Analyst", theme: "Career" }, { quote: "I'm writing a book. Slowly. This helped me write a chapter.", who: "44, Artist", theme: "Art" } ]},
  { id: "progress-looks-different", title: "Progress looks different everyday ♥", category: "push", image: "images/messages/progress-looks-different.jpg",
    hood: "Lower East Side, Manhattan", date: "October 2026", surface: "Lamp post", tags: ["growth", "patience"],
    about: "Written on the access panel of a lamp post. A reminder that slow days still count.",
    ll: [40.7195, -73.9880], map: { t: 0.09, s: 0.55 },
    meanings: [{ quote: "Some days progress is just getting outside. This made that feel okay.", who: "30, Writer", theme: "Growth" }, { quote: "I felt like the whole street was cheering for me.", who: "30, Chef", theme: "Encouragement" } ]}
);
