import json

def readFile(filename = 'db.json'):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            f.close()
            return data
    except FileNotFoundError:
        return {"recipies": []}

def printAllRecipies(data):
    if not data['recipies']:
        print("No recipies found!")
    else:
        print(json.dump(data['recipies'], indent = 4))


def findRecipe(requestedIngredients, data):
    recipesWithIngredients = []
    for recipe in data['recipes']:
        for requested in requestedIngredients:
            for ingredient in recipe['ingredients']:
                if requested.lower() in ingredient.lower():
                    recipesWithIngredients.append(recipe)
                    break
                else:
                    continue
    print(json.dumps(recipesWithIngredients, indent = 4))


def addRecipe(filepath, newRecipe):

    data = readFile(filepath)

    recipies = [recipe["name"].lower() for recipe in data['recipes']]

    if newRecipe["name"].lower() in recipies:
        print("Recipe already exists!")
        return

    data["recipies"].append(newRecipe)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

'''The idea was to use this schema to validate the new recipies before insertion into the database'''
recipeSchema = {
    "type" : "object",
    "properties" : {
        "name" : {"type" : "string"},
        "ingredients" : {"type" : "array",
                         "items" : {"type" : "string"},
                         "minItems" : 0},
        "carbon_footprint_kg_co2e" : {"type" : "number",
                                      "minimum": 0},
        "instructions" : {"type" : "string"}
    },
    "required" : ["name", "ingredients", "carbon_footprint_kg_co2e", "instructions"],
    "additionalProperties" : False
}

def favoriteArecipe (recipe):
    pass
'''a bit more complicated here. There are two ways to implement this logic. The first is to create a json file for every user that way every user can have
 their own favRecipeList (theoretically sleeker and more professional but more complicated to implement). The other way is that we have all users in the same database and
  add a list-component to each user (easier to implement but makes the database more dense)
 '''
'''
second option will look something like this 
 {
    "name": "Loura",
    "email": "loura",
    "password": "1234",
    "id": "1111111111",
    "favs": [],
  }

'''

def findCarboonFootprint(recipe):
    for carbonPrint in recipe['carbon_footprint_kg_co2e']:
        print(carbonPrint)