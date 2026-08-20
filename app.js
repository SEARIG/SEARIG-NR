const canvas = document.querySelector("#playLayer");
const ctx = canvas.getContext("2d");
const hint = document.querySelector("#hint");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector("#modalClose");
const modalEyebrow = document.querySelector("#modalEyebrow");
const modalTitle = document.querySelector("#modalTitle");
const modalSummary = document.querySelector("#modalSummary");
const modalContent = document.querySelector("#modalContent");
const modalActions = document.querySelector("#modalActions");

const imageSize = { width: 1536, height: 1024 };

const projects = {
  library: {
    eyebrow: "Project Tree / Branch 01",
    title: "Library.exe",
    summary: "Comprehensive library management system with barcode, ISBN, issue/return, reports, and admin workflows.",
    cards: [
      ["Type", "Library Management System"],
      ["Features", "Barcode issue/return, smart catalog, due reminders, penalty tracking, reports"],
      ["Tech Stack", "HTML, CSS, JavaScript, PHP, MySQL"],
      ["Role", "Designed and built as a practical management platform"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG/Library.exe"]]
  },
  mlsu: {
    eyebrow: "Project Tree / Branch 02",
    title: "MLSU-LMS",
    summary: "Digital library ecosystem with student app, QR ID, automation, penalties, reminders, and Firebase workflows.",
    cards: [
      ["Type", "Digital Library Ecosystem"],
      ["Features", "Student app, QR identity, penalty automation, reminders"],
      ["Tech Stack", "HTML, CSS, JavaScript, Firebase"],
      ["Used Skills", "Firebase, frontend, automation, data modeling"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG/MLSU-LMS"]]
  },
  cms: {
    eyebrow: "Project Tree / Branch 03",
    title: "College CMS",
    summary: "Campus management system for college roles, attendance, timetable, messages, payroll, and admin records.",
    cards: [
      ["Type", "College Management System"],
      ["Features", "Roles, attendance, timetable, messages, payroll"],
      ["Tech Stack", "Java, Firebase, XML, SQLite"],
      ["Platform", "Android and Firebase-backed workflows"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG/CMS-MLSU"]]
  },
  task48: {
    eyebrow: "Project Tree / Branch 04",
    title: "Task48",
    summary: "Task management and productivity platform for organizing, tracking, and achieving goals efficiently.",
    cards: [
      ["Type", "Productivity Platform"],
      ["Features", "Task planning, goal tracking, productivity dashboard"],
      ["Tech Stack", "HTML, CSS, JavaScript, PHP, MySQL"],
      ["Goal", "Help users organize work and complete targets"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG/Task48"]]
  },
  justlocalz: {
    eyebrow: "Project Tree / Branch 05",
    title: "JustLocalz",
    summary: "Local discovery platform concept for nearby places, community listings, services, and opportunities.",
    cards: [
      ["Type", "Local Discovery Platform"],
      ["Features", "Local listings, community discovery, mobile-first interface"],
      ["Tech Stack", "Web, Firebase, location UX"],
      ["Status", "Portfolio branch for the next product direction"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG"]]
  }
};

const details = {
  home: {
    eyebrow: "Home Base",
    title: "Welcome, Explorer!",
    summary: "You start at Home Base. Move with WASD, click any label, or use the top navigation areas.",
    cards: [
      ["Identity", "Nakul Rajawat · Full-Stack Developer · Problem Solver · AI Enthusiast"],
      ["Play Mode", "WASD to move, E to interact, Esc to close"],
      ["Quick Mode", "Click Home, About, Skills, Projects, Experience, or Contact in the top bar"],
      ["Goal", "Explore the portfolio like a game world"]
    ]
  },
  about: {
    eyebrow: "About Me",
    title: "About Me House",
    summary: "Developer studio with education, bio, diploma, interests, certificates, and current goals.",
    cards: [
      ["Education", "2nd year engineering student at IET, MLSU Udaipur"],
      ["Diploma", "Web Designing Diploma - 2023"],
      ["Interests", "Full-stack apps, Android/Firebase systems, AI-assisted development, Taekwondo"],
      ["Current Focus", "Building practical products and improving real-world project quality"]
    ]
  },
  skills: {
    eyebrow: "Tech Lab",
    title: "Skills & Tech Stack",
    summary: "The Tech Lab shows technologies by where they are used, not by fake percentage bars.",
    cards: [
      ["Frontend Station", "HTML, CSS, JavaScript, Tailwind, Bootstrap · used in Library.exe, MLSU-LMS, Task48"],
      ["Programming Station", "C, Java, Python, JavaScript, PHP · used across Android and web projects"],
      ["Database Station", "MySQL, SQL, Firebase, Firestore · used in LMS, CMS, JustLocalz"],
      ["AI Workstation", "Codex, Prompt Engineering, AI-assisted debugging and implementation"]
    ]
  },
  projects: {
    eyebrow: "Project Tree",
    title: "Project Tree",
    summary: "Each glowing branch is a project. Move close to a branch or click it to inspect the project.",
    cards: [
      ["Branch 01", "Library.exe"],
      ["Branch 02", "MLSU-LMS"],
      ["Branch 03", "College CMS"],
      ["Branch 04", "Task48"],
      ["Branch 05", "JustLocalz"]
    ]
  },
  experience: {
    eyebrow: "Career Road",
    title: "Developer Journey",
    summary: "Walk the road through the milestones that shaped the portfolio.",
    cards: [
      ["Started Coding", "Early experiments with websites and practical tools"],
      ["Web Designing Diploma - 2023", "Formal web design foundation"],
      ["Joined IET, MLSU", "Engineering path and stronger project direction"],
      ["Projects", "Task48, Library.exe, MLSU-LMS, College CMS, JustLocalz"],
      ["What's Next?", "Internships, collaborations, and bigger product builds"]
    ]
  },
  contact: {
    eyebrow: "Contact Tower",
    title: "Let's Connect",
    summary: "Open to remote opportunities, part-time development, internships, and collaborations.",
    cards: [
      ["Availability", "Remote opportunities, part-time development, internships, collaborations"],
      ["GitHub", "https://github.com/SEARIG"],
      ["LinkedIn", "Add your exact profile URL"],
      ["Email", "Replace searig.nr@example.com with your preferred email"]
    ],
    actions: [["GitHub", "https://github.com/SEARIG"], ["Resume", "resume.html"], ["Email", "mailto:searig.nr@example.com"]]
  },
  achievements: {
    eyebrow: "Achievements",
    title: "Certificates & Awards",
    summary: "A locked achievement zone for certificates, awards, and milestones.",
    cards: [
      ["Certificates", "Web Designing Diploma and future certificates"],
      ["Awards", "Add competition, academic, or coding achievements here"],
      ["Personal", "Taekwondo and consistent learning"],
      ["Unlock Next", "Add screenshots or certificate files when ready"]
    ]
  }
};

const hotspots = [
  { id: "home", kind: "location", x: 768, y: 610, r: 90 },
  { id: "about", kind: "location", x: 725, y: 155, r: 95 },
  { id: "skills", kind: "location", x: 474, y: 360, r: 95 },
  { id: "projects", kind: "location", x: 1245, y: 278, r: 120 },
  { id: "experience", kind: "location", x: 355, y: 602, r: 115 },
  { id: "contact", kind: "location", x: 1265, y: 625, r: 110 },
  { id: "achievements", kind: "location", x: 765, y: 835, r: 100 },
  { id: "library", kind: "project", x: 1060, y: 335, r: 70 },
  { id: "mlsu", kind: "project", x: 1130, y: 300, r: 80 },
  { id: "cms", kind: "project", x: 1040, y: 270, r: 70 },
  { id: "task48", kind: "project", x: 1190, y: 325, r: 70 },
  { id: "justlocalz", kind: "project", x: 1180, y: 242, r: 70 }
];

const navZones = [
  { id: "home", x1: 440, y1: 15, x2: 555, y2: 78 },
  { id: "about", x1: 558, y1: 15, x2: 664, y2: 78 },
  { id: "skills", x1: 665, y1: 15, x2: 772, y2: 78 },
  { id: "projects", x1: 773, y1: 15, x2: 900, y2: 78 },
  { id: "experience", x1: 901, y1: 15, x2: 1045, y2: 78 },
  { id: "contact", x1: 1046, y1: 15, x2: 1160, y2: 78 },
  { id: "contact", x1: 1310, y1: 15, x2: 1440, y2: 78 }
];

const player = {
  x: 770,
  y: 515,
  dx: 0,
  dy: 0,
  moving: false
};

const state = {
  width: 0,
  height: 0,
  dpr: 1,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  cameraX: player.x,
  cameraY: player.y,
  time: 0,
  last: 0,
  keys: new Set(),
  pointer: { x: -1, y: -1 },
  hover: null,
  modalOpen: false
};

const mapImage = new Image();
mapImage.src = "assets/portfolio-game-map.png";

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

  updateCamera();
}

function imageToScreen(x, y) {
  return {
    x: state.offsetX + x * state.scale,
    y: state.offsetY + y * state.scale
  };
}

function screenToImage(x, y) {
  return {
    x: (x - state.offsetX) / state.scale,
    y: (y - state.offsetY) / state.scale
  };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function nearestHotspot() {
  return hotspots
    .map((hotspot) => ({ hotspot, d: distance(player, hotspot) }))
    .sort((a, b) => a.d - b.d)[0];
}

function findHotspotAt(point) {
  return hotspots.find((hotspot) => distance(point, hotspot) <= hotspot.r);
}

function findNavAt(point) {
  return navZones.find((zone) => point.x >= zone.x1 && point.x <= zone.x2 && point.y >= zone.y1 && point.y <= zone.y2);
}

function movePlayer(delta) {
  let x = 0;
  let y = 0;
  if (state.keys.has("w")) y -= 1;
  if (state.keys.has("s")) y += 1;
  if (state.keys.has("a")) x -= 1;
  if (state.keys.has("d")) x += 1;

  if (x || y) {
    const length = Math.hypot(x, y);
    const speed = (state.keys.has("shift") ? 250 : 150) * delta / 1000;
    player.x += x / length * speed;
    player.y += y / length * speed;
    player.moving = true;
    showHint("Press E near a label to interact.");
  } else {
    player.moving = false;
  }

  player.x = Math.max(80, Math.min(1455, player.x));
  player.y = Math.max(85, Math.min(955, player.y));
}

function updateCamera() {
  const base = Math.max(state.width / imageSize.width, state.height / imageSize.height);
  const zoom = state.width < 760 ? 1.42 : 1.28;
  state.scale = base * zoom;

  const visibleW = state.width / state.scale;
  const visibleH = state.height / state.scale;
  state.cameraX += (player.x - 165 - state.cameraX) * 0.09;
  state.cameraY += (player.y - 55 - state.cameraY) * 0.09;
  state.cameraX = Math.max(visibleW / 2, Math.min(imageSize.width - visibleW / 2, state.cameraX));
  state.cameraY = Math.max(visibleH / 2, Math.min(imageSize.height - visibleH / 2, state.cameraY));
  state.offsetX = state.width / 2 - state.cameraX * state.scale;
  state.offsetY = state.height / 2 - state.cameraY * state.scale;
}

function drawMap() {
  if (!mapImage.complete) return;
  ctx.drawImage(
    mapImage,
    state.offsetX,
    state.offsetY,
    imageSize.width * state.scale,
    imageSize.height * state.scale
  );
  patchStaticPlayer();
  drawProjectExperienceStats();
}

function patchStaticPlayer() {
  if (!mapImage.complete) return;
  if (Math.hypot(player.x - 770, player.y - 515) < 12) return;
  drawImagePatch(820, 452, 74, 94, 728, 452, 74, 94);
  const p = imageToScreen(728, 452);
  const s = state.scale;
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#2f6f35";
  ctx.fillRect(p.x + 6 * s, p.y + 46 * s, 55 * s, 33 * s);
  ctx.fillStyle = "#8c6b3e";
  ctx.fillRect(p.x + 8 * s, p.y + 10 * s, 58 * s, 38 * s);
  ctx.restore();
}

function drawImagePatch(sx, sy, sw, sh, dx, dy, dw, dh) {
  const p = imageToScreen(dx, dy);
  ctx.drawImage(mapImage, sx, sy, sw, sh, p.x, p.y, dw * state.scale, dh * state.scale);
}

function drawProjectExperienceStats() {
  const p = imageToScreen(32, 286);
  const s = state.scale;
  ctx.save();
  ctx.fillStyle = "rgba(3, 8, 14, 0.86)";
  roundRect(p.x, p.y, 300 * s, 86 * s, 8 * s);
  ctx.fill();

  ctx.fillStyle = "#ffd35a";
  ctx.shadowColor = "rgba(255, 211, 90, 0.7)";
  ctx.shadowBlur = 8 * s;
  ctx.font = `900 ${25 * s}px Inter, sans-serif`;
  ctx.textBaseline = "top";
  ctx.fillText("★★★★★", p.x + 8 * s, p.y + 6 * s);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = `800 ${13 * s}px Inter, sans-serif`;
  ctx.fillText("5 Major Projects", p.x + 8 * s, p.y + 38 * s);

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  roundRect(p.x + 8 * s, p.y + 62 * s, 178 * s, 9 * s, 5 * s);
  ctx.fill();
  ctx.fillStyle = "#7dff5b";
  roundRect(p.x + 8 * s, p.y + 62 * s, 132 * s, 9 * s, 5 * s);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = `800 ${11 * s}px Inter, sans-serif`;
  ctx.fillText("3-4 yrs developing", p.x + 196 * s, p.y + 58 * s);
  ctx.restore();
}

function drawPlayer() {
  const p = imageToScreen(player.x, player.y);
  const s = Math.max(0.62, state.scale * 0.82);
  const step = Math.sin(state.time * (player.moving ? 0.018 : 0.006));

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(s, s);

  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.ellipse(0, 30, 20, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#10131a";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-5, 6);
  ctx.lineTo(-10 - 6 * step, 25);
  ctx.moveTo(5, 6);
  ctx.lineTo(10 + 6 * step, 25);
  ctx.stroke();

  ctx.strokeStyle = "#e5b084";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-12, -8);
  ctx.lineTo(-20 - 4 * step, 7);
  ctx.moveTo(12, -8);
  ctx.lineTo(20 + 4 * step, 7);
  ctx.stroke();

  ctx.fillStyle = "#172232";
  pixelRect(-12, -23, 24, 34);
  ctx.fillStyle = "#243a55";
  pixelRect(-8, -19, 16, 24);
  ctx.fillStyle = "#1e2632";
  pixelRect(-9, 11, 8, 18);
  pixelRect(1, 11, 8, 18);

  ctx.fillStyle = "#f0b07e";
  pixelRect(-10, -42, 20, 18);
  ctx.fillStyle = "#141014";
  pixelRect(-14, -50, 28, 14);
  pixelRect(-18, -42, 9, 18);
  pixelRect(9, -42, 9, 18);
  ctx.restore();
}

function pixelRect(x, y, w, h) {
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function drawOverlay() {
  ctx.clearRect(0, 0, state.width, state.height);
  drawMap();
  drawHover();
  drawPlayer();
}

function drawHover() {
  const pointerPoint = screenToImage(state.pointer.x, state.pointer.y);
  state.hover = findHotspotAt(pointerPoint) || findNavAt(pointerPoint);
  if (!state.hover || state.hover.x1 != null) return;

  const p = imageToScreen(state.hover.x, state.hover.y);
  ctx.save();
  ctx.strokeStyle = state.hover.kind === "project" ? "#94ff66" : "#25f2c1";
  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 18;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, state.hover.r * state.scale * 0.72, state.hover.r * state.scale * 0.34, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawInteractPrompt() {
  const nearest = nearestHotspot();
  if (!nearest || nearest.d > nearest.hotspot.r + 35 || state.modalOpen) return;
  const target = nearest.hotspot;
  const p = imageToScreen(target.x, target.y - target.r - 16);
  const title = target.kind === "project" ? projects[target.id].title : details[target.id].title;

  ctx.save();
  ctx.font = "800 14px Inter, sans-serif";
  const text = `${title}  [E] Interact`;
  const w = ctx.measureText(text).width + 28;
  roundRect(p.x - w / 2, p.y - 18, w, 36, 8);
  ctx.fillStyle = "rgba(2, 7, 13, 0.82)";
  ctx.fill();
  ctx.strokeStyle = "#25f2c1";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, p.x, p.y);
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function interactWith(hotspot) {
  if (!hotspot) {
    const nearest = nearestHotspot();
    if (!nearest || nearest.d > nearest.hotspot.r + 45) {
      showHint("Move closer to a location, branch, or tower.");
      return;
    }
    hotspot = nearest.hotspot;
  }

  if (hotspot.kind === "project") {
    openModal(projects[hotspot.id]);
  } else {
    openModal(details[hotspot.id]);
  }
}

function quickJump(id) {
  const target = hotspots.find((hotspot) => hotspot.id === id);
  if (!target) return;
  player.x = target.x;
  player.y = target.y + (id === "projects" ? 40 : 0);
  interactWith(target);
}

function openModal(data) {
  state.modalOpen = true;
  modalEyebrow.textContent = data.eyebrow;
  modalTitle.textContent = data.title;
  modalSummary.textContent = data.summary;
  modalContent.innerHTML = data.cards.map(([title, value]) => {
    return `<article class="info-card"><strong>${title}</strong><span>${value}</span></article>`;
  }).join("");
  const actions = data.actions || [["Return to World", "#close"]];
  modalActions.innerHTML = actions.map(([label, href]) => {
    if (href === "#close") return `<button type="button" data-close>${label}</button>`;
    return `<a href="${href}" target="${href.startsWith("http") ? "_blank" : "_self"}" rel="noreferrer">${label}</a>`;
  }).join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  hint.classList.add("is-hidden");
}

function closeModal() {
  state.modalOpen = false;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function showHint(message) {
  hint.textContent = message;
  hint.classList.remove("is-hidden");
  clearTimeout(showHint.timer);
  showHint.timer = setTimeout(() => hint.classList.add("is-hidden"), 1400);
}

function tick(time = 0) {
  const delta = Math.min(time - state.last, 40);
  state.time = time;
  state.last = time;
  if (!state.modalOpen) movePlayer(delta);
  updateCamera();
  drawOverlay();
  requestAnimationFrame(tick);
}

function bindEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d", "shift"].includes(key)) state.keys.add(key);
    if (key === "e") interactWith();
    if (key === "escape") closeModal();
  });
  window.addEventListener("keyup", (event) => {
    state.keys.delete(event.key.toLowerCase());
  });
  canvas.addEventListener("pointermove", (event) => {
    state.pointer = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointerdown", (event) => {
    const point = screenToImage(event.clientX, event.clientY);
    const nav = findNavAt(point);
    if (nav) {
      quickJump(nav.id);
      return;
    }
    const hotspot = findHotspotAt(point);
    if (hotspot) {
      player.x = hotspot.x;
      player.y = hotspot.y;
      interactWith(hotspot);
      return;
    }
    showHint("Click a label or move with WASD.");
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) closeModal();
  });
}

resize();
bindEvents();
mapImage.addEventListener("load", () => requestAnimationFrame(tick));
if (mapImage.complete) requestAnimationFrame(tick);
