"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "CMPN",
    uv: 4000,
    Professors: 24,
    amt: 2400,
  },
  {
    name: "INFT",
    uv: 3000,
    Professors: 19,
    amt: 2210,
  },
  {
    name: "EXTC",
    uv: 2000,
    Professors: 20,
    amt: 2290,
  },
  {
    name: "EXCS",
    uv: 2780,
    Professors: 18,
    amt: 2000,
  },
  {
    name: "BioMed",
    uv: 1890,
    Professors: 12,
    amt: 2181,
  },
];
export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 45,
          left: 0,
          bottom: 5,
        }}
        barSize={22}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Professors" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
