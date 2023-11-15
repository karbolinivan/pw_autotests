import { test } from '../srcExtended/fixtures/all.fixture';
import { UserBuilder } from '../src/shared/helpers/user.helper';
import { UserService } from '../src/sevices/user.service';

let newUser;

test.beforeEach(() => {
  newUser = new UserBuilder().setFullName().setEmail().setPassword()
    .build();
});
test.describe('Регистрация', () => {
  test('Зарегистрировать пользователя API с использованием контроллера', async ({ request }) => {
    const userService = new UserService();
    const apiUser = {
      user: {
        email: newUser.email,
        username: newUser.setFullName,
        password: newUser.password,
      },
    };

    await userService.register(request, apiUser);
  });
});
