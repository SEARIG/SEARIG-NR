const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");

const boot = document.querySelector("#boot");
const startButton = document.querySelector("#startButton");
const modeToggle = document.querySelector("#modeToggle");
const introPanel = document.querySelector(".intro-panel");
const locationPanel = document.querySelector("#locationPanel");
const drawer = document.querySelector("#drawer");
const drawerClose = document.querySelector("#drawerClose");
const drawerEyebrow = document.querySelector("#drawerEyebrow");
const drawerTitle = document.querySelector("#drawerTitle");
const drawerSummary = document.querySelector("#drawerSummary");
const drawerBody = document.querySelector("#drawerBody");
const drawerActions = document.querySelector("#drawerActions");
const toast = document.querySelector("#toast");
const avatarDot = document.querySelector("#avatarDot");
const statusLocation = document.querySelector("#statusLocation");
const quickItems = [...document.querySelectorAll("[data-jump]")];

const colors = {
  green: "#25f2b6",
  cyan: "#2dd9ff",
  violet: "#7252ff",
  pink: "#ff4f9c",
  amber: "#ffb35b",
  dark: "#0a0e18",
  tile: "#48315a",
  tile2: "#5b405f"
};

const projects = [
  {
    id: "library",
    title: "Library.exe",
    subtitle: "Library Management System",
    branch: "Branch 01",
    x: -210,
    y: -210,
    color: colors.green,
    summary: "Comprehensive library management system with barcode, ISBN, issue/return, reports, and admin workflows.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    features: ["Barcode issue and return", "Catalog and member records", "Admin reporting", "MySQL-backed workflows"],
    github: "https://github.com/SEARIG/Library.exe"
  },
  {
    id: "mlsu",
    title: "MLSU-LMS",
    subtitle: "Digital Library Ecosystem",
    branch: "Branch 02",
    x: -70,
    y: -295,
    color: colors.cyan,
    summary: "Advanced library ecosystem with student app, QR ID, automation, penalties, reminders, and Firebase workflows.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    features: ["Student app flow", "QR identity", "Penalty and reminder automation", "Firebase data model"],
    github: "https://github.com/SEARIG/MLSU-LMS"
  },
  {
    id: "cms",
    title: "College CMS",
    subtitle: "Campus Management System",
    branch: "Branch 03",
    x: 80,
    y: -285,
    color: colors.amber,
    summary: "College management system for roles, attendance, timetable, messages, payroll, and admin records.",
    tech: ["Java", "Firebase", "XML", "SQLite"],
    features: ["Role-based screens", "Attendance and timetable", "Messaging and payroll", "Android data storage"],
    github: "https://github.com/SEARIG/CMS-MLSU"
  },
  {
    id: "task48",
    title: "Task48",
    subtitle: "Productivity Platform",
    branch: "Branch 04",
    x: 215,
    y: -215,
    color: colors.pink,
    summary: "Task management and productivity platform for organizing, tracking, and achieving goals efficiently.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    features: ["Task planning", "Goal tracking", "Productivity dashboard", "Web app workflow"],
    github: "https://github.com/SEARIG/Task48"
  },
  {
    id: "justlocalz",
    title: "JustLocalz",
    subtitle: "Local Discovery Platform",
    branch: "Branch 05",
    x: 0,
    y: -395,
    color: "#b8ff5b",
    summary: "Local-first platform concept for discovering nearby places, services, and opportunities.",
    tech: ["Web", "Firebase", "Location UX", "Community"],
    features: ["Local discovery", "Community listings", "Firebase-ready data", "Mobile-friendly interface"],
    github: "https://github.com/SEARIG"
  }
];

const skillStations = [
  {
    id: "frontend",
    title: "Frontend Station",
    x: 345,
    y: -190,
    color: colors.green,
    skills: ["HTML", "CSS", "JavaScript", "Tailwind", "Bootstrap"],
    usedIn: ["Library.exe", "MLSU-LMS", "Task48"]
  },
  {
    id: "programming",
    title: "Programming Station",
    x: 475,
    y: -105,
    color: colors.cyan,
    skills: ["C", "Java", "Python", "JavaScript", "PHP"],
    usedIn: ["College CMS", "Library.exe", "Task48"]
  },
  {
    id: "database",
    title: "Database Station",
    x: 415,
    y: 45,
    color: colors.amber,
    skills: ["MySQL", "SQL", "Firebase", "Firestore"],
    usedIn: ["MLSU-LMS", "College CMS", "JustLocalz"]
  },
  {
    id: "mobile",
    title: "Mobile Station",
    x: 255,
    y: 60,
    color: colors.pink,
    skills: ["Android", "Java", "Firebase"],
    usedIn: ["MLSU-LMS", "College CMS"]
  },
  {
    id: "ai",
    title: "AI Workstation",
    x: 300,
    y: -55,
    color: colors.violet,
    skills: ["Codex", "Prompt Engineering", "AI-Assisted Development"],
    usedIn: ["Debugging", "Feature planning", "UI implementation"]
  }
];

const journey = [
  { title: "Started Coding", text: "Early experiments with websites and practical tools.", x: -455, y: 135 },
  { title: "Web Development", text: "Built interfaces and database-backed web flows.", x: -390, y: 230 },
  { title: "Web Designing Diploma - 2023", text: "Formal design foundation and web layout practice.", x: -300, y: 315 },
  { title: "Joined IET, MLSU", text: "Engineering path and stronger project direction.", x: -190, y: 380 },
  { title: "Task48", text: "Productivity and task management platform.", x: -55, y: 410 },
  { title: "Library.exe", text: "Library system with barcode and admin flows.", x: 90, y: 398 },
  { title: "MLSU-LMS", text: "Digital library ecosystem and student app work.", x: 220, y: 342 },
  { title: "College CMS", text: "Campus management and Android/Firebase systems.", x: 330, y: 255 },
  { title: "JustLocalz", text: "Local discovery idea and next platform direction.", x: 420, y: 145 },
  { title: "What's Next?", text: "Internships, collaborations, and bigger product builds.", x: 475, y: 20 }
];

const locations = [
  {
    id: "spawn",
    name: "Spawn / Home Base",
    x: 0,
    y: 95,
    radius: 86,
    color: colors.green,
    content: "Visitor spawns here; sees your name, developer title, and controls.",
    action: () => showGeneral("spawn")
  },
  {
    id: "about",
    name: "About Me House",
    x: -410,
    y: -115,
    radius: 92,
    color: colors.amber,
    content: "Walk inside the developer studio: education, diploma, bio, interests, and goals.",
    action: () => showGeneral("about")
  },
  {
    id: "skills",
    name: "Tech Lab",
    x: 365,
    y: -55,
    radius: 118,
    color: colors.cyan,
    content: "Interactive lab stations show where each technology was actually used.",
    action: () => showSkillStation(nearestSkillStation())
  },
  {
    id: "projects",
    name: "Project Tree",
    x: 0,
    y: -250,
    radius: 138,
    color: colors.green,
    content: "The glowing centerpiece. Each branch is a project you can explore.",
    action: () => showProject(nearestProject())
  },
  {
    id: "journey",
    name: "Career Road",
    x: -240,
    y: 315,
    radius: 118,
    color: colors.violet,
    content: "Follow the road through coding milestones, projects, and what comes next.",
    action: () => showGeneral("journey")
  },
  {
    id: "contact",
    name: "Contact Tower",
    x: 465,
    y: 145,
    radius: 98,
    color: colors.pink,
    content: "Email, GitHub, LinkedIn, resume, internships, collaborations, and availability.",
    action: () => showGeneral("contact")
  }
];

const forest = [
  [-520, -250], [-470, -315], [-420, -300], [-350, -350], [-265, -325], [-185, -365],
  [165, -360], [245, -345], [330, -325], [430, -265], [500, -205], [535, -105],
  [-540, -50], [-510, 50], [-485, 170], [-420, 265], [-350, 370], [-255, 420],
  [-95, 455], [15, 450], [145, 430], [260, 370], [380, 300], [500, 225],
  [-135, -140], [205, -135], [155, 120], [-95, 210], [20, 250], [95, 175]
];

const rocks = [
  [-455, -175], [-320, -60], [-225, -240], [-75, -340], [110, -150], [275, -245],
  [420, -5], [-500, 115], [-355, 165], [-175, 80], [-35, 330], [185, 290], [355, 125],
  [515, 60], [285, 410], [-285, 390]
];

const state = {
  width: 0,
  height: 0,
  dpr: 1,
  time: 0,
  last: 0,
  player: { x: 0, y: 95, tx: 0, ty: 95, moving: false, dir: 0 },
  camera: { x: 0, y: 60, zoom: 1 },
  pointer: { x: -999, y: -999 },
  keys: new Set(),
  playMode: false,
  activeLocation: locations[0],
  hoverTarget: null,
  drawerOpen: false
};

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function iso(x, y, z = 0) {
  const zoom = state.camera.zoom;
  return {
    x: state.width / 2 + (x - state.camera.x) * zoom + (y - state.camera.y) * 0.42 * zoom,
    y: state.height / 2 + (y - state.camera.y) * 0.46 * zoom - z * zoom
  };
}

function screenDistance(target) {
  const p = iso(target.x, target.y);
  return Math.hypot(state.pointer.x - p.x, state.pointer.y - p.y);
}

function distanceToPlayer(target) {
  return Math.hypot(state.player.x - target.x, state.player.y - target.y);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
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

function diamond(x, y, w, h, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y + h / 2);
  ctx.lineTo(x - w / 2, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawPixelTree(worldX, worldY, size = 1) {
  const p = iso(worldX, worldY, 10);
  const z = state.camera.zoom * size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(z, z);
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 24, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#4a3023";
  ctx.fillRect(-5, -2, 10, 30);
  ctx.fillStyle = "#103b2c";
  ctx.fillRect(-26, -18, 52, 18);
  ctx.fillStyle = "#165438";
  ctx.fillRect(-20, -35, 40, 20);
  ctx.fillStyle = "#1e7046";
  ctx.fillRect(-13, -50, 26, 18);
  ctx.fillStyle = "rgba(56, 168, 86, 0.8)";
  ctx.fillRect(8, -32, 10, 8);
  ctx.restore();
}

function drawRock(worldX, worldY, size = 1) {
  const p = iso(worldX, worldY, 5);
  const z = state.camera.zoom * size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(z, z);
  ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 23, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#6b7180";
  ctx.beginPath();
  ctx.moveTo(-20, 14);
  ctx.lineTo(-8, -12);
  ctx.lineTo(17, -8);
  ctx.lineTo(24, 10);
  ctx.lineTo(6, 22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#9ba4b4";
  ctx.beginPath();
  ctx.moveTo(-8, -12);
  ctx.lineTo(8, -8);
  ctx.lineTo(0, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(state.width * 0.5, state.height * 0.38, 80, state.width * 0.5, state.height * 0.55, state.width);
  gradient.addColorStop(0, "#16364a");
  gradient.addColorStop(0.5, "#061d34");
  gradient.addColorStop(1, "#031020");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.strokeStyle = "rgba(57, 159, 224, 0.28)";
  ctx.lineWidth = 2;
  for (let y = 80; y < state.height; y += 34) {
    const waveOffset = (state.time * 0.018 + y) % 90;
    for (let x = -120; x < state.width + 120; x += 90) {
      ctx.beginPath();
      ctx.moveTo(x + waveOffset, y);
      ctx.quadraticCurveTo(x + 22 + waveOffset, y - 8, x + 44 + waveOffset, y);
      ctx.quadraticCurveTo(x + 66 + waveOffset, y + 8, x + 88 + waveOffset, y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawIsland() {
  const center = iso(0, 35);
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
  ctx.shadowBlur = 42;
  diamond(center.x, center.y + 58, 1270 * state.camera.zoom, 760 * state.camera.zoom, "#1c5a35", "rgba(151, 232, 168, 0.28)");
  ctx.shadowBlur = 0;

  const glow = iso(0, 95);
  const grass = ctx.createRadialGradient(glow.x, glow.y, 20, glow.x, glow.y, 520 * state.camera.zoom);
  grass.addColorStop(0, "rgba(91, 170, 55, 0.8)");
  grass.addColorStop(0.46, "rgba(42, 111, 47, 0.55)");
  grass.addColorStop(1, "rgba(21, 73, 44, 0.25)");
  diamond(center.x, center.y + 34, 1110 * state.camera.zoom, 610 * state.camera.zoom, grass, "rgba(255, 255, 255, 0.08)");

  const streamA = [iso(-520, 20), iso(-370, 75), iso(-210, 30), iso(-40, 100), iso(90, 90)];
  const streamB = [iso(-390, 390), iso(-250, 275), iso(-100, 240), iso(80, 305), iso(250, 260)];
  [streamA, streamB].forEach((stream) => {
    ctx.strokeStyle = "rgba(57, 174, 229, 0.72)";
    ctx.lineWidth = 18 * state.camera.zoom;
    ctx.lineCap = "round";
    ctx.beginPath();
    stream.forEach((p, index) => {
      if (index === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.strokeStyle = "rgba(182, 240, 255, 0.34)";
    ctx.lineWidth = 3 * state.camera.zoom;
    ctx.stroke();
  });

  for (let x = -520; x <= 520; x += 80) {
    const a = iso(x, -340);
    const b = iso(x, 455);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (let y = -360; y <= 460; y += 80) {
    const a = iso(-560, y);
    const b = iso(560, y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDecorations() {
  forest.forEach(([x, y], index) => drawPixelTree(x, y, 0.75 + (index % 4) * 0.08));
  rocks.forEach(([x, y], index) => drawRock(x, y, 0.7 + (index % 3) * 0.12));
}

function drawRoad() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(129, 89, 55, 0.84)";
  ctx.lineWidth = 34 * state.camera.zoom;
  ctx.beginPath();
  journey.forEach((step, index) => {
    const p = iso(step.x, step.y);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.strokeStyle = "rgba(246, 198, 120, 0.32)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 14]);
  ctx.stroke();
  ctx.setLineDash([]);

  journey.forEach((step, index) => {
    const p = iso(step.x, step.y, 6);
    ctx.fillStyle = index === journey.length - 1 ? colors.pink : colors.violet;
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7 * state.camera.zoom, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    if (index % 2 === 0 || state.width > 1100) drawFloatingLabel(p.x, p.y - 30, step.title, "Journey", colors.violet, 0.82);
  });
  ctx.restore();
}

function drawSpawn() {
  const p = iso(0, 95);
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + 44 * state.camera.zoom, 118 * state.camera.zoom, 43 * state.camera.zoom, 0, 0, Math.PI * 2);
  ctx.fill();
  diamond(p.x, p.y + 35 * state.camera.zoom, 180 * state.camera.zoom, 85 * state.camera.zoom, "rgba(145, 128, 104, 0.8)", "rgba(255, 255, 255, 0.28)");
  ctx.fillStyle = colors.cyan;
  ctx.shadowColor = colors.cyan;
  ctx.shadowBlur = 26;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y - 44 * state.camera.zoom);
  ctx.lineTo(p.x + 19 * state.camera.zoom, p.y + 5 * state.camera.zoom);
  ctx.lineTo(p.x, p.y + 40 * state.camera.zoom);
  ctx.lineTo(p.x - 19 * state.camera.zoom, p.y + 5 * state.camera.zoom);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = colors.green;
  ctx.shadowBlur = 28;
  ctx.strokeStyle = "rgba(37, 242, 182, 0.88)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + 2, 105 * state.camera.zoom, 48 * state.camera.zoom, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  drawFloatingLabel(p.x, p.y - 78, "Spawn / Home Base", "Start here", colors.green);
  ctx.restore();
}

function drawAboutHouse() {
  const base = iso(-410, -115);
  const z = state.camera.zoom;
  ctx.save();
  ctx.translate(base.x, base.y);
  ctx.scale(z, z);
  ctx.shadowColor = "rgba(255, 179, 91, 0.5)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "#33223b";
  diamond(0, 28, 150, 74, "#4b3150", "#fff2");
  ctx.fillStyle = "#8e5268";
  ctx.fillRect(-58, -36, 116, 70);
  ctx.fillStyle = "#ffb35b";
  ctx.beginPath();
  ctx.moveTo(-72, -36);
  ctx.lineTo(0, -92);
  ctx.lineTo(72, -36);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#131522";
  ctx.fillRect(-18, -4, 36, 38);
  ctx.fillStyle = "#25f2b6";
  ctx.fillRect(26, -18, 22, 18);
  ctx.fillRect(-48, -18, 22, 18);
  ctx.restore();
  drawFloatingLabel(base.x, base.y - 114 * z, "About Me House", "Studio, education, interests", colors.amber);
}

function drawTechLab() {
  const base = iso(365, -55);
  const z = state.camera.zoom;
  ctx.save();
  ctx.translate(base.x, base.y);
  ctx.scale(z, z);
  ctx.shadowColor = "rgba(45, 217, 255, 0.46)";
  ctx.shadowBlur = 26;
  diamond(0, 42, 220, 120, "rgba(34, 66, 82, 0.9)", "rgba(45, 217, 255, 0.55)");
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#101827";
  ctx.fillRect(-82, -42, 164, 84);
  ctx.fillStyle = "#172b40";
  ctx.fillRect(-70, -30, 140, 60);
  ctx.strokeStyle = colors.cyan;
  ctx.lineWidth = 4;
  ctx.strokeRect(-70, -30, 140, 60);
  ctx.fillStyle = colors.green;
  ctx.font = "900 16px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("TECH LAB", 0, 5);
  ctx.restore();

  skillStations.forEach((station) => {
    const p = iso(station.x, station.y, 8);
    ctx.save();
    ctx.shadowColor = station.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(8, 13, 24, 0.88)";
    roundRect(p.x - 42, p.y - 24, 84, 48, 8);
    ctx.fill();
    ctx.strokeStyle = station.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = station.color;
    ctx.font = "900 10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(station.title.split(" ")[0].toUpperCase(), p.x, p.y + 4);
    ctx.restore();
  });
  drawFloatingLabel(base.x, base.y - 98 * z, "Tech Lab", "Approach a monitor", colors.cyan);
}

function drawProjectTree() {
  const trunk = iso(0, -250);
  const z = state.camera.zoom;
  ctx.save();
  ctx.translate(trunk.x, trunk.y);
  ctx.scale(z, z);
  ctx.shadowColor = "rgba(37, 242, 182, 0.46)";
  ctx.shadowBlur = 34;
  diamond(0, 116, 360, 170, "rgba(46, 104, 67, 0.78)", "rgba(37, 242, 182, 0.45)");
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#5a3a35";
  ctx.fillRect(-28, -35, 56, 155);
  ctx.fillStyle = "#2bdc86";
  for (let i = 0; i < 34; i++) {
    const angle = i * 1.73;
    const r = 32 + (i % 7) * 15;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * r, -70 + Math.sin(angle) * r * 0.58, 28 + (i % 4) * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  projects.forEach((project, index) => {
    const p = iso(project.x, project.y, 22);
    const start = iso(0, -250, 70);
    ctx.save();
    ctx.strokeStyle = project.color;
    ctx.globalAlpha = 0.72;
    ctx.lineWidth = 7 * z;
    ctx.shadowColor = project.color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo((start.x + p.x) / 2, Math.min(start.y, p.y) - 60 * z, p.x, p.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(8, 12, 22, 0.92)";
    roundRect(p.x - 76 * z, p.y - 30 * z, 152 * z, 60 * z, 8 * z);
    ctx.fill();
    ctx.strokeStyle = project.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = project.color;
    ctx.font = `900 ${11 * z}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(project.branch.toUpperCase(), p.x, p.y - 8 * z);
    ctx.fillStyle = "#fff";
    ctx.font = `900 ${14 * z}px Inter, sans-serif`;
    ctx.fillText(project.title, p.x, p.y + 12 * z);
    ctx.restore();
  });
  drawFloatingLabel(trunk.x, trunk.y - 155 * z, "Project Tree", "Branches are projects", colors.green);
}

function drawContactTower() {
  const p = iso(465, 145);
  const z = state.camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(z, z);
  ctx.shadowColor = colors.pink;
  ctx.shadowBlur = 24;
  diamond(0, 78, 135, 70, "rgba(88, 46, 73, 0.85)", "rgba(255, 79, 156, 0.5)");
  ctx.strokeStyle = "#e2e8ff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-36, 58);
  ctx.lineTo(0, -100);
  ctx.lineTo(36, 58);
  ctx.moveTo(-22, -28);
  ctx.lineTo(22, -28);
  ctx.moveTo(-12, -68);
  ctx.lineTo(12, -68);
  ctx.stroke();
  ctx.fillStyle = colors.pink;
  ctx.beginPath();
  ctx.arc(0, -112, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawFloatingLabel(p.x, p.y - 148 * z, "Contact Tower", "Let's build something", colors.pink);
}

function drawFloatingLabel(x, y, title, subtitle, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "rgba(5, 8, 16, 0.82)";
  roundRect(x - 105, y - 34, 210, 68, 8);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = "900 15px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, x, y - 6);
  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "700 11px Inter, sans-serif";
  ctx.fillText(subtitle, x, y + 14);
  ctx.restore();
}

function drawPlayer() {
  const p = iso(state.player.x, state.player.y, 20);
  const z = state.camera.zoom;
  const step = Math.sin(state.time * (state.player.moving ? 0.018 : 0.006));
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(z, z);
  ctx.shadowColor = colors.cyan;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.beginPath();
  ctx.ellipse(0, 38, 34, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#10131d";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-7, 8);
  ctx.lineTo(-15 * step, 32);
  ctx.moveTo(8, 8);
  ctx.lineTo(15 * step, 32);
  ctx.stroke();

  ctx.strokeStyle = colors.green;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-10, -8);
  ctx.lineTo(-23 * step, 7);
  ctx.moveTo(10, -8);
  ctx.lineTo(23 * step, 7);
  ctx.stroke();

  ctx.fillStyle = "#142034";
  roundRect(-15, -26, 30, 38, 8);
  ctx.fill();
  ctx.fillStyle = colors.green;
  ctx.font = "900 12px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("NR", 0, -2);
  ctx.fillStyle = "#f1c3a0";
  ctx.beginPath();
  ctx.arc(0, -42, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#17111a";
  ctx.beginPath();
  ctx.arc(0, -49, 13, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHotspot(location) {
  const p = iso(location.x, location.y, 5);
  const near = state.activeLocation?.id === location.id;
  const hover = state.hoverTarget?.type === "location" && state.hoverTarget.item.id === location.id;
  const pulse = 1 + Math.sin(state.time * 0.005) * 0.08;
  ctx.save();
  ctx.shadowColor = location.color;
  ctx.shadowBlur = near || hover ? 28 : 14;
  ctx.strokeStyle = location.color;
  ctx.globalAlpha = near || hover ? 0.86 : 0.38;
  ctx.lineWidth = near || hover ? 3 : 2;
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, location.radius * 0.68 * state.camera.zoom * pulse, location.radius * 0.28 * state.camera.zoom * pulse, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawWorld() {
  drawBackground();
  drawIsland();
  drawDecorations();
  drawRoad();
  locations.forEach(drawHotspot);
  drawAboutHouse();
  drawTechLab();
  drawProjectTree();
  drawSpawn();
  drawContactTower();
  drawPlayer();
}

function nearestLocation() {
  return locations
    .map((location) => ({ location, distance: distanceToPlayer(location) }))
    .sort((a, b) => a.distance - b.distance)[0];
}

function nearestProject() {
  return projects
    .map((project) => ({ project, distance: distanceToPlayer(project) }))
    .sort((a, b) => a.distance - b.distance)[0].project;
}

function nearestSkillStation() {
  return skillStations
    .map((station) => ({ station, distance: distanceToPlayer(station) }))
    .sort((a, b) => a.distance - b.distance)[0].station;
}

function updateActiveLocation() {
  const nearest = nearestLocation();
  const next = nearest.distance <= nearest.location.radius + 35 ? nearest.location : nearest.location;
  if (state.activeLocation?.id !== next.id) {
    state.activeLocation = next;
    updateLocationPanel(next);
  }
  updateMinimap();
}

function updateLocationPanel(location) {
  statusLocation.textContent = location.name.replace("Spawn / ", "");
  locationPanel.innerHTML = `
    <p class="eyebrow">Current Location</p>
    <h2>${location.name}</h2>
    <p>${location.content}</p>
    <div class="location-panel__hint">Press <kbd>E</kbd> to interact or use Quick Mode.</div>
  `;
  quickItems.forEach((item) => item.classList.toggle("is-active", item.dataset.jump === location.id));
}

function updateMinimap() {
  const left = 50 + state.player.x / 1100 * 70;
  const top = 50 + state.player.y / 830 * 70;
  avatarDot.style.left = `${Math.max(8, Math.min(92, left))}%`;
  avatarDot.style.top = `${Math.max(8, Math.min(92, top))}%`;
}

function updateMovement(delta) {
  let dx = 0;
  let dy = 0;
  if (state.keys.has("w")) dy -= 1;
  if (state.keys.has("s")) dy += 1;
  if (state.keys.has("a")) dx -= 1;
  if (state.keys.has("d")) dx += 1;

  if (state.playMode && (dx || dy) && !state.drawerOpen) {
    const length = Math.hypot(dx, dy);
    const speed = (state.keys.has("shift") ? 285 : 160) * delta / 1000;
    state.player.x += dx / length * speed;
    state.player.y += dy / length * speed;
    state.player.moving = true;
  } else if (state.player.moving) {
    const dist = Math.hypot(state.player.tx - state.player.x, state.player.ty - state.player.y);
    if (dist > 2) {
      const speed = 420 * delta / 1000;
      state.player.x += (state.player.tx - state.player.x) / dist * Math.min(speed, dist);
      state.player.y += (state.player.ty - state.player.y) / dist * Math.min(speed, dist);
    } else {
      state.player.x = state.player.tx;
      state.player.y = state.player.ty;
      state.player.moving = false;
    }
  } else {
    state.player.moving = false;
  }

  state.player.x = Math.max(-540, Math.min(540, state.player.x));
  state.player.y = Math.max(-430, Math.min(455, state.player.y));
  const targetZoom = state.width < 760 ? 0.72 : state.width < 1100 ? 0.86 : 1;
  state.camera.zoom = lerp(state.camera.zoom, targetZoom, 0.035);
  state.camera.x = lerp(state.camera.x, state.player.x, 0.055);
  state.camera.y = lerp(state.camera.y, state.player.y - 30, 0.055);
}

function updateHoverTarget() {
  const locationHits = locations
    .map((item) => ({ type: "location", item, distance: screenDistance(item) }))
    .filter((hit) => hit.distance < 75)
    .sort((a, b) => a.distance - b.distance);
  const projectHits = projects
    .map((item) => ({ type: "project", item, distance: screenDistance(item) }))
    .filter((hit) => hit.distance < 78)
    .sort((a, b) => a.distance - b.distance);
  const skillHits = skillStations
    .map((item) => ({ type: "skill", item, distance: screenDistance(item) }))
    .filter((hit) => hit.distance < 58)
    .sort((a, b) => a.distance - b.distance);
  state.hoverTarget = [...projectHits, ...skillHits, ...locationHits].sort((a, b) => a.distance - b.distance)[0] || null;
}

function flyTo(id) {
  const location = locations.find((item) => item.id === id);
  if (!location) return;
  hideBoot();
  introPanel.classList.toggle("is-minimized", id !== "spawn");
  state.player.tx = location.x;
  state.player.ty = location.y;
  state.player.moving = true;
  state.activeLocation = location;
  updateLocationPanel(location);
  showToast(`Flying to ${location.name}`);
}

function interact() {
  if (state.drawerOpen) return;
  const project = projects.find((item) => distanceToPlayer(item) < 96);
  if (project) {
    showProject(project);
    return;
  }
  const station = skillStations.find((item) => distanceToPlayer(item) < 86);
  if (station) {
    showSkillStation(station);
    return;
  }
  const nearest = nearestLocation();
  if (nearest.distance < nearest.location.radius + 70) {
    nearest.location.action();
    return;
  }
  showToast("Move closer to a glowing location, branch, or monitor.");
}

function showProject(project) {
  openDrawer({
    eyebrow: `Project Tree / ${project.branch}`,
    title: project.title,
    summary: `${project.subtitle}. ${project.summary}`,
    body: `
      <div class="detail-grid">
        <div class="detail-card"><strong>Features</strong><ul>${project.features.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="detail-card"><strong>Tech Stack</strong><span>${project.tech.join(" · ")}</span></div>
        <div class="detail-card"><strong>World Interaction</strong><span>Camera flies toward the branch, the world darkens, and this holographic project screen opens.</span></div>
        <div class="detail-card"><strong>Live Demo</strong><span>Add the live deployment URL when it is ready.</span></div>
      </div>
    `,
    actions: `<a href="${project.github}" target="_blank" rel="noreferrer">Open GitHub</a><button type="button" data-close-drawer>Return to World</button>`
  });
}

function showSkillStation(station) {
  openDrawer({
    eyebrow: "Tech Lab",
    title: station.title,
    summary: `${station.skills.join(" · ")}. This station explains where the technology appears in real projects.`,
    body: `
      <div class="detail-grid">
        <div class="detail-card"><strong>Skills</strong><span>${station.skills.join(" · ")}</span></div>
        <div class="detail-card"><strong>Used In</strong><ul>${station.usedIn.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div class="detail-card"><strong>Why it is here</strong><span>Skills are shown by real usage instead of fake percentage bars.</span></div>
        <div class="detail-card"><strong>Related Area</strong><span>Visit the Project Tree to inspect matching builds.</span></div>
      </div>
    `,
    actions: `<button type="button" data-jump-drawer="projects">View related projects</button><button type="button" data-close-drawer>Return to World</button>`
  });
}

function showGeneral(type) {
  const content = {
    spawn: {
      eyebrow: "Spawn / Home Base",
      title: "Welcome to SEARIG-NR",
      summary: "Start here, learn the controls, then explore the island in Play Mode or Quick Mode.",
      cards: [
        ["Identity", "Nakul Rajawat · Software Developer · Full-Stack Developer · AI Enthusiast"],
        ["Controls", "WASD move · Shift run · E interact · ESC close · menu for quick travel"],
        ["Goal", "Make the portfolio feel like a world, not a generic card layout."],
        ["Next Stop", "Project Tree is the main centerpiece."]
      ]
    },
    about: {
      eyebrow: "About Me House",
      title: "Developer Studio",
      summary: "A warmer personal room for education, diploma, goals, and interests.",
      cards: [
        ["Education", "2nd year engineering student at IET, MLSU Udaipur."],
        ["Diploma", "Web Designing Diploma - 2023."],
        ["Interests", "Full-stack development, Android/Firebase systems, AI-assisted development, and practical software."],
        ["Details", "Desk: development setup · Wall: education · Shelf: certificates · Trophy: Taekwondo · Laptop: resume · Whiteboard: current goals."]
      ]
    },
    journey: {
      eyebrow: "Career Road",
      title: "Developer Journey",
      summary: "A road through the environment where projects become more sophisticated as the visitor progresses.",
      cards: journey.map((step) => [step.title, step.text])
    },
    contact: {
      eyebrow: "Contact Tower",
      title: "Let's Build Something.",
      summary: "Open to remote opportunities, part-time development, internships, and collaborations.",
      cards: [
        ["Availability", "Remote opportunities · Part-time development · Internships · Collaborations"],
        ["GitHub", "https://github.com/SEARIG"],
        ["LinkedIn", "Add your exact LinkedIn profile URL when ready."],
        ["Email", "Replace searig.nr@example.com with your preferred email."]
      ],
      actions: `<a href="https://github.com/SEARIG" target="_blank" rel="noreferrer">GitHub</a><a href="resume.html">Resume</a><a href="mailto:searig.nr@example.com">Email</a>`
    }
  }[type];

  openDrawer({
    eyebrow: content.eyebrow,
    title: content.title,
    summary: content.summary,
    body: `<div class="detail-grid">${content.cards.map(([title, text]) => `<div class="detail-card"><strong>${title}</strong><span>${text}</span></div>`).join("")}</div>`,
    actions: content.actions || `<button type="button" data-close-drawer>Return to World</button>`
  });
}

function openDrawer({ eyebrow, title, summary, body, actions }) {
  state.drawerOpen = true;
  drawerEyebrow.textContent = eyebrow;
  drawerTitle.textContent = title;
  drawerSummary.textContent = summary;
  drawerBody.innerHTML = body;
  drawerActions.innerHTML = actions;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  state.drawerOpen = false;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1500);
}

function hideBoot() {
  boot.classList.add("is-hidden");
}

function bindEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d", "shift"].includes(key)) state.keys.add(key);
    if (key === "e") interact();
    if (key === "escape") closeDrawer();
  });
  window.addEventListener("keyup", (event) => {
    state.keys.delete(event.key.toLowerCase());
  });
  canvas.addEventListener("pointermove", (event) => {
    state.pointer = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointerdown", () => {
    hideBoot();
    if (!state.hoverTarget) {
      showToast("Click a glowing label, branch, or lab monitor.");
      return;
    }
    const { type, item } = state.hoverTarget;
    if (type === "project") {
      state.player.x = item.x;
      state.player.y = item.y;
      showProject(item);
    } else if (type === "skill") {
      state.player.x = item.x;
      state.player.y = item.y;
      showSkillStation(item);
    } else {
      flyTo(item.id);
    }
  });
  startButton.addEventListener("click", () => flyTo("about"));
  modeToggle.addEventListener("click", () => {
    state.playMode = !state.playMode;
    modeToggle.textContent = state.playMode ? "Quick Mode" : "Play Mode";
    modeToggle.setAttribute("aria-pressed", String(state.playMode));
    showToast(state.playMode ? "Play Mode on: use WASD." : "Quick Mode on: use menu.");
  });
  quickItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      flyTo(item.dataset.jump);
    });
  });
  drawerClose.addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (event) => {
    const close = event.target.closest("[data-close-drawer]");
    const jump = event.target.closest("[data-jump-drawer]");
    if (close) closeDrawer();
    if (jump) {
      closeDrawer();
      flyTo(jump.dataset.jumpDrawer);
    }
  });
  boot.addEventListener("click", hideBoot);
}

function tick(time = 0) {
  const delta = Math.min(time - state.last, 40);
  state.time = time;
  state.last = time;
  updateMovement(delta);
  updateHoverTarget();
  updateActiveLocation();
  drawWorld();
  requestAnimationFrame(tick);
}

resize();
bindEvents();
updateLocationPanel(locations[0]);
setTimeout(hideBoot, 2300);
requestAnimationFrame(tick);
