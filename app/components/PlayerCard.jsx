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

  return (
    <div
      key={player.id}
      className={`${getPositionClasses(
        player.position,
        player.index
      )} player-card text-center p-2 rounded-lg w-24`}
    >
      <div className="bg-black bg-opacity-70 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-white">{player.name}</h4>
        <p className="text-sm text-white">{player.points} pts</p>
        {player.isCaptain && (
          <span className="text-yellow-400 text-sm font-bold">C</span>
        )}
        {player.isViceCaptain && (
          <span className="text-yellow-400 text-sm font-bold">VC</span>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
