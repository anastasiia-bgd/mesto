export class UserInfo {
    constructor({profileNameSelector, profileInfoSelector}) {
      this._name = document.querySelector(profileNameSelector);
      this._info = document.querySelector(profileInfoSelector);
    }
  
    // возвращает объект с данными пользователя
    getUserInfo() {
      const userData = {
        name: this._name.textContent,
        info: this._activity.textContent,
      }
      return userData;
    }
  
    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(inputData) {
      this._name.textContent = inputData.name;
      this._info.textContent = inputData.activity;
      console.log(inputData);
    }
  }