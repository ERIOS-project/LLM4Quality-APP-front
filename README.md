# LLM4Quality-APP

Welcome to the LLM4Quality-APP! This application is designed to help you manage and analyze verbatim data efficiently.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

To get started with the LLM4Quality-APP, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/LLM4Quality-APP.git
    ```

2. Navigate to the project directory:
    ```sh
    cd LLM4Quality-APP
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file based on the `.env.sample` file and fill in the necessary environment variables.

5. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. 

### Authentication

The application uses Azure AD for authentication. Make sure to configure your Azure AD credentials in the `.env` file.

### Verbatim Classification

1. Upload a CSV file containing verbatim data.
2. Select the year and status for the verbatim entries.
3. Click on "Validate" to start the analysis.

### Viewing Details

Click on any verbatim entry to view detailed information, including classification results and status.

## Features

- **Dark Mode**: Toggle between light and dark themes.
- **Real-time Updates**: Get real-time updates on verbatim processing status.
- **Detailed Analysis**: View detailed classification results for each verbatim entry.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
