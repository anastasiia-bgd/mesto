import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from '../components/Section.js'
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js"
import { initialCards } from "../utils/initialCards.js";
import { config } from "../utils/config.js"
import { Api } from "../components/Api";
import { apiConfig } from "../utils/apiConfig.js"
import { PopupDeleteCard } from "../components/popupDeleteCard.js";


const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = popupEdit.querySelector('.form')
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
const changeAvatarForm = popupChangeAvatar.querySelector('form')
const elementsContainer = document.querySelector('.elements')
const buttonAddForm = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const formAddCard = popupAdd.querySelector('.form')
const popupImage = document.querySelector('.popup_type_image')
const buttonChangeAvatar = document.querySelector(".profile__edit-button-avatar")

const api = new Api(apiConfig)
let userId

const user = new UserInfo({
  profileNameSelector: ".profile__name",
  profileInfoSelector: ".profile__description",
  profileAvatarSelector: ".profile__avatar"
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData); //установка данных пользователя на странице - имя, инфо, аватар
    userId = userData._id;
    initialCardList.renderItems(cards); //вывод массива данных с сервера
  })
  .catch((err) => {
    console.log(err);
  });

  const initialCardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item);
        initialCardList.addItem(cardElement);
      },
    },
    elementsContainer
  )

function createCard(item) {
  const card = new Card(
    item,
    '#card-template',
    openImagePopup,
    handleItemDelete,
    handleLikeClick,
    userId)
  const cardElement = card.generateCard();
  return cardElement
}


function handleLikeClick(card, cardId) {
  if (card.isLike) {
    api.deleteLike(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api.putLike(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err))
  }
}

const popupDelCard = new PopupDeleteCard(
  ".popup_type_delete-confirmation",
  handleConfirmFormSubmit
);

function handleItemDelete(cardId, card) {
  popupDelCard.open(cardId, card);
}

popupDelCard.setEventListeners();

function handleConfirmFormSubmit(card, cardId) {
  popupDelCard.setButtonText('Удаление...');
  api.deleteCard(cardId)
    .then((res) => {
      card.removeCard(res);
      popupDelCard.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDelCard.setButtonText('Да');
    })
}

const popupEditForm = new PopupWithForm(".popup_type_edit", handleEditFormSubmit);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup_type_add", handleAddFormSubmit);
popupAddForm.setEventListeners();

const popupChangeAvatarForm = new PopupWithForm(".popup_type_change-avatar", handleChangeAvatarFormSubmit);
popupChangeAvatarForm.setEventListeners();

function handleAddFormSubmit(cardElement) {
  popupAddForm.setButtonText('Сохранение...');
  api.addNewCard(cardElement)
    .then(res => {
      initialCardList.addItem(createCard(res));
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.setButtonText('Создать');
    })
}

function handleEditFormSubmit(inputData) {
  popupEditForm.setButtonText('Сохранение...');
  api.setUserInfo(inputData)
    .then(res => {
      user.setUserInfo(res);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.setButtonText('Сохранить');
    })
}


function handleChangeAvatarFormSubmit(avatar) {
  popupChangeAvatarForm.setButtonText('Сохранение...');
  api.changeAvatar(avatar.link)
    .then(res => {
      user.setUserInfo(res);
      popupChangeAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatarForm.setButtonText('Сохранить');
    })
}

const popupImageForm = new PopupWithImage(".popup_type_image");
popupImageForm.setEventListeners();

function openImagePopup(name, link) {
  popupImageForm.open(name, link);
}


const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();
const formValidatorEditCard = new FormValidator(config, profileForm);
formValidatorEditCard.enableValidation();
const validationFormChangeAvatar = new FormValidator(config, changeAvatarForm);
validationFormChangeAvatar.enableValidation();

editButton.addEventListener("click", () => {
  formValidatorEditCard.resetValidation();
  popupEditForm.open();
  popupEditForm.setInputValues(user.getUserInfo());
});

buttonAddForm.addEventListener('click', () => {
  formValidatorAddCard.resetValidation();
  popupAddForm.open();
})

buttonChangeAvatar.addEventListener("click", () => {
  validationFormChangeAvatar.resetValidation();
  popupChangeAvatarForm.open();
});
