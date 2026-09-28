export class InventorySystem {
  constructor(slotCount = 20) {
    this.slotCount = slotCount;
    this.items = new Array(slotCount).fill(null);
  }

  addItem(item, slotIndex = this.findEmptySlot()) {
    if (slotIndex === -1) return false;
    this.items[slotIndex] = item;
    return true;
  }

  findEmptySlot() {
    return this.items.findIndex((item) => item === null);
  }

  removeItem(slotIndex) {
    if (slotIndex < 0 || slotIndex >= this.items.length) return null;
    const item = this.items[slotIndex];
    this.items[slotIndex] = null;
    return item;
  }
}
