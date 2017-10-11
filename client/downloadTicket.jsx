import React from 'react';
import jsPDF from 'jspdf';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Request from 'superagent';

let zip;

export default class downloadTicket extends React.Component{
        constructor(props)
        super(props);
  this.state = {
         bookedflight : {}
  }
  this.downloadTicket = this.downloadTicket.bind(this);
}
componentWillMount() {
		this.setState({
			bookedflight: this.props.bookedflight
		})
	}

  downloadticket(){
    let doc = new jsPDF()
     doc.save('E-ticket ' + '.pdf')
  }
  createTicket(){
         let x = 5;
         let y = 5;

         doc.setFontSize(10);

         doc.setLineWidth(0.10);
         doc.rect(x, y, 200, 6, 'S');
         doc.setFontStyle('bold');
         doc.text(x+100, y+4, 'E-TICKET', 'center');

         doc.text(x,y+=10,'Hi '+this.props.bookedflight.username);
         doc.text(x,y+=10,'FlightName :' +this.props.bookedflight.flightname);
         doc.text(x,y+=10,'FromTo : '+this.props.bookedflight.source +''+this.props.bookedflight.destination);
         doc.text(x,y+=10,'On :' +this.props.bookedflight.departs);
         doc.text(x,y+=10,'seats :' +this.props.bookedflight.seats);
         doc.text(x,y+=10,'Total Price :' +(this.props.bookedflight.seats)*(this.props.bookedflight.price));
         doc.save('E-ticket' + '.pdf')

  }
render(){
   return(
     <h4 onClick = {this.downloadticket} style = {{cursor: 'pointer'}}>
       <DownloadIcon/>
       &nbsp; DownloadTicket
     </h4>
   )
}
}
