class Users {
  constructor() {
    this.users = [];
  }

  add(user) {
    this.users.push(user);
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  remove(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.splice(this.users.indexOf(user), 1);
    }

    return user;
  }

  getByRoom(room) {
    return this.users.filter(user => user.room === room);
  }
}

module.exports = new Users();
