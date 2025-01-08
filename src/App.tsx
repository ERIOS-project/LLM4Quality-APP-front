import "./App.css";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { loginRequest } from './authConfig';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MyAppBar from "./components/AppBar";
import VerbatimClassification from "./pages/VerbatimClassification";
import VerbatimDetails from "./pages/VerbatimDetails"; 

const LoginRedirect = () => {
  const { instance } = useMsal();
  useEffect(() => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  }, [instance]);

  return null; 
};

export default function App() {
  const { instance, accounts } = useMsal();
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <MyAppBar />
        <Provider store={store}>
          <div className="body">
            <Routes>
              <Route path='/' element={<VerbatimClassification />} />
              <Route path='/details/:id' element={<VerbatimDetails />} />
            </Routes>
          </div>
        </Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginRedirect />
      </UnauthenticatedTemplate>
    </div>
  );
}