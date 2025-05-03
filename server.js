const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./database/recipes.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the recipes database.');
    
    // Create recipes table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      mood TEXT NOT NULL,
      image_url TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        // Check if table is empty and seed with initial data if needed
        db.get('SELECT COUNT(*) as count FROM recipes', (err, row) => {
          if (err) {
            console.error('Error checking table:', err.message);
          } else if (row.count === 0) {
            // Seed database with initial recipes
            seedDatabase();
          }
        });
      }
    });
  }
});

// Seed database with initial recipes
function seedDatabase() {
  const recipes = [
    {
      name: 'Comforting Chicken Soup',
      ingredients: 'Chicken, carrots, celery, onion, garlic, chicken broth, thyme, salt, pepper',
      instructions: 'Sauté vegetables, add broth and chicken, simmer for 30 minutes, season to taste.',
      mood: 'sad',
      image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Energizing Fruit Smoothie Bowl',
      ingredients: 'Frozen berries, banana, spinach, Greek yogurt, honey, granola, chia seeds',
      instructions: 'Blend fruits with yogurt, pour into bowl, top with granola and seeds.',
      mood: 'tired',
      image_url: 'https://images.unsplash.com/photo-1564207474771-10725aab884d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Spicy Taco Bowl',
      ingredients: 'Ground beef, taco seasoning, rice, black beans, corn, avocado, tomatoes, cheese, lime',
      instructions: 'Cook beef with seasoning, prepare rice, assemble bowl with all ingredients.',
      mood: 'happy',
      image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Decadent Chocolate Lava Cake',
      ingredients: 'Dark chocolate, butter, eggs, sugar, flour, vanilla extract',
      instructions: 'Melt chocolate and butter, mix with other ingredients, bake until edges are set but center is soft.',
      mood: 'celebratory',
      image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Calming Chamomile Tea Cookies',
      ingredients: 'Flour, butter, sugar, egg, chamomile tea leaves, vanilla extract, salt',
      instructions: 'Cream butter and sugar, add egg and vanilla, mix in dry ingredients with tea leaves, bake until golden.',
      mood: 'anxious',
      image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Refreshing Cucumber Gazpacho',
      ingredients: 'Cucumbers, green bell pepper, garlic, olive oil, white wine vinegar, water, salt, pepper',
      instructions: 'Blend all ingredients until smooth, chill for at least 2 hours, serve cold.',
      mood: 'hot',
      image_url: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Cozy Pumpkin Spice Latte Muffins',
      ingredients: 'Flour, pumpkin puree, eggs, oil, coffee, sugar, baking powder, pumpkin spice, salt',
      instructions: 'Mix wet ingredients, add dry ingredients, bake until toothpick comes out clean.',
      mood: 'cold',
      image_url: 'https://images.unsplash.com/photo-1605197798871-046d48e827d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Soothing Chicken Congee',
      ingredients: 'Rice, chicken broth, ginger, chicken, green onions, soy sauce, sesame oil',
      instructions: 'Simmer rice in broth until creamy, add chicken and seasonings, cook until chicken is done.',
      mood: 'sick',
      image_url: 'https://images.unsplash.com/photo-1626921061008-cce4a40a7272?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  const stmt = db.prepare('INSERT INTO recipes (name, ingredients, instructions, mood, image_url) VALUES (?, ?, ?, ?, ?)');
  
  recipes.forEach(recipe => {
    stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood, recipe.image_url);
  });
  
  stmt.finalize();
  console.log('Database seeded with initial recipes.');
}

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/recipes/:mood', (req, res) => {
  const { mood } = req.params;
  
  db.all('SELECT * FROM recipes WHERE mood = ?', [mood], (err, recipes) => {
    if (err) {
      console.error('Error fetching recipes:', err.message);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
    
    if (recipes.length === 0) {
      return res.status(404).json({ error: 'No recipes found for this mood' });
    }
    
    // Return a random recipe for the selected mood
    const randomIndex = Math.floor(Math.random() * recipes.length);
    res.json(recipes[randomIndex]);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 