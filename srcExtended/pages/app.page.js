import { MainPageFragment } from '../fragments/mainMenu.fragment';
import { LoginPage, RegisterPage } from './index';

class App {
  constructor(page) {
    this.page = page;
    this.mainMenu = new MainPageFragment(this.page);
    this.login = new LoginPage(this.page);
    this.register = new RegisterPage(this.page);
  }
}

export { App };
