import React, {render} from 'react';
import Request from 'superagent';
import FlightListHome from './FlightListHome.jsx';
import BookFlight from './BookFlight.jsx';

export default class RedirectUsers  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userrole : ''
    }


    this.verifyUsers = this.verifyUsers.bind(this);
  }

  componentWillMount() {
          this.verifyUsers();

      	}


  verifyUsers(){
    console.log("verify")
    let th = this
    Request
          .get('/users/verifyusers')
          .set({'Authorization': localStorage.getItem('token')})
          .end(function(err, res) {
           if(err) {
             console.log(err);
           } else {
             console.log(res.body)
             th.setState({
               userrole : res.body.userobj.username
             })

           }
        });
    }
    render(){
      console.log("verify render",this.state.userrole)
      return(
        <div>
        {
          this.state.userrole === 'admin'? <FlightListHome  username={this.state.userrole}/> : <BookFlight username={this.state.userrole}/>
        }
        </div>
      )
    }
  }
