"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [fplId, setFplId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fplId) {
      router.push(`/${fplId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 w-full px-4"
      >
        <input
          type="text"
          value={fplId}
          onChange={(e) => setFplId(e.target.value)}
          placeholder="Enter FPL ID"
          className=" flex-1 input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
