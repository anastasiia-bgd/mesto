let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.form__input_name');
let inputActivity = document.querySelector('.form__input_activity')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let form = document.querySelector('.form')


editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent
    inputActivity.value = profileDescription.textContent
})


closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputActivity.value;
    popup.classList.remove('popup_opened');
})

