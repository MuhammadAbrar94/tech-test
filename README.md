Setup Instructions
Configure Laravel Environment
Before you start, ensure you set up your .env file with the required configurations. You can copy the example file:

cp .env.example .env

Then, update the .env file with your database and other environment settings.

Install npm Dependencies
To get started, run the following command to install all necessary npm packages:

npm install

Build for Production
To create a production build and start the application, execute:

npm run build && npm run start

Migrate the Database
php artisan migrate

Seed the Database
To populate your database with initial data, use:

php artisan db:seed

Launch the Laravel Application
You can start the Laravel server with:

php artisan serve

Below is the test user for testing
email: test_user@example.com
password: password123
