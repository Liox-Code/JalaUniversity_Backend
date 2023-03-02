export class XPay {
  cardExpYear: string
  customerName: string
  credirCardNo: string
  cardExpMonth: string
  amount: number
  cardCVVNo: number

  constructor (
    cardExpYear: string,
    customerName: string,
    credirCardNo: string,
    cardExpMonth: string,
    amount: number,
    cardCVVNo: number
  ) {
    this.cardExpYear = cardExpYear
    this.customerName = customerName
    this.credirCardNo = credirCardNo
    this.cardExpMonth = cardExpMonth
    this.amount = amount
    this.cardCVVNo = cardCVVNo
  }
}
