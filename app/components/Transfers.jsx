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
      <div className="bg-neutral-700 py-4 rounded-lg">
        <h2 className="text-white font-bold text-3xl ml-8">Transfers</h2>
      </div>
      {transfers && transfers.length > 0 ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="table-auto w-full text-left font-semibold">
            <thead>
              <tr className="border-b text-2xl">
                <th className="py-2 px-4">Player in</th>
                <th className="py-2 px-4">Player out</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer, index) => (
                <tr key={index} className="border-t text-xl">
                  <td className="py-2 px-4">
                    {getPlayerName(transfer.element_in)}
                  </td>
                  <td className="py-2 px-4">
                    {getPlayerName(transfer.element_out)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transfers Made</p>
      )}
    </div>
  );
};

export default Transfers;
