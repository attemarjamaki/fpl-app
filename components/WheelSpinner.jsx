"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Modal } from "./Modal";

export default function WheelSpinner() {
  const [wheelData, setWheelData] = useState([
    { option: "Salah" },
    { option: "Palmer" },
    { option: "Wood" },
  ]);
  const [newOption, setNewOption] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addOption = (e) => {
    e.preventDefault();
    if (newOption.trim() !== "") {
      setWheelData([...wheelData, { option: newOption.trim() }]);
      setNewOption("");
    }
  };

  const removeOption = (index) => {
    const newWheelData = wheelData.filter((_, i) => i !== index);
    setWheelData(newWheelData);
  };

  const startSpinning = () => {
    if (wheelData.length > 1) {
      const newSelectedItem = Math.floor(Math.random() * wheelData.length);
      setSelectedItem(newSelectedItem);
      setSpinning(true);
    }
  };

  const handleStopSpinning = () => {
    setSpinning(false);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-4 mb-10 min-w-[600px]">
      <div className="bg-neutral-700 py-4 rounded-lg mb-8">
        <h2 className="text-white font-bold text-3xl ml-8">Captaincy Picker</h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="rounded-lg p-2 w-full flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex justify-center items-center">
            <Wheel
              mustStartSpinning={spinning}
              prizeNumber={selectedItem}
              data={wheelData}
              onStopSpinning={handleStopSpinning}
              backgroundColors={["#38003c", "#00ff85", "#04f5ff", "	#e90052"]}
              textColors={["#ffffff"]}
              outerBorderColor="#eeeeee"
              outerBorderWidth={10}
              innerBorderColor="#30261a"
              innerBorderWidth={0}
              innerRadius={0}
              radiusLineColor="#eeeeee"
              radiusLineWidth={8}
              fontSize={24}
              textDistance={60}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <form onSubmit={addOption} className="mb-8 flex gap-4">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new player"
                className="flex-grow text-2xl px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-xl hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add
              </button>
            </form>

            <div className="mb-4 flex-grow overflow-y-auto">
              {wheelData.map((data, index) => (
                <div
                  key={index}
                  className="text-2xl flex justify-between items-center mb-4"
                >
                  <span>{data.option}</span>
                  <button
                    onClick={() => removeOption(index)}
                    className="bg-red-500  hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-xl"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={startSpinning}
              disabled={spinning || wheelData.length < 2}
              className="w-full text-2xl bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Spin!
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
          <p className="text-2xl">
            The chosen one is <strong>{wheelData[selectedItem].option}</strong>
          </p>
          <p className="text-2xl">Let's hope he doesn't blank!</p>
        </div>
      </Modal>
    </div>
  );
}
