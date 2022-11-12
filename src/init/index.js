import INVOICE from "../invoices.json";
import PLAYS from "../play.json";
import createStatementData from "./createStatementData";

// format과 같이 함수 변수를 일반 함수로 변경하는 것도 리팩토링에 해당된다.
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays){
  // invoice와 plays와 같은 인수들을 중간 데이터 구조로 옮기면
  // 단계를 줄일 수 있다.
  let result = `청구 내역(고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

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
  
}

console.log(statement(INVOICE[0], PLAYS));
