import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { fetchUserData } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
import Workspace from "./pages/Workspace";
import Settings from "./pages/Settings";
import Form from "./pages/Form";
import Folder from "./pages/Folder";
import Response from "./pages/Response";
import ShareWorkspace from "./pages/ShareWorkspace";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !userData) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token, userData]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/response/:formName/:formId" element={<Response />} />
          {/* Restrict /login and /signup for authenticated users */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/workspace/:workspaceId" element={<Workspace />} />
            <Route path="/form/:workspaceId/:formId" element={<Form />} />
            <Route
              path="/form/:workspaceId/:folderId/:formId"
              element={<Form />}
            />
            <Route path="/folder/:workspaceId/:folderId" element={<Folder />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/share-workspace/:inviteToken"
              element={<ShareWorkspace />}
            />
          </Route>

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
