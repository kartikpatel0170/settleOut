# Settleout Backend

Welcome to the Settleout backend repository. This repository contains the backend codebase for the Settleout application, which is a task management and payment platform. The backend is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Directory Structure](#project-directory-structure)
- [Configuration](#configuration)
- [Routes](#routes)
- [Controllers](#controllers)
- [Models](#models)
- [Observers](#observers)
- [Services](#services)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies for the backend, run the following command:

1. Clone the repository: `git clone https://github.com/settleout/backend.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
    - Create a `.env` file in the root directory of the project.
    - Copy the contents of `.env.example` into `.env` and fill in the required values.
4. Start the server: `npm start`
5. Navigate to `http://localhost:3000` in your browser to view the API documentation.

## Technologies Used

The following technologies were used in the development of the backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Stripe


## Project Directory Structure

Below is the directory structure of the project:

```
├── config/
│   ├── authConstant.js
│   ├── db.js
│   ├── email.js
│   ├── message.js
│   ├── passport.js
│   └── sms.js
├── controller/
│   ├── authController.js
│   ├── feedbackController.js 
│   ├── membershipControllerjs
│   ├── taskController.js
│   └── userController.js
│   └── transactionController.js
├── model/
│   ├── membership.js
│   ├── task.js
│   ├── transaction.js
│   └── user.js
├── observers/
│   ├── userObserver.js
│   ├── paymentObserver.js
│   └── taskObserver.js
├── routes/
│   ├── auth.js
│   ├── feedback.js
│   ├── index.js
│   ├── membership.js
│   ├── task.js
│   ├── transaction.js
│   └── user.js
├── services/
│   ├── payment/
│   │   ├── stripe.js
│   │   └── stripeHandler.js
│   ├── auth.js
│   ├── feedback.js
│   ├── task.js
│   ├── transaction.js
│   └── user.js
├── server.js
└── package.json
```


## Configuration

The backend uses several configuration files located in the `config/` directory. These files include:

- `authConstant.js`: Contains authentication-related constants.
- `db.js`: Contains configuration settings for the MongoDB database.
- `message.js`: Contains configuration settings for sending messages.
- `passport.js`: Contains configuration settings for Passport.js authentication.


## Routes

The backend has several API routes located in the `routes/` directory. These routes include:

- `/auth`: Contains routes for user authentication.
- `/feedback`: Contains routes for user feedback.
- `/membership`: Contains routes for managing memberships.
- `/task`: Contains routes for managing tasks.
- `/transaction`: Contains routes for managing transactions.
- `/user`: Contains routes for managing users.


## Controllers

The backend has several controllers located in the `controller/` directory. These controllers include:

- `authController.js`: Contains logic for user authentication.
- `feedbackController.js`: Contains logic for handling user feedback.
- `membershipController.js`: Contains logic for managing memberships.
- `taskController.js`: Contains logic for managing tasks.
- `transactionController.js`: Contains logic for managing transactions.
- `userController.js`: Contains logic for managing users.


## Models

The backend has several models located in the `model/` directory. These models include:

- `membership.js`: Defines the schema for memberships.
- `task.js`: Defines the schema for tasks.
- `transaction.js`: Defines the schema for transactions.
- `user.js`: Defines the schema for users.


## Observers

The backend uses the observer pattern to notify users of certain events. Observers are located in the `observers/` directory and include:

- `userObserver.js`: Observes user-related events.
- `paymentObserver.js`: Observes payment-related events.
- `taskObserver.js`: Observes task-related events.


## Services

The backend uses Factory pattern and has several services located in the `services/` directory. These services include:

- `payment/`: Contains logic for handling payments.
- `auth.js`: Contains logic for user authentication.
- `feedback.js`: Contains logic for handling user feedback.
- `task.js`: Contains logic for managing tasks.
- `transaction.js`: Contains logic for managing transactions.
- `user.js`: Contains logic for managing users.


## API Endpoints

The following API endpoints are currently implemented:



| HTTP Method | Endpoint                     | Description                                                         |
|-------------|------------------------------|---------------------------------------------------------------------|
| POST        | /auth/login                  | Registers a new user                                                |
| POST        | /auth/register               | Logs in an existing user                                             |
| PUT         | /auth/reset-password         | Sends a OTP to reset password to the user's registered email address  |
| PUT         | /auth/verify-reset-password  | Verifies the reset password token and allows the user to set a new password |
| PUT         | /auth/reset-otp-password     | Resets the user's password using a one-time password (OTP)           |
| PUT         | /auth/verify-email           | Verifies the user's email address                                     |
| PUT         | /auth/verify-phone           | Verifies the user's phone number                                      |
| PUT         | /auth/send-email-otp         | Sends an OTP to the user's registered email address for verification |
| PUT         | /auth/send-phone-otp         | Sends an OTP to the user's registered phone number for verification  |
| GET         | /user/profile                | Gets the user's profile information                                   |
| PUT         | /user/update-profile         | Updates the user's profile information                                |
| PUT         | /user/change-password        | Allows the user to change their password                              |
| POST        | /user/findAll                | Gets a list of all users                                             |
| POST        | /task/create                 | Creates a new task                                                   |
| POST        | /task/findAll                | Gets a list of all tasks                                             |
| PATCH       | /task/updateTaskList         | Updates the task list for a specific task                             |
| PUT         | /task/update                 | Updates the details of a specific task                                |
| POST        | /transaction/create          | Creates a new transaction                                            |
| POST        | /membership/create           | Creates a new membership                                              |
| POST        | /membership/findAll          | Finds memberships that match the specified search criteria           |
| PUT         | /feedback/add-feedback       | Adds feedback for a specific task or transaction                      |


## Contributing

We welcome contributions to the project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b new-feature`.
3. Make the changes to the codebase


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
