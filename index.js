// SOLID Principle 
// S: single responsibility principle says a class should have a single primary responsibility.
import fs from "fs";
class Journal{
    constructor(){
        this.entries = {}
    }

    addEntry(text){
        let c= ++Journal.count;
        let entry = `${c}:${text}`;
        this.entries[c] = entry
        return c
    }

    removeEntry(index){
        delete this.entries[index]
    }

    toString(){
        return Object.values(this.entries).join('\n')
    }

    save(filename){
        fs.writeFileSync(filename, this.toString())
    }

    // load(filename){
    //     //
    // }

    // loadFromUrl(url){}

}

class PersistenceManager
{
  preprocess(j)
  {
    //
  }

  saveToFile(journal, filename)
  {
    fs.writeFileSync(filename, journal.toString());
  }
}



Journal.count = 0

let j = new Journal()
j.addEntry("I am tired today but will work on future goal")
j.addEntry("I'm starting my journey!")
console.log(j.toString())

let p =new PersistenceManager();
let filename = 'c:/temp/journal.txt';
p.saveToFile(j, filename);
