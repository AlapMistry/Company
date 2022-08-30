export class User {
    userName: string;
    password: string;
    role: string;
    token: string;

    constructor(user: User) {
        this.userName = user.userName;
        this.password = user.password;
        this.role = user.role;
        this.token = user.token;
    }
}
