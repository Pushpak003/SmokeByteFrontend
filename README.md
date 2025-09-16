# SmokeByte - File Converter Frontend

A modern, powerful, and user-friendly web application for converting files between various formats. Built with React.js and Vite.

---

## 🚀 Key Features

- **User Authentication:** Secure signup and login system using JWT (Access & Refresh Tokens).
- **Drag & Drop File Upload:** An intuitive and modern interface for uploading files, powered by React Dropzone.
- **Smart Format Selection:** The UI intelligently displays only the valid conversion formats based on the uploaded file's type.
- **Real-time Upload Progress:** A visual progress bar provides real-time feedback for large file uploads.
- **Asynchronous Conversion:** Leverages a backend job queue system. The frontend polls for job status in real-time.
- **Conversion History:** Logged-in users can view a clean, paginated table of their past conversions with download links.
- **Secure Downloads:** Uses a backend proxy to handle downloads securely, bypassing common browser restrictions.
- **Responsive Design:** A clean and modern UI that works seamlessly across all devices.

---

## 🛠️ Tech Stack

- **Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router v6
- **API Client:** Axios (with interceptors for automatic token management)
- **File Uploads:** React Dropzone
- **Icons:** React Icons
- **Styling:** Plain CSS with CSS Variables

---

## 🏁 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher is recommended)
- npm (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pushpak003/SmokeByteFrontend
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd smokebyte-frontend
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```

### Configuration

The frontend needs to know the URL of your running backend server.

1.  Create a new file in the root of the project named `.env`.
2.  Add the following line to the `.env` file, replacing the port if your backend runs on a different one:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

**Note:** The backend server must be running for the application to function correctly.

---



## 📁 Project Structure

The project uses a feature-based folder structure to keep the code organized and scalable.
```
/src
├── assets/         # Static assets like images
├── components/     # Global, reusable UI components (Layout, Button, etc.)
├── context/        # React Context for global state (e.g., AuthContext)
├── features/       # Main application features (Auth, Conversion, History)
├── hooks/          # Custom React hooks (e.g., useAuth)
├── lib/            # Helper files and API client setup (axios instance)
└── pages/          # Static pages (Landing Page, Supported Formats, etc.)

```
