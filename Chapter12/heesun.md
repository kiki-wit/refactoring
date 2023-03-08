
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

<br/>

> java 에서 부모 클래스의 메서드를 extends 로 상속받아오는 것과 동일하다.
> 부모 클래스에서 메서드를 그대로 가져오기 때문에 코드를 간소화시키고 중복 코드를 제거하는 효과가 있다.


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

<br/>

> before 코드에서 Salesman과 Engineer 클래스에서 name 필드를 각각 정의하고 있습니다. 이러한 경우에는 Employee 클래스에서 name 필드를 정의하지 않았기 때문에, Salesman과 Engineer 객체에서는 name 필드를 호출할 때 상속 체인을 타고 올라가서 Employee 클래스에는 name 필드가 없으므로 직접 정의한 필드를 사용하게 됩니다. <br/><br/>
> 하지만 after 코드에서는 Employee 클래스에서 name 필드를 정의하고, Salesman과 Engineer 클래스에서는 name 필드를 상속받아 사용합니다. 이 경우에는 Employee 클래스에서 name 필드의 접근 지정자를 protected로 지정하여, 하위 클래스에서 상속받아 사용할 수 있도록 허용하였습니다. <br/><br/>
> 이러한 변경사항은 Salesman과 Engineer 클래스에서 중복되는 name 필드를 제거하여 코드를 간소화시키고, Employee 클래스에서 name 필드를 정의하므로 모든 하위 클래스에서 공통으로 사용할 수 있는 기능을 제공하게 됩니다. 또한, protected 접근 지정자를 사용하여 Employee 클래스에서 정의한 필드에 하위 클래스에서 직접 접근하지 않고도 상속을 통해 사용할 수 있도록 했습니다.


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

<br/>

> before 코드에서 Employee 클래스가 Party 클래스를 상속하고 있으며, Employee 객체를 생성할 때 name, id, monthlyCost 값을 전달받아 각각 _name, _id, _monthlyCost 필드에 저장하고 있습니다. <br/><br/>
하지만 after 코드에서는 Party 클래스의 생성자를 수정하여 name 값을 전달받도록 변경하였습니다. 그리고 Employee 클래스에서 super 키워드를 사용하여 Party 클래스의 생성자를 호출하고, name 값을 전달하도록 수정하였습니다. 이렇게 함으로써 Employee 클래스에서는 name 필드를 상속받아 사용할 수 있게 되며, Party 클래스에서는 name 필드를 직접 정의하여 Employee 클래스에서 사용할 수 있게 되었습니다. <br/><br/>
이러한 변경사항은 Party 클래스에서 name 필드를 정의함으로써 코드의 재사용성을 높이고, Employee 클래스에서는 name 필드를 상속받아 사용할 수 있으므로 중복 코드를 제거하고 코드를 간소화시킬 수 있게 되었습니다.


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

<br/>

> 특정 서브클래스와만 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스에서 추가하는 것이 깔끔하다.


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




