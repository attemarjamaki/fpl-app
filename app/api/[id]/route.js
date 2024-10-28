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

    const managerResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/`
    );

    const managerData = managerResponse.data;

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

    const currentRank = overallLeague.entry_rank;
    const lastRank = overallLeague.entry_last_rank;

    const picksResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${currentGameweek}/picks/`
    );
    const liveResponse = await axios.get(
      `https://fantasy.premierleague.com/api/event/${currentGameweek}/live/`
    );

    const transfersResponse = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/transfers/`
    );

    const picks = picksResponse.data.picks;
    const liveData = liveResponse.data.elements;
    const playerDetails = bootstrapResponse.data.elements;
    const transfers = transfersResponse.data;

    let livePoints = 0;
    const players = picks.map((pick, index) => {
      const playerLiveData = liveData.find(
        (player) => player.id === pick.element
      );
      const playerInfo = playerDetails.find(
        (player) => player.id === pick.element
      );

      let playerPoints = playerLiveData.stats.total_points;
      if (pick.is_captain) {
        playerPoints *= 2;
      }
      if (index < 11) {
        livePoints += playerPoints;
      }

      return {
        id: pick.element,
        position: playerInfo.element_type,
        name: playerInfo.web_name,
        team: playerInfo.team,
        selectedPercent: playerInfo.selected_by_percent,
        points: playerPoints,
        isCaptain: pick.is_captain,
        isViceCaptain: pick.is_vice_captain,
      };
    });

    const latestTransfers = transfers.filter(
      (transfer) => transfer.event === currentGameweek
    );

    let rankChangeIndicator = "same";
    if (currentRank < lastRank) {
      rankChangeIndicator = "up";
    } else if (currentRank > lastRank) {
      rankChangeIndicator = "down";
    }

    const responseData = {
      managerName: `${managerData.player_first_name} ${managerData.player_last_name}`,
      teamName: managerData.name,
      overallPoints: managerData.summary_overall_points,
      overallRank: managerData.summary_overall_rank,
      lastRank: lastRank,
      rankChangeIndicator: rankChangeIndicator,
      gameweekRank: managerData.summary_event_rank || "NaN",
      livePoints: livePoints,
      players: players,
      averageScore: averageEntryScore,
      currentGameweek: currentGameweek,
      latestTransfers: latestTransfers,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch live points" }),
      {
        status: 500,
      }
    );
  }
}
