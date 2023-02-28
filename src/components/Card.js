export class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        this._likeButton.addEventListener('click', () => {
            this._toggleLike();
        });
        this._cardImage.addEventListener('click', () => {
            this._openImagePopup(this._name, this._link);
        });
    }

    _deleteCard() {
        this._newCard.remove();
    }
    _toggleLike() {
        this._likeButton.classList.toggle('card__like-button_active');
    }
    _openPopupImage() {
        openImagePopup(this._name, this._link);
    }
    generateCard() {
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector('.card__image');
        this._likeButton = this._newCard.querySelector('.card__like-button');
        this._cardTitle = this._newCard.querySelector('.card__title')
        this._cardTitle.textContent = this._name;
        this._deleteButton = this._newCard.querySelector('.card__trash');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._setEventListeners();
        return this._newCard;
    }

}