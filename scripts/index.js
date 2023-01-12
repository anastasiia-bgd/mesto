const popupList = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const inputName = document.querySelector('.form__input_info_name');
const inputActivity = document.querySelector('.form__input_info_activity')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const profileForm = popupEdit.querySelector('.form')
const elementsContainer = document.querySelector('.elements')
const cardTemplate = document.querySelector('#card-template').content;
const buttonAddForm = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const buttonSubmitForm = popupAdd.querySelector('.form__save-button')
const titleCard = document.querySelector('.form__input_info_title')
const linkCard = document.querySelector('.form__input_info_link')
const formAddCard = popupAdd.querySelector('.form')
const popupImage = document.querySelector('.popup_type_image')
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageOpened = popupImage.querySelector('.popup__image');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', handleEscape);
}

editButton.addEventListener('click', function () {
    openPopup(popupEdit)
    inputName.value = profileName.textContent
    inputActivity.value = profileDescription.textContent
})

profileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputActivity.value;
    closePopup(popupEdit);
})

buttonAddForm.addEventListener('click', function () {
    openPopup(popupAdd)
})

function addCard(title, link) {
    elementsContainer.prepend(createCard(title, link));
}

function openImagePopup(title, link) {
    popupImageCaption.textContent = title;
    popupImageOpened.src = link;
    popupImageOpened.alt = title;
    openPopup(popupImage);
}

popupList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-button')) {
            closePopup(item);
        }
    })
})

function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
      }
    }

    formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard(titleCard.value, linkCard.value)
    const button = evt.submitter;
    button.disabled = true;
    button.classList.add('form__save-button_disabled');
    formAddCard.reset();
    closePopup(popupAdd);
})


function createCard(title, link) {

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = link;
    cardImage.alt = title;


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

