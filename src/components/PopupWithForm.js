import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".form__input"));
    this._button = this._form.querySelector(".form__save-button");
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
      )
    return this._formValues;
  }

  setButtonText(text) {
    this._button.textContent = text
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}