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

// O: open-closed principle means object are open to extension but closed for modification 

let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
  yuge: 'yuge'
});

class Product
{
  constructor(name, color, size)
  {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter
{
  filterByColor(products, color)
  {
    return products.filter(p => p.color === color);
  }

  filterBySize(products, size)
  {
    return products.filter(p => p.size === size);
  }

  filterBySizeAndColor(products, size, color)
  {
    return products.filter(p =>
      p.size === size && p.color === color);
  }

  // state space explosion
  // 3 criteria (+weight) = 7 methods

  // OCP = open for extension, closed for modification
}

let apple = new Product('Apple', Color.green, Size.small);
let tree  = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

// let pf = new ProductFilter();
// console.log(`Green products (old):`);
// for (let p of pf.filterByColor(products, Color.green))
//   console.log(` * ${p.name} is green`);

// ↑↑↑ BEFORE

// ↓↓↓ AFTER

// general interface for a specification
class ColorSpecification
{
  constructor(color)
  {
    this.color = color;
  }

  isSatisfied(item)
  {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size)
  {
    this.size = size;
  }

  isSatisfied(item)
  {
    return item.size === this.size;
  }
}

class BetterFilter
{
  filter(items, spec)
  {
    return items.filter(x => spec.isSatisfied(x));
  }
}

// specification combinator
class AndSpecification
{
  constructor(...specs)
  {
    this.specs = specs;
  }

  isSatisfied(item)
  {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products,
  new ColorSpecification(Color.green)))
{
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of bf.filter(products,
  new SizeSpecification(Size.large)))
{
  console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, spec))
  console.log(` * ${p.name} is large and green`);

//L: liskov subtitution principle says if a function which takes some base type, it should also equally be able to take a derived type without breaking the functionality.
class Rectangle
{
  constructor(width, height)
  {
    this._width = width;
    this._height = height;
  }

  get width() { return this._width; }
  get height() { return this._height; }

  set width(value) { this._width = value; }
  set height(value) { this._height = value; }

  get area()
  {
    return this._width * this._height;
  }

  toString()
  {
    return `${this._width}×${this._height}`;
  }
}

class Square extends Rectangle
{
  constructor(size)
  {
    super(size, size);
  }

  set width(value)
  {
    this._width = this._height = value;
  }

  set height(value)
  {
    this._width = this._height = value;
  }
}

let useIt = function(rc)
{
  let width = rc._width;
  rc.height = 10;
  console.log(
    `Expected area of ${10*width}, ` +
    `got ${rc.area}`
  );
};

let rc = new Rectangle(2,3);
useIt(rc);

let sq = new Square(5);
useIt(sq); 