# Budget App – Frontend
This is the frontend for a personal budgeting application built with React, React Router, and Tailwind CSS. It allows users to register, log in, view their profile, and manage their expenses securely.

---

## Tech Stack

    Frontend: React, Vite
    Routing: React Router DOM
    Styling: Tailwind CSS, DaisyUI
    HTTP Requests: Axios
    Icons & UI Enhancements: React Icons, React Toastify, React Spinners

---

## Features

    User Registration & Login (Authentication)
    Secure Routing
    Profile View
    Expense Dashboard (Home)
    Toast Notifications & Loaders

---

## Folder Structure

    frontend/
    ├── public/
    ├── src/
    │   ├── Components/
    │   │   ├── Home/
    │   │   ├── Login/
    │   │   ├── Navbar/
    │   │   ├── Profile/
    │   │   └── Signup/
    │   ├── Context/
    │   │   ├── AuthContext/
    │   │   └── DataContext/
    │   ├── CustomRoutes/
    │   │   └── BudgetRouters.jsx
    │   ├── assets/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── .gitignore
    └── README.md

---

 ## Setup Instructions

     1. Clone the repo
    git clone https://github.com/yourusername/budget-app-frontend.git
    cd budget-app-frontend
    
    2. Install dependencies
    npm install
    
    3. Start the frontend server
    npm run dev

---

## Available Scripts

    | Script    | Description                                             |
    | --------- | ------------------------------------------------------- |
    | `dev`     | Run the app in development mode                         |
    | `build`   | Build the app for production                            |
    | `preview` | Preview the production build locally                    |
    | `lint`    | Run ESLint on the project                               |
    | `both`    | Run both frontend (Vite) and backend (Nodemon) together |

 ## License

 This project is developed for educational/demo purposes and is not licensed for public/commercial use.
