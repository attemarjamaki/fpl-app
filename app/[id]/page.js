"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerPage = ({ params }) => {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchManagerData() {
      try {
        // Fetch the processed data from the API
        const response = await axios.get(`/api/${params.id}`);

        // Store the response data in state
        setManagerData(response.data);
      } catch (err) {
        console.error("Error fetching manager data:", err);
        setError(err.response?.data?.error || "Failed to fetch manager data");
      } finally {
        setLoading(false);
      }
    }

    fetchManagerData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid p-8 place-items-center">
          <h1>Manager: {managerData.managerName}</h1>
          <h2>Team: {managerData.teamName}</h2>
          <h3>Live Points: {managerData.totalPoints}</h3>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
