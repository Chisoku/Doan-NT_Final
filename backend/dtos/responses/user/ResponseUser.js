class ResponseUser {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.role = user.role;
        this.avatar = user.avatar;
        this.phone = user.phone;
        this.address = user.address;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }

    static format(user) {
        return new ResponseUser(user);
    }
}

export default ResponseUser;
