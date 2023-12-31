# Project Setup
- **npm run start**: This will build the Javascript file and run dist/index.js
- **npm run build**: This will build the Javascript file from .ts file
- **npm run dev**: This will run the ts-node server.

# Run Puppeteer Script to get data from Amazon
- **npm run script**: This will run src/script/amazon-script.ts

# Folder structure
```
src\
 |--config\         # Environment variables and configuration 
 |--controllers\    # Route controllers (controller layer)
 |--helper\         # Helper and response layer
 |--middleware\     # Middleware to handle apierror
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--validator\      # Request data validation schemas
 |--app.js          # Express app
 |--index.ts        # App entry point
```

# Sample data for Amazon
```
[
        {
            "title": "Spalding Marble Rubber Basketball (Black), Size: 7",
            "price": 1,
            "is_amazon_choice": false,
            "rating": 4.1,
            "rating_count": 38,
            "is_prime": true
        },
        {
            "title": "Amazon Brand - Solimo Training Basketball, Camouflage",
            "price": 12,
            "is_amazon_choice": false,
            "rating": 3.1,
            "rating_count": 102,
            "is_prime": true
        },
        {
            "title": "Amazon Brand - Solimo Training Basketball, Camouflage",
            "price": 12,
            "is_amazon_choice": false,
            "rating": 3.1,
            "rating_count": 102,
            "is_prime": true
        },
        {
            "title": "Amazon Brand - Solimo Training Basketball, Camouflage",
            "price": 12,
            "is_amazon_choice": false,
            "rating": 3.1,
            "rating_count": 102,
            "is_prime": true
        }
    ]
```

# Sample Response From Amazon
- Incorrect Password
- Incorrect Username

# Request Data Validation Schema (using Joi)
```
username: string,
data: [
    Object, Object, ...
]
```

Refer to .env.exmaple for environment vairables

Demo: https://www.youtube.com/watch?v=A-kedEzIC_8

Note: Dist folder contains .js file, this is generated by npm run build command
npm run start will first build and then run index.js
npm run dev will run typescript files