import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleConfirmFormSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector(".popup__form");
      this._button = this._popup.querySelector(".form__save-button");
      this._handleConfirmFormSubmit = handleConfirmFormSubmit;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleConfirmFormSubmit(this._cardId, this._card);
        super.close(); // это попап подтверждения удаления карточки, тут нет инпутов и запроса к серверу и блока then. Не уверенаБ что понимаю куда перенести закрытие.
      });
    }
  
    setButtonText(text) {
      this._button.textContent = text;
    }
  
    open(cardId, card) {
      super.open()
      this._cardId = cardId;
      this._card = card;
    }
  }
