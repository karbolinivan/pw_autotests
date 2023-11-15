import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/shared/helpers/user.helper';

let newUser; let
  userBio;

test.describe('Профиль пользователя', () => {
  test.beforeEach(async ({ page }) => {
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
    await expect(page.getByRole('link', { name: 'Global Feed' })).toBeVisible();
    await page.reload({ waitUntil: 'domcontentloaded' });
  });
  test('Зарегистрированный пользователь может изменить информацию о себе', async ({ page }) => {
    userBio = faker.person.fullName();
    await page.getByRole('link', { name: ' Settings' }).click();
    await page.getByPlaceholder('Short bio about you').click();
    await page.getByPlaceholder('Short bio about you').fill(userBio);
    await page.getByRole('button', { name: 'Update Settings' }).click();
    await page.getByRole('link', { name: ' Settings' }).click();
    await page.locator('//i[@class="ion-gear-a"]').click();
  });
});
