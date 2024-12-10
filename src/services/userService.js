import HttpService from "./http";

class User extends HttpService {
  constructor() {
    super();
  }

  async login(email, password) {
    return this.client.post("/login", { email, password });
  }

  async create(params) {
    return this.client.post("/users", params);
  }

  async createTask(params) {
    return this.client.post("/tasks", params);
  }
 }

export default User;