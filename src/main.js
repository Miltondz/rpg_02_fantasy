import { Direction } from './engine/core/Direction.js';

class DungeonCrawlerEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = 1280;
    this.height = 720;
    this.player = {
      x: 2,
      y: 2,
      facing: Direction.NORTH,
      hp: 30,
      maxHp: 30,
      ap: 4,
      name: 'Astra'
    };
    this.map = this.createMap();
    this.lastFrame = 0;
    this.keys = new Set();
    this.bindInput();
  }

  createMap() {
    return [
      '####################',
      '#..................#',
      '#.##.##....###....#',
      '#.....#....#.......#',
      '#.###.#....#..##..#',
      '#...#....#........#',
      '#.#.#.##..####.##.#',
      '#.................#',
      '#.#####.######.#..#',
      '#................##',
      '####################'
    ].map((row) => row.split(''));
  }

  bindInput() {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.key.toLowerCase());
      if (event.key === 'ArrowUp') this.movePlayer(0, -1);
      if (event.key === 'ArrowDown') this.movePlayer(0, 1);
      if (event.key === 'ArrowLeft') this.turnPlayer(-1);
      if (event.key === 'ArrowRight') this.turnPlayer(1);
    });

    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
    });
  }

  turnPlayer(direction) {
    this.player.facing = (this.player.facing + direction + 4) % 4;
  }

  movePlayer(dx, dy) {
    const nextX = this.player.x + dx;
    const nextY = this.player.y + dy;
    const tile = this.map[nextY]?.[nextX];

    if (tile && tile !== '#') {
      this.player.x = nextX;
      this.player.y = nextY;
    }
  }

  resize() {
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = this.width * ratio;
    this.canvas.height = this.height * ratio;
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  render() {
    const ctx = this.ctx;
    const tileSize = 32;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#0a1119';
    ctx.fillRect(0, 0, this.width, this.height);

    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.fillStyle = cell === '#' ? '#3d4c5d' : '#13212f';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      });
    });

    ctx.fillStyle = '#c6f1ff';
    ctx.fillRect(this.player.x * tileSize, this.player.y * tileSize, tileSize, tileSize);

    ctx.fillStyle = '#ffd166';
    ctx.fillRect(10, 10, this.player.hp / this.player.maxHp * 200, 18);

    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText(`${this.player.name} HP: ${this.player.hp}/${this.player.maxHp}`, 10, 55);
  }

  animate(timestamp) {
    const delta = timestamp - this.lastFrame;
    this.lastFrame = timestamp;
    this.render();
    requestAnimationFrame((t) => this.animate(t));
  }

  start() {
    this.resize();
    this.render();
    requestAnimationFrame((t) => this.animate(t));
  }
}

const engine = new DungeonCrawlerEngine();
engine.start();
