import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticationForm } from './components/AuthenticationForm';

function App() {
  return (
    <AuthenticationForm />
    // <BrowserRouter>
    //     <Routes>
    //       <Route path="/auth" component={<AuthenticationForm />} />
    //       <Route
    //         path="*"
    //         element={<Navigate to="/auth" replace />}
    //       />
    //     </Routes>
    //   </BrowserRouter>
  );
}

export default App;
