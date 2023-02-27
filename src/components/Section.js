export class Section {
    constructor({ items, renderer }, selector) {
      this._initialCards = items;
      this._renderer = renderer;
      this._selector = selector;
    }
    addItem(item) {
      this._selector.prepend(item);
    }
    renderItems() {
      this._initialCards.forEach((item) => {
        this._renderer(item);
      });
    }
  }