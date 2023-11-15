// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async getTitle() {
    await this.page.goto('https://react-recoil-realworld.vercel.app/');
  }

  async open() {
    await this.page.goto(process.env.URL);
  }

  async shouldHaveErrorMessages(...messages) {
    for (let i = 0; i < messages.length; i += 1) {
      const errorLocator = this.page.locator(`//*[@class="error-mesages"]/li[${(i + 1)}]`);
    }
  }
}
export { BasePage };
