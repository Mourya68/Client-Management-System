const express = require("express");
const router = express.Router();
const { archiveReceipt } = require("../controllers/lifecycleController");

router.delete("/archive/:receiptId", archiveReceipt);

module.exports = router;
