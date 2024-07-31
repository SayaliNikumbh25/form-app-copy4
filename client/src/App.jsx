// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Workspace from './pages/Workspace.jsx';
import PublicForm from './pages/PublicForm.jsx';
import Submissions from './pages/Submissions.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboards from './pages/Dashboards.jsx';
import Forms from './pages/Forms.jsx';
import Settings from './pages/Settings.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboards} />} />
        <Route path="/workspace" element={<PrivateRoute element={Workspace} />} />
        <Route path="/form/:id" element={<PublicForm/>}/>
        <Route path="/submissions/:id" element={<PrivateRoute element={Submissions} />} />
        <Route path="/folder/forms/:id" element={<PrivateRoute element={Forms} />} />
        <Route path="/user/:id" element={<PrivateRoute element={Settings} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
