import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-hot-toast';
import "./productBarChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ProductBarChart() {

    const [productCount, setProductCount] = useState([]);

    useEffect(() => {
    
        userRequest
          .get('/products/insights/productCount')
          .then((res) => {
            console.log(res);
            setProductCount(res.data);
          })
          .catch((err) => {
            toast.error(err.message);
            console.log(err);
          });

      }, []);
    
    return (
        <div className="productBarChart">
        <h3 className="productChartTitle">Product Count By Category</h3>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
            <BarChart data={productCount}>
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                <XAxis dataKey="categoryA" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Food" fill="#0088FE" />
                <Bar dataKey="Accessory" fill="#00C49F" />
                <Bar dataKey="Toy" fill="#FFBB28" />
            </BarChart>
        </ResponsiveContainer>
      </div>

    );
}
