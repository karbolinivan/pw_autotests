import { expect } from '@playwright/test';
import { UserBuilder } from '../src/shared/helpers/user.helper';
import { App } from '../srcExtended/pages/app.page';
import { test } from '../srcExtended/fixtures/all.fixture';

let app;

test.describe('Регистрация', () => {
  test.beforeEach(async ({ page }) => {
    app = new App(page);
  });

  test('Регистрация нового пользователя', async ({ page }) => {
    await page.goto('https://react-recoil-realworld.vercel.app/');
    const newUser = new UserBuilder().setFullName().setEmail().setPassword()
      .build();

    await app.mainMenu.goToRegister();
    await app.register.getNewUser(newUser.fullName, newUser.email, newUser.password);

    await expect(app.register.page.getByRole('link', { name: 'Global Feed' })).toBeVisible();
    await app.register.page.reload({ waitUntil: 'domcontentloaded' });

    await expect(app.register.page.getByRole('link', { name: newUser.fullName })).toBeVisible();
  });
  test('Регистрация нового пользователя через фикстуру', async ({ registerFixture }) => {
    await registerFixture.mainMenu.getProfileName('name');
    await expect(registerFixture.page.getByRole('link', { name: '1' })).toBeVisible();
  });
  test('Автороизация нового пользователя через фикстуру', async ({ loginAsFixture }) => {
    await loginAsFixture.mainMenu.goToSettings();
    await expect(loginAsFixture.page).toHaveURL(/.*settings/);
  });
});
