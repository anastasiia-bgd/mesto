export class Section {
    constructor({ items, renderer }, container) {
      this._initialCards = items;
      this._renderer = renderer;
      this._container = container;
    }
    addItem(item) {
      this._container.prepend(item);
    }
    renderItems() {
      this._initialCards.forEach((item) => {
        this._renderer(item);
      });
    }
  }