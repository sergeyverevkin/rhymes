import { DefaultApi } from '../service/default-api';
import { action, makeAutoObservable, observable } from 'mobx';

export class LoginStore {
  service: DefaultApi = new DefaultApi({
    basePath: process.env.REACT_APP_API
  }, process.env.REACT_APP_API);

  constructor() {
    makeAutoObservable(this, {
      username: observable,
      password: observable,
      isLoading: observable,
      error: observable,
      login: action,
      });
  }


  username = '';
  password = '';
  isLoading = false;
  error = '';

  login(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      if (username === 'admin' && password === 'password') {
        this.error = '';
      } else {
        this.error = 'login error';
      }
    }, 1000);
  }
}

export const loginStore = new LoginStore();