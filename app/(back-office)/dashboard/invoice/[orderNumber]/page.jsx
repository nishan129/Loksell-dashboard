import OrderInvoice from '@/components/backoffice/OrderInvoice'
import React from 'react'

export default function page({params: {orderNumber}}) {
  return (
    <div>
        <OrderInvoice  orderNumber={orderNumber}/>
    </div>
  )
}
