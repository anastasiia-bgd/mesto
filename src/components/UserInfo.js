export class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }
    return userData;
  }

  setUserInfo(inputData) {
    this._name.textContent = inputData.name;
    this._info.textContent = inputData.about;
    this._avatar.src = inputData.avatar;
    
  }
}