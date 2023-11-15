import { BasePage } from './base.page';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.signupButton = this.page.getByRole('button', { name: 'Sign in' });
    this.emailField = this.page.getByPlaceholder('Email');
    this.passwordField = this.page.getByPlaceholder('Password');
  }

  async signIn(email, password) {
    await this.emailField.click();
    await this.emailField.fill(email);

    await this.passwordField.click();
    await this.passwordField.fill(password);

    await this.signupButton.click();
  }
}

export { LoginPage };
