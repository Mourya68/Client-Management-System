const express = require("express");
const router = express.Router();
const { setPolicyHandler, checkExpiringHandler } = require("../controllers/policyController");

router.post("/set-policy", setPolicyHandler);
router.get("/check-expiring", checkExpiringHandler);

module.exports = router;
