function errorHandler(err, req, res, next) {
  // let messageArray = err.errors.map((err) => err.message);
  let status = 500;
  let message = "Internal Server Error";

  console.log(err, "<<< from errorHandler");

  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "imageEmpty":
      status = 400;
      message = "ImageUrl can't be Empty";
      break;
    case "PasswordEmpty":
      status = 400;
      message = "Password Can't be Empty";
      break;
    case "EmailEmpty":
      status = 400;
      message = "Email Can't be Empty";
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = "Email already registered!";
      break;
    case "NameEmpty":
      status = 400;
      message = "Name Can't be Empty";
      break;
    case "InvalidLogin":
      status = 401;
      message = "Invalid email/password";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "invalidId":
      status = 401;
      message = "ID not Found";
      break;
    case "unauthenticated":
      status = 401;
      message = "You're Not Authenticated";
      break;
    case "InvalidRole":
      status = 403;
      message = "You're Not Authorized";
      break;
    case "InvalidData":
      status = 404;
      message = "Error data not found";
      break;
    case "NotFound":
      status = 404;
      message = "Error Data Not Found";
      break;

    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
