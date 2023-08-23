import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./routes/error";
import SignUp from './routes/signup';
import Customer from './routes/customer';
import Adviser from './routes/adviser';

// routes setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/customer",
    element: <Customer/>
  },
  {
    path: "/adviser",
    element: <Adviser/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
