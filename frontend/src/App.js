import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Comments from './components/comments';
import Profile from './components/profile';
import Post from './components/post';
import EditProfile from './components/editprofile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/comments/:imgID" element={<Comments />} />
          <Route path="/profile/:userID" element={<Profile />} />   
          <Route path="/post/:postID" element={<Post/>}/>  
          <Route path="/editprofile" element={<EditProfile/>}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
