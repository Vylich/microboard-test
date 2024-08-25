import React, { useRef, useEffect } from "react";

const GameCanvas = ({ players, onPlayerSelect }) => {
  const canvasRef = useRef(null);
  const lastShotTimeRef1 = useRef(0);
  const lastShotTimeRef2 = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer(ctx, players.player1);
      updateBullets(ctx, players.player1, lastShotTimeRef1);
      movePlayer(players.player1);

      drawPlayer(ctx, players.player2);
      updateBullets(ctx, players.player2, lastShotTimeRef2);
      movePlayer(players.player2);

      drawScore(ctx);
      requestAnimationFrame(update);
    };

    update();
  }, [players.player1, players.player2]);

  const drawPlayer = (ctx, player) => {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.stroke();
  };

  const detectCollision = (bullet, player) => {
    const dx = bullet.x - player.x;
    const dy = bullet.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20 + 5;
  };

  const updateBullets = (ctx, player, lastShotTimeRef) => {
    const interval = 60000 / player.fireRate;

    const currentTime = Date.now();
    if (currentTime - lastShotTimeRef.current >= interval) {
      if (player.id === 1) {
        player.bullets.push({
          x: player.x,
          y: player.y,
          dx: 2,
          dy: 1,
        });
      } else {
        player.bullets.push({
          x: player.x,
          y: player.y,
          dx: -2,
          dy: 1,
        });
      }

      lastShotTimeRef.current = currentTime;
    }

    player.bullets.forEach((bullet, index) => {
      bullet.x += bullet.dx;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.stroke();

      const otherPlayer = player.id === 1 ? players.player2 : players.player1;
      if (detectCollision(bullet, otherPlayer)) {
        player.bullets.splice(index, 1);
        if (player.id === 1) {
          players.player1.score += 1;
        } else {
          players.player2.score += 1;
        }
      }

      if (bullet.x < 0 || bullet.x > canvasRef.current.width) {
        player.bullets.splice(index, 1);
      }
    });
  };

  const movePlayer = (player) => {
    const canvas = canvasRef.current;
    player.y += player.speed * player.dy;
    if (player.y - 20 < 0 || player.y + 20 > canvas.height) {
      player.dy = -player.dy;
    }
  };

  const drawScore = (ctx) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `Score: ${players.player1.score}-${players.player2.score}`,
      10,
      30,
    );
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.hypot(x - players.player1.x, y - players.player1.y) < 20) {
      onPlayerSelect(players.player1);
    } else if (Math.hypot(x - players.player2.x, y - players.player2.y) < 20) {
      onPlayerSelect(players.player2);
    }
  };

  return (
    <canvas
      className="game-canvas"
      ref={canvasRef}
      width={600}
      height={400}
      onClick={handleCanvasClick}
    />
  );
};

export default GameCanvas;
