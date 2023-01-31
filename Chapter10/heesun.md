# 조건부 로직 간소화

### 10.1 조건문 분해하기
Decompose Conditional

>복잡한 조건부 로직은 함수로 추출해서 간단하게 만든다.

```javascript
// before
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge

// after
if (summer())
  charge = summerCharge();
else
  charge = regularCharge();
```

### 10.2 조건식 통합하기
Consolidate Conditional Expression

>비교하는 조건은 다르지만 결과가 똑같은 코드는 하나로 통합한다.

```javascript
// before
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;

// after
function disabilityAmount(anEmployee) {
  if (isNotEligableForDisability()) return 0;

function isNotEligableForDisability() {
  return ((anEmployee.seniority < 2)
    || (anEmployee.monthsDisabled > 12)
    || (anEmployee.isPartTime));
}
```

### 10.3 중첩 조건문을 보호 구문으로 바꾸기
Replace Nested Conditional with Guard Clauses

>

```javascript
// before
function payAmount(employee) {
  let result;
  if(isDead) {
    result = deadAmount();
  }
  else {
    if (isSeparated) {
      result = separatedAmount();
    }
    else {
      if (isRetired)
        result = retiredAmount();
      else
        result = normalPayAmount();
      }
  }
  return result;
}

// after
function getpayAmount(employee) {
  if(isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if(isRetired) return retiredAmount();
  return normalPayAmount();
}

- 중첩 조건문을 보호구문으로 바꾸는 핵심은 의도부각
- if-then-else의 경우 양쪽이 모두 중요, 보호구문의 경우 핵심이아니라 무언가 조치를취하고 빠져나온다는 느낌.

// before
function payAmount(employee) {
  let result;
  if(isDead) {
    result = deadAmount();
  }
  else {
    if (isSeparated) {
      result = separatedAmount();
    }
    else {
      if (isRetired)
        result = retiredAmount();
      else
        result = normalPayAmount();
      }
  }
  return result;
}

// 1. 가장 바깥것을 선택하여 보호구문으로 변경후 테스트
function payAmount(employee) {
  let result;
  if(isDead) return deadAmount();
  if (isSeparated) {
    result = separatedAmount();
  }
  else {
    if (isRetired)
      result = retiredAmount();
    else
      result = normalPayAmount();
    }
 return result;
}

// 2. 위 과정을 반복하기
```






### REFERENCE
📖 [Slowly velog.io](https://velog.io/@billion109/%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81-10.-%EC%A1%B0%EA%B1%B4%EB%B6%80-%EB%A1%9C%EC%A7%81-%EA%B0%84%EC%86%8C%ED%99%94)
