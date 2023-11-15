import { faker } from '@faker-js/faker';

const GetNewUser = function getNewUser(fullName, email, password) {
  this.fullName = fullName;
  this.email = email;
  this.password = password;
};

export const UserBuilder = function UserBuilder() {
  return {
    setFullName() {
      this.fullName = faker.person.fullName();
      return this;
    },
    setEmail() {
      this.email = faker.internet.email();
      return this;
    },
    setPassword() {
      this.password = faker.internet.password();
      return this;
    },
    build() {
      const user = new GetNewUser(this.fullName, this.email, this.password);
      return user;
    },
  };
};
