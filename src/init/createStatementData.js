class PerformanceCalculator {
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount(){
        let result = 0;
        switch(this.play.type){
            case "tragedy": //비극
            result = 40000;
            if (this.performance.audience > 30){
                result += 1000 * (this.performance.audience - 30);
            } 
            break;
        
            case "comedy": //희극
            result = 30000;
            if (this.performance.audience > 20){
                result += 1000 + 500 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;
            break;
            default:
            throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }
        return result;
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
      const calculator = new PerformanceCalculator(aPerformance);
      const result = Object.assign({}, aPerformance);
      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumCredits = volumeCreditsFor(result);
      return result;
    }
  
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  
    function amountFor(aPerformance){
      return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }
  
    function volumeCreditsFor(aPerformance) {
      let result = 0;
      result += Math.max(aPerformance.audience -30, 0);
      if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
      return result;
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