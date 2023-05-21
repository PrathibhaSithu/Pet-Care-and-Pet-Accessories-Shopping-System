import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './viewOrder.scss'

function ViewOrder() {

    const { id } = useParams()

    const [orderId, setOrderId] = useState('')
    const [subTotal, setSubTotal] = useState('')
    const [shippingAmount, setShippingAmount] = useState('')
    const [total, setTotal] = useState('')
    const [date, setDate] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [deliveryStatus, setDeliveryStatus] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [shipping, setShipping] = useState([])


    useEffect(() => {
        userRequest.get('/orders/' + id)
        .then(res => {
            setOrderId(res.data.orderId)
            setSubTotal(res.data.subTotal)
            setShippingAmount(res.data.shippingAmount)
            setTotal(res.data.total)
            setDate(res.data.createdAt)
            setPaymentStatus(res.data.paymentStatus)
            setDeliveryStatus(res.data.deliveryStatus)
            setOrderItems(res.data.orderItems)
            setShipping(res.data.shipping)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='orderInfoContainer'>
            <table className='orderInfo'>
                <tr className='orderRow'>
                    <td className='orderDetail'>Order ID</td>
                    <td className='orderData'>{orderId}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Order Items</td>
                    <td className='orderData'>
                        <table className='orderItems'>
                            <tr>
                                <td className='orderItemDetail'>Product</td>
                                <td className='orderItemDetail'>Unit Price</td>
                                <td className='orderItemDetail'>Quantity</td>
                                <td className='orderItemDetail'>Total</td>
                            </tr>
                            {orderItems.map(item => {
                                return(
                                    <>
                                        <tr className='orderItemRow'>
                                            <td className='orderItemData orderItemProduct'>
                                                <div className='orderItemProductWrapper'>
                                                    <div className='orderItemProductImageConatiner'>
                                                        <img src={item.image} className='orderItemImage' />
                                                    </div>
                                                    <div className='orderItemProductNameConatiner'>
                                                        <Link to={`../admin/products/viewProduct/${item.productId}`} style={{textDecoration: 'none', color: 'black'}} >
                                                            {item.productName}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='orderItemData orderItemUnitPrice'>Rs. {item.unitPrice.toLocaleString()}</td>
                                            <td className='orderItemData orderItemQuantity'>{item.quantity}</td>
                                            <td className='orderItemData orderItemProductTotal'>Rs. {item.productTotal.toLocaleString()}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </table>

                    </td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Sub Total</td>
                    <td className='orderData'>Rs. {subTotal.toLocaleString()}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Shipping Amount</td>
                    <td className='orderData'>Rs. {shippingAmount.toLocaleString()}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Total</td>
                    <td className='orderData'>Rs. {total.toLocaleString()}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Date</td>
                    <td className='orderData'>
                        {new Date(date).toLocaleDateString()} {', '}
                        {new Date(date).toLocaleTimeString() }
                    </td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Name</td>
                    <td className='orderData'>{shipping.name}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Delivery Address</td>
                    <td className='orderData'>
                        {shipping?.address?.line1 && shipping?.address?.city
                            ? shipping?.address?.line2
                                ? shipping.address.line1 + ", " + shipping.address.line2 + ", " + shipping.address.city
                                : shipping.address.line1 + ", " + shipping.address.city
                            : ""
                        }
                    </td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Phone Number</td>
                    <td className='orderData'>{shipping.phone}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Payment Status</td>
                    <td className='orderData'>{paymentStatus === 'succeeded' ? 'Successful' : 'Unsuccessful'}</td>
                </tr>
                <tr className='orderRow'>
                    <td className='orderDetail'>Delivery Status</td>
                    <td className='orderData'>{deliveryStatus}</td>
                </tr>
            </table>
            </div>
        </AdminLayout>
    )
}

export default ViewOrder