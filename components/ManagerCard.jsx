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
    <div>
      <div className="bg-neutral-700 py-2 rounded-lg">
        <h2 className="text-white font-bold text-lg ml-8">
          {managerData.managerName}
        </h2>
        <h2 className="text-white text-lg ml-8 mt-1">
          GW {managerData.currentGameweek}
        </h2>
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="px-4 py-3 text-center">
            <div className="text-sm text-gray-600 mb-1">Average</div>
            <div className="text-lg font-semibold">
              {managerData.averageScore}
            </div>
          </div>
          <div className="px-4 py-3 text-center">
            <div className="text-sm text-gray-600 mb-1">Points</div>
            <div className="text-2xl font-bold text-blue-500">
              {managerData.livePoints}
            </div>
          </div>
          <div className="px-4 py-3 text-center">
            <div className="text-sm text-gray-600 mb-1">Overall Rank</div>
            <div className="text-lg font-semibold flex items-center justify-center gap-1">
              {managerData.overallRank.toLocaleString("en-US")}
              <span>
                {" "}
                <Image
                  src={rankChangeImage}
                  alt={rankChangeIndicator}
                  width={12}
                  height={12}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerCard;
