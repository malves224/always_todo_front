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

  async getTasks() {
    return this.client.get("/tasks");
  }

  async destroyTask(id) {
    return this.client.delete(`/tasks/${id}`);
  }

  async updateTask(id, params) {
    return this.client.put(`/tasks/${id}`, params);
  }
 }

export default User;