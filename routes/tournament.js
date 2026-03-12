router.post("/create", async (req, res) => {

  const { name, prizePool, game } = req.body;

  const tournament = new Tournament({

    name,
    prizePool,
    game,
    players: []

  });

  await tournament.save();

  res.json({
    message: "Tournament created",
    tournament
  });

});
