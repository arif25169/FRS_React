import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Match} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './Login.jsx';
import RedirectUsers from './RedirectUsers.jsx';
import BookFlight from './BookFlight.jsx';
import Header from './Header.jsx';
import AddFlights from './AddFlights.jsx';
import FlightListHome from './FlightListHome.jsx';

injectTapEventPlugin();
const muiTheme = getMuiTheme(lightBaseTheme, {
	appBar: {
		color: '#202D3E'
	}
	})
ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
   <Router>
         <div>
				 <Header/>
				 <Switch>
		 <Route  exact path='/' component={Header}/>
		 <Route  path='/login' component={Login}/>
		 <Route  path = '/redirect' component = {RedirectUsers}/>
		 <Route  path = '/bookflight' component = {BookFlight}/>
		 <Route  path = '/addflight' component = {AddFlights}/>
		 <Route  path = '/flighthome' component = {FlightListHome}/>

	   </Switch>
         </div>
   </Router>
 </MuiThemeProvider>,
  document.getElementById('root'))
