//Factory Method: provide an interface to create objects, but lets the subclasses or factory method decide which speciffic class(or objects) to instantiate.

class Admin{
    constructor(name){
        this.name = name;
        this.role = "admin";
    }
}

class Customer {
    constructor(name){
        this.name = name; 
        this.role = "customer";
    }
}

class UserFactory{
    static createUser(name,role){
        if(role == "amin"){
            return new Admin(name)
        }else if(role == "customer"){
            return new Customer(name)
        }else{
            throw new Error("Invalid role")
        }
    }
}

const u1 = UserFactory.createUser("Gautam", "amin")
const u2 = UserFactory.createUser("sumit", "customer")

console.log(u1);
console.log(u2);

