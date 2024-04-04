
import "./App.css"
import Header from "./components/Layout/Header.jsx"
import Footer from "./components/Layout/Footer.jsx"
import Home from "./components/Home.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import GetProductDetails from "./components/product/GetProductDetails.jsx"



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

</Routes>
      </div>

<Footer/>
     
      </div>

    </Router>




  );
}

export default App;
