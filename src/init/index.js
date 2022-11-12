import INVOICE from "../invoices.json";
import PLAYS from "../play.json";

// format과 같이 함수 변수를 일반 함수로 변경하는 것도 리팩토링에 해당된다.
function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, invoice, plays);

  function enrichPerformance(aPerformance){
    // 얕은 복사 수행
    /**
     * 가변 데이터는 금방 상하기(?) 때문에 불변으로 만들기 위해 
     * 얕은 복사를 수행해서 데이터를 채운다.
    */
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    return result;
  }

  // renderPlainText 의 중첩함수였던 playFor을 statement로 옮긴다.
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

}

function renderPlainText(data, plays){
  // invoice와 plays와 같은 인수들을 중간 데이터 구조로 옮기면
  // 단계를 줄일 수 있다.
  let result = `청구 내역(고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(amountFor(perf))} (${
      perf.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalAmount(){
    let result = 0;
    for (let perf of data.performances){
      result += amountFor(perf);
    }
    return result;
  }

  // 여기서부터 중첩 함수 시작
  function totalVolumeCredits(){
    let result = 0;
    for (let perf of data.performances){
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  /*
  format은 함수가 하는 일을 충분히 설명해주지 못한다.
  formatAsUSD는 너무 장황하므로 함수의 핵심인 화폐 단위 맞추기를 생각해서
  usd라고 이름짓는다.
  함수를 쪼개는 리팩터링은 이름을 잘 지어야만 효과가 있다.
  */
  function usd(aNumber){
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber/100);
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience -30, 0);
    if ("comedy" === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5);
    return result;
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
  
}

console.log(statement(INVOICE[0], PLAYS));
