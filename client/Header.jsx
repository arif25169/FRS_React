import React, {render} from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login.jsx';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import {Redirect} from 'react-router-dom';
import FlightListHome from './FlightListHome.jsx';
import RedirectUsers  from './RedirectUsers.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                 cc: ''
        }
       this.handleLogout = this.handleLogout.bind(this);
       }

componentWillMount(){
        const token = localStorage.getItem('token')
        console.log(token , "token n route")
           if(token == null)
              this.setState({cc:'Login'})
      }

   handleLogout(){
     //console.log(token)
         var token = localStorage.removeItem('token');
         console.log(token,"logout");
         this.setState({
           cc : 'Login'
         })
       }

  render() {
    console.log(this.state.cc ,"state");

    return (
        <div >
        {this.state.cc === "Login" ? <AppBar title="Flight Search " showMenuIconButton={false}/> :
        <AppBar title="Flight Search " showMenuIconButton={false}
         iconElementRight={<IconButton><ExitIcon onClick={this.handleLogout}/></IconButton>}/>}
               {this.state.cc === "Login" ? <Redirect to = "/login"/>: <Redirect to = "/redirect"/>}
  </div>
)}
}
