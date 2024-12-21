const express = require("express");
const path = require("path");

const app = express();
let counter=1;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let initialRecipe = [
  {
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    preparationTime: "15 minutes",
    cookingTime: "15",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
    country: "India",
    veg: true,
    id: 1,
  },
];

//  middleware
const Middleware = (req, res, next) =>{
  const {name,description,preparationTime, cookingTime, imageUrl,country,veg  } =req.body;

  if (!name ||!description ||!preparationTime ||!cookingTime ||!country || !veg || !imageUrl) {
    return res.status(400).send("All fields are required.");
  }
  next();
}

app.get("/",(req,res)=>{  
res.send("welcome to the recipe api")
})

// index file Route 
app.get('/index', (req, res) => {
  res.render("index");
});

// recipe File Route
app.get("/add", (req, res) => {
  res.render("recipeForm");
});

app.get("/recipe/all", (req, res) => {
  res.send(initialRecipe);
});


// add data to the recipe list
app.post("/recipe/add", Middleware,(req, res) => { 

  const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;

  const newRecipe = {
    name,
    description,
    preparationTime,
    cookingTime,
    imageUrl,
    country,
    veg,
    id: ++counter,
  };

  initialRecipe.push(newRecipe);
  // res.status(200).send(initialRecipe);
  res.status(200).send(newRecipe);
});


// update
app.patch('/recipe/update/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Simulate updating the recipe in the in-memory array
    let updatedRecipe = null;

    // Update recipe if id matches
    initialRecipe = initialRecipe.map((recipe) => {
      if (recipe.id === Number(id)) {
        updatedRecipe = { ...recipe, ...updateData }; // Update recipe
        return updatedRecipe;
      }
      return recipe; // Keep other recipes unchanged
    });

    // If recipe found and updated
    if (updatedRecipe) {
      // Return the updated list of recipes (as Cypress expects an array)
      res.status(200).send(initialRecipe);
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (error) {
    res.status(500).send('Failed to update recipe in database.');
  }
});


// delete
app.delete("/recipe/delete/:id", (req, res) => {
  const { id } = req.params;

  initialRecipe = initialRecipe.filter((recipe) => recipe.id !== id);

  res.json({ message: 'Recipe deleted successfully', recipes: initialRecipe });

});

// updating


// filtering recipes
app.get('/recipe/filter', async (req, res) => {
  try {
    const { veg, sort, country } = req.query;
    let filters = {};
    console.log(req.query);
    let recipes=[]

    if (veg === 'true') {
      recipes= initialRecipe.filter((e)=>e.veg==true)
    }
    else if(veg === 'false') {
      recipes= initialRecipe.filter((e)=>e.veg==false)
    }

    if (country) {
      recipes=recipes.filter((e)=>e.country==country)
    }


    if (sort === 'lth') {
      recipes = recipes.sort((a, b) => a.cookingTime-b.cookingTime);
    } else if (sort === 'htl') {
      recipes = recipes.sort((a, b) =>b.cookingTime-a.cookingTime);
    }

    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send('Failed to filter recipes.');
  }
});

app.listen( 8090, () => {
  console.log("Server is running on 8090");
});
