import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SwrGlobalConfig from "./components/common/SwrGlobalConfig";
import AddPost from "./pages/AddPost";
import PostDetails from "./pages/PostDetails";
import PostEditPage from "./pages/PostEditPage";
import CommentEdit from "./pages/CommentEdit";

const App = () => (
  <Router>
    <AuthProvider>
      <SwrGlobalConfig>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/post/add">
            <AddPost />
          </ProtectedRoute>
          <ProtectedRoute path="/post/details/:postId">
            <PostDetails />
          </ProtectedRoute>
          <ProtectedRoute path="/post/edit/:postId">
            <PostEditPage />
          </ProtectedRoute>
          <ProtectedRoute path="/comment/edit/:commentId">
            <CommentEdit />
          </ProtectedRoute>
        </Switch>
      </SwrGlobalConfig>
    </AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Router>
);

export default App;
