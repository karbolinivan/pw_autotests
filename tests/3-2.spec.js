import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let email; let password; let user; let
  userBio;

test.beforeEach(async ({ page }) => {
  email = faker.internet.email();
  user = faker.person.fullName();
  password = faker.internet.password();
  await page.goto('https://react-recoil-realworld.vercel.app/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Username').fill(user);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('link', { name: 'Global Feed' })).toBeVisible();
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('link', { name: user })).toBeVisible();
});

test.describe('Профиль пользователя', () => {
  test('Пользователь может заменить информацию о себе', async ({ page }) => {
    userBio = faker.person.fullName();
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByPlaceholder('link', { name: 'Short bio about you' }).click();
    await page.getByPlaceholder('link', { name: 'Short bio about you' }).fill(userBio);
    await page.getByRole('button', { name: 'Update Settings' }).click();
    await expect(page.getByPlaceholder('link', { name: 'Short bio about tou' })).toContainText(userBio);
  });
});
