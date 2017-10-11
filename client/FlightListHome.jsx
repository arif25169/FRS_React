import React, {render} from 'react';
import Request from 'superagent';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import AddFlights from './AddFlights.jsx';
import Dialog from 'material-ui/Dialog';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';


export default class FlightListHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights : [],
      showDialog : false,
      userrole : '',
      disable : true,
      EditBookFlight : false,
      modifyflight : {},
      bookflight : {},
      errormsg : false
    }
    this.getAllFlights = this.getAllFlights.bind(this);
    this.OnBooking = this.OnBooking.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

componentWillMount() {
  let th = this;

    th.props.username;
    console.log(th.props.username)
    if(th.props.username === 'admin'){
        th.setState({
          disable : false
        })
        	th.getAllFlights();
        }
        else{
          th.setState({
            flights : this.props.FilteredResFlight
          })
        }
	}

getAllFlights() {
  let th = this
  Request
        .get('/admin/allflights')
        .end(function(err, res) {
         if(err) {
           console.log(err);
         } else {
           console.log(res.body)
           let result = res.body;
           if(result !== undefined) {
             th.setState({flights : result});
           }
         }
      });
  }



  OnBooking(flight){
    console.log(flight)
     this.setState({
       showDialog : true
     })
     this .setState({
        bookflight : flight
     })

  }



handleModify(flight) {
  console.log(flight)
   let th = this
    th.setState({
            EditBookFlight : true,
            modifyflight : flight
        })

 }
handleDelete(flight){
    Request
          .post('admin/deleteflight')
          .set({'Authorization': localStorage.getItem('token')})
          .send({flight:flight})
           .end(function(err,res){
             if(err)
               console.log(err)
               else{
                 console.log(res.body)
               }
           })
           this.getAllFlights();
}
  render(){
    let th = this;
    console.log(this.state.disable,"disable");
    console.log(th.props.username,"props.username")
    return(
      <div>
      {!th.state.EditBookFlight && !this.state.errormsg && <div>
      <Paper zDepth={1}  style={{padding: 30, backgroundColor: '#9A879D'}}>
      <Row>
      <Col md={2}>Flightname</Col>
      <Col md={2}>Source</Col>
      <Col md={2}>Departs</Col>
      <Col md={2}>Destination</Col>
      <Col md={2}>Arrives</Col>
      <Col md={1}>Price</Col>

   { th.state.disable &&
     <Link to = '/bookflight' >
     <RaisedButton label="BACK"  backgroundColor='#F78E69' />
     </Link>
   }
   {!th.state.disable &&
     <Link to = '/addflight' username = {th.props.username} >
     <RaisedButton label="ADD"  backgroundColor='#F78E69' />
     </Link>
   }
      </Row>
      </Paper>
      {
        this.state.flights.map(function(flight,index){
          console.log(flight.flightname)
          var starttime = new Date(flight.departs)
                 starttime = starttime.toLocaleString();
          var endtime = new Date(flight.arrives)
              endtime = endtime.toLocaleString();
          return(
          <Paper zDepth={1}  style={{padding: 30, backgroundColor:"#A8BCA1" }}>
          <Row>
          <Col md={2}>{flight.flightname}</Col>
          <Col md={2}>{flight.source}</Col>
          <Col md={2}>{starttime}</Col>
          <Col md={2}>{flight.destination}</Col>
          <Col md={2}>{endtime}</Col>
          <Col md={1}>{flight.price}</Col> &nbsp;&nbsp;
              { !th.state.disable && <EditIcon  tooltip="MODIFY"  onClick={th.handleModify.bind(this,flight)} style = {{cursor: 'pointer'}}/>}
              { !th.state.disable && <DeleteIcon tooltip="DELETE"  onClick={th.handleDelete.bind(this,flight)} style = {{cursor: 'pointer'}}/>
              }
        { th.state.disable && <RaisedButton label="BOOK"  backgroundColor='#BBDB9B' onClick={th.OnBooking.bind(this,flight)}/>}
          </Row>
          </Paper>
      )  })

    }
    </div> }
    {th.state.showDialog && <Dialog
      open ={th.state.showDialog}
          title = {'Hi  '+th.props.username }
          modal={false}
        >Your booking details
          FlightName :{th.state.bookflight.flightname}
          Location : {th.state.bookflight.source} to {th.state.bookflight.destination}
          Date :{th.state.bookflight.departs}
          TotalPrice : {th.state.bookflight.seats} * {th.state.bookflight.price}
      </Dialog>
      }
      {
      th.state.EditBookFlight && <AddFlights modifyflight = {this.state.modifyflight} EditBookFlight={this.state.EditBookFlight} username={this.props.username}/>
      }
      </div>
    )
  }
}
