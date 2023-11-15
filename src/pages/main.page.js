class MainPage {
  constructor(page) {
    this.page = page;
    this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
    this.profileNameField = (name) => page.getByRole(name);
  }

  async register() {
    await this.signupButton.click();
  }

  async getProfileName() {
    await this.profileNameField.innerText();
  }
}

export { MainPage };
