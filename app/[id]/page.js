"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../../components/PlayerCard";
import ManagerCard from "../../components/ManagerCard";
import Transfers from "../../components/Transfers";

const ManagerPage = ({ params }) => {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchManagerData() {
      try {
        const response = await axios.get(`/api/${params.id}`);
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
      <div className="p-20 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        <p>Error 404: Data not found. It might be playing hide-and-seek.</p>
      </div>
    );

  if (!managerData || !managerData.players) {
    return <div>No player data available</div>;
  }

  // Get the starting players (0-10) and bench players (11-14)
  const startingPlayers = managerData.players.slice(0, 11);
  const benchPlayers = managerData.players.slice(11, 15);

  console.log(benchPlayers);

  let rankDifference = managerData.lastRank - managerData.overallRank;
  let percentageChange = (rankDifference / managerData.lastRank) * 100;

  return (
    <div className="py-6 md:py-20  px-2 md:px-4 mx-auto max-w-2xl">
      <ManagerCard managerData={managerData} />
      {/* Starting XI Layout with Grouped Rows */}
      <div className="mt-4 bg-[url('/images/pitch.svg')] bg-no-repeat bg-center bg-cover space-y-4 px-2">
        {/* Goalkeeper */}
        <div className="flex justify-center">
          {startingPlayers
            .filter((player) => player.position === 1)
            .map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
        </div>

        {/* Defenders */}
        <div className="flex justify-around gap-1">
          {startingPlayers
            .filter((player) => player.position === 2)
            .map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
        </div>

        {/* Midfielders */}
        <div className="flex justify-around gap-1">
          {startingPlayers
            .filter((player) => player.position === 3)
            .map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
        </div>

        {/* Forwards */}
        <div className="flex justify-around gap-1">
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
      <div className="card rounded-box mt-6">
        <div className="bg-neutral-700 py-2 rounded-lg">
          <h2 className="text-white font-bold text-lg ml-8">Rank Details</h2>
        </div>
        <div className="flex w-full p-2 mb-10">
          <div className="flex-1 ml-1 font-bold">
            <p className="flex w-4/5 justify-between p-1">
              Points{" "}
              <span className="text-primary">{managerData.livePoints}</span>
            </p>
            <p className="flex w-4/5 justify-between p-1">
              Total{" "}
              <span className="text-primary">{managerData.overallPoints}</span>
            </p>
          </div>
          <div className="flex-1 ml-1 font-bold">
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
      <Transfers managerData={managerData} />
    </div>
  );
};

export default ManagerPage;
