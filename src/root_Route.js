//__________________Authentication_________________
const Auth = require("./api/Authentication/Auth");
const Login = require("./api/Authentication/Login");
const Logout = require("./api/Authentication/Logout");
const Register = require("./api/Authentication/Register");
//____________________Users_________________________
const Users = require("./api/Users/Users");
const User = require("./api/Users/User");
const UpdateUser = require("./api/Users/UpdateUser");
//__________________Profile______________________
const CreateProfile = require("./api/Profile/CreateProfile");
const GetAllProfile = require("./api/Profile/GetAllProfile");
const GetOneProfile = require("./api/Profile/GetOneProfile");
//___________________Car______________________
const CreateCar = require("./api/Car/CreateCar");
const GetAllCar = require("./api/Car/GetAllCar");
const GetOneCar = require("./api/Car/GetOneCar");
const UpdateCar = require("./api/Car/UpdateCar");
const GetMyCar = require("./api/Car/GetMyCar");

//********************************************************** */
//********************************************************** */
//********************************************************** */
const rootRoute = (app) => {
  //__________________Authentication_________________
  app.use(Auth);
  app.use(Login);
  app.use(Logout);
  app.use(Register);

  //____________________Users_________________________
  app.use(Users);
  app.use(User);
  app.use(UpdateUser);

  //__________________Profile______________________
  app.use(CreateProfile);
  app.use(GetAllProfile);
  app.use(GetOneProfile);

  //___________________Car______________________
  app.use(CreateCar);
  app.use(GetAllCar);
  app.use(GetOneCar);
  app.use(UpdateCar);
  app.use(GetMyCar);
};

module.exports = rootRoute;
