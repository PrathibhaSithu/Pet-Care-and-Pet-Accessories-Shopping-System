import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-hot-toast';
import "./orderBarChart.css";
import { 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';


export default function OrderBarChart() {

  const [dailyOrderCount, setDailyOrderCount] = useState([]);

  useEffect(() => {

    userRequest
      .get('/orders/insights/dailyOrderCount')
      .then((res) => {
        console.log(res);
        setDailyOrderCount(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });

  }, []);

  return (
    <div className="orderBarChart">
      <h3 className="orderChartTitle">Daily Order Count</h3>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart data={dailyOrderCount}>
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          <Bar dataKey="Orders" fill="#8884d8" />
          <YAxis  />
          <XAxis dataKey="_id" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

}
