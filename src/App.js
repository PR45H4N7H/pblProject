import "./styles.css";

import Navbar from "./components/Navbar";
// import Home from "./components/Home";

// import ListProjectsComp from "./components/ListProjectsComp";
import AppRouter from "./routing/AppRouter";
// import AdminLogin from "./components/AdminLogin";

export default function App() {
  return (
    <div className="App">
      {/* <div className="cont" >
      <ListProjectsComp/>
      </div> */}
      
      <Navbar />
      <div className="RenderStyles">
      <AppRouter/>
      </div>
      
      
      {/* <Home />  */}
      
    </div>
  );
}
