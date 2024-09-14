import axios from "axios";

export async function GET(request, { params }) {
  const { id } = params;

  try {
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
    const averageEntryScore = currentEvent.average_entry_score;

    // Fetch manager data
    const managerResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/`
    );

    const managerData = managerResponse.data;

    // Find the overall league by its ID (314)
    const overallLeague = managerData.leagues.classic.find(
      (league) => league.id === 314
    );

    if (!overallLeague) {
      return new Response(
        JSON.stringify({ error: "Overall league not found" }),
        {
          status: 404,
        }
      );
    }

    // Extract current and last week's rank from the overall league
    const currentRank = overallLeague.entry_rank;
    const lastRank = overallLeague.entry_last_rank;

    const picksResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${currentGameweek}/picks/`
    );
    const liveResponse = await axios.get(
      `https://fantasy.premierleague.com/api/event/${currentGameweek}/live/`
    );

    // const managerData = managerResponse.data;
    const picks = picksResponse.data.picks;
    const liveData = liveResponse.data.elements;
    const playerDetails = bootstrapResponse.data.elements; // Add this line

    let livePoints = 0;
    const players = picks.map((pick) => {
      const playerLiveData = liveData.find(
        (player) => player.id === pick.element
      );
      const playerInfo = playerDetails.find(
        (player) => player.id === pick.element
      ); // Add this line

      let playerPoints = playerLiveData.stats.total_points;
      if (pick.is_captain) {
        playerPoints *= 2; // Double points for captain
      }
      livePoints += playerPoints;

      return {
        id: pick.element,
        position: playerInfo.element_type, // Position (1: GKP, 2: DEF, 3: MID, 4: FWD)
        name: playerInfo.web_name, // Player's name
        team: playerInfo.team, // Team ID
        selectedPercent: playerInfo.selected_by_percent,
        points: playerPoints,
        isCaptain: pick.is_captain,
        isViceCaptain: pick.is_vice_captain,
      };
    });

    // Compare current rank with last week's rank
    let rankChangeIndicator = "same";
    if (currentRank < lastRank) {
      rankChangeIndicator = "up"; // Rank improved (lower rank number)
    } else if (currentRank > lastRank) {
      rankChangeIndicator = "down"; // Rank worsened (higher rank number)
    }

    const responseData = {
      managerName: `${managerData.player_first_name} ${managerData.player_last_name}`,
      teamName: managerData.name,
      overallPoints: managerData.summary_overall_points,
      overallRank: managerData.summary_overall_rank,
      lastRank: lastRank,
      rankChangeIndicator: rankChangeIndicator,
      gameweekRank: managerData.summary_event_rank,
      livePoints: livePoints,
      players: players, // Include players data
      averageScore: averageEntryScore,
      currentGameweek: currentGameweek,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // console.error("Error fetching live points:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch live points" }),
      {
        status: 500,
      }
    );
  }
}
