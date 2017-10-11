import React, {render} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlightListHome from './FlightListHome.jsx';
import {Link} from 'react-router-dom';


const places = ['CHENNAI','BANGALORE','COIMBATORE','PUNE','KOLKATA','VIJAYAWADA','AHMEDABAD','DELHI','JAMMU','MUMBAI','HYDERABAD']
export default class BookFlight  extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        source : '',
        destination : '',
        date : null,
        seats : null,
        callFlights : false,
        name : '',
        FilteredResFlight : [],
        sourceerr : '',
        destinationerr : '',
        dateerr : '',
        seatserr : ''

    }
     this.handleDateOnChange = this.handleDateOnChange.bind(this);
     this.handleChangeSource = this.handleChangeSource.bind(this);
     this.handleChangeDestination = this.handleChangeDestination.bind(this);
     this.handleChangeSeats = this.handleChangeSeats.bind(this);
     this.OnSearching = this.OnSearching.bind(this);
     this.OnCancelling = this.OnCancelling.bind(this);
     this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  componentWillMount() {
    console.log(this.props.username,"bookflightmount")
    this.setState({
      name : this.props.username
    })
    }

handleChangeSource(event,key,value){
  this.setState({
    source: value,
    sourceerr : ''

  })
}
handleChangeDestination(event ,key ,value){
  this.setState({
    destination: value,
    destinationerr : ''
  })
}
handleDateOnChange(event,date){
	 console.log(date,"date")
	 this.setState({
		 date: date,
    dateerr : '',
	 })
}
 disablePrevDates(startDate) {
  const startSeconds = Date.parse(startDate);
  return (date) => {
    return Date.parse(date) < startSeconds;
  }
}

handleChangeSeats(event){
  this.setState({
       seats: event.target.value,
       seatserr : ''
  })
}
OnSearching(){
  let th = this;
  if(this.state.source == ""){
    th.setState({
      sourceerr :"This field cannot be empty"
    })
  }
  if(this.state.destination == ""){
    th.setState({
      destinationerr :"This field cannot be empty"
    })
  }
  if(this.state.date == null){
    th.setState({
      dateerr :"This field cannot be empty"
    })
  }
  if(this.state.seats == null){
    th.setState({
      seatserr :"This field cannot be empty"
    })
  }

  if(this.state.source !=null &&this.state.destination!= null &&this.state.date != null && this.state.seats != null){
  let flightObj = {}
     flightObj.username = this.props.username;
     flightObj.source = this.state.source;
     flightObj.destination = this.state.destination;
     flightObj.date = this.state.date;
     flightObj.seats = this.state.seats;
   Request
         .post('/users/flights')
         .send({flightObj})
         .end(function(err,res){
            if(err){
              console.log(err)
            }
            else
             {
               console.log(res.body,"searchlight clicked")
               th.setState({
                   callFlights : !th.state.callFlights,
                   FilteredResFlight : res.body

                })
              }
        })
      }
}

OnCancelling(){
  this.setState({
    source : '',
    destination : '',
    date : '',
    seats: '',
    sourceerr : '',
    destinationerr : '',
    dateerr : '',
    seatserr : ''
  })
}

handleClickLogout(){
    localStorage.removeItem('token');
}
render(){
  console.log(this.state.callFlights,"source")
  console.log(this.props.username,"bookflight")
  console.log(this.state.FilteredResFlight,"FilteredResFlight")
  const startDate = new Date();
  return(
    <div>

    {this.state.FilteredResFlight.length == 0  &&
      <Card style={{
        width: '373px',
        marginBottom: '450px',
        marginTop: '200px',
        marginLeft: '450px'}}>
      <CardText>
      <SelectField value={this.state.source} onChange={this.handleChangeSource} floatingLabelText="Source" errorText={this.state.sourceerr}>
        {places.map(function(i, key) {
          return <MenuItem key={key} value={i} primaryText={i}/>
        })
}
      </SelectField>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

              <SelectField value={this.state.destination} onChange={this.handleChangeDestination} floatingLabelText="Destination" errorText={this.state.destinationerr}>
                {places.map(function(i, key) {
                  return <MenuItem key={key} value={i} primaryText={i}/>
                })
          }
              </SelectField>
                        <br /> <br />

    <DatePicker hintText="Date" value={this.state.date} onChange={this.handleDateOnChange} shouldDisableDate={this.disablePrevDates(startDate)} errorText={this.state.dateerr} />

    <TextField hintText="Seats" floatingLabelText="No seats" value={this.state.seats}
                        onChange={this.handleChangeSeats} errorText={this.state.seatserr}/>
                        <br /> <br />
                        &nbsp; &nbsp;&nbsp;

    <RaisedButton label="SEARCH FLIGHT"  onClick={this.OnSearching} backgroundColor="#a4c639"/>
    &nbsp; &nbsp; &nbsp;

    <RaisedButton label="CLEAR" secondary={true} onClick={this.OnCancelling} />
    {this.state.callFlights && this.state.FilteredResFlight.length == 0 && <h3 style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>OOPS!!!!! NO RESULTS FOUND.. TRY AFTER SOME TIME..</h3>}
  </CardText>
  </Card>
    }
  {
    this.state.FilteredResFlight.length !== 0 &&  <FlightListHome username ={this.props.username} FilteredResFlight = {this.state.FilteredResFlight}/>
  }
    </div>
  )
}

}
