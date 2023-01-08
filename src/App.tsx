import { Route, Routes } from 'react-router-dom';

import useAuth, { AuthProvider } from './context/AuthContext/AuthProvider';
import { ToDoProvider } from './context/ToDoContext/ToDoProvider';
import Login from './pages/Login';
import ToDos from './pages/ToDos';

function App() {
  return (
    <>
      <AuthProvider>
        <ToDoProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todos" element={<ToDos />} />
          </Routes>
        </ToDoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
