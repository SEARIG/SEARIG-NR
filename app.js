const canvas = document.querySelector("#spaceCanvas");
const ctx = canvas.getContext("2d");

const spriteImage = new Image();
spriteImage.src = "assets/nr-character-sprite.png";
const sideWalkImage = new Image();
sideWalkImage.src = "assets/nr-side-walk-sprite.png";
const backWalkImage = new Image();
backWalkImage.src = "assets/nr-back-walk-sprite.png";
const diagonalWalkImage = new Image();
diagonalWalkImage.src = "assets/nr-diagonal-walk-sprite.png";

const spriteFrames = {
  ready: false,
  front: null,
  back: null,
  left: null,
  right: null,
  walkDown: [],
  walkLeft: [],
  walkRight: [],
  walkBack: [],
  walkUpRight: [],
  walkUpLeft: [],
  walkDownLeft: [],
  walkDownRight: []
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
  ],
  walkBack: [
    { x: 80, y: 170, w: 230, h: 490 },
    { x: 430, y: 170, w: 230, h: 490 },
    { x: 780, y: 170, w: 230, h: 490 },
    { x: 1130, y: 170, w: 230, h: 490 },
    { x: 1480, y: 170, w: 230, h: 490 }
  ],
  walkUpRight: [
    { x: 58, y: 160, w: 128, h: 236 },
    { x: 190, y: 160, w: 128, h: 236 },
    { x: 320, y: 160, w: 128, h: 236 },
    { x: 452, y: 160, w: 128, h: 236 },
    { x: 584, y: 160, w: 128, h: 236 }
  ],
  walkUpLeft: [
    { x: 796, y: 160, w: 128, h: 236 },
    { x: 928, y: 160, w: 128, h: 236 },
    { x: 1060, y: 160, w: 128, h: 236 },
    { x: 1192, y: 160, w: 128, h: 236 },
    { x: 1324, y: 160, w: 128, h: 236 }
  ],
  walkDownLeft: [
    { x: 50, y: 600, w: 140, h: 236 },
    { x: 182, y: 600, w: 140, h: 236 },
    { x: 315, y: 600, w: 140, h: 236 },
    { x: 448, y: 600, w: 140, h: 236 },
    { x: 580, y: 600, w: 140, h: 236 }
  ],
  walkDownRight: [
    { x: 785, y: 600, w: 140, h: 236 },
    { x: 918, y: 600, w: 140, h: 236 },
    { x: 1050, y: 600, w: 140, h: 236 },
    { x: 1183, y: 600, w: 140, h: 236 },
    { x: 1316, y: 600, w: 140, h: 236 }
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
  drawPlain();
}

function drawPlain() {
  const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
  gradient.addColorStop(0, "#141a24");
  gradient.addColorStop(0.55, "#111721");
  gradient.addColorStop(1, "#0b111a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  const gridSize = 64;
  for (let x = 0; x <= state.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, state.height);
    ctx.stroke();
  }
  for (let y = 0; y <= state.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(state.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPerson() {
  const { x, y, moving, direction } = state.person;

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
  } else if (moving && direction === "back") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkBack.length;
    frame = spriteFrames.walkBack[index];
  } else if (moving && direction === "upRight") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkUpRight.length;
    frame = spriteFrames.walkUpRight[index];
  } else if (moving && direction === "upLeft") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkUpLeft.length;
    frame = spriteFrames.walkUpLeft[index];
  } else if (moving && direction === "downLeft") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkDownLeft.length;
    frame = spriteFrames.walkDownLeft[index];
  } else if (moving && direction === "downRight") {
    const index = Math.floor(state.time / 120) % spriteFrames.walkDownRight.length;
    frame = spriteFrames.walkDownRight[index];
  } else if (direction === "back") {
    frame = spriteFrames.back;
  } else if (direction === "left") {
    frame = spriteFrames.left;
  } else if (direction === "right") {
    frame = spriteFrames.right;
  } else if (direction === "upLeft") {
    frame = spriteFrames.left;
  } else if (direction === "upRight") {
    frame = spriteFrames.right;
  } else if (direction === "downLeft") {
    frame = spriteFrames.left;
  } else if (direction === "downRight") {
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
    if (x > 0 && y < 0) {
      state.person.direction = "upRight";
    } else if (x < 0 && y < 0) {
      state.person.direction = "upLeft";
    } else if (x < 0 && y > 0) {
      state.person.direction = "downLeft";
    } else if (x > 0 && y > 0) {
      state.person.direction = "downRight";
    } else if (Math.abs(x) > Math.abs(y)) {
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
  if (!spriteImage.complete || !sideWalkImage.complete || !backWalkImage.complete || !diagonalWalkImage.complete) return;
  spriteFrames.front = makeTransparentFrame(spriteImage, spriteCrops.front);
  spriteFrames.back = makeTransparentFrame(spriteImage, spriteCrops.back);
  spriteFrames.left = makeTransparentFrame(spriteImage, spriteCrops.left);
  spriteFrames.right = makeTransparentFrame(spriteImage, spriteCrops.right);
  spriteFrames.walkDown = spriteCrops.walkDown.map((crop) => makeTransparentFrame(spriteImage, crop));
  spriteFrames.walkLeft = spriteCrops.walkLeft.map((crop) => makeTransparentFrame(sideWalkImage, crop));
  spriteFrames.walkRight = spriteCrops.walkRight.map((crop) => makeTransparentFrame(sideWalkImage, crop));
  spriteFrames.walkBack = spriteCrops.walkBack.map((crop) => makeTransparentFrame(backWalkImage, crop));
  spriteFrames.walkUpRight = spriteCrops.walkUpRight.map((crop) => makeTransparentFrame(diagonalWalkImage, crop));
  spriteFrames.walkUpLeft = spriteCrops.walkUpLeft.map((crop) => makeTransparentFrame(diagonalWalkImage, crop));
  spriteFrames.walkDownLeft = spriteCrops.walkDownLeft.map((crop) => makeTransparentFrame(diagonalWalkImage, crop));
  spriteFrames.walkDownRight = spriteCrops.walkDownRight.map((crop) => makeTransparentFrame(diagonalWalkImage, crop));
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
  const transparent = new Uint8Array(crop.w * crop.h);
  const queue = [];
  const isProtectedCharacterPixel = (x, y) => {
    const dx = (x - crop.w / 2) / (crop.w * 0.34);
    const dy = (y - crop.h * 0.55) / (crop.h * 0.43);
    const hairDx = (x - crop.w / 2) / (crop.w * 0.3);
    const hairDy = (y - crop.h * 0.25) / (crop.h * 0.18);
    return dx * dx + dy * dy <= 1 || hairDx * hairDx + hairDy * hairDy <= 1;
  };
  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= crop.w || y >= crop.h) return;
    const pixel = y * crop.w + x;
    if (transparent[pixel]) return;
    if (isProtectedCharacterPixel(x, y)) return;
    const index = pixel * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    if (r > 34 || g > 34 || b > 34) return;
    transparent[pixel] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < crop.w; x += 1) {
    enqueue(x, 0);
    enqueue(x, crop.h - 1);
  }
  for (let y = 0; y < crop.h; y += 1) {
    enqueue(0, y);
    enqueue(crop.w - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  for (let pixel = 0; pixel < transparent.length; pixel += 1) {
    if (transparent[pixel]) data[pixel * 4 + 3] = 0;
  }
  removeBakedFootShadow(data, crop.w, crop.h);
  frameCtx.putImageData(imageData, 0, 0);
  return frameCanvas;
}

function removeBakedFootShadow(data, width, height) {
  const centerX = width / 2;
  const centerY = height * 0.9;
  const radiusX = width * 0.56;
  const radiusY = height * 0.14;
  const shadowTop = height * 0.68;

  for (let y = Math.floor(shadowTop); y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy > 1) continue;

      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = Math.max(r, g, b);
      const colorSpread = Math.max(r, g, b) - Math.min(r, g, b);
      const isNearFootCenter = Math.abs(x - centerX) < width * 0.22 && y < height * 0.84;

      if (!isNearFootCenter && brightness < 42 && colorSpread < 16) {
        data[index + 3] = 0;
      }
    }
  }
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
backWalkImage.addEventListener("load", prepareSpriteFrames);
diagonalWalkImage.addEventListener("load", prepareSpriteFrames);
if (spriteImage.complete) prepareSpriteFrames();
if (sideWalkImage.complete) prepareSpriteFrames();
if (backWalkImage.complete) prepareSpriteFrames();
if (diagonalWalkImage.complete) prepareSpriteFrames();
requestAnimationFrame(tick);
