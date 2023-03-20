export class UserContext {
  UserID: string;
  Name: string;
  Email: string;
  Username: string;
  UserRoleList: Array<string>;

  constructor() {
    this.UserID = '';
    this.Name = '';
    this.Email = '';
    this.Username = '';
    this.UserRoleList = [];
  }
}
