import { XPay } from './xPay'
import { XPayToPayAdapter } from './xPayToPayAdapter';

(() => {
  const xPay = new XPay(
    '2022',
    'Bob',
    '1234',
    'JAN',
    2000,
    234987
  )
  const adapter = new XPayToPayAdapter(xPay)

  adapter.setProp()

  console.log(adapter)
})()
