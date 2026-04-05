# Dashify — A Personal Finance Dashboard

A clean and interactive finance dashboard for tracking transactions, visualizing spending patterns, and managing financial activity — built with role-based access control
## Features

- Interactive dashboard with balance, income, and expense summary cards
- Transaction management with add, search, filter, and sort support
- Visual spending breakdown with donut and bar chart views
- Auto-computed insights including top category and monthly trend analysis
- Role-based UI with Admin and Viewer access levels
- Export transactions to CSV with one click
- Dark mode with full light and dark theme support
## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui, Lucide Icons
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
## Setup Instructions
### Pre-requisites
* Node.js 18+ installed
* Git installed
### Installation

1. Clone the repository
```bash
git clone https://github.com/praff1351/finance-dashboard.git
```

2. Navigate to the project directory
```bash
cd finance-dashboard
```

3. Install dependencies
```bash
npm install
```
4. Run the development server
```bash
npm run dev
```

5. Open your browser and go to
```
http://localhost:3000
```
## Role-Based UI

Dashify simulates role-based access control on the frontend. You can switch roles from the **Settings** page.

### Admin
* Can add new transactions
* Can delete individual transactions
* Can clear all transactions

### Viewer (Normal User)
* Can view the dashboard, transactions, and insights
* Cannot add or delete transactions
* "New Transaction" button is disabled with a tooltip

## Live Demo
* https://finance-dashboard-pi-woad-85.vercel.app/

## Screenshots
#### Dashboard Overview
<img width="1365" height="680" alt="image" src="https://github.com/user-attachments/assets/c2d14088-1a63-423c-b29b-7e8a629f2a40" />
#### Dashboard Overview: Dark
<img width="1353" height="674" alt="image" src="https://github.com/user-attachments/assets/1fabdc24-91f4-464c-9acf-11701b75d333" />
#### Categorical Analysis: Donut
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/f1568125-6970-433b-88e2-8a3d5e09f383" />
#### Categorical Analysis: Bar
<img width="1365" height="521" alt="image" src="https://github.com/user-attachments/assets/df0aaeca-56f3-4c0f-9856-83622ca21c4a" />
#### Recent Activity and Top Categories Section
<img width="1362" height="680" alt="image" src="https://github.com/user-attachments/assets/a2e68e47-7a03-48a5-a8e1-d72d528dc490" />
#### Transactions
<img width="1365" height="677" alt="image" src="https://github.com/user-attachments/assets/a2b38595-6d67-4220-bcc2-2f6a4f6f4e07" />
#### Insights
<img width="1355" height="631" alt="image" src="https://github.com/user-attachments/assets/b35ddbd7-2675-4cbb-9a9d-5d8527739431" />
#### Smart Tips
<img width="1355" height="631" alt="image" src="https://github.com/user-attachments/assets/efa31696-28e4-4abc-a974-3ba6589533c6" />
#### Profile Settings
<img width="1351" height="673" alt="image" src="https://github.com/user-attachments/assets/c753b556-501b-442c-b8a3-59600868eaee" />



















