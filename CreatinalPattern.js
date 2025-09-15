//Factory Method: provide an interface to create objects, but lets the subclasses or factory method decide which speciffic class(or objects) to instantiate.

// class Admin{
//     constructor(name){
//         this.name = name;
//         this.role = "admin";
//     }
// }

// class Customer {
//     constructor(name){
//         this.name = name; 
//         this.role = "customer";
//     }
// }

// class UserFactory{
//     static createUser(name,role){
//         if(role == "amin"){
//             return new Admin(name)
//         }else if(role == "customer"){
//             return new Customer(name)
//         }else{
//             throw new Error("Invalid role")
//         }
//     }
// }

// const u1 = UserFactory.createUser("Gautam", "amin")
// const u2 = UserFactory.createUser("sumit", "customer")

// console.log(u1);
// console.log(u2);

//ABSTRACT FACTORY : is a factory of factories, it provides an interface to create families of related objects without specifying their concreate  class. Userful when you have multiple factotries for differnt context(windowsUI, macUI)

class WinButton{
    render(){
       console.log("winButton") 
    }
}

class MacButton{
    render(){
        console.log("macButton")
    }
}

class WinCheckBox{
    render(){
        console.log("winCheckBox")
    }
}

class MacCheckBox{
    render(){
        console.log("macCheckBox")
    }
}


class WindowsFactory{
    createButton() {
        return new WinButton()
    }
    createCheckBox(){
        return new WinCheckBox()
    }
}

class MacFactory{
    createButton(){
        return new MacButton()
    }
    createCheckBox(){
        return new MacCheckBox()
    }
}

//Abstract factory usage 
function getUiFactory(osType){
    if(osType === "windows"){
        return new WindowsFactory()
    }
    if(osType === "mac"){
        return new MacFactory()
    }
    throw new Error("unknown OS")
}


let m1 = getUiFactory("mac")
m1.createButton().render()
m1.createCheckBox().render()

