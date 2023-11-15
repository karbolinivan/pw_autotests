import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { UserBuilder } from '../src/shared/helpers/user.helper';

let newUser; let
  userBio;

test.beforeEach(async ({ page }) => {
  await allure.step('Регистрация пользователя', async () => {
    newUser = new UserBuilder().setFullName().setEmail().setPassword()
      .build();
    await page.goto('https://react-recoil-realworld.vercel.app/');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByPlaceholder('Username').fill(newUser.fullName);
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(newUser.email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(newUser.password);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await allure.issue('Название дефекта', 'google.com');
    // await expect(page.getByRole('link', { name: newUser.fullName })).toBeVisible();
  });
});

test.describe('Профиль пользователя', () => {
  test('Зарегистрированный пользователь может изменить информациб о себе', async ({ page }) => {
    await allure.epic('Профиль пользователя');
    await allure.story('Изменение данных');

    userBio = faker.person.fullName();
    await page.getByRole('link', { name: ' Settings' }).click();
    await page.getByPlaceholder('Short bio about you').click();
    await page.getByPlaceholder('Short bio about you').fill(userBio);
    await page.getByRole('button', { name: 'Update Settings' }).click();
    await expect(page.getByPlaceholder('Short bio about tou')).toContainText(userBio);
  });
});
