import "./index.css";

import { Card}  from "../components/Card.js";
import { Section } from '../components/Section.js'
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js"
import { initialCards } from "../utils/initialCards.js";
import { config } from "../utils/config.js"

const popupList = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const inputName = document.querySelector('.form__input_info_name');
const inputActivity = document.querySelector('.form__input_info_info')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const profileForm = popupEdit.querySelector('.form')
const elementsContainer = document.querySelector('.elements')
const buttonAddForm = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const titleCard = document.querySelector('.form__input_info_title')
const linkCard = document.querySelector('.form__input_info_link')
const formAddCard = popupAdd.querySelector('.form')
const popupImage = document.querySelector('.popup_type_image')
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageOpened = popupImage.querySelector('.popup__image');


function createCard(item) {
    const card = new Card(item, '#card-template', openImagePopup)
   const cardElement =  card.generateCard();
   return cardElement
}

const initialCardList = new Section (
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

function openImagePopup (name, link) {
    popupImageForm.open(name, link);
  }


const FormValidatorAddCard = new FormValidator(config, formAddCard);
FormValidatorAddCard.enableValidation();
const FormValidatorEditCard = new FormValidator(config, profileForm);
FormValidatorEditCard.enableValidation();

editButton.addEventListener("click", () => {
    FormValidatorEditCard.resetValidation();
    popupEditForm.open();
    popupEditForm.setInputValues(user.getUserInfo());
  });

buttonAddForm.addEventListener('click', () => {
    FormValidatorAddCard.resetValidation();
    popupAddForm.open();
})


// // Открытие
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', handleEscape);
// }
// Закрытие
// function closePopup(popup) {
//     popup.classList.remove('popup_opened')
//     document.removeEventListener('keydown', handleEscape);
//     titleCard.value = ""
//     linkCard.value = "" 

// }

// function openImagePopup(title, link) {
//     popupImageCaption.textContent = title;
//     popupImageOpened.src = link;
//     popupImageOpened.alt = title;
//     openPopup(popupImage);
// }

// editButton.addEventListener('click', function () {
//     openPopup(popupEdit)
//     inputName.value = profileName.textContent
//     inputActivity.value = profileDescription.textContent
// })

// function handleEscape(evt) {
//     if (evt.key === 'Escape') {
//         const popup = document.querySelector('.popup_opened');
//         closePopup(popup);
//     }
// }


// function addCard(cardData) {
//     const cardElement = createCard(cardData);
//     elementsContainer.prepend(cardElement);
// }

// function addInitialCard() { 
//     initialCards.forEach((item) => {
//         const cardElement = createCard(item)
//         elementsContainer.append(cardElement);
//   });
// }

// addInitialCard()

// function handleFormSubmitAddCard (evt) {
//         evt.preventDefault();
//         const data = {
//             name: titleCard.value,
//             link: linkCard.value 
//         }
//         addCard(data);
//         formAddCard.reset();
//         closePopup(popupAdd);
//       }

// profileForm.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     profileName.textContent = inputName.value;
//     profileDescription.textContent = inputActivity.value;
//     closePopup(popupEdit);
// })


// popupList.forEach((item) => {
//     item.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup_opened') ||
//             evt.target.classList.contains('popup__close-button')) {
//             closePopup(item);
//         }
//     })
// })

//   formAddCard.addEventListener('submit', handleFormSubmitAddCard);