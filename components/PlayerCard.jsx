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
        return `row-start-4 col-start-${index + 2}`;
      default:
        return "";
    }
  };

  const getShirtImage = (teamId) => {
    return `/images/shirts/shirt_${teamId}.png`;
  };

  return (
    <div
      key={player.id}
      className={`${getPositionClasses(
        player.position,
        player.index
      )} player-card text-center rounded-lg`}
    >
      <div className="relative bg-black bg-opacity-50 rounded-lg w-16 md:w-20">
        {player.isCaptain && (
          <span className="absolute top-7 left-1 text-white text-xs font-bold bg-black rounded-full px-1">
            C
          </span>
        )}
        {player.isViceCaptain && (
          <span className="absolute top-7 left-1 text-white text-xs font-bold bg-black rounded-full px-1">
            V
          </span>
        )}
        <img
          src={getShirtImage(player.team)}
          alt={`${player.name} shirt`}
          className="mx-auto mb-2 pt-2 w-8 md:w-10"
        />

        <div className="absolute bg-black w-full -mt-3">
          <h4 className="text-xs font-semibold text-white">
            {player.name.slice(0, 10)}
          </h4>
        </div>
        <div className="mt-3">
          <p className="text-xs font-semibold text-white">{player.points}</p>
        </div>
        <div>
          <p className=" bg-slate-100 text-xs text-black rounded-b-lg">
            {player.selectedPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
