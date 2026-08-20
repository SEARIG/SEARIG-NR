const canvas = document.querySelector("#spaceCanvas");
const ctx = canvas.getContext("2d");

const spriteImage = new Image();
spriteImage.src = "assets/nr-character-sprite.png";
const sideWalkImage = new Image();
sideWalkImage.src = "assets/nr-side-walk-sprite.png";

const spriteFrames = {
  ready: false,
  front: null,
  back: null,
  left: null,
  right: null,
  walkDown: [],
  walkLeft: [],
  walkRight: []
};

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
    moving: false,
    direction: "front"
  }
};

const spriteCrops = {
  front: { x: 94, y: 105, w: 160, h: 326 },
  back: { x: 402, y: 106, w: 170, h: 326 },
  left: { x: 704, y: 105, w: 146, h: 326 },
  right: { x: 990, y: 105, w: 146, h: 326 },
  walkDown: [
    { x: 132, y: 588, w: 176, h: 318 },
    { x: 405, y: 588, w: 176, h: 318 },
    { x: 682, y: 588, w: 176, h: 318 },
    { x: 960, y: 588, w: 176, h: 318 },
    { x: 1240, y: 588, w: 176, h: 318 }
  ],
  walkRight: [
    { x: 270, y: 110, w: 220, h: 318 },
    { x: 610, y: 110, w: 220, h: 318 },
    { x: 950, y: 110, w: 220, h: 318 },
    { x: 1290, y: 110, w: 220, h: 318 }
  ],
  walkLeft: [
    { x: 270, y: 535, w: 220, h: 318 },
    { x: 610, y: 535, w: 220, h: 318 },
    { x: 950, y: 535, w: 220, h: 318 },
    { x: 1290, y: 535, w: 220, h: 318 }
  ]
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
  const { x, y, moving, direction } = state.person;
  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.beginPath();
  ctx.ellipse(x, y + 25, 28, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  if (!spriteFrames.ready) return;

  let frame = spriteFrames.front;
  if (moving && direction === "front") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkDown.length;
    frame = spriteFrames.walkDown[index];
  } else if (moving && direction === "left") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkLeft.length;
    frame = spriteFrames.walkLeft[index];
  } else if (moving && direction === "right") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkRight.length;
    frame = spriteFrames.walkRight[index];
  } else if (direction === "back") {
    frame = spriteFrames.back;
  } else if (direction === "left") {
    frame = spriteFrames.left;
  } else if (direction === "right") {
    frame = spriteFrames.right;
  }

  const drawHeight = 128;
  const drawWidth = drawHeight * (frame.width / frame.height);
  const bob = moving ? Math.sin(state.time * 0.018) * 2 : 0;

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(frame, x - drawWidth / 2, y - drawHeight + 31 + bob, drawWidth, drawHeight);
  ctx.restore();
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
    if (Math.abs(x) > Math.abs(y)) {
      state.person.direction = x < 0 ? "left" : "right";
    } else {
      state.person.direction = y < 0 ? "back" : "front";
    }
  } else {
    state.person.moving = false;
  }

  state.person.x = Math.max(40, Math.min(state.width - 40, state.person.x));
  state.person.y = Math.max(80, Math.min(state.height - 46, state.person.y));
}

function prepareSpriteFrames() {
  if (!spriteImage.complete || !sideWalkImage.complete) return;
  spriteFrames.front = makeTransparentFrame(spriteImage, spriteCrops.front);
  spriteFrames.back = makeTransparentFrame(spriteImage, spriteCrops.back);
  spriteFrames.left = makeTransparentFrame(spriteImage, spriteCrops.left);
  spriteFrames.right = makeTransparentFrame(spriteImage, spriteCrops.right);
  spriteFrames.walkDown = spriteCrops.walkDown.map((crop) => makeTransparentFrame(spriteImage, crop));
  spriteFrames.walkLeft = spriteCrops.walkLeft.map((crop) => makeTransparentFrame(sideWalkImage, crop));
  spriteFrames.walkRight = spriteCrops.walkRight.map((crop) => makeTransparentFrame(sideWalkImage, crop));
  spriteFrames.ready = true;
}

function makeTransparentFrame(image, crop) {
  const frameCanvas = document.createElement("canvas");
  frameCanvas.width = crop.w;
  frameCanvas.height = crop.h;
  const frameCtx = frameCanvas.getContext("2d");
  frameCtx.drawImage(image, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);

  const imageData = frameCtx.getImageData(0, 0, crop.w, crop.h);
  const data = imageData.data;
  for (let index = 0; index < data.length; index += 4) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    if (r < 34 && g < 34 && b < 34) {
      data[index + 3] = 0;
    }
  }
  frameCtx.putImageData(imageData, 0, 0);
  return frameCanvas;
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
spriteImage.addEventListener("load", prepareSpriteFrames);
sideWalkImage.addEventListener("load", prepareSpriteFrames);
if (spriteImage.complete) prepareSpriteFrames();
if (sideWalkImage.complete) prepareSpriteFrames();
requestAnimationFrame(tick);
