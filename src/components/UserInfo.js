export class UserInfo {
    constructor({profileNameSelector, profileInfoSelector}) {
      this._name = document.querySelector(profileNameSelector);
      this._info = document.querySelector(profileInfoSelector);
    }
  
    getUserInfo() {
      const userData = {
        name: this._name.textContent,
        info: this._info.textContent,
      }
      return userData;
    }
  
    setUserInfo(inputData) {
      this._name.textContent = inputData.name;
      this._info.textContent = inputData.info
    }
  }