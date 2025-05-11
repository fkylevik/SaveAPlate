# SaveaPlate

SaveAPlate  is a Django-powered web application designed to help users reduce food waste by generating recipes based on leftover ingredients they already have at home. Users can create an account, input ingredients, and receive customized recipe suggestions. 
They can also save favorite recipes and log back in anytime to access them.
SaveAPlate is designed to combat food waste by encouraging smarter use of leftover ingredients, making cooking more accessible and enjoyable, promoting sustainability through everyday choices, and helping you better manage your economy.

## Features
### User Accounts
  Sign up, log in, and manage your personal recipe history.

### Save Recipes
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
 
### Clone the Repository:
 ``` bash
https://github.com/fkylevik/SaveAPlate.git
cd SaveAPlate
```
### Open a terminal:
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

  ### Now you are ready to use the application



The dataset with ingredients and their environmental impact is collected from:
Michael Clark et al (2022). Estimating the environmental impacts of 57,000 food products. PNAS. – processed by Our World in Data. “Emissions per kilogram” [dataset]. Michael Clark et al (2022). Estimating the environmental impacts of 57,000 food products. PNAS. [original data].





