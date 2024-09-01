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

  const getPositionClasses = (position, index) => {
    switch (position) {
      case 1: // Goalkeeper
        return "col-start-2 row-start-1";
      case 2: // Defenders
        return `row-start-2 col-start-${index + 1}`;
      case 3: // Midfielders
        return `row-start-3 col-start-${index + 1}`;
      case 4: // Forwards
        return `row-start-4 col-start-${index + 2}`; // Adjust based on number of forwards
      default:
        return "";
    }
  };

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
              <div
                key={player.id}
                className={`${getPositionClasses(
                  player.position,
                  index
                )} player-card text-center p-2 rounded-lg`}
              >
                <div className="bg-black bg-opacity-70 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white">
                    {player.name}
                  </h4>
                  <p className="text-sm text-white">{player.points} pts</p>
                  {player.isCaptain && (
                    <span className="text-yellow-400 text-sm font-bold">C</span>
                  )}
                  {player.isViceCaptain && (
                    <span className="text-yellow-400 text-sm font-bold">
                      VC
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bench Players Row */}
          {benchPlayers.length > 0 && (
            <div className="mt-8 grid grid-cols-4 gap-4 place-items-center">
              {benchPlayers.map((player) => (
                <div
                  key={player.id}
                  className="player-card text-center p-2 rounded-lg"
                >
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white">
                      {player.name}
                    </h4>
                    <p className="text-sm text-white">{player.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
