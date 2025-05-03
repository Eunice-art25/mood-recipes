document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const moodButtons = document.querySelectorAll('.mood-btn');
  const moodSection = document.getElementById('mood-selection');
  const recipeSection = document.getElementById('recipe-display');
  const recipeName = document.getElementById('recipe-name');
  const recipeImage = document.getElementById('recipe-image');
  const recipeIngredients = document.getElementById('recipe-ingredients');
  const recipeInstructions = document.getElementById('recipe-instructions');
  const newRecipeBtn = document.getElementById('new-recipe-btn');
  const backBtn = document.getElementById('back-btn');
  
  // Current selected mood
  let currentMood = '';
  
  // Add event listeners to mood buttons
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove selected class from all buttons
      moodButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Add selected class to clicked button
      button.classList.add('selected');
      
      // Get the mood value
      currentMood = button.getAttribute('data-mood');
      
      // Fetch recipe for this mood
      fetchRecipe(currentMood);
    });
  });
  
  // Function to fetch a recipe based on mood
  function fetchRecipe(mood) {
    fetch(`/recipes/${mood}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No recipe found for this mood');
        }
        return response.json();
      })
      .then(recipe => {
        // Display the recipe
        displayRecipe(recipe);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        alert('Sorry, we could not find a recipe for your mood. Please try again.');
      });
  }
  
  // Function to display a recipe
  function displayRecipe(recipe) {
    // Update recipe details
    recipeName.textContent = recipe.name;
    recipeImage.src = recipe.image_url;
    recipeImage.alt = recipe.name;
    recipeIngredients.textContent = recipe.ingredients;
    recipeInstructions.textContent = recipe.instructions;
    
    // Hide mood section and show recipe section
    moodSection.classList.add('hidden');
    recipeSection.classList.remove('hidden');
  }
  
  // Event listener for 'show me another recipe' button
  newRecipeBtn.addEventListener('click', () => {
    if (currentMood) {
      fetchRecipe(currentMood);
    }
  });
  
  // Event listener for 'change mood' button
  backBtn.addEventListener('click', () => {
    // Hide recipe section and show mood section
    recipeSection.classList.add('hidden');
    moodSection.classList.remove('hidden');
    
    // Clear selected mood
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    currentMood = '';
  });
}); 