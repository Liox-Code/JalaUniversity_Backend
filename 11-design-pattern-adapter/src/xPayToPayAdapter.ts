import { yPayType } from './types'
import { XPay } from './xPay'

export class XPayToPayAdapter implements yPayType {
  private xpay: XPay

  custCardNo!: string
  cardOwnerName!: string
  totalAmount!: number
  cardExpMonthDate!: string
  CVVNo!: number

  constructor (xpay: XPay) {
    this.xpay = xpay
  }

  setProp () {
    this.custCardNo = this.xpay.credirCardNo
    this.cardOwnerName = this.xpay.customerName
    this.totalAmount = this.xpay.amount
    this.cardExpMonthDate = this.xpay.cardExpYear + this.xpay.cardExpMonth
    this.CVVNo = this.xpay.cardCVVNo
  }
}
