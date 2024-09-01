import axios from "axios";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Fetch the current gameweek
    const bootstrapResponse = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const currentEvent = bootstrapResponse.data.events.find(
      (event) => event.is_current
    );

    if (!currentEvent) {
      return new Response(
        JSON.stringify({ error: "No current gameweek found" }),
        {
          status: 404,
        }
      );
    }

    const currentGameweek = currentEvent.id;

    // Fetch manager's basic data
    const managerResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/`
    );

    // Fetch manager's team and live data
    const picksResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${currentGameweek}/picks/`
    );
    const liveResponse = await axios.get(
      `https://fantasy.premierleague.com/api/event/${currentGameweek}/live/`
    );

    const managerData = managerResponse.data;
    const picks = picksResponse.data.picks;
    const liveData = liveResponse.data.elements;

    // Calculate the total points based on picks and live data
    let livePoints = 0;
    picks.forEach((pick) => {
      const playerLiveData = liveData.find(
        (player) => player.id === pick.element
      );
      let playerPoints = playerLiveData.stats.total_points;

      // Add the player's points to the total
      if (pick.is_captain) {
        livePoints += playerPoints * 2; // Double points for captain
      } else {
        livePoints += playerPoints;
      }
    });

    // Prepare the response data
    const responseData = {
      managerName: `${managerData.player_first_name} ${managerData.player_last_name}`,
      teamName: managerData.name,
      livePoints: livePoints,
    };

    // Send back the processed data, including manager's name, team name, and points
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching live points:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch live points" }),
      {
        status: 500,
      }
    );
  }
}
