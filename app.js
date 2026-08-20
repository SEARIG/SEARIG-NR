const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const distortion = document.querySelector("#distortion");
const startButton = document.querySelector("#startButton");
const sectionCard = document.querySelector("#sectionCard");
const themeToggle = document.querySelector("#themeToggle");
const projectsGrid = document.querySelector("#projectsGrid");
const navLinks = [...document.querySelectorAll("[data-jump]")];

const projects = [
  {
    title: "Library.exe",
    details: "Comprehensive library management system with barcode, ISBN, issue/return, reports, and admin workflows.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    link: "https://github.com/SEARIG/Library.exe",
    color: "#28f0b0"
  },
  {
    title: "MLSU-LMS",
    details: "Advanced library management system with student app, QR ID, automation, penalties, and reminders.",
    tags: ["HTML", "CSS", "JS", "Firebase"],
    link: "https://github.com/SEARIG/MLSU-LMS",
    color: "#2ad9ff"
  },
  {
    title: "College CMS",
    details: "Campus management system for college roles, attendance, timetable, messages, payroll, and admin records.",
    tags: ["Java", "Firebase", "XML", "SQLite"],
    link: "https://github.com/SEARIG/CMS-MLSU",
    color: "#ff9452"
  },
  {
    title: "Task48",
    details: "Task management and productivity platform for organizing, tracking, and achieving goals efficiently.",
    tags: ["HTML", "CSS", "JS", "PHP", "MySQL"],
    link: "https://github.com/SEARIG/Task48",
    color: "#ff4f9a"
  }
];

const zones = [
  { id: "home", label: "Home Base", x: 0.5, y: 0.6, text: "The starting point of the SEARIG-NR portfolio world.", icon: "⌂" },
  { id: "about", label: "About Me", x: 0.48, y: 0.25, text: "Student developer building practical web, mobile, and management tools.", icon: "◎" },
  { id: "skills", label: "Skills", x: 0.3, y: 0.42, text: "Frontend, backend, Android, Firebase, databases, and AI workflows.", icon: "</>" },
  { id: "projects", label: "Projects", x: 0.68, y: 0.42, text: "Major project islands: Library.exe, MLSU-LMS, College CMS, and Task48.", icon: "□" },
  { id: "experience", label: "Experience", x: 0.25, y: 0.68, text: "Hands-on work across full-stack systems and student-focused applications.", icon: "▣" },
  { id: "contact", label: "Contact", x: 0.72, y: 0.7, text: "Reach out for collaborations, feedback, and software ideas.", icon: "✈" }
];

let width = 0;
let height = 0;
let dpr = 1;
let pathIndex = 0;
let targetIndex = 0;
let runProgress = 0;
let running = false;
let lastTime = 0;
let pointer = { x: -1, y: -1 };
let hoverZone = null;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function mapPoint(zone) {
  return {
    x: zone.x * width,
    y: zone.y * height
  };
}

function drawDiamond(x, y, w, h, fill, stroke) {
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
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawGrid(time) {
  const spacing = Math.max(48, width / 28);
  ctx.save();
  ctx.translate(width / 2, height * 0.58);
  ctx.rotate(-Math.PI / 4);
  ctx.scale(1.8, 0.62);
  ctx.strokeStyle = "rgba(160, 58, 255, 0.24)";
  ctx.lineWidth = 1;
  const limit = Math.max(width, height);
  const offset = (time * 0.015) % spacing;
  for (let x = -limit; x <= limit; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x + offset, -limit);
    ctx.lineTo(x + offset, limit);
    ctx.stroke();
  }
  for (let y = -limit; y <= limit; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(-limit, y + offset);
    ctx.lineTo(limit, y + offset);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(177, 62, 255, 0.72)";
  for (let x = 0; x < width; x += spacing * 0.9) {
    for (let y = 0; y < height; y += spacing * 0.78) {
      const px = x + ((Math.floor(y / spacing) % 2) * spacing * 0.42);
      ctx.fillRect(px - 3, y - 1, 6, 2);
      ctx.fillRect(px - 1, y - 3, 2, 6);
    }
  }
  ctx.restore();
}

function drawIsland(time) {
  const cx = width * 0.52;
  const cy = height * 0.55;
  const scale = Math.min(width / 1500, height / 900);
  const islandW = Math.max(620 * scale, width * 0.42);
  const islandH = Math.max(360 * scale, height * 0.32);

  ctx.save();
  ctx.shadowColor = "rgba(255, 78, 156, 0.46)";
  ctx.shadowBlur = 28;
  drawDiamond(cx, cy + 18, islandW, islandH, "rgba(237, 94, 55, 0.72)", "rgba(255, 255, 255, 0.36)");
  ctx.shadowBlur = 0;

  for (let i = 0; i < 12; i++) {
    const y = cy - islandH / 2 + 32 + i * 28 * scale;
    ctx.strokeStyle = "rgba(255, 198, 136, 0.16)";
    ctx.beginPath();
    ctx.moveTo(cx - islandW / 2 + 50, y);
    ctx.lineTo(cx + islandW / 2 - 50, y);
    ctx.stroke();
  }

  for (let i = 0; i < 14; i++) {
    const x = cx - islandW / 2 + 52 + i * 42 * scale;
    ctx.strokeStyle = "rgba(255, 198, 136, 0.12)";
    ctx.beginPath();
    ctx.moveTo(x, cy - islandH / 2 + 28);
    ctx.lineTo(x, cy + islandH / 2 - 28);
    ctx.stroke();
  }

  drawRocks(cx, cy, islandW, islandH, time);
  drawTrees(cx, cy, islandW, islandH, time);
  drawLetters(cx, cy, scale, time);
  drawRover(cx - islandW * 0.18, cy - islandH * 0.05, scale, time);
  ctx.restore();
}

function drawRocks(cx, cy, iw, ih, time) {
  const rocks = [
    [-0.38, -0.12, 19], [-0.23, 0.31, 16], [0.18, -0.34, 17], [0.38, 0.2, 22],
    [-0.02, 0.38, 13], [0.28, -0.05, 15], [-0.42, 0.22, 14], [0.04, -0.28, 12]
  ];
  for (const [rx, ry, r] of rocks) {
    const x = cx + rx * iw;
    const y = cy + ry * ih;
    ctx.fillStyle = "rgba(78, 78, 151, 0.9)";
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * 1.2, y - r * 0.1);
    ctx.lineTo(x + r * 0.4, y + r);
    ctx.lineTo(x - r, y + r * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(98, 103, 255, 0.45)";
    ctx.fillRect(x - 2, y - r * 0.65, 4, 4 + Math.sin(time * 0.004 + rx) * 3);
  }
}

function drawTrees(cx, cy, iw, ih, time) {
  const trees = [
    [-0.44, -0.24], [-0.39, -0.19], [-0.34, -0.22], [-0.3, -0.17],
    [0.35, -0.18], [0.41, -0.16], [0.45, -0.1], [0.38, 0.3],
    [-0.32, 0.34], [-0.41, 0.27], [0.08, 0.42], [0.15, 0.37]
  ];
  for (const [tx, ty] of trees) {
    const x = cx + tx * iw;
    const y = cy + ty * ih;
    const sway = Math.sin(time * 0.002 + tx * 20) * 2;
    ctx.fillStyle = "rgba(54, 35, 77, 0.9)";
    ctx.fillRect(x - 4, y + 8, 8, 24);
    ctx.fillStyle = "rgba(251, 87, 112, 0.95)";
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(x + Math.cos(i) * 26 + sway, y - 12 + Math.sin(i * 1.7) * 18, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(171, 42, 182, 0.64)";
    ctx.beginPath();
    ctx.arc(x - 16 + sway, y + 4, 17, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLetters(cx, cy, scale, time) {
  ctx.save();
  ctx.translate(cx, cy + 122 * scale);
  ctx.rotate(-0.08);
  ctx.font = `900 ${Math.max(48, 84 * scale)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(19, 18, 78, 0.65)";
  ctx.fillText("SEARIG-NR", 0, 16);
  ctx.fillStyle = "#5357ff";
  ctx.shadowColor = "rgba(83, 87, 255, 0.9)";
  ctx.shadowBlur = 20 + Math.sin(time * 0.004) * 8;
  ctx.fillText("SEARIG-NR", 0, 0);
  ctx.restore();
}

function drawRover(x, y, scale, time) {
  const s = Math.max(0.55, scale);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.22);
  ctx.shadowColor = "rgba(255, 82, 40, 0.55)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "#221626";
  ctx.fillRect(-50 * s, -20 * s, 100 * s, 44 * s);
  ctx.fillStyle = "#ff3f3f";
  ctx.fillRect(-38 * s, -34 * s, 72 * s, 26 * s);
  ctx.fillStyle = "#10121b";
  ctx.fillRect(-24 * s, -29 * s, 44 * s, 12 * s);
  ctx.fillStyle = "#ffbd4d";
  for (let i = -1; i <= 1; i++) ctx.fillRect(i * 22 * s - 6 * s, -40 * s, 12 * s, 7 * s);
  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.arc(-38 * s, 28 * s, 15 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(38 * s, 28 * s, 15 * s, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#ff6b30";
  ctx.lineWidth = 5 * s;
  ctx.beginPath();
  ctx.moveTo(-50 * s, -4 * s);
  ctx.lineTo(48 * s, -4 * s);
  ctx.stroke();
  ctx.restore();
}

function drawZones(time) {
  hoverZone = null;
  for (const zone of zones) {
    const p = mapPoint(zone);
    const pulse = 1 + Math.sin(time * 0.004 + zone.x * 10) * 0.08;
    const dx = pointer.x - p.x;
    const dy = pointer.y - p.y;
    const isHover = Math.hypot(dx, dy) < 78;
    if (isHover) hoverZone = zone;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.shadowColor = isHover ? "rgba(255, 255, 255, 0.9)" : "rgba(40, 240, 176, 0.6)";
    ctx.shadowBlur = isHover ? 28 : 18;
    ctx.fillStyle = isHover ? "rgba(255, 255, 255, 0.18)" : "rgba(5, 8, 15, 0.72)";
    ctx.strokeStyle = isHover ? "#fff" : "rgba(40, 240, 176, 0.78)";
    ctx.lineWidth = 2;
    roundRect(-78 * pulse, -31, 156 * pulse, 62, 8);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#28f0b0";
    ctx.font = "800 19px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(zone.icon, -58, 4);
    ctx.fillStyle = "#fff";
    ctx.font = "900 15px Inter, sans-serif";
    ctx.fillText(zone.label.toUpperCase(), -22, -6);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.fillText(zone.id === "home" ? "Click to start" : "Discover zone", -22, 13);
    ctx.restore();
  }
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

function drawPath() {
  ctx.save();
  ctx.strokeStyle = "rgba(40, 240, 176, 0.36)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 16]);
  ctx.beginPath();
  zones.forEach((zone, index) => {
    const p = mapPoint(zone);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.restore();
}

function characterPosition() {
  const from = mapPoint(zones[pathIndex]);
  const to = mapPoint(zones[targetIndex]);
  return {
    x: from.x + (to.x - from.x) * runProgress,
    y: from.y + (to.y - from.y) * runProgress,
    angle: Math.atan2(to.y - from.y, to.x - from.x)
  };
}

function drawCharacter(time) {
  const p = characterPosition();
  const bob = Math.sin(time * 0.012) * 4;
  const step = Math.sin(time * 0.018);
  ctx.save();
  ctx.translate(p.x, p.y + bob);
  ctx.rotate(p.angle * 0.12);
  ctx.shadowColor = "rgba(42, 217, 255, 0.7)";
  ctx.shadowBlur = 18;

  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.beginPath();
  ctx.ellipse(0, 28, 26, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#11151f";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-6, 12);
  ctx.lineTo(-16 * step, 30);
  ctx.moveTo(7, 12);
  ctx.lineTo(16 * step, 31);
  ctx.stroke();

  ctx.strokeStyle = "#28f0b0";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-8, -5);
  ctx.lineTo(-22 * step, 7);
  ctx.moveTo(8, -5);
  ctx.lineTo(22 * step, 7);
  ctx.stroke();

  ctx.fillStyle = "#142033";
  roundRect(-13, -17, 26, 34, 8);
  ctx.fill();
  ctx.fillStyle = "#28f0b0";
  ctx.font = "900 11px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("NR", 0, 2);

  ctx.fillStyle = "#f2c4a4";
  ctx.beginPath();
  ctx.arc(0, -30, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#151019";
  ctx.beginPath();
  ctx.arc(0, -36, 12, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScene(time) {
  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, document.body.classList.contains("is-light") ? "#eaf7ff" : "#080b13");
  bg.addColorStop(0.52, document.body.classList.contains("is-light") ? "#f9eef8" : "#15091f");
  bg.addColorStop(1, document.body.classList.contains("is-light") ? "#ffe4c9" : "#2a1518");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawGrid(time);
  drawIsland(time);
  drawPath();
  drawZones(time);
  drawCharacter(time);
}

function animate(time = 0) {
  const delta = Math.min(time - lastTime, 40);
  lastTime = time;
  if (running) {
    runProgress += delta / 1350;
    if (runProgress >= 1) {
      pathIndex = targetIndex;
      runProgress = 0;
      running = false;
      updateCard(zones[pathIndex]);
      document.querySelector(`#${zones[pathIndex].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  drawScene(time);
  requestAnimationFrame(animate);
}

function setTarget(id) {
  const next = zones.findIndex((zone) => zone.id === id);
  if (next < 0) return;
  targetIndex = next;
  if (targetIndex === pathIndex) {
    updateCard(zones[pathIndex]);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  running = true;
  runProgress = 0;
  navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.jump === id));
}

function updateCard(zone) {
  sectionCard.innerHTML = `
    <p class="section-card__label">Current Zone</p>
    <h2>${zone.label}</h2>
    <p>${zone.text}</p>
  `;
}

function renderProjects() {
  projectsGrid.innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="project-card__visual" style="--project-color:${project.color}"></div>
      <h3>${project.title}</h3>
      <p>${project.details}</p>
      <div class="project-card__tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <a href="${project.link}" target="_blank" rel="noreferrer">View Project →</a>
    </article>
  `).join("");
}

function hideDistortion() {
  distortion.classList.add("is-hidden");
}

function initEvents() {
  startButton.addEventListener("click", () => {
    hideDistortion();
    setTarget("about");
  });

  distortion.addEventListener("click", hideDistortion);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("is-light");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      hideDistortion();
      setTarget(link.dataset.jump);
    });
  });

  canvas.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  });

  canvas.addEventListener("pointerdown", () => {
    if (hoverZone) {
      hideDistortion();
      setTarget(hoverZone.id);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") hideDistortion();
    if (event.key === "ArrowRight") setTarget(zones[(pathIndex + 1) % zones.length].id);
    if (event.key === "ArrowLeft") setTarget(zones[(pathIndex - 1 + zones.length) % zones.length].id);
  });
}

resize();
renderProjects();
initEvents();
window.addEventListener("resize", resize);
setTimeout(hideDistortion, 2600);
requestAnimationFrame(animate);
