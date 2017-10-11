import React, {render} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import {Card, CardMedia, CardText} from 'material-ui/Card';



const styles = {
  body: {
    height: '100%',
    //background: 'url("./images/bgimg.jpg")'
    background: '#CFE8EF'
  }
  // card: {
  //         width:'50%',
  //         background: '#CFE8EF',
  //         marginRight:'300px'

  // }
}

export default class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
       password: '',
       number: null,
       emailId: ''
    }
     this.ChangeName = this.ChangeName.bind(this);
     this.ChangePassword = this.ChangePassword.bind(this);
     this.ChangeEmailID = this.ChangeEmailID.bind(this);
     this.ChangeNumber = this.ChangeNumber.bind(this);
     this.handleSave = this.handleSave.bind(this);
     this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillMount() {
      this.props.handleClickCancel;
    }
  ChangeName(e){
    this.setState({
       username : e.target.value
    })
  }
  ChangePassword(e){
    this.setState({
      password : e.target.value
    })
  }
  ChangeNumber(e){
    this.setState({
       number :e.target.value
    })
  }
  ChangeEmailID(e){
    this.setState({
      emailId : e.target.value
    })
  }

  handleSave(){
    let th = this;
    console.log(th.state.username)
    let newuserobj ={}
       newuserobj.username = this.state.username;
       newuserobj.password = this.state.password;
       newuserobj.number = this.state.number;
       newuserobj.emailId = this.state.emailId;
    Request
          .post('/users/newuser')
          .send({newuserobj})
          .end(function(err,res){
            if(err)
              console.log(err)
            else{
              console.log(res.body,"res")
            }
          })
  }

  handleCancel(){
         this.props.handleClickCancel();
  }

  render() {
    console.log(this.state.username);
    return (
        <div>
        <Card style={{
          width: '373px',
          marginBottom: '450px',
          marginTop: '200px',
          marginLeft: '450px'}}>
        <CardText>
        <TextField
            hintText="Username"
            value={this.state.username}
            onChange={this.ChangeName}
            style={{width: '100%'}}

          /> <br />
          <TextField
            hintText="EmailID"
            value={this.state.emailId}
            onChange={this.ChangeEmailID}
            style={{width: '100%'}}
          />
        <TextField
          hintText="Password"
          value={this.state.password}
          onChange={this.ChangePassword}
          style={{width: '100%'}}
        />
              <br />
              <TextField
                hintText="MobileNumber"
                value={this.state.number}
                onChange={this.ChangeNumber}
                style={{width: '100%'}}
              />
              <br /><br />
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <RaisedButton   onClick={this.handleSave} backgroundColor="#a4c639" >
        SAVE
        </RaisedButton> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <RaisedButton  secondary={true} onClick={this.handleCancel} >
         CANCEL
        </RaisedButton>

        <br />

        </CardText>
        </Card>
        </div>


    );
  }
}
