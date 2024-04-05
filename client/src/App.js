
import "./App.css"
import Header from "./components/Layout/Header.jsx"
import Footer from "./components/Layout/Footer.jsx"
import Home from "./components/Home.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import GetProductDetails from "./components/product/GetProductDetails.jsx"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/cart/Cart";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";

function App() {
  return (
    <Router>
      <div className="App">
      <Toaster position = "top-center"></Toaster>
        <Header/>
      
      <div className="container">
      <Routes>
<Route path="/" element={<Home/>}></Route>
<Route path="/product/:id" element={<GetProductDetails/>}></Route>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />


<Route path="/cart" element={<Cart />} />
</Routes>
      </div>

<Footer/>
     
      </div>

    </Router>

  );
}

export default App;
