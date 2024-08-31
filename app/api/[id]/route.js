export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Fetch the static data for the current gameweek
    const gameweekRes = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    if (!gameweekRes.ok) throw new Error("Failed to fetch gameweek data");

    const gameweekData = await gameweekRes.json();
    const currentGameweek = gameweekData.events.find(
      (event) => event.is_current
    )?.id;

    if (!currentGameweek) {
      return new Response(
        JSON.stringify({ error: "No current gameweek found" }),
        {
          status: 404,
        }
      );
    }

    // Fetch the user's picks for the current gameweek
    const picksRes = await fetch(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${currentGameweek}/picks/`
    );
    if (!picksRes.ok)
      return new Response(
        JSON.stringify({ error: "Failed to fetch user picks data" }),
        { status: 500 }
      );
    const picksData = await picksRes.json();

    // Fetch the live data for the current gameweek
    const liveRes = await fetch(
      `https://fantasy.premierleague.com/api/event/${currentGameweek}/live/`
    );
    if (!liveRes.ok)
      return new Response(
        JSON.stringify({ error: "Failed to fetch live data" }),
        { status: 500 }
      );
    const liveData = await liveRes.json();

    // Prepare player data from the static gameweek data
    const playerData = gameweekData.elements.reduce((acc, player) => {
      acc[player.id] = player;
      return acc;
    }, {});

    // Return the combined data as a JSON response
    return new Response(JSON.stringify({ picksData, liveData, playerData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching FPL data:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
