import React from 'react';
import { useContext} from 'react';
import { AuthContext } from './context/AuthContext';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate
} from "react-router-dom";

// import {router} from "./router/index"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
        return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <Router>
      <React.Suspense>
          <Routes>
              {/* {router.map((e,i) => (
                  <Route path={e.path} element={
                    <ProtectedRoute>
                      <e.element/>
                    </ProtectedRoute>
                  } key={i} ></Route>  
              )
              )} */}
              <Route path="/" element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } >
              </Route> 
              <Route path="/login" element={
                    <Login />
                  } >
              </Route> 
              <Route path="/register" element={
                    <Register />
                  } >
              </Route> 

          </Routes>
        </React.Suspense>

    </Router>
  );
}

export default App;
