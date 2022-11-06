import INVOICE from "../invoices.json";
import PLAYS from "../play.json";

function playFor(aPerformance) {
  return PLAYS[aPerformance.playID];
}

function amountFor(aPerformance){
  /*
  자바스크립트와 같은 동적 타입 언어는 타입이 드러나게 작성한다.
  매개변수 이름에 접두어로 타입 이름을 적고 역할이 뚜렷하지 않을 때는
  부정 관사 (a/an)를 붙인다.
  Smalltalk Best Practice Patterns 참고
  */
  let result = 0;
  switch (playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }
  return result;
}

function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역(고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    /*
    totalAmount의 값이 변하지 않으므로 변수 인라인하기를 적용한다.
    play변수를 제거함으로써 로컬 유효범위의 변수가 하나 줄어서 
    포인트 계산 부분을 추출하기가 쉬워졌다.
    */
    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(perf).type) 
    volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

console.log(statement(INVOICE[0]));
