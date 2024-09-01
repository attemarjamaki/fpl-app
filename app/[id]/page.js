"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";

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
        console.log("Fetched Manager Data:", response.data);
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

  if (!managerData || !managerData.players) {
    return <div>No player data available</div>;
  }

  // Get the starting players (0-10) and bench players (11-14)
  const startingPlayers = managerData.players.slice(0, 11);
  const benchPlayers = managerData.players.slice(11, 15);

  return (
    <div>
      <div className="flex w-full flex-col">
        {/* Manager Info */}
        <div className="card bg-base-300 rounded-box grid p-8 place-items-center text-xl font-semibold">
          <h1>Manager: {managerData.managerName}</h1>
          <h2>Team: {managerData.teamName}</h2>
          <h3>Live Points: {managerData.livePoints}</h3>
          <h3>Overall Points: {managerData.overallPoints}</h3>
          <h3>
            Overall Rank: {managerData.overallRank.toLocaleString("en-US")}
          </h3>
        </div>
        <div className="divider"></div>
        <div className="card bg-base-300 rounded-box p-8">
          {/* Starting XI Grid */}
          <div className="grid grid-cols-3 grid-rows-4 gap-4 place-items-center">
            {startingPlayers.map((player, index) => (
              <PlayerCard key={player.id} player={{ ...player, index }} />
            ))}
          </div>

          {/* Bench Players Row */}
          {benchPlayers.length > 0 && (
            <div className="mt-8 grid grid-cols-4 gap-4 place-items-center">
              {benchPlayers.map((player, index) => (
                <PlayerCard key={player.id} player={{ ...player, index }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
