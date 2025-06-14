# 🚗 Real-Time Car Parking Slot Booking System

A real-time, priority-based car parking slot booking system built with **React**, **Express**, **Sequelize**, and **PostgreSQL**. Includes both **User** and **Admin** interfaces with features like slot reservation, real-time updates, cancellation, and admin controls.

---

## 🧠 Features

### 👥 User
- Register and log in
- Book available parking slots
- View and cancel personal bookings

### 🛠️ Admin
- Admin login
- View all bookings
- Create, edit, and delete bookings
- Clear all bookings
- View all registered users

---

## 🛠️ Tech Stack

| Frontend     | Backend     | Database     |
|--------------|-------------|--------------|
| React        | Express.js  | PostgreSQL   |
| Axios        | Node.js     | Sequelize ORM |
| Tailwind CSS |             |              |

---

## 🚀 Getting Started

### 🖥️ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### ⚙️ Backend Setup

```bash
cd server
npm install
npm run dev
```

> Make sure PostgreSQL is running and a database is created. Update the `.env` file with your credentials.

```env
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=username
ADMIN_PASSWORD=password
```

---

## 🔐 Authentication

- Users and Admins authenticate separately.
- JWT-based login with tokens stored in `localStorage`.

---

## 📁 Folder Structure

```
client/
  ├── components/
  ├── admin/
  ├── App.jsx
  └── main.jsx

server/
  ├── models/
  ├── routes/
  ├── controllers/
  └── index.js
```

---

## 📸 Screenshots

_Add screenshots or GIFs showing:_
- User dashboard and booking interface
- Admin panel with all control features

---

## 🤝 Contributions

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is licensed under the MIT License.
