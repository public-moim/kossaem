import './App.css';
import LandingPage from './component/LandingPage';
import Login from './component/share/Login';
import Signup from './component/share/Signup';
import HomeStudent from './component/student/HomeStudent'
import ChatPage from './component/student/ChatPage';
import ChatPageT from './component/teacher/ChatPageT';
import AddQuiz from './component/admin/AddQuiz'
import ListQuiz from './component/admin/ListQuiz';
import { BrowserRouter, Routes, Route, Link, Navigate, createBrowserRouter , RouterProvider, Outlet, useParams} from 'react-router-dom';
import Admin from './component/admin/Admin';
import HomeTeacher from './component/teacher/HomeTeacher';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import QuestionDetails from './component/admin/QuestionDetails';
import Chat from './component/student/Chat';
import Record from './component/student/Record';
import QuizPlay from './component/student/QuizPlay';
import Dashboard from './component/student/Dashboard';
function App() {
  const {currentUser} = useContext(AuthContext)
  let role_id=''
  
  if(currentUser){
    role_id= currentUser.role_id
    //console.log(currentUser)
    
  }
  
  //console.log('App', currentUser)
  
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser || role_id!==1 ){
      //console.log(currentUser)
      return <Navigate to={`/login`}/>
    } 
    return children
  }

  const ProtectedRouteAdmin = ({children}) => {
    if(!currentUser || role_id!==0){
      //console.log(currentUser)
      return <Navigate to={`/login`}/>
    } 
    return children
  }

  const ProtectedRouteTeacher = ({children}) => {
    if(!currentUser || role_id!==2){
      //console.log(currentUser)
      return <Navigate to={`/login`}/>
    } 
    return children
  }

  const HasAuth = ({children}) => {
    if(currentUser){
      if(currentUser.role_id===1   ){
        return <Navigate to={`/student/${currentUser.id}`} />;
      } else if(currentUser.role_id===2){
        return <Navigate to={`/teacher/${currentUser.id}`} />;
      } else if(currentUser.role_id===0){
        return <Navigate to={`/admin`} />;
      } else
      return <Navigate to={`/student/${currentUser.id}`} />
      
    } 

    return children
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element:<LandingPage/>
    },
    {
      path:'/login',
      element:
      <HasAuth>
        <Login/>
      </HasAuth>
    },
    {
      path:'/signup/:type',
      element:<Signup/>
    },
    {
      path:'/student/:id',
      element:
      <ProtectedRoute>
        <HomeStudent/>
      </ProtectedRoute>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'game', element:<QuizPlay/>},
        {path:'chats', element:<Chat/>},
        {path:'records', element: <Record/>}
      ]
    },
    {
      path:'/student/chat',
      element:<ChatPage/>
    },
    {
      path:'/admin',
      element:
      <ProtectedRouteAdmin>
        <Admin/>
      </ProtectedRouteAdmin>,
      children:[
        {path:'addQuiz', element:<AddQuiz/>},
        {path:'list', element:<ListQuiz/>},
        {path:'quiz/:id', element:<QuestionDetails/>}
      ]
    },
    {
      path:'/teacher/:id',
      element:
      <ProtectedRouteTeacher>
        <HomeTeacher/>
      </ProtectedRouteTeacher>
      
    },
    {
      path:'/teacher/chat',
      element:<ChatPageT/>
    },
    
    
  ])
  return (
    <div className="App">

      
      
<RouterProvider router={router} >
      

      </RouterProvider>
      
      
    </div>
  );
}

export default App;
