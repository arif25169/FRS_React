import React, {render} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import ShowIcon from 'material-ui/svg-icons/action/visibility';
import ShowOffIcon from 'material-ui/svg-icons/action/visibility-off';
import NewCustomer from './NewCustomer.jsx';
import BookFlight from './BookFlight.jsx';
import AddFlights from './AddFlights.jsx';
import {Redirect} from 'react-router-dom';
import Header from './Header.jsx';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      passwordType: "password",
      showComponent: false,
      showLogin:true,
      flightState :true,
      errMsg: "",
			usernameErrorText: "",
			passwordErrorText: ""
    }
     this.ChangeName = this.ChangeName.bind(this);
     this.ChangePassword = this.ChangePassword.bind(this);
     this.handleLogin = this.handleLogin.bind(this);
     this.togglePassword = this.togglePassword.bind(this);
     this.handleCreateUser = this.handleCreateUser.bind(this);
  }
  ChangeName(e){
    this.setState({
       username : e.target.value,
       errMsg: "",
			usernameErrorText: ""
    })
  }
  ChangePassword(e){
    this.setState({
      password : e.target.value,
      errMsg: "",
			passwordErrorText: ""
    })
  }
  onSubmit(e){
      this.onCommentSubmit(e)
    }
  handleLogin(){
    let th = this;
    if(th.state.username.trim().length === 0)
     th.setState({
  			usernameErrorText: "This field cannot be empty"
  		})
  		if(th.state.password.trim().length === 0)
       th.setState({
  			passwordErrorText: "This field cannot be empty"
  		})
  		if(th.state.username.trim().length !== 0 && th.state.password.trim().length !== 0) {
    Request
          .post('/users/login')
          .send({username:this.state.username,password:this.state.password})
          .set({'Access-Control-Allow-Origin': '*'})
          .end(function(err,res){
            if(err)
              console.log(err,"err");
            else{
              console.log(res.body,"res")
              if(res.status == 401) {
			    	th.setState({
			    		errMsg: "Invalid username or password. Try again."
			    	})
			    }
          else{
              localStorage.setItem('token',res.body.token)
              th.setState({
                     showLogin : !th.state.showLogin,
                     flightState : !th.state.flightState

              })
            }
            }
          })
  }
}
  handleCreateUser(){
    let th  = this;
    this.setState({
      showComponent: !th.state.showComponent,
      showLogin : !th.state.showLogin
    })
  }
  togglePassword(){
              let passwordView = this.state.passwordType =='password' ? 'text' : 'password'
              this.setState({
                   passwordType:passwordView
              })
  }
  render() {
    let th = this;
    console.log(this.state.showLogin)
    return (
        <div >
        {th.state.showLogin === true &&
        <Card style={{
          width: '373px',
          marginBottom: '450px',
          marginTop: '200px',
          marginLeft: '450px'}}>
        <CardText>
        <form className="commentForm" onSubmit={th.onCommentSubmit}>

        <TextField
            hintText="Username"
            value={th.state.username}
            onChange={th.ChangeName}
            style={{width: '100%'}}
            errorText={th.state.usernameErrorText}

          /> <br />
          <div style={{position: 'relative', display: 'inline-block', width: '100%'}}>
          {
									this.state.passwordType == 'password' ?
									<ShowIcon style={{
										position: 'absolute',
										right: 0, top: 24,
										width: 20, height: 20,
										zIndex: 1, cursor: 'pointer',
										color: 'wheat'
									}} onTouchTap={this.togglePassword}/> :
									<ShowOffIcon style={{
										position: 'absolute',
										right: 0, top: 24,
										width: 20, height: 20,
										zIndex: 1, cursor: 'pointer',
										color: 'wheat'
									}} onTouchTap={this.togglePassword}/>
								}
                </div>
        <TextField
          hintText="Password"
        type={this.state.passwordType}
          onChange={this.ChangePassword}
          style={{width: '100%'}}
          errorText={this.state.passwordErrorText}
           />
              <br /><br />
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <RaisedButton  type="submit"  onClick={this.handleLogin} backgroundColor="#a4c639" >
        LOGIN
        </RaisedButton> &nbsp; &nbsp;
        <RaisedButton  secondary={true} onClick={this.handleCreateUser} >
        NEW USER
        </RaisedButton>
        <br />
        </form>
        <div style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>{this.state.errMsg}</div>
        </CardText>
        </Card>
      }
        {this.state.showComponent === true && this.state.showLogin === false &&
           <NewCustomer handleClickCancel = {this.handleCreateUser} />

        }

        </div>


    );
  }
}
