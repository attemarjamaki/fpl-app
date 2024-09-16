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

    async function fetchTeamNames() {
      try {
        const res = await fetch("/api/teams");
        if (!res.ok) {
          throw new Error("Failed to fetch team names");
        }
        const data = await res.json();
        setTeamNames(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
    fetchTeamNames();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 mb-10">
      <div className="bg-neutral-700 py-4 rounded-lg mb-4">
        <h2 className="text-white font-bold text-3xl ml-8">Expected Data</h2>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Player</th>
              <th className="p-2">Team</th>
              <th className="p-2">Position</th>
              <th className="p-2">(£)</th>
              <th className="p-2">Points</th>
              <th className="p-2">(xG)</th>
              <th className="p-2">(xA)</th>
              <th className="p-2">(xGI)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{player.name}</td>
                <td className="p-2">{teamNames[player.team]}</td>
                <td className="p-2">{player.position}</td>
                <td className="p-2">£{player.price}</td>
                <td className="p-2">{player.totalPoints}</td>
                <td className="p-2">
                  {Number(player.expectedGoals).toFixed(2)}
                </td>
                <td className="p-2">
                  {Number(player.expectedAssists).toFixed(2)}
                </td>
                <td className="p-2">
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
