async function fetchData() {
  try {
    const playerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/xdata`,
      {
        cache: "no-store",
      }
    );

    if (!playerResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const playerData = await playerResponse.json();

    const sortedPlayers = playerData
      .sort((a, b) => b.expectedGoalInvolvements - a.expectedGoalInvolvements)
      .slice(0, 25);

    return { players: sortedPlayers, error: null };
  } catch (err) {
    console.error("Error fetching player or team data:", err);
    return { players: [], teamNames: {}, error: "Failed to load data" };
  }
}

export default async function ExpectedData() {
  const { players, error } = await fetchData();

  if (error) return <p>{error}</p>;

  return (
    <div className="py-6 md:py-20 px-2 md:px-4 mx-auto max-w-2xl">
      <div className="bg-neutral-700 py-2 rounded-lg mb-4">
        <h2 className="text-white font-bold text-lg ml-8">Expected Data</h2>
      </div>

      <div className="overflow-x-auto rounded-lg text-xs sm:text-base">
        <table className="table-auto w-full text-left font-semibold">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Position</th>
              <th className="py-2 px-2">Cost</th>
              <th className="py-2 px-2">Points</th>
              <th className="py-2 px-2">xG</th>
              <th className="py-2 px-2">xA</th>
              <th className="py-2 px-2">xGI</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-2">{player.name}</td>
                <td className="py-2 px-2">{player.position}</td>
                <td className="py-2 px-2">£{player.price}</td>
                <td className="py-2 px-2">{player.totalPoints}</td>
                <td className="py-2 px-2">
                  {Number(player.expectedGoals).toFixed(2)}
                </td>
                <td className="py-2 px-2">
                  {Number(player.expectedAssists).toFixed(2)}
                </td>
                <td className="py-2 px-2">
                  {Number(player.expectedGoalInvolvements).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
