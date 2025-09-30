const { setPolicy, getAllPolicies } = require("../models/RetentionPolicy");

async function setPolicyHandler(req, res) {
  const { clientId, days, action } = req.body;
  await setPolicy(clientId, days, action);
  res.send("Policy set");
}

async function checkExpiringHandler(req, res) {
  const policies = await getAllPolicies();
  res.json(policies);
}

module.exports = { setPolicyHandler, checkExpiringHandler };
