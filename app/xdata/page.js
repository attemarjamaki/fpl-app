"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpectedDataPage = () => {
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

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  // Function to get team name from team ID using the teamNames object
  const getTeamName = (teamId) => {
    return teamNames[teamId] || "Unknown Team";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Top 25 Players by Expected Goal Involvements (xGI)
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Player</th>
              <th className="p-2">Team</th>
              <th className="p-2">Position</th>
              <th className="p-2">Price (£)</th>
              <th className="p-2">Total Points</th>
              <th className="p-2">Expected Goals (xG)</th>
              <th className="p-2">Expected Assists (xA)</th>
              <th className="p-2">Expected Goal Involvements (xGI)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{player.name}</td>
                <td className="p-2">{getTeamName(player.team)}</td>
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

export default ExpectedDataPage;
