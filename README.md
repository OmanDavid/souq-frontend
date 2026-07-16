# Souq – Frontend

React SPA for Souq, a multi-vendor marketplace connecting sellers and buyers.

## Tech Stack
- React (create-react-app)
- React Router

## Setup
```bash
git clone <frontend-repo-url>
cd souq-frontend
npm install
npm start
```
Runs at `http://localhost:3000`. Requires the backend running at `http://localhost:5000`.

## Routes
| Route | Protected |
|-------|-----------|
| / | No |
| /login | No |
| /register | No |
| /reset-password | No |
| /products/:id | No |
| /cart | Yes |
| /my-listings | Yes |
| /my-orders | Yes |
| /add-product | Yes |

## User Stories

**As a user, I can:**
- Register and log in so I can access my account securely
- Browse products so I can find what I need
- View a product's details before buying
- Add a product to my cart and place an order
- View my order history to track past purchases
- Reset my password if I forget it
- Create, edit, and delete my own product listings
- View my own listings in one place

## License
MIT