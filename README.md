# Messaging Dashboard

A full-stack messaging dashboard that integrates multiple messaging platforms like **Matrix**, **WhatsApp**, and **Slack**. It allows users to consolidate conversations, view message summaries, expand detailed messages, and reply to contacts directly from the dashboard.

## Features

- **Consolidated Conversations**: Merges messages from different platforms into one unified thread for each contact.
- **View Message Details**: Click on a contact to see detailed messages.
- **Reply Functionality**: Send replies directly through the dashboard.
- **Platform Icons**: Each message is accompanied by an icon indicating the platform it originated from.
- **Professional Design**: Styled using Material UI and custom CSS for a clean, user-friendly interface.

## Tech Stack

- **Frontend**: React.js, Material UI
- **Backend**: Flask, Python
- **Messaging Integration**: Matrix.org API

## Project Setup

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14+)
- **Python** (v3.6+)
- **Flask** (v2.0+)
- **FFmpeg** 

### Steps to Run

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/nanaji3850/matrix.org.git
    cd matrix.org
    ```

2. **Backend Setup** (Flask API):

    - Install required Python packages:

      ```bash
      cd backend
      pip install -r requirements.txt
      ```

    - Run the Flask server:

      ```bash
      python app.py
      ```

3. **Frontend Setup** (React):

    - Navigate to the frontend directory:

      ```bash
      cd frontend
      ```

    - Install dependencies:

      ```bash
      npm install
      ```

    - Run the React development server:

      ```bash
      npm start
      ```

4. **Matrix.org Setup**:

    - Ensure you have a Matrix.org account and configure it in the backend (`matrix_bot.py`).
    - Configure your API keys and other settings in a `.env` file.

5. **Access the Application**:

    Open a browser and go to `http://localhost:3000` to see the dashboard.

## API Endpoints

- **GET /get_messages**: Fetch consolidated messages for the dashboard.
- **GET /get_detailed_messages/:contactId**: Fetch detailed messages for a specific contact.
- **POST /reply_message**: Send a reply to a specific contact.

## Future Enhancements

- Add OAuth integration for WhatsApp and Slack.
- Improve message search functionality.
- Enhance the UI for better responsiveness on mobile devices.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any feature requests or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
