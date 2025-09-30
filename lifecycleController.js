const blobServiceClient = require("../config/azureBlob");

async function archiveReceipt(req, res) {
  const { receiptId } = req.params;

  const sourceContainer = blobServiceClient.getContainerClient("receipts");
  const targetContainer = blobServiceClient.getContainerClient("archives");

  const sourceBlob = sourceContainer.getBlobClient(receiptId);
  const targetBlob = targetContainer.getBlockBlobClient(receiptId);

  const downloadResponse = await sourceBlob.download();
  await targetBlob.uploadStream(downloadResponse.readableStreamBody);
  await sourceBlob.delete();

  res.send("Archived successfully");
}

module.exports = { archiveReceipt };
