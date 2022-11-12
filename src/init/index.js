import INVOICE from "../invoices.json";
import PLAYS from "../play.json";
import createStatementData from "./createStatementData";

// format과 같이 함수 변수를 일반 함수로 변경하는 것도 리팩토링에 해당된다.
function htmlStatement(invoice, plays) {
  return renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data, plays){
  let result = `<h1>청구 내역(고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>죄석 수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += ` <tr><td>${perf.play.name}</td><td>(${
      perf.audience}석)</td>\n`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: ${data.totalVolumeCredits}점</p>\n`;
  return result;
}

// 최상위로 이동
function usd(aNumber){
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber/100);
}

console.log(htmlStatement(INVOICE[0], PLAYS));
