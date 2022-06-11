import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import ManagerPage from "./pages/ManagerPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute path="/" exact />
          <PrivateRoute path="/manager" />
          <Route component={LoginPage} path="/login" />
          {/* <Redirect to="/login" /> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
