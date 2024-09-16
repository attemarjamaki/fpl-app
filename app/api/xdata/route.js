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
    const teams = data.teams;

    // Prepare the processed data
    const processedPlayers = players.map((player) => {
      const team = teams.find((t) => t.id === player.team); // Get team name by ID
      return {
        name: player.web_name,
        position: mapPosition(player.element_type),
        team: team ? team.name : "Unknown Team",
        price: (player.now_cost / 10).toFixed(1), // Convert price from tenths to actual value
        totalPoints: player.total_points,
        expectedGoals: player.expected_goals_per_90 || 0,
        expectedAssists: player.expected_assists_per_90 || 0,
        expectedGoalInvolvements: player.expected_goal_involvements_per_90 || 0,
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
    1: "Goalkeeper",
    2: "Defender",
    3: "Midfielder",
    4: "Forward",
  };
  return positions[positionId] || "Unknown Position";
}
