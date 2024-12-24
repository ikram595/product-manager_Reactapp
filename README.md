# Frontend Repository - Product Manager 

This repository contains the frontend implementation for a full-stack application using React. Follow the instructions below to set up and test the application.

## Features

- Authentication Pages: user registration & login pages
- Search, filter, and sort functionalities
- Pagination for large datasets
- Favorites Page: View products marked as favorites and manage them.

## Installation Instructions

### Step 1: Setup

1. Clone this repository:

   ```bash
   git clone <repository_url>
   ```

   Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Step 2: Environment Configuration

1. Create a `.env` file in the `frontend` folder with the following variables:
   ```env
   REACT_APP_API_BASE_URL=<backend_base_url>
   ```
   Replace `<backend_base_url>` with the base URL of your backend API.

### Step 3: Running the Application

1. Start the React development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Testing

To test the application, ensure the backend is running and configured correctly. Use the frontend to:

- Register a new user and log in.
- Perform CRUD operations on products.
- Search, filter, sort, and paginate products.
- Mark products as favorites and view them.

## Additional Notes

Ensure that both the backend and frontend are running simultaneously for full functionality. For backend setup instructions, refer to the [backend repository](https://github.com/ikram595/product-manager_Fastapi)


