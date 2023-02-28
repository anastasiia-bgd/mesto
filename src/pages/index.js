import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from '../components/Section.js'
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js"
import { initialCards } from "../utils/initialCards.js";
import { config } from "../utils/config.js"


const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = popupEdit.querySelector('.form')
const elementsContainer = document.querySelector('.elements')
const buttonAddForm = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const formAddCard = popupAdd.querySelector('.form')
const popupImage = document.querySelector('.popup_type_image')


function createCard(item) {
  const card = new Card(item, '#card-template', openImagePopup)
  const cardElement = card.generateCard();
  return cardElement
}

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

initialCardList.renderItems();

const popupEditForm = new PopupWithForm(".popup_type_edit", handleEditFormSubmit);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup_type_add", handleAddFormSubmit);
popupAddForm.setEventListeners();

function handleAddFormSubmit(item) {
  const cardElement = createCard(item);
  initialCardList.addItem(cardElement);
  popupAddForm.close();
}

function handleEditFormSubmit(inputData) {
  user.setUserInfo(inputData);
  popupEditForm.close();
}

const user = new UserInfo({
  profileNameSelector: ".profile__name",
  profileInfoSelector: ".profile__description",
});


const popupImageForm = new PopupWithImage(".popup_type_image");
popupImageForm.setEventListeners();

function openImagePopup(name, link) {
  popupImageForm.open(name, link);
}


const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();
const formValidatorEditCard = new FormValidator(config, profileForm);
formValidatorEditCard.enableValidation();

editButton.addEventListener("click", () => {
  formValidatorEditCard.resetValidation();
  popupEditForm.open();
  popupEditForm.setInputValues(user.getUserInfo());
});

buttonAddForm.addEventListener('click', () => {
  formValidatorAddCard.resetValidation();
  popupAddForm.open();
})

