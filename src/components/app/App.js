import React from 'react'
import './App.css';
// import { user } from '../../util/objects'
import Header from '../header/Header';
import { Switch, Route, useHistory } from 'react-router-dom'
import Main from '../main/Main';
// import Pages from '../pages/Pages';
// import Page1 from '../pages/page/Page1'
import MainPage from '../main-page/MainPage'
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
import PageNotFound from '../error/PageNotFound'
import RegisterProperty from '../registerProperty/RegisterProperty'
import UserProperties from '../user-properties/UserProperties'
import TermsAndConditions from '../terms-conditions/TermAndConditions'

function App() {
  const history = useHistory();

  // let userId = localStorage.getItem('user')

  // async function checkUser() {

  //   const userRef = db.collection('testUsers');
  //   const snapshot = await userRef.where('userId', '==', userId).get();
  //   if (snapshot.empty) {
  //     console.log('No matching documents.');
  //     return;
  //   }

  //   snapshot.forEach(doc => {
  //     // console.log(doc.id, '=>', doc.data());
  //     localStorage.setItem('docId', doc.id)
  //     return;
  //   });
  // }
  // checkUser()

  // db.collection('testUsers').doc('DtK9WVEwBVZ65IsnzIb0')
  //   .onSnapshot( snapshot => console.log(" Data >>>> ",snapshot.data()))

  if (localStorage.getItem('user')) {
    // if (history.location.pathname !== 'dashboard') { }
    // else
      history.push('/dashboard')
  }

  /*useEffect(() => {
    authListener()
  }, [])

  function authListener() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem("user", user.uid);
      } else {
        localStorage.removeItem("user");
      }
    });
  }*/

  return (
    <div className="app">
      <Switch >
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/dashboard">
          <Header />
          <Main className="container" />
        </Route>
        <Route path="/register">
          <RegisterProperty />
        </Route>
        <Route path="/my-properties">
          <Header />
          <UserProperties />
        </Route>
        <Route exact path="/privacy-policy">
          {/* <Header /> */}
          <TermsAndConditions />
          {/* <MainPage /> */}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
