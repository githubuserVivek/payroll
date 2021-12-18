import Index from "views/Index.js";
import HrPanel from "views/examples/HrPanel.js";
import Employess from "views/examples/Employess.js";
import AddEmployee from "views/examples/AddEmployee.js";
import Login from "./views/examples/Login";
import EditEmployee from "views/examples/EditEmployee";
import ChangePassword from "views/examples/ChangePassword";
import View from "views/examples/View";
import Salary from "views/examples/Salary";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    isDisplay: true,
    component: Index,
    layout: "/admin",
  },

  {
    path: "/hr-panel",
    name: "HR Panel",
    icon: "ni ni-single-02 text-yellow",
    isDisplay: false,
    component: HrPanel,
    layout: "/admin",
  },
  {
    path: "/employess",
    name: "Employees",
    icon: "fa fa-users text-yellow",
    isDisplay: true,
    component: Employess,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-bullet-list-67 text-red",
    isDisplay: false,
    component: Login,
    layout: "/auth",
  },

  {
    path: "/add-employee",
    name: "Add employee",
    component: AddEmployee,
    isDisplay: false,
    layout: "/admin",
  },

  {
    path: "/edit-employee/:id",
    name: "Edit employee",
    component: EditEmployee,
    isDisplay: false,
    layout: "/admin",
  },

  {
    path: "/change-password",
    component: ChangePassword,
    isDisplay: false,
    layout: "/admin",
  },

  {
    path: "/view/:id",
    component: View,
    isDisplay: false,
    layout: "/admin",
  },
  {
    path: "/changePassword?id=:id",
    isDisplay: false,
    layout: "/admin",
  },

  {
    path: "/leaves",
    isDisplay: true,
    icon: "fa fa-money text-green",
    name: "Salary",
    layout: "/admin",
    component: Salary,
  },
];

export default routes;
