import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/shared/helpers/user.helper';
import { MainPage, RegisterPage } from '../src/pages/index';

test.describe('Профиль пользователя', () => {
  test('Негативная проверка регистрации', async ({ page }) => {
    await page.goto('https://react-recoil-realworld.vercel.app/');
    const newUser = new UserBuilder().setFullName().setEmail().setPassword()
      .build();

    const mainPage = new MainPage(page);
    await mainPage.register();

    const registerPage = new RegisterPage(page);
    await registerPage.register(newUser.fullName, newUser.email, newUser.password);

    await expect(page.getByRole('link', { name: 'Global Feed' })).toBeVisible();
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('link', { name: newUser.fullName })).toBeVisible();
  });
});
