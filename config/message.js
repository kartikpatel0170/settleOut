// Messages for the authentication and profile settings
module.exports = {
  MESSAGE: {
    // Authorization
    INCORRECT_PASSWORD: {
      data: "password",
      message: "Password is not correct"
    },

    EMAIL_NOT_EXISTS: {
      data: "email",
      message: "Email does not exists"
    },
    EMAIL_ALREADY_EXISTS: {
      data: "email",
      message: "Email already exists"
    },

    LOGIN_SUCCESS: {
      message: "Login successFull"
    },
    USER_PROFILE_GET: {
      message: "User profile fetched successfully"
    },

    LOGOUT: {
      message: "Successfully logout.",
      status: 200
    },

    // USER
    USER_REGISTERED: {
      message: "You has been registered successfully. Welcome to SettleOut"
    },
    UPGRADE: {
      message:
        "Thank you for applying to upgrade. We will get back to you soon!"
    },

    // Bad Request or invalid data
    BAD_REQUEST: {
      message:
        "The request cannot be fulfilled due to bad syntax. Please try again"
    },
    MISSING_FIELDS: {
      message: "Fields are missing"
    },

    // Report Error
    ERROR_FETCH_DATA: {
      message:
        "Error while fetching data from database. Contact customer service!"
    },
    CREATE_FEEDBACK: {
      message: "Feedback has been added successfully."
    },
    UPDATE_USER: {
      message: "Profile has been updated successfully."
    },
    GET_USER: {
      message: "Profile has been fetched successfully."
    },
    RESET_PASSWORD: {
      message: "OTP has sent to the email to reset the Password"
    },
    INCORRECT_OTP: {
      message: "Your OTP is not correct"
    },
    RESET_PASSWORD_SUCCESS: {
      message: "Your password has been changed successfully."
    },
    OTP_VERIFIED_SUCCESS: {
      message: "OTP has been verified successfully."
    },
    OTP_SEND: {
      message: "OTP has been sent successfully."
    },

    // Delete
    DELETE_SUCCESS: {
      message: "User has been deleted successfully."
    },

    // Transaction
    PAYMENT_SUCESS: {
      message: "Payment received successfully"
    },
    PAYMENT_FALIURE: {
      message: "Payment request failed. Please try again"
    },
    PAYMENT_DELAYED: {
      message: "Your payment have been delayed for some reasons. Please wait..."
    },

    // Task
    TASK_DONE: {
      message: "All tasks are completed"
    }
  }
};
