let popupList = document.querySelectorAll('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_type_edit');
let inputName = document.querySelector('.form__input_info_name');
let inputActivity = document.querySelector('.form__input_info_activity')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let form = document.querySelector('.form')
let elementsContainer = document.querySelector('.elements')
let cardTemplate = document.querySelector('#card-template').content;
let addButton = document.querySelector('.profile__add-button')
let popupAdd = document.querySelector('.popup_type_add')
let addCardButton = popupAdd.querySelector('.form__save-button')
let titleCard = document.querySelector('.form__input_info_title')
let linkCard = document.querySelector('.form__input_info_link')
let formAddCard = popupAdd.querySelector('.form')
let popupImage = document.querySelector('.popup_type_image')
let popupImageCaption = popupImage.querySelector('.popup__caption');
let popupImageOpened = popupImage.querySelector('.popup__image');
let likeButton = cardTemplate.querySelector('.card__like-button')

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

editButton.addEventListener('click', function () {
    openPopup(popupEdit)
    inputName.value = profileName.textContent
    inputActivity.value = profileDescription.textContent
})

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputActivity.value;
    popup.classList.remove('popup_opened');
})

addButton.addEventListener('click', function () {
    openPopup(popupAdd)
})

function addCard(title, link) {
    elementsContainer.prepend(createCard(title, link));
}

function openImagePopup(title, link) {
    openPopup(popupImage);
    popupImageCaption.textContent = title;
    popupImageOpened.src = link;
    popupImageOpened.alt = title;
}

popupList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-button')) {
            closePopup(item);
        }
    })
})

addCardButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    addCard(titleCard.value, linkCard.value)
    formAddCard.reset();
    closePopup(popupAdd);
})


function createCard(title, link) {

    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    let cardImage = cardElement.querySelector('.card__image')

    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = title;


    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    })

    cardElement.querySelector('.card__trash').addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', function () {
        openImagePopup(title, link);
    });

    return cardElement;
}

[...initialCards].reverse().forEach(function (card) {
    addCard(card.name, card.link);
})

