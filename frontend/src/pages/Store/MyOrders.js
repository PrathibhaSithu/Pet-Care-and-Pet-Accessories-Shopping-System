import React, { useEffect, useState } from 'react';
import UserLayout from '../Layouts/UserLayout';
import { userRequest } from '../../requestMethods';
import './myOrders.scss'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdDone } from 'react-icons/md'
import { RxDot, RxDotFilled } from 'react-icons/rx'
import { RiGitCommitFill, RiGitCommitLine } from 'react-icons/ri'
import { FiPackage } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import NoOrders from '../../components/store/NoOrders';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = () => {
    setIsLoading(true);
    userRequest
      .get('/orders/my/orders')
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      handleOrderClick(orders[0]); // Trigger handleOrderClick with the first order (index 0)
    }
  }, [orders]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    window.scrollTo(0, 0);
  };

  return (
    <UserLayout>

      <div className='myOrdersContainer'>

      {isLoading ? (
        <></>
      ) : orders.length === 0 ? (
        <NoOrders />
      ) : (
  
      <>
      
      <div className='orderHistoryContainer'>

          <span className='orderHistoryContainerTitle'>Orders History</span>

            {orders.map((order) => (

              <div
                className={`orderHistoryItem ${order === selectedOrder ? 'selectedOrderHistoryItem' : ''}`}
                onClick={() => handleOrderClick(order)}
                key={order.orderId}
              >
                  <div className='orderHistoryItemLeft'>
                  <div className='orderHistoryItemId'>#{order.orderId}</div>
                  <div className='orderHistoryItemTotal'>Rs. {order.total.toFixed(2).toLocaleString()}</div>
                  <div className='orderHistoryItemQuantity'>
                    {order.orderItems.length > 1 ? `${order.orderItems.length} items` : `${order.orderItems.length} item`}
                  </div>
                </div>
                <div className='orderHistoryItemRight'>
                  {order.deliveryStatus === 'Completed' ? (
                    <div className='orderHistoryItemDeliveryStatus' style={{ color: '#4CAF50' }}>                  
                      <div className='orderHistoryItemDeliveryStatusTop'>
                        <MdDone />
                        <span style={{marginLeft: '5px'}}>
                          Delivered
                        </span>
                      </div>
                    </div>
                  ) : order.deliveryStatus === 'Pending' ? (
                    <div className='orderHistoryItemDeliveryStatus' style={{ color: '#003399' }}>
                      <div className='orderHistoryItemDeliveryStatusTop'>
                        <FiPackage />
                        <span style={{marginLeft: '5px'}}>
                          In Progress
                        </span>
                      </div>
                      <div className='orderHistoryItemDeliveryStatusBottom'>
                        <RxDotFilled style={{ fontSize: '25px', marginRight: '-12px' }} />
                        <RiGitCommitLine style={{ fontSize: '25px', marginRight: '-12px' }} />
                        <RxDot style={{ fontSize: '25px'}} />
                      </div>
                    </div>
                  ): (
                    <div className='orderHistoryItemDeliveryStatus' style={{ color: '#003399' }}>
                      <div className='orderHistoryItemDeliveryStatusTop'>
                        <TbTruckDelivery />
                        <span style={{marginLeft: '5px'}}>
                          In Progress
                        </span>
                      </div>
                      <div className='orderHistoryItemDeliveryStatusBottom'>
                        <RxDotFilled style={{ fontSize: '25px', marginRight: '-12px' }} />
                        <RiGitCommitFill style={{ fontSize: '25px', marginRight: '-12px' }} />
                        <RxDot style={{ fontSize: '25px'}} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ))}
      
      </div>

      <div className='orderDetailsContainer'>

        {selectedOrder && (
          <>
          <div className='myOrderView'>
              <div className='myOrderId'>
                Order #{selectedOrder.orderId}
                <span style={{color: 'grey', fontWeight: '400'}}> ({selectedOrder.orderItems.length})</span>
              </div>

              {selectedOrder.orderItems.map((orderItem) => {
                      return(
                        <div className='myOrderItem' key={orderItem.productId}>

                          <div className='myOrderItemLeft'>

                            <div className='myOrderItemImage'><img src={orderItem.image} height='160px' /> </div>

                            <div className='myOrderItemDetails'>
                              <div className='myOrderItemProductName'>
                              <Link to={`/store/${orderItem.productId}`} style={{textDecoration: 'none', color: 'black'}}>
                                {orderItem.productName}
                              </Link>
                              </div>
                              <div className='myOrderItemUnitPrice'>Rs. {orderItem.unitPrice.toFixed(2).toLocaleString()}</div>
                              <div className='myOrderItemQuantity'>{orderItem.quantity > 1 ? `${orderItem.quantity} items` : `${orderItem.quantity} item`}</div>
                            </div>

                          </div>

                          <div className='myOrderItemRight'>Rs. {orderItem.productTotal.toFixed(2).toLocaleString()} </div>
                        </div>
                      )
                })}
          </div>

          <div className='myOrderDetails'>
          <div className='myOrderDetailsTitle'>Order Details</div>
          <div className='myOrderDetailRow'>
              <div className='myOrderDetailName'>Name</div>
              <div className='myOrderDetailData'>{selectedOrder.shipping.name}</div>
          </div>
          <div className='myOrderDetailRow'>
              <div className='myOrderDetailName'>Phone Number</div>
              <div className='myOrderDetailData'>{selectedOrder.shipping.phone}</div>
          </div>
          <div className='myOrderDetailRow'>
              <div className='myOrderDetailName'>Delivery Address</div>
              <div className='myOrderDetailData'>
                {selectedOrder.shipping?.address?.line1 && selectedOrder.shipping?.address?.city
                            ? selectedOrder.shipping?.address?.line2
                                ? selectedOrder.shipping.address.line1 + ", " + selectedOrder.shipping.address.line2 + ", " + selectedOrder.shipping.address.city
                                : selectedOrder.shipping.address.line1 + ", " + selectedOrder.shipping.address.city
                            : ""
                }
                </div>
          </div>
          <div className='myOrderDetailRow'>
              <div className='myOrderDetailName'>Sub Total</div>
              <div className='myOrderDetailData'>{selectedOrder.subTotal.toFixed(2)}</div>
          </div>
          <div className='myOrderDetailRow myOrderDetailShipping'>
              <div className='myOrderDetailName'>Shipping</div>
              <div className='myOrderDetailData'>{selectedOrder.shippingAmount.toFixed(2)}</div>
          </div>
          <div className='myOrderDetailRow myOrderDetailTotal'>
              <div className='myOrderDetailName'>Total</div>
              <div className='myOrderDetailData'>Rs. {selectedOrder.total.toFixed(2)}</div>
          </div>
          </div>

          </>
        )}

      </div>

      </>
      )}

      </div>
    </UserLayout>
  );
}

export default MyOrders;
