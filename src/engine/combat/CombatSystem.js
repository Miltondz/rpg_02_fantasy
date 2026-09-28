export class CombatSystem {
  constructor() {
    this.round = 1;
    this.enemies = [];
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
  }

  resolveAttack(attacker, defender) {
    const baseDamage = Math.max(1, attacker.attack - defender.defense + 2);
    defender.takeDamage(baseDamage);
    return baseDamage;
  }

  nextRound() {
    this.round += 1;
    return this.round;
  }
}
