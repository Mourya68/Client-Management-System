const pool = require("../config/db");

async function setPolicy(clientId, days, action) {
  const query = `
    INSERT INTO retention_policies (client_id, days, action)
    VALUES ($1, $2, $3)
    ON CONFLICT (client_id)
    DO UPDATE SET days = $2, action = $3
  `;
  await pool.query(query, [clientId, days, action]);
}

async function getAllPolicies() {
  const res = await pool.query("SELECT * FROM retention_policies");
  return res.rows;
}

module.exports = { setPolicy, getAllPolicies };
