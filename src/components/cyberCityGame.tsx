import React, { useRef, useEffect, useState } from "react";

export default function CyberpunkBikeGame() {
  const canvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const frameRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);

  const imagesRef = useRef({});

  const restart = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const stopGame = () => {
    setGameStarted(false);
    if (gainRef.current) gainRef.current.gain.value = 0;
    if (audioCtxRef.current) audioCtxRef.current.suspend();
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!gameStarted) return;

    // ---------------- IMAGES ----------------
    const load = (src) => {
      const img = new Image();
      img.src = src;
      return img;
    };

    imagesRef.current = {
      bike: load("/bike.png"),
      car: load("/car.png"),
      cop: load("/cop.png"),
      human: load("/human.png"),
    };

    // ---------------- GAME STATE ----------------
    let localScore = 0;

    const bike = {
      x: 140,
      y: 520,
      width: 22,
      height: 34,
    };

    let obstacles = [];
    let speed = 2.5;
    let isDragging = false;
    const keys = {};

    // ---------------- AUDIO ----------------
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.value = 120;
    gain.gain.value = 0.02;

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start();

    audioCtxRef.current = audioCtx;
    gainRef.current = gain;

    // ---------------- CONTROLS ----------------
    const moveBike = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;

      // smooth movement instead of teleport
      bike.x += (x - bike.width / 2 - bike.x) * 0.3;
    };

    const handleKeyDown = (e) => (keys[e.code] = true);
    const handleKeyUp = (e) => (keys[e.code] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      moveBike(e.clientX);
    });

    canvas.addEventListener("mousemove", (e) => {
      if (isDragging) moveBike(e.clientX);
    });

    window.addEventListener("mouseup", () => (isDragging = false));

    canvas.addEventListener("touchstart", (e) => {
      isDragging = true;
      moveBike(e.touches[0].clientX);
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (isDragging) moveBike(e.touches[0].clientX);
    });

    window.addEventListener("touchend", () => (isDragging = false));

    // ---------------- SPAWN ----------------
    const spawnObstacle = () => {
      const r = Math.random();
      let type = "car";
      if (r < 0.33) type = "car";
      else if (r < 0.66) type = "cop";
      else type = "human";

      obstacles.push({
        x: Math.random() * (canvas.width - 24),
        y: -40,
        width: 24,
        height: 34,
        type,
      });
    };

    // ---------------- DRAW ----------------
    const drawEnemy = (o) => {
      const img = imagesRef.current[o.type];
      if (img) ctx.drawImage(img, o.x, o.y, o.width, o.height);
    };

    const drawBike = () => {
      const img = imagesRef.current.bike;
      if (img) ctx.drawImage(img, bike.x, bike.y, bike.width, bike.height);
    };

    // ---------------- LOOP ----------------
    const update = () => {
      if (!gameStarted || gameOver) return;

      // background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#0f0c29");
      grad.addColorStop(1, "#24243e");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // controls keyboard
      if (!isDragging) {
        if (keys["ArrowLeft"]) bike.x -= 3.5;
        if (keys["ArrowRight"]) bike.x += 3.5;
      }

      // clamp
      bike.x = Math.max(0, Math.min(canvas.width - bike.width, bike.x));

      // bike
      drawBike();

      // spawn
      if (Math.random() < 0.04) spawnObstacle();

      // obstacles
      obstacles.forEach((o, i) => {
        o.y += speed;
        drawEnemy(o);

        // collision
        if (
          bike.x < o.x + o.width &&
          bike.x + bike.width > o.x &&
          bike.y < o.y + o.height &&
          bike.y + bike.height > o.y
        ) {
          setGameOver(true);
          setGameStarted(false);
          if (gainRef.current) gainRef.current.gain.value = 0;
          if (audioCtxRef.current) audioCtxRef.current.suspend();
        }

        // remove + score
        if (o.y > canvas.height) {
          obstacles.splice(i, 1);
          localScore++;
          setScore(localScore);
          speed += 0.03;
        }
      });

      // sound reacts
      if (gainRef.current) {
        gainRef.current.gain.value = 0.02 + speed * 0.003;
      }

      // score UI
      ctx.fillStyle = "white";
      ctx.font = "12px monospace";
      ctx.fillText(`Score: ${localScore}`, 10, 18);

      frameRef.current = requestAnimationFrame(update);
    };

    update();

    // ---------------- CLEANUP ----------------
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (oscillator) oscillator.stop();
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center p-4 bg-black text-white rounded-2xl">
      <h2 className="text-lg mb-2">🏍 Cyberpunk Bike Escape</h2>

      <canvas
        ref={canvasRef}
        width={300}
        height={600}
        className="border border-gray-700"
      />

      <div className="flex gap-2 mt-3">
        {!gameStarted && (
          <button onClick={startGame} className="px-3 py-1 bg-cyan-500 rounded">
            Start
          </button>
        )}

        {gameStarted && (
          <button onClick={stopGame} className="px-3 py-1 bg-red-500 rounded">
            Stop
          </button>
        )}

        <button onClick={restart} className="px-3 py-1 bg-gray-700 rounded">
          Reset
        </button>
      </div>

      {gameOver && <p className="text-red-400 mt-2">Game Over</p>}

      <p className="text-xs text-gray-400 mt-2">
        Drag / touch / arrows to move
      </p>
    </div>
  );
}