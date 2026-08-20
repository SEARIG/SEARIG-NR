const canvas = document.querySelector("#spaceCanvas");
const ctx = canvas.getContext("2d");

const state = {
  width: 0,
  height: 0,
  dpr: 1,
  time: 0,
  last: 0,
  keys: new Set(),
  person: {
    x: 0,
    y: 0,
    moving: false
  }
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

  if (state.person.x === 0 && state.person.y === 0) {
    state.person.x = state.width / 2;
    state.person.y = state.height / 2;
  }
}

function drawSpace() {
  const gradient = ctx.createRadialGradient(
    state.width / 2,
    state.height / 2,
    40,
    state.width / 2,
    state.height / 2,
    Math.max(state.width, state.height) * 0.72
  );
  gradient.addColorStop(0, "#101827");
  gradient.addColorStop(1, "#06080e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
  ctx.lineWidth = 1;
  const grid = 54;
  const offset = (state.time * 0.012) % grid;
  for (let x = -grid; x <= state.width + grid; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, state.height);
    ctx.stroke();
  }
  for (let y = -grid; y <= state.height + grid; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(state.width, y + offset);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(37, 242, 193, 0.28)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 16]);
  ctx.beginPath();
  ctx.ellipse(state.width / 2, state.height / 2 + 26, 150, 62, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPerson() {
  const { x, y, moving } = state.person;
  const step = Math.sin(state.time * (moving ? 0.018 : 0.006));

  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.beginPath();
  ctx.ellipse(0, 31, 22, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#10131a";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-5, 6);
  ctx.lineTo(-10 - 6 * step, 26);
  ctx.moveTo(5, 6);
  ctx.lineTo(10 + 6 * step, 26);
  ctx.stroke();

  ctx.strokeStyle = "#e5b084";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-12, -8);
  ctx.lineTo(-20 - 4 * step, 8);
  ctx.moveTo(12, -8);
  ctx.lineTo(20 + 4 * step, 8);
  ctx.stroke();

  ctx.fillStyle = "#172232";
  pixelRect(-12, -24, 24, 35);
  ctx.fillStyle = "#243a55";
  pixelRect(-8, -20, 16, 25);
  ctx.fillStyle = "#1e2632";
  pixelRect(-9, 11, 8, 18);
  pixelRect(1, 11, 8, 18);

  ctx.fillStyle = "#f0b07e";
  pixelRect(-10, -43, 20, 18);
  ctx.fillStyle = "#141014";
  pixelRect(-14, -51, 28, 14);
  pixelRect(-18, -43, 9, 18);
  pixelRect(9, -43, 9, 18);

  ctx.restore();
}

function pixelRect(x, y, w, h) {
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function update(delta) {
  let x = 0;
  let y = 0;
  if (state.keys.has("w")) y -= 1;
  if (state.keys.has("s")) y += 1;
  if (state.keys.has("a")) x -= 1;
  if (state.keys.has("d")) x += 1;

  if (x || y) {
    const length = Math.hypot(x, y);
    const speed = (state.keys.has("shift") ? 280 : 165) * delta / 1000;
    state.person.x += x / length * speed;
    state.person.y += y / length * speed;
    state.person.moving = true;
  } else {
    state.person.moving = false;
  }

  state.person.x = Math.max(40, Math.min(state.width - 40, state.person.x));
  state.person.y = Math.max(80, Math.min(state.height - 46, state.person.y));
}

function tick(time = 0) {
  const delta = Math.min(time - state.last, 40);
  state.time = time;
  state.last = time;
  update(delta);
  drawSpace();
  drawPerson();
  requestAnimationFrame(tick);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["w", "a", "s", "d", "shift"].includes(key)) state.keys.add(key);
});
window.addEventListener("keyup", (event) => {
  state.keys.delete(event.key.toLowerCase());
});

resize();
requestAnimationFrame(tick);
