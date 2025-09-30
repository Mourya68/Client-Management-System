# data-lifecycle-service
This microservice is responsible for managing the data lifecycle of client receipts stored in Azure Blob Storage
# 📦 Microservice 21: Data Lifecycle Management Service

This microservice is responsible for managing the **data lifecycle** of client receipts stored in **Azure Blob Storage**. It performs daily scans to **auto-archive or delete files** based on each client’s retention policy. It also sends **email alerts before deletion** using a mock or real email service.

---

## 🚀 Features

- ✅ Daily scan of receipts using a cron job
- ✅ Retention policies per client (days + action: `delete` or `archive`)
- ✅ Auto-delete or archive files from Azure Blob Storage
- ✅ Sends email alerts before deletion (via Gmail or Ethereal)
- ✅ RESTful API for managing policies and manual archiving

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Azure Blob Storage SDK**
- **Node-Cron**
- **Nodemailer (Gmail or Ethereal for testing)**

---

## 📁 Folder Structure
data-lifecycle-service/
│
├── config/
│   └── db.js
│   └── azureBlob.js
│
├── controllers/
│   └── policyController.js
│   └── lifecycleController.js
│
├── services/
│   └── cronJob.js
│   └── emailService.js
│   └── policyService.js
│
├── models/
│   └── RetentionPolicy.js
│
├── routes/
│   └── policyRoutes.js
│   └── lifecycleRoutes.js
│
├── .env
├── app.js
└── package.json
## ⚙️ Environment Variables (`.env`)

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/lifecycle_db
AZURE_STORAGE_CONNECTION_STRING=your-azure-blob-connection-string
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your-16-char-app-password
PORT=4000
✅ Use Gmail App Passwords for testing emails.

🧪 API Endpoints
Method		  Endpoint			          Description
POST			  /api/set-policy			    Set or update retention policy
GET			    /api/check-expiring		  Fetch all active retention policies
DELETE			/api/archive/:receiptId	Manually archive a receipt by ID

🕒 Cron Job Behavior
Runs every day at 1:00 AM
Scans files in each client’s Azure container
If file age ≥ retention policy:
Sends an email alert
Then performs delete or archive action

🧾 Database Schema (PostgreSQL)
sql
CREATE TABLE retention_policies (
  client_id VARCHAR PRIMARY KEY,
  days INT NOT NULL,
  action VARCHAR(10) CHECK (action IN ('delete', 'archive')) NOT NULL
);
🛠️ Running the Service Locally
Clone the repo:
git clone https://github.com/ Komal-TGT /data-lifecycle-service.git
cd data-lifecycle-service

Install dependencies:
npm install
Configure .env file
Run PostgreSQL and create the lifecycle_db + table

Start the server:
node app.js
✅ For testing cron: change schedule to every minute in cronJob.js
cron.schedule("*/1 * * * *", scanAndHandleReceipts)

📤 Email Testing
Use Gmail with app password for real email alerts
Check terminal for email preview link if using Ethereal

📫 Contact
For questions or support, email: komal41003@gmail.com
🙋‍♂️ Made By KOMAL RANI
🔗 GitHub: github.com/Komal-TGT


