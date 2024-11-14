# image-optimizer-app

**Image Optimizer Application**

## Overview

This is a full-stack web application that allows users to upload images (**PNG**, **JPG**, **GIF**), optimizes them by converting to **WebP** format, and provides a comparison between the original and optimized images.
The application consists of a **Java Spring Boot** backend and a **React** frontend. Both backend and frontend are containerized using **Docker** and deployed as **Azure Web Apps**.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
  - [Dockerization](#dockerization)
  - [Azure Deployment](#azure-deployment)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Features

- **Upload images** in various formats (**PNG**, **JPG**, **GIF**).
- **Convert and optimize images** to **WebP** format on the backend.
- **Display original and optimized images** side by side with size and type information.
- **Polling mechanism** to retrieve the optimized image once processing is complete.
- **Frontend and backend are containerized** and can be deployed independently.

## Technologies Used

### Backend

- **Java Spring Boot**
- **Azure Blob Storage SDK**
- **Docker**

### Frontend

- **React**
- **Axios** for HTTP requests
- **Docker**

### Deployment

- **Azure Web Apps** for hosting both frontend and backend
- **Azure Blob Storage** for storing original and optimized images

## Prerequisites

- **Java Development Kit (JDK) 11 or higher**
- **Node.js** and **npm**
- **Docker**
- **Azure Account** with access to Azure Blob Storage and Azure Web Apps
- **Azure Storage Account** with two containers:
  - `image-input` for original images
  - `image-output` for optimized images

## Installation

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/image-optimizer.git
   cd image-optimizer/backend
   ```

2. **Set Up Environment Variables**

   Create an `application.properties` file in `src/main/resources/` with the following content:

   ```properties
   azure.storage.connection-string=DefaultEndpointsProtocol=https;AccountName=your_account_name;AccountKey=your_account_key;EndpointSuffix=core.windows.net
   azure.storage.account-name=your_account_name
   azure.storage.account-key=your_account_key
   azure.storage.input-container=image-input
   azure.storage.output-container=image-output
   ```

3. **Build the Backend**

   ```bash
   ./mvnw clean install
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   REACT_APP_BASE_URL_BE=http://localhost:8080
   ```

## Running the Application

### Running Backend Locally

```bash
cd backend
./mvnw spring-boot:run
```

The backend server will start on [http://localhost:8080](http://localhost:8080).

### Running Frontend Locally

```bash
cd frontend
npm start
```

The frontend application will start on [http://localhost:3000](http://localhost:3000).

## Deployment

### Dockerization

Both the backend and frontend have their own `Dockerfile` for containerization.

### Azure Deployment

#### Deploying Backend to Azure Web App

1. **Create an Azure Web App**

   - Use the Azure Portal to create a new Web App for containers.
   - Choose **Docker Container** as the publishing option.

2. **Push Docker Image to Azure Container Registry (ACR)**

   - **Build** the Docker image:

     ```bash
     docker build -t youracrname.azurecr.io/image-optimizer-backend:latest .
     ```

   - **Push** the image to ACR:

     ```bash
     docker push youracrname.azurecr.io/image-optimizer-backend:latest
     ```

3. **Configure the Web App**

   - Set the image source to ACR and select the `image-optimizer-backend` image.
   - Configure application settings with environment variables as specified in the `application.properties` file.

#### Deploying Frontend to Azure Web App

1. **Create an Azure Web App**

   - Create another Web App for the frontend.

2. **Push Docker Image to Azure Container Registry**

   - **Build** the Docker image:

     ```bash
     docker build -t youracrname.azurecr.io/image-optimizer-frontend:latest .
     ```

   - **Push** the image to ACR:

     ```bash
     docker push youracrname.azurecr.io/image-optimizer-frontend:latest
     ```

3. **Configure the Web App**

   - Set the image source to ACR and select the `image-optimizer-frontend` image.
   - Ensure the `REACT_APP_BASE_URL_BE` environment variable points to the backend URL.

## Usage

1. **Access the Frontend**

   Open the frontend URL in your web browser.

2. **Upload an Image**

   - Click on **"Choose File"** to select an image.
   - Click on **"Upload & Optimize"** to upload the image.

3. **Wait for Optimization**

   - The application will poll the backend every few seconds to check if the optimized image is ready.
   - Once ready, both the original and optimized images will be displayed side by side.

4. **Compare Images**

   - View the **size** and **type** information for both images.
   - Observe the reduction in size due to optimization.

---

Thank you for using the **Image Optimizer Application**! If you encounter any issues or have suggestions for improvements, feel free to reach out.
