# Table of Contents

- [RentApp (Airbnb Clone) Project](#rentapp-airbnb-clone-project)
  - [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other Tools](#other-tools)
    - [Deployment](#deployment)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
    - [User Authentication](#user-authentication)
    - [Property Listings](#property-listings)
    - [Booking](#booking)
  - [Contributing](#contributing)
  - [License](#license)
  - [Deployment](#deployment)
    - [Vercel Deployment](#vercel-deployment)
  - [Contact](#contact)





# RentApp (Airbnb Clone) Project

## Overview

RentApp is a clone of Airbnb, a platform where users can list, discover, and book accommodations around the world. This project is built using modern web technologies and aims to provide a seamless user experience similar to the original Airbnb platform.

## Features

- **User Authentication**: Sign up, log in, and log out functionalities with OAuth support (Google, GitHub).
- **User Profiles**: Users can create and manage their profiles.
- **Property Listings**: Users can list their properties, including descriptions, photos, and pricing.
- **Search Functionality**: Users can search for properties based on location, price, and other filters.
- **Booking System**: Users can book properties for specific dates.
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

- **Vercel**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.

## Installation

### Prerequisites

- Node.js (version 12.x or later)
- MongoDB (local instance or MongoDB Atlas)

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/stino-x/AIRBNB-CLONE.git
   cd rentapp


2. **Install dependencies**:

   ```sh
   cd aibnb-clone
   npm install

3. **Configure environment variables**:

   DATABASE_URL=
   NEXTAUTH_SECRET=
   GITHUB_ID=
   GITHUB_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=


3. **Run the app**:

   ```sh
   npm run dev

# Usage

## User Authentication
- **Sign Up:** Create a new account using the sign-up form.
- **Log In:** Log in to your account using your email and password or via Google/GitHub OAuth.
- **Log Out:** Log out from your account.

## Property Listings
- **List a Property:** Navigate to the "List your property" page and fill in the details.
- **View Listings:** Browse available properties on the home page or use the search feature.

## Booking
- **Search Properties:** Use the search bar to find properties by location, price, and other criteria.
- **Book a Property:** Select available dates and book the property.


## Contributing
We welcome contributions to improve RentApp. To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Deployment

### Vercel Deployment
link: https://rent-app-austin.vercel.app/

## Contact
For any questions or feedback, please reach out to us at [austindev214@gmail.com](mailto:austindev214@gmail.com).



