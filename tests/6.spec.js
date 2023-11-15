import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { UserBuilder } from '../src/shared/helpers/user.helper';
import { MainPage, RegisterPage } from '../src/pages/index';

test.beforeEach(async ({ page }) => {
  await allure.step('Регистрация пользователя', async () => {
    await page.goto('https://react-recoil-realworld.vercel.app/');
    const newUser = new UserBuilder().setFullName().setEmail().setPassword()
      .build();

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    await mainPage.register();
    await registerPage.register(newUser.fullName, newUser.email, newUser.password);

    // await page.reload({ waitUntil: 'domcontentloaded' });
    // await allure.issue('Название дефекта', 'google.com');
    // await expect(page.getByRole('link', { name: newUser.fullName })).toBeVisible();
  });
});

test.describe('Профиль пользователя', () => {
  test('Зарегистрированный пользователь может изменить информациб о себе', async ({ page }) => {
    await allure.epic('Профиль пользователя');
    await allure.story('Изменение данных');

    const userBio = faker.person.fullName();
    await page.getByRole('link', { name: ' Settings' }).click();
    await page.getByPlaceholder('Short bio about you').click();
    await page.getByPlaceholder('Short bio about you').fill(userBio);
    await page.getByRole('button', { name: 'Update Settings' }).click();
    await expect(page.getByPlaceholder('Short bio about tou')).toContainText(userBio);
  });
});
