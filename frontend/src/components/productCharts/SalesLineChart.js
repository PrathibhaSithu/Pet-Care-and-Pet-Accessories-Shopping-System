import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-hot-toast';
import "./salesLineChart.css";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesLineChart() {

  const [yearlyIncome, setYearlyIncome] = useState([]);

  useEffect(() => {
    userRequest
      .get('/orders/insights/yearlyIncome')
      .then((res) => {
        console.log(res);
        setYearlyIncome(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });

  }, []);

  return (
    <div className="salesLineChart">
      <h3 className="salesChartTitle">Sales Performance</h3>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <LineChart data={yearlyIncome}>
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          <YAxis />
          <XAxis dataKey="name" />
          <Line type="monotone" dataKey="Income" stroke="#5550bd" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}