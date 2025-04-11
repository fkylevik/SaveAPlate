# SaveaPlate

SaveAPlate  is a Django-powered web application designed to help users reduce food waste by generating recipes based on leftover ingredients they already have at home. Users can create an account, input ingredients, and receive customized recipe suggestions. 
They can also save favorite recipes and log back in anytime to access them.

## Features
### AI-Ingredient-Based Recipe Generator
  Enter ingredients you have at home, and get recipes tailored to your leftovers.

### User Accounts
  Sign up, log in, and manage your personal recipe history.

###Save Recipes
  Save your favorite recipes for quick access later.

## Built using

- Python
- Django
- HTML
- CSS
- JavaScript

## Setup Instructions
### Prerequisites:
1. Python 3.x and pip installed
2. A modern web browser for accessing the UI.

## Steps to Run the Project
 Steps to Run the Project
 
1. Clone the Repository:
 ``` bash
https://github.com/fkylevik/SaveAPlate.git
cd SaveAPlate
```
###Open a terminal:
1. Create and activate a virtual environment:
- python -m venv env
- source env/bin/activate  # .\env\Scripts\Activate.ps1 for Windows 
2. Install dependencies:
- pip install -r requirements.txt
3. Navigate to backend-folder:
- cd backend 
4. Apply migrations:
- python manage.py migrate
5. Run the server:
- python manage.py runserver
### Open a second terminal 
1.Install requierd dependencies:
- cd frontend
- npm install 
2. run th program :
- npm run dev

  ###Visit http://127.0.0.1:8000/ 










