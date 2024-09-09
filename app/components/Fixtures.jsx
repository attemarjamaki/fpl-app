"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  const getLogoImage = (teamId) => {
    return `/images/logos/t_${teamId}.png`;
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
        <div key={index}>
          <div key={index} className="flex w-full mt-4 ">
            <div className="flex-1">
              <div className="flex">
                <p className="text-xl font-bold my-auto ml-auto">
                  {teamNames[fixture.team_h]}
                </p>
                <Image
                  src={getLogoImage(fixture.team_h)}
                  alt={`${fixture.team_h} logo`}
                  width={52}
                  height={52}
                  className="ml-4 !h-[52px]"
                />
              </div>
              <div className="mt-2 mb-4">
                <div>
                  {fixture.own_goals.away.map((ownGoal) => (
                    <div
                      key={ownGoal.element}
                      className="flex items-center mt-1"
                    >
                      <p className="flex items-center ml-auto font-semibold text-lg text-red-500">
                        {getPlayerName(ownGoal.element)}
                      </p>
                      <span className="flex ml-1">
                        <img
                          src="/images/ball-red.png"
                          alt="own goal"
                          style={{ width: "28px" }}
                          className="ml-0.5"
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  {fixture.goalscorer.home.map((goal) => (
                    <div key={goal.element} className="flex items-center mt-1">
                      <p className="flex items-center ml-auto font-semibold text-lg">
                        {getPlayerName(goal.element)}
                        <span className="flex ml-1">
                          {Array.from({ length: goal.value }).map(
                            (_, index) => (
                              <img
                                key={index}
                                src="/images/ball.png"
                                alt="goal"
                                style={{ width: "28px" }}
                                className="ml-0.5"
                              />
                            )
                          )}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {fixture.assists.home.map((assist) => (
                    <div
                      key={assist.element}
                      className="flex items-center mt-1"
                    >
                      <p className="flex items-center ml-auto font-semibold text-lg">
                        {getPlayerName(assist.element)}
                        <span className="flex items-center ml-1">
                          <img
                            src="/images/assist.png"
                            alt="assist"
                            style={{ width: "28px" }}
                            className="ml-0.5"
                          />
                          {assist.value > 1 ? ` (${assist.value})` : ""}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mx-4">
              <div className="text-xl font-bold mt-4">
                {fixture.team_h_score} - {fixture.team_a_score}
              </div>
              <div className="border-l border-neutral-700 h-4/5 my-2"></div>
            </div>

            <div className="flex-1">
              <div className="flex">
                <Image
                  src={getLogoImage(fixture.team_a)}
                  alt={`${fixture.team_a} logo`}
                  width={52}
                  height={52}
                  className="mr-4 !h-[52px]"
                />
                <p className="text-xl font-bold my-auto">
                  {teamNames[fixture.team_a]}
                </p>
              </div>

              <div className="mt-2 mb-4">
                <div>
                  {fixture.own_goals.home.map((ownGoal) => (
                    <div
                      key={ownGoal.element}
                      className="flex items-center mt-1"
                    >
                      <span className="flex mr-1">
                        <img
                          src="/images/ball-red.png"
                          alt="own goal"
                          style={{ width: "28px" }}
                          className="ml-0.5"
                        />
                      </span>
                      <p className="flex items-center font-semibold text-lg text-red-500">
                        {getPlayerName(ownGoal.element)}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {fixture.goalscorer.away.map((goal) => (
                    <div key={goal.element} className="flex items-center mt-1">
                      <span className="flex mr-1">
                        {Array.from({ length: goal.value }).map((_, index) => (
                          <img
                            key={index}
                            src="/images/ball.png"
                            alt="goal"
                            style={{ width: "28px" }}
                            className="ml-0.5"
                          />
                        ))}
                      </span>
                      <p className="flex items-center font-semibold text-lg">
                        {getPlayerName(goal.element)}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {fixture.assists.away.map((assist) => (
                    <div
                      key={assist.element}
                      className="flex items-center mt-1"
                    >
                      <span className="flex items-center mr-1">
                        <img
                          src="/images/assist.png"
                          alt="assist"
                          style={{ width: "28px" }}
                          className="ml-0.5"
                        />
                      </span>
                      <p className="flex items-center font-semibold text-lg">
                        {getPlayerName(assist.element)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="py-2 text-xl font-semibold text-center">Bonus</h2>
            <div className="flex w-full mt-2 border-b border-neutral-700">
              <div className="flex-1 mb-4">
                {fixture.bps.home
                  .map((bonus) => (
                    <div
                      key={bonus.element}
                      className="flex text-md font-semibold"
                    >
                      <p className=" ml-auto mr-2">
                        {getPlayerName(bonus.element)}
                      </p>
                      <span className="mr-6">
                        {bonus.value > 1 ? ` (${bonus.value})` : ""}
                      </span>
                    </div>
                  ))
                  .slice(0, 5)}
              </div>
              <div className="flex flex-col items-center mx-4">
                <div className="border-l border-neutral-700 h-4/5 my-2"></div>
              </div>
              <div className="flex-1 text-md font-semibold mb-4">
                {fixture.bps.away
                  .map((bonus) => (
                    <p key={bonus.element} className="flex">
                      <span className="flex ml-6 mr-2">
                        {bonus.value > 1 ? ` (${bonus.value})` : ""}
                      </span>

                      {getPlayerName(bonus.element)}
                    </p>
                  ))
                  .slice(0, 5)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Fixtures;
