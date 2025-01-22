import React from "react";
import Image from "next/image";

const ManagerCard = ({ managerData }) => {
  if (!managerData) {
    return <div>Loading...</div>;
  }

  const { currentRank, lastRank, rankChangeIndicator } = managerData;

  let rankChangeImage;
  if (rankChangeIndicator === "up") {
    rankChangeImage = "/images/up.png";
  } else if (rankChangeIndicator === "down") {
    rankChangeImage = "/images/down.png";
  } else {
    rankChangeImage = "/images/same.png";
  }
  return (
    <div className="mt-4">
      <div className="bg-neutral-700 py-4 rounded-lg">
        <h2 className="text-white font-bold text-3xl ml-8">
          {managerData.managerName}
        </h2>
        <h2 className="text-white text-3xl ml-8 mt-1">
          GW {managerData.currentGameweek}
        </h2>
      </div>
      <div className="stats flex w-full">
        <div className="stat flex-1 text-center flex flex-col items-center justify-center">
          <div className="stat-title ">Average</div>
          <div className="stat-value text-2xl">{managerData.averageScore}</div>
        </div>

        <div className="stat flex-1 text-center flex flex-col items-center justify-center">
          <div className="stat-title">Points</div>
          <div className="stat-value text-5xl text-primary">
            {managerData.livePoints}
          </div>
        </div>

        <div className="stat flex-1 text-center flex flex-col items-center justify-center">
          <div className="stat-title ">Overall Rank</div>
          <div className="stat-value text-2xl flex">
            {managerData.overallRank.toLocaleString("en-US")}
            <span>
              {" "}
              <Image
                src={rankChangeImage}
                alt={rankChangeIndicator}
                width={20}
                height={20}
                className="mt-1.5 ml-1"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerCard;
