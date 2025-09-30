const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use a mock here
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendDeletionWarning(email, receiptId) {
  await transporter.sendMail({
    from: `"Receipt Cleanup" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Upcoming Deletion of Receipt ${receiptId}`,
    text: `Your receipt ${receiptId} will be deleted as per retention policy.`,
  });
}

module.exports = { sendDeletionWarning };
