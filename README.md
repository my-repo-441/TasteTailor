# TasteTailor: AI-Powered Recipe Generator

TasteTailor is an innovative web application that generates personalized recipes based on user-selected ingredients using AI technology. It combines a user-friendly interface with powerful backend services to provide a unique culinary experience.

The application allows users to select ingredients from a virtual refrigerator, generate recipes using these ingredients, and interact with an AI chatbot for cooking advice. TasteTailor leverages OpenAI's GPT-4 model for recipe generation and conversation, and Google Cloud Vision API for image analysis of ingredients.

## Repository Structure

```
.
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── credentials/
│   ├── recipes.json
│   ├── routes/
│   └── services/
├── frontend/
│   ├── deps/
│   ├── index.html
│   ├── package.json
│   ├── server/
│   ├── src/
│   └── vite.config.js
└── README.md
```

### Key Files:
- `backend/app.py`: Main entry point for the Flask backend application
- `backend/config.py`: Configuration settings for the backend
- `frontend/src/index.jsx`: Entry point for the React frontend application
- `frontend/src/App.jsx`: Main React component and routing configuration
- `frontend/package.json`: Frontend dependencies and scripts

### Important Integration Points:
- `backend/routes/`: API endpoints for recipe generation, chatbot, and image processing
- `frontend/src/utils/api.js`: Frontend API calls to the backend services
- `backend/services/openai_service.py`: Integration with OpenAI API for recipe generation
- `backend/services/vision_service.py`: Integration with Google Cloud Vision API for image analysis

## Usage Instructions

### Installation

Prerequisites:
- Python 3.8+
- Node.js 14+
- npm 6+

Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

Frontend Setup:
```bash
cd frontend
npm install
```

### Configuration

1. Create a `.env` file in the `backend/` directory with the following content:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
   ```

2. Place your Google Cloud Vision API credentials JSON file in `backend/credentials/`.

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to use the application.

### Using TasteTailor

1. On the home page, drag and drop ingredients from the available ingredients to the selected ingredients area.
2. Click the "レシピを生成" (Generate Recipe) button to create a recipe using the selected ingredients.
3. View the generated recipe and its image in the recipe manager section.
4. Save or delete recipes as needed.
5. Use the chat feature to ask cooking-related questions or get advice from the AI assistant.

## Data Flow

1. User selects ingredients on the frontend.
2. Frontend sends selected ingredients to the backend `/api/openai` endpoint.
3. Backend processes the request:
   - Calls OpenAI API to generate a recipe based on ingredients.
   - Generates an image for the recipe using OpenAI's DALL-E.
4. Backend sends the generated recipe and image URL back to the frontend.
5. Frontend displays the recipe and image to the user.
6. User can interact with the chatbot, which sends requests to the `/api/chatbot` endpoint.
7. Chatbot requests are processed by the OpenAI API, and responses are sent back to the frontend.

```
[User] -> [Frontend] -> [Backend API] -> [OpenAI API]
                                      -> [Google Cloud Vision API]
        <- [Frontend] <- [Backend API] <- [OpenAI API]
                                      <- [Google Cloud Vision API]
```

## Troubleshooting

Common Issue: API Key Configuration
- Problem: "OpenAI API key not configured" error
- Solution: 
  1. Check that the `OPENAI_API_KEY` is correctly set in the `.env` file.
  2. Ensure the `.env` file is in the correct location (`backend/` directory).
  3. Restart the backend server after making changes to the `.env` file.

Common Issue: Google Cloud Vision API Setup
- Problem: "Unable to initialize Google Cloud Vision client" error
- Solution:
  1. Verify that the `GOOGLE_APPLICATION_CREDENTIALS` path in the `.env` file is correct.
  2. Ensure the credentials JSON file is present in the specified location.
  3. Check that the service account has the necessary permissions for the Vision API.

Debugging:
- To enable debug mode, set the `DEBUG` environment variable to `True` before running the backend:
  ```bash
  export DEBUG=True
  python app.py
  ```
- Check the console output for detailed error messages and stack traces.
- Frontend console logs can be viewed in the browser's developer tools.

Performance Optimization:
- Monitor API response times in the Network tab of browser developer tools.
- If recipe generation is slow, consider implementing caching for frequently requested ingredient combinations.
- Optimize image sizes on the frontend to improve load times.