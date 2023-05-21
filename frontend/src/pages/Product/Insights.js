import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import SalesLineChart from '../../components/productCharts/SalesLineChart';
import OrderBarChart from '../../components/productCharts/OrderBarChart';
import ProductBarChart from '../../components/productCharts/ProductBarChart';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-hot-toast';
import './insights.scss'

function Insights() {

  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded') {
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
            }
        }
    });

    userRequest.get("orders/insights/orderStats")
    .then(res => {
        setTotalRevenue(res.data.totalAmount)
        setTotalOrders(res.data.totalOrders)
    }).catch(err => {
        toast.error(err.message)
    })

    userRequest.get("products/insights/productStats")
    .then(res => {
        setTotalProducts(res.data.totalProducts)
    }).catch(err => {
        toast.error(err.message)
    })

  }, []);

  return (
    <AdminLayout>

      <div className="productInsightsOverview">

        <div className="productInsight">
          <img src='https://cdn-icons-png.flaticon.com/512/550/550713.png' className="productInsightImg" />
          <div className="productInsightDetails">
            <span className="productInsightName">Total Sales Revenue</span>
            <span className="productInsightData">Rs. {totalRevenue.toLocaleString()}</span>
          </div> 
        </div>

        <div className="productInsight">
          <img src='https://cdn-icons-png.flaticon.com/512/6391/6391277.png' className="productInsightImg" />
          <div className="productInsightDetails">
            <span className="productInsightName">Total Orders</span>
            <span className="productInsightData">{totalOrders}</span>
          </div> 
        </div>

        <div className="productInsight">
          <img src='https://cdn-icons-png.flaticon.com/512/2875/2875986.png' className="productInsightImg" />
          <div className="productInsightDetails">
            <span className="productInsightName">Total Products</span>
            <span className="productInsightData">{totalProducts}</span>
          </div> 
        </div>

      </div>

      <SalesLineChart />
      <OrderBarChart />
      <ProductBarChart />

    </AdminLayout>
  );
}

export default Insights;
