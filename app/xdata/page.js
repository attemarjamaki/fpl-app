"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpectedData = () => {
  const [players, setPlayers] = useState([]);
  const [teamNames, setTeamNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch player data from the Next.js API route
        const playerResponse = await axios.get("/api/xdata");
        const playerData = playerResponse.data;

        // Fetch team names from the /api/teams endpoint
        const teamResponse = await axios.get("/api/teams");
        const teamData = teamResponse.data;

        // Sort players by expectedGoalInvolvements in descending order and take top 25
        const sortedPlayers = playerData
          .sort(
            (a, b) => b.expectedGoalInvolvements - a.expectedGoalInvolvements
          )
          .slice(0, 25); // Get top 25 players

        // Set players and team names in the state
        setPlayers(sortedPlayers);
        setTeamNames(teamData);
      } catch (err) {
        console.error("Error fetching player or team data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4 mb-10 min-w-[600px]">
      <div className="bg-neutral-700 py-4 rounded-lg mb-4">
        <h2 className="text-white font-bold text-3xl ml-8">Expected Data</h2>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full text-left font-semibold">
          <thead>
            <tr className=" border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Position</th>
              <th className="py-2 px-4">Cost</th>
              <th className="py-2 px-4">Points</th>
              <th className="py-2 px-4">xG</th>
              <th className="py-2 px-4">xA</th>
              <th className="py-2 px-4">xGI</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-t text-ce">
                <td className="py-2 px-4">{player.name}</td>
                <td className="py-2 px-4">{player.position}</td>
                <td className="py-2 px-4">£{player.price}</td>
                <td className="py-2 px-4">{player.totalPoints}</td>
                <td className="py-2 px-4">
                  {Number(player.expectedGoals).toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  {Number(player.expectedAssists).toFixed(2)}
                </td>
                <td className="py-2 px-4">
                  {Number(player.expectedGoalInvolvements).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpectedData;
