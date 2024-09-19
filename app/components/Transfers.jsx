"use client";

import React, { useEffect, useState } from "react";

const Transfers = ({ managerData }) => {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("/api/players");
        if (!res.ok) {
          throw new Error("Failed to fetch player");
        }
        const data = await res.json();
        setPlayers(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  if (loading) return <div> </div>;
  if (error) return <div>Error: {error}</div>;

  const transfers = managerData.latestTransfers;

  const getPlayerName = (id) => {
    const player = players.find((p) => p.id === id);
    return player ? player.second_name : "Unknown";
  };

  return (
    <div>
      Transfers
      <div>
        {transfers && transfers.length > 0 ? (
          transfers.map((transfer, index) => (
            <div key={index} className="flex w-full">
              <div className="flex-1">
                <p className="font-bold">Player in</p>{" "}
                {getPlayerName(transfer.element_in)}
              </div>
              <div className="flex-1">
                <p className="font-bold">Player out</p>{" "}
                {getPlayerName(transfer.element_out)}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No transfers Made</p>
        )}
      </div>
    </div>
  );
};

export default Transfers;
