# RentApp (Airbnb Clone) Project

## Overview

RentApp is a clone of Airbnb, a platform where users can list, discover, and book accommodations around the world. This project is built using modern web technologies and aims to provide a seamless user experience similar to the original Airbnb platform.

## Features

- **User Authentication**: Sign up, log in, and log out functionalities with OAuth support (Google, GitHub).
- **User Profiles**: Users can create and manage their profiles.
- **Property Listings**: Users can list their properties, including descriptions, photos, and pricing.
- **Search Functionality**: Users can search for properties based on location, price, and other filters.
- **Booking System**: Users can book properties for specific dates.
- **Reviews and Ratings**: Users can leave reviews and ratings for properties.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **React Hook Form**: A library for managing forms in React.
- **React Date Range**: A date range picker for React.
- **React Icons**: A library for including icons in your React project.
- **React Leaflet**: A library for integrating Leaflet maps in React applications.
- **React Select**: A flexible and customizable Select input control for React.
- **React Spinners**: A collection of loading spinners for React.
- **TailwindCSS**: A utility-first CSS framework for styling.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A document-based, distributed database.
- **Prisma**: An ORM for Node.js and TypeScript that helps you manage your database.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: A library to help hash passwords.
- **NextAuth**: An authentication library for Next.js.

### Other Tools

- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **Leaflet**: An open-source JavaScript library for mobile-friendly interactive maps.
- **Cloudinary**: A cloud service that offers a solution to a web application's entire image and video management pipeline.
- **Zustand**: A small, fast, and scalable bearbones state-management solution using simplified flux principles.

### Deployment

- **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.
- **AWS/GCP/Azure**: Cloud platforms for hosting applications.

## Installation

### Prerequisites

- Node.js (version 12.x or later)
- MongoDB (local instance or MongoDB Atlas)
- Docker (optional, for containerized deployment)

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/rentapp.git
   cd rentapp


2 **Install frontend dependencies**:

```sh
cd client
npm install

3 **Run the app**:

npm  run dev


Usage
User Authentication

Sign Up: Create a new account using the sign-up form.
Log In: Log in to your account using your email and password or via Google/GitHub OAuth.
Log Out: Log out from your account.

Property Listings

List a Property: Navigate to the "List your property" page and fill in the details.
View Listings: Browse available properties on the home page or use the search feature.

Booking

Search Properties: Use the search bar to find properties by location, price, and other criteria.
Book a Property: Select available dates and book the property.
