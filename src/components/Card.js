export class Card {
    constructor(
        data,
        templateSelector,
        openImagePopup,
        handleItemDelete,
        handleLikeClick,
        userId) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._userId = userId;
        this._handleItemDelete = handleItemDelete;
        this._handleLikeClick = handleLikeClick;
        this._isLike = false;
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
            this._handleItemDelete(this, this._cardId);
        });
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this, this._cardId);
        });
        this._cardImage.addEventListener('click', () => {
            this._openImagePopup(this._name, this._link);
        });
    }
    get isLike() {
        return this._isLike;
    }

    setLikes(newLike) {
        this._likes = newLike;
        this._likesCounter.textContent = this._likes.length;
        this._isLike = !this._isLike;
        this._likeButton.classList.toggle("card__like-button_active");
      }

      removeCard() {
        this._newCard.remove();
        this._newCcard = null;
      }

    // _deleteCard() {
    //     this._newCard.remove();
    // }
    // _toggleLike() {
    //     this._likeButton.classList.toggle('card__like-button_active');
    // }
    // _openPopupImage() {
    //     openImagePopup(this._name, this._link);
    // }
    generateCard() {
        this._newCard = this._getTemplate();

        this._cardImage = this._newCard.querySelector('.card__image');
        this._likeButton = this._newCard.querySelector('.card__like-button');
        this._deleteButton = this._newCard.querySelector('.card__trash');
        this._likesCounter = this._newCard.querySelector(".card__likes-counter");

        if (this._ownerId !== this._userId) this._deleteButton.remove();
       
        this._likesCounter.textContent = this._likes.length;
        
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._cardTitle = this._newCard.querySelector('.card__title')
        this._cardTitle.textContent = this._name;

        if (this._likes.some((like) => like._id === this._userId)) {
            this._likeButton.classList.add("card__like-button_active");
            this._isLike = true;
          }

        this._setEventListeners();
        return this._newCard;
    }

}