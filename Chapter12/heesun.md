
# 상속 다루기

## 12.1 메서드 올리기 (Pull Up Method)

```javascript
// before

class Employee {...}

class Salesman extends Employee {
  get name() {...}
}

class Engineer extends Employee {
  get name() {...}
}

// after

class Employee {
  get name() {...}
}

class Salesman extends Employee {...}
class Engineer extends Employee {...}
```

## 12.2 필드 올리기 (Pull Up Field)

```javascript
// before

class Employee {...} // Java

class Salesman extends Employee {
  private String name;
}

class Engineer extends Employee {
  private String name;
}
// after

class Employee {
  protected String name;
}

class Salesman extends Employee {...}
class Engineer extends Employee {...}
```
## 12.3 생성자 본문 올리기 (Pull Up Constructor Body)

```javascript
// before

class Party {...}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
// after

class Party {
  constructor(name){
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

## 12.4 메서드 내리기 (Push Down Method)

```javascript
// before

class Employee {
  get quota {...}
}

class Engineer extends Employee {...}
class Salesman extends Employee {...}
// after

class Employee {...}
class Engineer extends Employee {...}
class Salesman extends Employee {
  get quota {...}  
}

```

## 12.5 필드 내리기 (Push Down Field)

```javascript
// before

class Employee {        // Java
  private String quota;
}

class Engineer extends Employee {...}
class Salesman extends Employee {...}
// after

class Employee {...}
class Engineer extends Employee {...}

class Salesman extends Employee {
  protected String quota;
}
```

## 12.6 타입 코드를 서브클래스로 바꾸기 (Replace Type Code with Subclasses)

```javascript
// before

function createEmployee(name, type) {
  return new Employee(name, type);
}
// after

function createEmployee(name, type) {
  switch (type) {
    case "engineer": return new Engineer(name);
    case "salesman": return new Salesman(name);
    case "manager":  return new Manager (name);
  }
```

## 12.7 서브클래스 제거하기 (Remove Subclass)

```javascript
// before

class Person {
  get genderCode() {return "X";}
}
class Male extends Person {
  get genderCode() {return "M";}
}
class Female extends Person {
  get genderCode() {return "F";}
}
// after

class Person {
  get genderCode() {return this._genderCode;}
}
```

## 12.8 슈퍼클래스 추출하기 (Extract Superclass)

```javascript
before

class Department {
  get totalAnnualCost() {...}
  get name() {...}
  get headCount() {...}
}

class Employee {
  get annualCost() {...}
  get name() {...}
  get id() {...}
}
after

class Party {
  get name() {...}
  get annualCost() {...}
}

class Department extends Party {
  get annualCost() {...}
  get headCount() {...}
}

class Employee extends Party {
  get annualCost() {...}
  get id() {...}
}
```

## 12.9 계층 합치기 (Collapse Hierarchy)

```javascript
// before

class Employee {...}
class Salesman extends Employee {...}
// after

class Employee {...}
```

## 12.10 서브클래스를 위임으로 바꾸기 (Replace Subclass with Delegate)

```javascript
before

class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}

class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
after

class Order {
  get daysToShip() {
    return (this._priorityDelegate)
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}

class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip
  }
}
```

## 12.11 슈퍼클래스를 위임으로 바꾸기 (Replace Superclass with Delegate)

```javascript
// before

class List {...}
class Stack extends List {...}
// after

class Stack {
  constructor() {
    this._storage = new List();
  }
}
class List {...}
```

<br/><br/>
### 🐈‍⬛ Reference 
* [이재원의 티스토리](https://slog2.tistory.com/25)




