/* eslint-disable import/no-extraneous-dependencies */
import { test as base, expect } from '@playwright/test';
import { App } from '../pages/app.page';
import { UserBuilder } from '../../src/shared/helpers/user.helper';

export const test = base.extend({
  registerFixture: async ({ page }, use) => {
    const app = new App(page);
    const newUser = new UserBuilder().setFullName().setEmail().setPassword()
      .build();

    await app.mainMenu.open();
    await app.mainMenu.goToRegister();
    await app.register.getNewUser(newUser.fullName, newUser.email, newUser.password);

    await expect(app.register.page.getByRole('link', { name: 'Global Feed' })).toBeVisible();
    await app.register.page.reload({ waitUntil: 'domcontentloaded' });

    await use(app);

    await app.removeAll();
  },
  loginAsFixture: async ({ page }, use) => {
    const app = new App(page);

    await app.mainMenu.open();
    await app.mainMenu.goToLogin();
    await app.login.signIn('Ahmed48@gmail.com', '_Z1wOZFyN77tW1B');

    await use(app);

    // await app.removeAll();
  },

  unauthorizeFixture: async ({ page }, use) => {
    const app = new App(page);
    await app.mainMenu.open();
    await use(app);

    // await app.removeAll();
  },
});

export { expect } from '@playwright/test';
