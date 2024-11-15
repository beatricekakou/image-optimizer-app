# image-optimizer-app

## Overview

A web application that allows users to upload images (**PNG**, **JPG**, **GIF**), optimizes them by converting to **WebP** format, and compares the original and optimized images. It consists of a **Java Spring Boot** backend and a **React** frontend, both containerized with **Docker** and deployed on **Azure Web Apps**.

## Features

- Upload images in **PNG**, **JPG**, or **GIF** formats.
- Convert images to **WebP** format on the backend.
- Display original and optimized images side by side with size and type information.
- Polling mechanism to retrieve the optimized image after processing.
- Independent deployment of frontend and backend via Docker containers.

## Technologies Used

**Backend**: Java Spring Boot, Azure Blob Storage SDK, Docker

**Frontend**: React, Axios, Docker

**Deployment**: Azure Web Apps, Azure Blob Storage

## Prerequisites

- Java Development Kit (JDK) 17 or higher
- Node.js and npm
- Docker
- Azure account with access to Azure Blob Storage and Azure Web Apps
- Azure Storage Account with two containers:
  - `image-input` for original images
  - `image-output` for optimized images

## Installation

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/beatricekakou/image-optimizer-app.git
   cd image-optimizer/image-optimizer-api
   ```

2. **Set Up Environment Variables**

   Create `application.properties` in `src/main/resources/`:

   ```properties
   azure.storage.connection-string=Your_Connection_String
   azure.storage.account-name=Your_Account_Name
   azure.storage.account-key=Your_Account_Key
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

   Create `.env` in the `frontend` directory:

   ```env
   REACT_APP_BASE_URL_BE=http://localhost:8080
   ```

## Running the Application

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on http://localhost:8080.

### Frontend

```bash
cd frontend
npm start
```

Frontend runs on http://localhost:3000.

## Usage

1. **Access the Frontend**: Open http://localhost:3000 in a web browser.

2. **Upload an Image**: Click "Choose File" to select an image, then "Upload & Optimize".

3. **Wait for Optimization**: The app polls the backend until the optimized image is ready.

4. **Compare Images**: View both images side by side with their size and type.

---

Thank you for using the **Image Optimizer Application**! If you have any issues or suggestions, feel free to reach out.
