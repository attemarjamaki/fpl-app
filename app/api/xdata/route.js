import axios from "axios";

export async function GET(request) {
  try {
    // Fetch data from the FPL API
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = response.data;

    // Extract the player data (elements) and team data (teams)
    const players = data.elements;

    // Prepare the processed data
    const processedPlayers = players.map((player) => {
      return {
        name: player.web_name,
        position: mapPosition(player.element_type),
        team: player.team,
        price: (player.now_cost / 10).toFixed(1), // Convert price from tenths to actual value
        totalPoints: player.total_points,
        expectedGoals: player.expected_goals || 0,
        expectedAssists: player.expected_assists || 0,
        expectedGoalInvolvements: player.expected_goal_involvements || 0,
      };
    });

    // Send back the processed data as a JSON response
    return new Response(JSON.stringify(processedPlayers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from FPL API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// Helper function to map position IDs to position names
function mapPosition(positionId) {
  const positions = {
    1: "GKP",
    2: "DEF",
    3: "MID",
    4: "FWD",
  };
  return positions[positionId] || "NaN";
}
