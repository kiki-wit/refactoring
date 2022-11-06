import INVOICE from "../invoices.json";
import PLAYS from "../play.json";

function playFor(aPerformance) {
  return PLAYS[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience -30, 0);
  if ("comedy" === playFor(aPerformance).type)
  result += Math.floor(aPerformance.audience / 5);
  return result;
}

function format(aNumber){
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber);
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
// format과 같이 함수 변수를 일반 함수로 변경하는 것도 리팩토링에 해당된다.
function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역(고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

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
