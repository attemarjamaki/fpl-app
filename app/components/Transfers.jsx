"use client";

import React, { useEffect, useState } from "react";

const Transfers = ({ managerData }) => {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPlayers();
  }, []);

  const transfers = managerData.latestTransfers;

  return (
    <div>
      Transfers
      <div>
        {" "}
        {transfers && transfers.length > 0 ? (
          // Map over the transfers array and display each transfer
          transfers.map((transfer, index) => (
            <div key={index}>
              <p>
                <strong>Player:</strong> {transfer.element_in}
              </p>
              <p>
                <strong>From:</strong> {transfer.element_out}
              </p>
              <hr />
            </div>
          ))
        ) : (
          <p>No transfers available</p>
        )}
      </div>
    </div>
  );
};

export default Transfers;
