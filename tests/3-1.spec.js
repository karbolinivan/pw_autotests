import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

let email; let password; let
  user;

test.beforeEach(async ({ page }) => {
  await page.goto('https://react-recoil-realworld.vercel.app/');
});

test.describe('Регистрация', () => {
  test('Пользователь не может зарегистрироваться используя email 2', async ({ page }) => {
    user = faker.person.fullName();
    email = faker.internet.email();
    password = faker.internet.password();
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByPlaceholder('Username').fill(user);
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(password);
  });
});
