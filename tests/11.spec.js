import { test } from '../srcExtended/fixtures/all.fixture';
import { App } from '../srcExtended/pages/app.page';
import { userLoginJson } from '../src/shared/mock/index';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.realworld.io/api/users/login', (route) => {
    route.fulfill({
      status: 403,
      contentType: 'application/json',
      json: {
        errors: userLoginJson,
      },
    });
  });
});
test.describe('Авторизация', () => {
  test.only('Авторизация незарегистрированного пользователя MOCK', async ({ page }) => {
    const app = new App(page);
    await app.mainMenu.open();
    await app.mainMenu.goToLogin();
    await app.login.signIn('asd@asd.com', '123qwe');

    await app.login.shouldHaveErrorMessages('email or password is invalid');
  });
});
