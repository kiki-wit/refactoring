class PerformanceCalculator {
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }
    // 삭제해도 무관함.
    get amount(){
        throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
    }

    get volumCredits() {
        let result = 0;
        result += Math.max(this.performance.audience -30, 0);
        if ("comedy" === this.play.type)
        result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

// 비극 공연료 계산 코드 서브 클래스로 이동
class TragedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 40000;
        if(this.performance.audience > 30){
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}
// 희극 공연료 계산 코드 서브 클래스로 이동
class ComedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 30000;
        if (this.performance.audience > 20){
            result += 1000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }
}

/**
 * 함수를 이용하면 PerformanceCalculator의 서브클래스 중 어느 것을
 * 생성해서 반환할지 선택할 수 있다.
*/
function createPerformanceCalculator(aPerformance, aPlay){
    switch(aPlay.type){
        case "tragedy" : return new TragedyCalculator(aPerformance, aPlay);
        case "comedy" : return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`알 수 없는 장르 : ${aPlay.type}`);
    }
}

// 중간 데이터 생성을 전담한다.
export default function createStatementData(invoice, plays){
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
    
    /**
     * 각 공연의 정보를 중간 데이터 구조에 채워준다.
    */
    function enrichPerformance(aPerformance){
      // ECMAScript2015(ES6) 객체지향 구조를 활용한다.
      const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
      const result = Object.assign({}, aPerformance);
      // 함수 인라인을 해서 새 함수를 직접 호출한다.
      result.play = calculator.play;
      result.amount = calculator.amount;
      result.volumCredits = calculator.volumCredits;
      return result;
    }
  
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  
    function amountFor(aPerformance){
      return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }
  
    // <-- 총합 시작 
    function totalAmount(data){
        return data.performances
        .reduce((total, p) => total + p.amount, 0);
    }
  
    function totalVolumeCredits(data){
        return data.performances
        .reduce((total, p) => total + p.volumCredits, 0);
    }
    // 총합 끝 --> 
  
  }