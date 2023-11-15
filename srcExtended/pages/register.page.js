import { BasePage } from './base.page';

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.signupButton = this.page.getByRole('button', { name: 'Sign up' });
    this.emailField = this.page.getByPlaceholder('Email');
    this.passwordField = this.page.getByPlaceholder('Password');
    this.usernameField = this.page.getByPlaceholder('Username');
  }

  async getNewUser(fullName, email, password) {
    await this.usernameField.click();
    await this.usernameField.fill(fullName);

    await this.emailField.click();
    await this.emailField.fill(email);

    await this.passwordField.click();
    await this.passwordField.fill(password);

    await this.signupButton.click();
  }
}

export { RegisterPage };
