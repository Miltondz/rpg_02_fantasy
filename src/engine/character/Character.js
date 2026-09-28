export class Character {
  constructor({ name, className, hp = 30, maxHp = 30, attack = 6, defense = 4 }) {
    this.name = name;
    this.className = className;
    this.hp = hp;
    this.maxHp = maxHp;
    this.attack = attack;
    this.defense = defense;
    this.level = 1;
    this.experience = 0;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }
}
