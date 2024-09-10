"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";
import ManagerCard from "../components/ManagerCard";
import Fixtures from "../components/Fixtures";

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
      <div className="mt-20">
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

  let rankDifference = managerData.lastRank - managerData.overallRank;
  let percentageChange = (rankDifference / managerData.lastRank) * 100;

  return (
    <div>
      <div className="flex w-full flex-col xl:flex-row">
        <div className="card rounded-box min-w-[600px]">
          <ManagerCard managerData={managerData} />
          {/* Starting XI Layout with Grouped Rows */}
          <div className="mt-4 bg-[url('/images/pitch.svg')] bg-no-repeat bg-center bg-cover px-2 space-y-4">
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
          <div className="card rounded-box min-w-[600px] mt-10">
            <div className="bg-neutral-700 py-4">
              <h2 className="text-white font-bold text-3xl ml-8">
                Rank Details
              </h2>
            </div>
            <div className="flex w-full p-2">
              <div className="flex-1 ml-1 text-2xl font-bold">
                <p className="flex w-4/5 justify-between p-1">
                  Points{" "}
                  <span className="text-primary">{managerData.livePoints}</span>
                </p>
                <p className="flex w-4/5 justify-between p-1">
                  Total{" "}
                  <span className="text-primary">
                    {managerData.overallPoints}
                  </span>
                </p>
              </div>
              <div className="flex-1 ml-1 text-2xl font-bold">
                <p className="flex w-full justify-between p-1">
                  GW Rank{" "}
                  <span className="text-primary">
                    {managerData.gameweekRank.toLocaleString("en-US")}
                  </span>
                </p>
                <p className="flex w-full justify-between p-1">
                  New{" "}
                  <span className="text-primary">
                    {managerData.overallRank.toLocaleString("en-US")}
                  </span>
                </p>
                <p className="flex w-full justify-between p-1">
                  Old Rank{" "}
                  <span className="text-primary">
                    {managerData.lastRank.toLocaleString("en-US")}
                  </span>
                </p>
                <p className="flex w-full justify-between p-1">
                  Change
                  <span
                    className={
                      percentageChange >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {percentageChange.toFixed(2) + " %"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:divider-horizontal"></div>
        <div className="card rounded-box min-w-[600px] mt-4 mb-10">
          <Fixtures managerData={managerData} />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
