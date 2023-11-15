export class UserService {
  async register(request, newUser) {
    const response = await request.post('https://api.realworld.io/api/users', newUser);
    const body = await response.json();
    return body;
  }
}
