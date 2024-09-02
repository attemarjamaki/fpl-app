"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";
import ManagerCard from "../components/ManagerCard";

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

  if (loading)
    return (
      <div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
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
        <ManagerCard managerData={managerData} />
        <div className="card rounded-box px-2 bg-[url('/images/pitch.svg')] bg-no-repeat bg-center bg-cover min-w-[600px]">
          {/* Starting XI Layout with Grouped Rows */}
          <div className="mt-4 space-y-4">
            {/* Goalkeeper */}
            <div className="flex justify-center">
              {startingPlayers
                .filter((player) => player.position === 1)
                .map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
            </div>

            {/* Defenders */}
            <div className="flex justify-around gap-2">
              {startingPlayers
                .filter((player) => player.position === 2)
                .map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
            </div>

            {/* Midfielders */}
            <div className="flex justify-around gap-2">
              {startingPlayers
                .filter((player) => player.position === 3)
                .map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
            </div>

            {/* Forwards */}
            <div className="flex justify-around gap-2">
              {startingPlayers
                .filter((player) => player.position === 4)
                .map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
            </div>
          </div>

          <div className="bg-green-400 mt-8 p-4">
            {benchPlayers.length > 0 && (
              <div className="flex justify-between place-items-center">
                {benchPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
