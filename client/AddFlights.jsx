import React, {render} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Redirect} from 'react-router-dom';
import FlightListHome from './FlightListHome.jsx';
import Snackbar from 'material-ui/Snackbar';

const data = ['0','1', '2', '3']
const refund = ['YES', 'NO']
const foods = ['BREAKFAST', 'BRUNCH', 'LUNCH', 'SUPPER', 'DINNER']
const places = ['CHENNAI','BANGALORE','COIMBATORE','PUNE','KOLKATA','VIJAYAWADA','AHMEDABAD','DELHI','JAMMU','MUMBAI','HYDERABAD']

export default class AddFlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightname: '',
      source: '',
      destination: '',
      departs: null,
      arrives: null,
      stops: '',
      price: '',
      food: [],
      refundable: '',
      capacity: '',
      redirect : false,
      id : '',
      open :false
    }
    this.ChangeName = this.ChangeName.bind(this);
    this.ChangePrice = this.ChangePrice.bind(this);
    this.ChangeDepartTime = this.ChangeDepartTime.bind(this);
    this.ChangeArrivalTime = this.ChangeArrivalTime.bind(this);
    this.handleStopChange = this.handleStopChange.bind(this);
    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleRefundChange = this.handleRefundChange.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleCapacityChange = this.handleCapacityChange.bind(this);
    this.OnAddFlight = this.OnAddFlight.bind(this);
    this.OnCancelling = this.OnCancelling.bind(this);
    this.OnEditFlight = this.OnEditFlight.bind(this);
  }
  componentWillMount() {
    let th = this;
      //console.log(th.props.modifyflight,"modifyflight");
      //console.log(th.props.EditBookFlight,"EditBookFlight");
console.log(this.props,"username");
      if(th.props.EditBookFlight){
      var starttime = new Date(this.props.modifyflight.departs)
             starttime = starttime;
             console.log(starttime)
      var endtime = new Date(this.props.modifyflight.arrives)
          endtime = endtime;
      th.setState({
        id : this.props.modifyflight._id,
        flightname : this.props.modifyflight.flightname,
        source : this.props.modifyflight.source,
        destination: this.props.modifyflight.destination,
        departs:starttime ,
        arrives:endtime ,
        stops: this.props.modifyflight.stops,
        price: this.props.modifyflight.price,
        food: this.props.modifyflight.food,
        refundable:this.props.modifyflight.refundable,
        capacity:this.props.modifyflight.capacity,
      })


  	}
  }
  ChangeName(e) {
    this.setState({flightname: e.target.value})
  }

  handleChangeSource(event , key , value) {
    this.setState({source : value})
  }
  handleChangeDestination(event ,key ,value) {
    this.setState({destination : value})
  }
  ChangeDepartTime(event, time) {
    this.setState({departs: time})
  }

  ChangeArrivalTime(event, date) {
    this.setState({arrives: date})
  }
  ChangePrice(event) {
    this.setState({price: event.target.value})
  }
  handleStopChange(event, key, value) {
    this.setState({stops: value})
  }
  handleFoodChange(event, key, value) {
    this.setState({food: value})
  }

  handleRefundChange(event, value) {
    this.setState({refundable: value})
  }
  handleCapacityChange(event, value) {
    this.setState({capacity: value})
  }
  OnAddFlight() {
    let th = this;
    let flightdetailObj = {}
    flightdetailObj.flightname = th.state.flightname;
    flightdetailObj.departs = th.state.departs;
    flightdetailObj.arrives = th.state.arrives;
    flightdetailObj.price = th.state.price;
    flightdetailObj.stops = th.state.stops;
    flightdetailObj.food = th.state.food;
    flightdetailObj.refundable = th.state.refundable;
    flightdetailObj.capacity = th.state.capacity;
    flightdetailObj.source = th.state.source;
    flightdetailObj.destination = th.state.destination;
    Request
    .post('/admin/addflights')
    .send({flightdetailObj: flightdetailObj})
    .end(function(err, res) {
      if (err)
        console.log(err)
      else {
        console.log(res)
        console.log(th.state.open , "open");
        th.setState({
           open: true
        })
      }
    })
  }
OnCancelling(){
  this.setState({
    flightname: '',
    source: '',
    destination: '',
    departs: null,
    arrives: null,
    stops: '',
    price: '',
    food: [],
    refundable: '',
    capacity: '',
    open : false
  })
}

OnEditFlight(){
  let th = this;
  let flightdetailObj = {}
  flightdetailObj.id = th.state.id;
  flightdetailObj.flightname = th.state.flightname;
  flightdetailObj.departs = th.state.departs;
  flightdetailObj.arrives = th.state.arrives;
  flightdetailObj.price = th.state.price;
  flightdetailObj.stops = th.state.stops;
  flightdetailObj.food = th.state.food;
  flightdetailObj.refundable = th.state.refundable;
  flightdetailObj.capacity = th.state.capacity;
  flightdetailObj.source = th.state.source;
  flightdetailObj.destination = th.state.destination;
  Request
  .post('/admin/updateflight')
  .send({flight: flightdetailObj})
  .end(function(err, res) {
    if (err)
      console.log(err)
    else {
      console.log(res)
      th.setState({
         redirect : true
      })
    }
  })
}
  render() {
    return (
      <div>
      {!this.state.redirect &&  <Card style={{
         width: '650px',
         marginTop: '50px',
         marginLeft: '350px'
       }}>
          <CardText>
            <Grid>
              <Row>
                <Col >
                  <TextField hintText="Flightname" value={this.state.flightname} onChange={this.ChangeName}/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Col>
                <Col >
                  <TextField hintText="Price" value={this.state.price} onChange={this.ChangePrice}/>

                  <br/>
                </Col>
              </Row>
              <Row>
                <Col >
                  <SelectField value={this.state.food} onChange={this.handleFoodChange} floatingLabelText="With" multiple={true}>
                    {foods.map(function(i, key) {
                      return <MenuItem key={key} value={i} primaryText={i}/>
                    })
}
                  </SelectField>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                </Col>
                <SelectField value={''+this.state.stops} onChange={this.handleStopChange} floatingLabelText="No Of Stops">
                  {data.map(function(stop, key) {
                    return <MenuItem key={key} value={stop} primaryText={stop}/>
                  })
}
                </SelectField>
                <Col >
                  <br/>
                </Col>
              </Row>
              <Row>
                <Col >
                <SelectField value={this.state.source} onChange={this.handleChangeSource} floatingLabelText="Source">
                  {places.map(function(i, key) {
                    return <MenuItem key={key} value={i} primaryText={i}/>
                  })
}
                </SelectField>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Col>
                <Col>
                <SelectField value={this.state.destination} onChange={this.handleChangeDestination} floatingLabelText="Destination">
                  {places.map(function(i, key) {
                    return <MenuItem key={key} value={i} primaryText={i}/>
                  })
}
                </SelectField>

                </Col>
              </Row><br/>
              <Row>
                <Col >
                  <TimePicker hintText="Departs" value={this.state.departs} onChange={this.ChangeDepartTime}/>
                </Col>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Col >
                  <TimePicker hintText="Arrives" value={this.state.arrives} onChange={this.ChangeArrivalTime}/>
                  <br/>
                </Col>
              </Row>
              <Row>
                <Col>
                  {< h3 > REFUNDABLE < /h3>}
                  <RadioButtonGroup name="Refundable" label="Refundable" onChange={this.handleRefundChange} valueSelected={this.state.refundable}>
                    <RadioButton value="Yes" label="Yes"/>
                    <RadioButton value="No" label="No"/>
                  </RadioButtonGroup>
                </Col>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Col>
                  {< h3 > TOTAL CAPACITY < /h3>}
                  <RadioButtonGroup name="capacity" label="capacity" onChange={this.handleCapacityChange} valueSelected={''+this.state.capacity}>
                    <RadioButton value="40" label="40"/>
                    <RadioButton value="65" label="65"/>
                    <RadioButton value="125" label="125"/>
                  </RadioButtonGroup>
                </Col>
              </Row>
              <br/>
              <br/>
              <br/>
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <Row>
                <Col>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  {!this.props.EditBookFlight && <RaisedButton label="ADD FLIGHT" onClick={this.OnAddFlight} backgroundColor="#a4c639"/>
                  }
                  {
                    this.props.EditBookFlight && <RaisedButton label="SAVE CHANGES" onClick={this.OnEditFlight} backgroundColor="#a4c639"/>
                  }
                </Col>
                &nbsp; &nbsp; &nbsp;

                <Col>
                { !this.props.EditBookFlight && <RaisedButton label="CANCEL" secondary={true} onClick={this.OnCancelling}/>}
                </Col>
              </Row>
            </Grid>
          </CardText>
        </Card>
      }
        {
          this.state.redirect && <FlightListHome username = {this.props.username} />
        }
        {
          this.state.open && <Snackbar open={this.state.open} message="Flight Added successfully" autoHideDuration={2000}/> && <Redirect to = "/flighthome"/>
        }
      </div>

    );
  }
}
