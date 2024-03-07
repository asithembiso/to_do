# ToDo App

This ToDo application uses a Django backend and React frontend.

## Setup

Before running the application or the tests, make sure you have Python installed on your system and create a virtual environment. In the to_do root folder install all requirements and run the backend.
```bash
pip install -r requirements.txt
cd backend
export FLASK_APP=app.py
export FLASK_ENV=development
python manage.py runserver
```
Now that the backend is running, time to start the frontend by running the following commands.
```bash
cd frontend
npm start
```

### Run Pytests
```bash
cd backend
pytest
```


