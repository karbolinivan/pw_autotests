import { BasePage } from '../pages/base.page';

class MainPageFragment extends BasePage {
  constructor(page) {
    super(page);
    this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
    this.signinButton = this.page.getByRole('link', { name: 'Sign in' });
    this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
  }

  async goToLogin() {
    await this.signinButton.click();
  }

  async goToRegister() {
    await this.signupButton.click();
  }

  async goToSettings() {
    await this.settingsButton.click();
  }
}

export { MainPageFragment };
