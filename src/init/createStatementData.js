
// 중간 데이터 생성을 전담한다.

export default function createStatementData(invoice, plays){
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    // 총합
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
  
    function enrichPerformance(aPerformance){
      // 얕은 복사 수행
      /**
       * 가변 데이터는 금방 상하기(?) 때문에 불변으로 만들기 위해 
       * 얕은 복사를 수행해서 데이터를 채운다.
      */
      const result = Object.assign({}, aPerformance);
      result.play = playFor(result);
      result.amount = amountFor(result);
      // 적립 포인트 계산 함수 옮김
      result.volumCredits = volumeCreditsFor(result);
      return result;
    }
  
    // renderPlainText 의 중첩함수였던 playFor을 statement로 옮긴다.
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  
    function amountFor(aPerformance){
      /*
      자바스크립트와 같은 동적 타입 언어는 타입이 드러나게 작성한다.
      매개변수 이름에 접두어로 타입 이름을 적고 역할이 뚜렷하지 않을 때는
      부정 관사 (a/an)를 붙인다.
      Smalltalk Best Practice Patterns 참고
      */
      let result = 0;
      switch (aPerformance.play.type) {
        case "tragedy": //비극
        result = 40000;
          if (aPerformance.audience > 30){
            result += 1000 * (aPerformance.audience - 30);
          } 
          break;
    
        case "comedy": //희극
        result = 30000;
          if (aPerformance.audience > 20){
            result += 1000 + 500 * (aPerformance.audience - 20);
          }
          result += 300 * aPerformance.audience;
          break;
          
        default:
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }
      return result;
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
      let result = 0;
      for (let perf of data.performances){
        result += perf.amount;
      }
      return result;
    }
  
    function totalVolumeCredits(data){
      let result = 0;
      for (let perf of data.performances){
        result += perf.volumCredits;
      }
      return result;
    }
    // 총합 끝 --> 
  
  }