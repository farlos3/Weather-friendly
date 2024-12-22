# Weather-friendly

## Clone the Repository
To get started, clone the project repository from GitHub:
```
git clone https://github.com/farlos3/Weather-friendly.git
cd Weather-friendly
```

## Install Dependencies
Install the required dependencies using npm: <br>
```npm install```

## Environment Configuration
Before running the project, you need to set up the ```.env``` file with your API keys and other necessary configurations. Create a .env file in the root directory of the project and add the following:
```
# MongoDB
MONGODB_URI=<your-mongodb-uri>

# JWT Token
SECRET_KEY=<generate-your-secret-key>

# Send OTP
GMAIL_USER=<your-gmail>
GMAIL_PASS=<app-password-google-account>

# TMD API, Weather
TMD_ACCESS_TOKEN=<api-key-TMD>

# Longdo MAP
NEXT_PUBLIC_LONGDO_MAP_KEY=<api-key-longdomap>
```

## Start the Project
Once the .env file is configured, start the development server: <br>
```npm run dev```
The application will be available at ```http://localhost:3000```
