const cron = require("node-cron");
const { getAllPolicies } = require("../models/RetentionPolicy");
const { ContainerClient } = require("@azure/storage-blob");
const dayjs = require("dayjs");
const blobServiceClient = require("../config/azureBlob");
const { sendDeletionWarning } = require("./emailService");

async function scanAndHandleReceipts() {
  const policies = await getAllPolicies();

  for (const policy of policies) {
    const { client_id, days, action } = policy;
    const containerClient = blobServiceClient.getContainerClient(client_id);

    for await (const blob of containerClient.listBlobsFlat()) {
      const lastModified = dayjs(blob.properties.lastModified);
      const diff = dayjs().diff(lastModified, "day");

      if (diff >= days) {
        const blobClient = containerClient.getBlobClient(blob.name);

        // Email alert before action
        await sendDeletionWarning("client@example.com", blob.name); // Replace with actual email

        if (action === "delete") {
          await blobClient.delete();
        } else if (action === "archive") {
          const archiveContainer = blobServiceClient.getContainerClient("archives");
          const archiveBlobClient = archiveContainer.getBlockBlobClient(blob.name);

          const downloadBlockBlobResponse = await blobClient.download();
          await archiveBlobClient.uploadStream(downloadBlockBlobResponse.readableStreamBody);
          await blobClient.delete();
        }
      }
    }
  }
}

function startCron() {
  cron.schedule("0 1 * * *", scanAndHandleReceipts); // daily at 1 AM
}

module.exports = startCron;
