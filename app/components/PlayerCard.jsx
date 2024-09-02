import React from "react";

const PlayerCard = ({ player }) => {
  const getPositionClasses = (position, index) => {
    switch (position) {
      case 1: // Goalkeeper
        return "col-start-2 row-start-1";
      case 2: // Defenders
        return `row-start-2 col-start-${index + 1}`;
      case 3: // Midfielders
        return `row-start-3 col-start-${index + 1}`;
      case 4: // Forwards
        return `row-start-4 col-start-${index + 2}`; // Adjust based on number of forwards
      default:
        return "";
    }
  };

  const getShirtImage = (teamId) => {
    return `/shirts/shirt_${teamId}.png`; // Match the naming convention you used
  };

  return (
    <div
      key={player.id}
      className={`${getPositionClasses(
        player.position,
        player.index
      )} player-card text-center rounded-lg`}
    >
      <div className="relative bg-black bg-opacity-50 rounded-lg h-36 w-28">
        {player.isCaptain && (
          <span className="absolute top-8 left-1 text-white text-xl font-bold bg-black rounded-full px-2">
            C
          </span>
        )}
        {player.isViceCaptain && (
          <span className="absolute top-8 left-1 text-white text-xl font-bold bg-black rounded-full px-2">
            V
          </span>
        )}
        <img
          src={getShirtImage(player.team)} // Dynamically load the image based on team ID
          alt={`${player.name} shirt`}
          className="mx-auto mb-2 pt-2"
          style={{ width: "55px" }} // Adjust the size as needed
        />

        <div className="absolute bg-black w-full -mt-6">
          <h4 className="text-lg font-semibold text-white">
            {player.name.slice(0, 10)}
          </h4>
        </div>
        <div className="mt-3">
          <p className="text-md font-semibold text-white">{player.points}</p>
        </div>
        <div>
          <p className=" bg-slate-100 text-md text-black rounded-b-lg p-1">
            {player.selectedPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
