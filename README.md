# Mood Recipes

A simple web application that recommends recipes based on your current mood. Select how you're feeling, and get a recipe suggestion that matches your mood. Don't like the suggestion? You can request another recipe or change your mood.

## Features

- Select from 8 different moods
- Get personalized recipe recommendations
- View recipe ingredients and instructions
- Request alternative recipes for the same mood
- Responsive design for mobile and desktop

## Tech Stack

- **Backend**: Express.js
- **Database**: SQLite3
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Tailwind CSS

## Installation

1. Make sure you have Node.js and npm installed

2. Clone this repository
   ```
   git clone <repository-url>
   cd mood-recipes
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the server
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How It Works

1. The app has a pre-populated SQLite database with recipes categorized by mood
2. When you select a mood, a random recipe matching that mood is displayed
3. You can request another recipe for the same mood or go back to select a different mood

## Project Structure

- `server.js` - Main Express server file
- `database/recipes.db` - SQLite database with recipes
- `views/index.ejs` - Main EJS template
- `public/css/styles.css` - Custom styles
- `public/js/main.js` - Frontend JavaScript 