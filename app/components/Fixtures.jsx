"use client";

import React from "react";
import { useEffect, useState } from "react";

const Fixtures = ({ managerData }) => {
  const [players, setPlayers] = useState({});
  const [teamNames, setTeamNames] = useState({});
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    async function fetchFixtures() {
      try {
        const res = await fetch("/api/fixtures");
        if (!res.ok) {
          throw new Error("Failed to fetch fixtures");
        }
        const data = await res.json();
        setFixtures(data);
      } catch (error) {
        setError(error.message);
      }
    }

    async function fetchPlayers() {
      try {
        const res = await fetch("/api/players");
        if (!res.ok) {
          throw new Error("Failed to fetch player");
        }
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamNames();
    fetchFixtures();
    fetchPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getPlayerName = (id) => {
    const player = players.find((p) => p.id === id);
    return player ? player.second_name : "Unknown";
  };

  return (
    <>
      <div className="mt-10">
        <div className="bg-neutral-700 py-4">
          <h2 className="text-white font-bold text-3xl ml-8">
            Gameweek {managerData.currentGameweek} Fixtures
          </h2>
        </div>
      </div>
      {fixtures.map((fixture, index) => (
        <div key={index} className="flex w-full">
          <div className="flex-1 border-b-2 border-neutral-200 rounded-none grid min-h-20 place-items-center">
            <h2 className="text-lg font-semibold text-neutral-800">
              {teamNames[fixture.team_h]}{" "}
            </h2>
            <div>
              {fixture.own_goals.away.map((ownGoal) => (
                <p key={ownGoal.element} className="text-red-500">
                  {getPlayerName(ownGoal.element)}
                </p>
              ))}
            </div>
            <div>
              {fixture.goalscorer.home.map((goal) => (
                <p key={goal.element}>
                  {getPlayerName(goal.element)}
                  {goal.value > 1 ? ` (${goal.value})` : ""}
                </p>
              ))}
            </div>
            <div>
              {fixture.assists.home.map((assist) => (
                <p key={assist.element}>
                  {getPlayerName(assist.element)}
                  {assist.value > 1 ? ` (${assist.value})` : ""}
                </p>
              ))}
            </div>
          </div>
          <div className="divider divider-horizontal">
            {fixture.team_h_score} - {fixture.team_a_score}
          </div>
          <div className="flex-1 border-b-2 border-neutral-200 rounded-none grid min-h-20 place-items-center">
            <h2 className="text-lg font-semibold text-neutral-800">
              {teamNames[fixture.team_a]}{" "}
            </h2>
            <div>
              <p className="text-red-500">
                {fixture.own_goals.home
                  .map((ownGoal) => getPlayerName(ownGoal.element))
                  .join(", ")}
              </p>
            </div>
            <div>
              {fixture.goalscorer.away.map((goal) => (
                <p key={goal.element}>
                  {getPlayerName(goal.element)}
                  {goal.value > 1 ? ` (${goal.value})` : ""}
                </p>
              ))}
            </div>
            <div>
              {fixture.assists.away.map((assist) => (
                <p key={assist.element}>
                  {getPlayerName(assist.element)}
                  {assist.value > 1 ? ` (${assist.value})` : ""}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Fixtures;
