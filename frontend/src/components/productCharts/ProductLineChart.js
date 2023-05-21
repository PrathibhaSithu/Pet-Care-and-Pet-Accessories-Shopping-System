import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-hot-toast';
import "./productLineChart.css";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProductLineChart({id}) {

  const [yearlyIncome, setYearlyIncome] = useState([]);

  useEffect(() => {

    userRequest
      .get('/orders/insights/productIncome/' + id)
      .then((res) => {
        console.log(res);
        setYearlyIncome(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });

  }, [id]);

  return (
    <div className="productLineChart">
      <h3 className="productChartTitle">Sales Performance</h3>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
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