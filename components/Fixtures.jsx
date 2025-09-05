"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Fixtures = () => {
  const [players, setPlayers] = useState({});
  const [teamNames, setTeamNames] = useState({});
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

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

  if (loading)
    return (
      <div className="p-20 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const getPlayerName = (id) => {
    const player = players.find((p) => p.id === id);
    return player ? player.second_name : "Unknown";
  };

  const getLogoImage = (teamId) => {
    return `/images/logos/t_${teamId}.png`;
  };

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="py-6 md:py-20  px-2 md:px-4 mx-auto max-w-2xl">
      <div className="bg-neutral-700 py-2 rounded-lg">
        <h2 className="text-white font-bold text-lg ml-8">Fixtures</h2>
      </div>
      {fixtures.map((fixture, index) => (
        <div className="bg-neutral-200 p-4 rounded-xl mt-4" key={index}>
          <div key={index} className="flex w-full">
            <div className="flex-1">
              <div className="flex">
                <p className="font-bold my-auto ml-auto">
                  {teamNames[fixture.team_h]}
                </p>
                <Image
                  src={getLogoImage(fixture.team_h)}
                  alt={`${fixture.team_h} logo`}
                  width={32}
                  height={32}
                  className="ml-2 !h-[32px]"
                />
              </div>
              <div className="mt-2 mb-4">
                <div>
                  {fixture.own_goals.away.map((ownGoal) => (
                    <div
                      key={ownGoal.element}
                      className="flex items-center mt-1"
                    >
                      <p className="flex items-center ml-auto font-semibold text-red-500">
                        {getPlayerName(ownGoal.element)}
                      </p>
                      <span className="flex ml-1">
                        <img
                          src="/images/ball-red.png"
                          alt="own goal"
                          style={{ width: "20px" }}
                          className="ml-0.5"
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  {fixture.goalscorer.home.map((goal) => (
                    <div key={goal.element} className="flex items-center mt-1">
                      <p className="flex items-center ml-auto font-semibold">
                        {getPlayerName(goal.element)}
                        <span className="flex ml-1">
                          {Array.from({ length: goal.value }).map(
                            (_, index) => (
                              <img
                                key={index}
                                src="/images/ball.png"
                                alt="goal"
                                style={{ width: "20px" }}
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
                      <p className="flex items-center ml-auto font-semibold">
                        {getPlayerName(assist.element)}
                        <span className="flex ml-1">
                          {Array.from({ length: assist.value }).map(
                            (_, index) => (
                              <img
                                key={index}
                                src="/images/assist.png"
                                alt="assist"
                                style={{ width: "20px" }}
                                className="ml-0.5"
                              />
                            )
                          )}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mx-2">
              <div className="text-lg font-bold mt-0.5">
                {fixture.minutes > 0 ? (
                  <p>
                    {fixture.team_h_score} - {fixture.team_a_score}
                  </p>
                ) : (
                  new Date(fixture.kickoff_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                )}
              </div>
              <div className="border-l border-neutral-700 h-4/5 my-2"></div>
            </div>

            <div className="flex-1">
              <div className="flex">
                <Image
                  src={getLogoImage(fixture.team_a)}
                  alt={`${fixture.team_a} logo`}
                  width={32}
                  height={32}
                  className="mr-2 !h-[32px]"
                />
                <p className=" font-bold my-auto">
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
                          style={{ width: "20px" }}
                          className="ml-0.5"
                        />
                      </span>
                      <p className="flex items-center font-semibold text-red-500">
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
                            style={{ width: "20px" }}
                            className="ml-0.5"
                          />
                        ))}
                      </span>
                      <p className="flex items-center font-semibold">
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
                      <span className="flex mr-1">
                        {Array.from({ length: assist.value }).map(
                          (_, index) => (
                            <img
                              key={index}
                              src="/images/assist.png"
                              alt="assist"
                              style={{ width: "20px" }}
                              className="ml-0.5"
                            />
                          )
                        )}
                      </span>
                      <p className="flex items-center font-semibold">
                        {getPlayerName(assist.element)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleCard(index)}
            className="mx-auto p-2 flex items-center justify-center hover:bg-neutral-300 transition-colors duration-200 rounded-2xl"
          >
            <h3 className="text-sm text-center font-semibold text-neutral-900">
              BPS & DEFCON
            </h3>
            <svg
              className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
                expandedCards[index] ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedCards[index]
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="py-2 text-lg font-semibold text-center">Bonus</h2>
            <div className="flex w-full mt-2">
              <div className="flex-1 mb-4 font-semibold">
                {fixture.bps.home
                  .map((bonus) => (
                    <div key={bonus.element} className="flex">
                      <p className=" ml-auto mr-2">
                        {getPlayerName(bonus.element)}
                      </p>
                      <span className="mr-2">
                        {bonus.value > 1 ? ` (${bonus.value})` : ""}
                      </span>
                    </div>
                  ))
                  .slice(0, 5)}
              </div>
              <div className="flex flex-col items-center mx-4">
                <div className="border-l border-neutral-700 h-4/5 my-2"></div>
              </div>
              <div className="flex-1 mb-4 font-semibold">
                {fixture.bps.away
                  .map((bonus) => (
                    <p key={bonus.element} className="flex">
                      <span className="flex ml-2 mr-2">
                        {bonus.value > 1 ? ` (${bonus.value})` : ""}
                      </span>

                      {getPlayerName(bonus.element)}
                    </p>
                  ))
                  .slice(0, 5)}
              </div>
            </div>
            {/**
             *             <h2 className="py-2 text-lg font-semibold text-center">Defcon</h2>
            <div className="flex w-full mt-2">
              <div className="flex-1 mb-4 font-semibold">
                {fixture.defcon.home
                  .map((item) => (
                    <div key={item.element} className="flex">
                      <p className=" ml-auto mr-2">
                        {getPlayerName(item.element)}
                      </p>
                      <span className="mr-2">
                        {item.value > 1 ? ` (${item.value})` : ""}
                      </span>
                    </div>
                  ))
                  .slice(0, 5)}
              </div>
              <div className="flex flex-col items-center mx-4">
                <div className="border-l border-neutral-700 h-4/5 my-2"></div>
              </div>
              <div className="flex-1 mb-4 font-semibold">
                {fixture.defcon.away
                  .map((item) => (
                    <p key={item.element} className="flex">
                      <span className="flex ml-2 mr-2">
                        {item.value > 1 ? ` (${item.value})` : ""}
                      </span>

                      {getPlayerName(item.element)}
                    </p>
                  ))
                  .slice(0, 5)}
              </div>
            </div>
             */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fixtures;
