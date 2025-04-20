import csv
from api.models import Ingredient

def import_csv():

    with open('scripts/ingredientdata.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            Ingredient.objects.create(
                name=row['Entity'],
                co2e_kg=row['ghg_kg'],  # Greenhouse gas emission per kg
                land_use_kg=row['land_use_kg'],  # Land usage per kg
                water_kg=row['water_kg'], # Water usage per kg
            )
    print("Data imported successfully")
    print(Ingredient.objects.count())

import_csv()