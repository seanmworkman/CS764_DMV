/**
 * @fileoverview This file contains the Vehicle Services page implementation.
 */ 

 import Alert from 'react-bootstrap/Alert';
 import React, { Component } from 'react';
 import { Image } from 'react-native';
 import {
   Button,
   Label,
   Input
 } from 'reactstrap';

import NavBar from '../components/NavBar.js';

import ApolloClient from "apollo-boost";

import '../components/Style/landing.css';

import {
    SDV,
    TV
} from '../graphql/queries.js';

let client;

client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});


 class VehicleServices extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        alertMessage: "",
        showDangerAlert: false,

        // Selling/Donating Vehicle
        sdvDlSsn: '',
        sdvDob: '',
        sdvTitleNum: '',
        sdvVin: '',
        sdvSd: '',

        // Titling a Vehicle
        tvDlSsn: '',
        tvDob: '',
        tvMake: '',
        tvModel: '',
        tvYear: '',
        tvVin: ''
      };
    }  
  
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  
    /**
     * Sets the success alert message and the show state.
     */
    setDangerAlert = (message) => {
      this.setState({
        alertMessage: message,
        showDangerAlert: true
      });
    }
  
    /**
     * Displays the danger alert. This method is called in render.
     */
    showDangerAlert = () => {
      if (this.showDangerAlert) {
        return (
          <Alert variant="danger" onClose={() => this.setState({ showDangerAlert: false })} dismissible>
            <h4>{this.state.alertMessage}</h4>
          </Alert>
        );
      }
    }
  
    clickedElementIsButton = (element) => {
      return typeof element.target.className === 'string' && element.target.className.includes("btn");
    }
  
    closeAlertMessage = (e) => {
      if ((this.state.showDangerAlert === true)
        && !this.clickedElementIsButton(e)) {
        this.setState({ showDangerAlert: false });
      }
    }

    cancel = (section) => {
        switch (section) {
            case 1:
                this.setState({
                    sdvDlSsn: '',
                    sdvDob: '',
                    sdvTitleNum: '',
                    sdvVin: '',
                    sdvSd: ''
                });
                break;
            case 2:
                this.setState({
                    tvDlSsn: '',
                    tvDob: '',
                    tvMake: '',
                    tvModel: '',
                    tvYear: '',
                    tvVin: ''
                });
                break;
            default:
                this.setState({
                    // Selling/Donating Vehicle
                    sdvDlSsn: '',
                    sdvDob: '',
                    sdvTitleNum: '',
                    sdvVin: '',
                    sdvSd: '',
                    
                    // Titling a Vehicle
                    tvDlSsn: '',
                    tvDob: '',
                    tvMake: '',
                    tvModel: '',
                    tvYear: '',
                    tvVin: ''
                });
        }
    }

    runMutation = async (queryType, data) => {
        try {
          let res = await client.mutate({
            mutation: queryType,
            variables: data
          });
          console.log('result:', res.data)
          this.cancel(0);
        } catch (err) {
          console.log(JSON.stringify(err, null, 2));
        }
    }

    submit = (section) => {
        let data = {};
        switch (section) {
            case 1:
                data = {
                  sdvData: {
                    dl_ssn: this.state.sdvDlSsn,
                    dob: this.state.sdvDob,
                    title_num: this.state.sdvTitleNum,
                    vin: this.state.sdvVin,
                    selling_donating: this.state.sdvSd
                }};
                this.runMutation(SDV, data);
                break;
            case 2:
                data = {
                  tvData: {
                    dl_ssn: this.state.tvDlSsn,
                    dob: this.state.tvDob,
                    make: this.state.tvMake,
                    model: this.state.tvModel,
                    year: this.state.tvYear,
                    vin: this.state.tvVin
                }};
                this.runMutation(TV, data);
                break;
            default:
                console.log('ERROR: DEFAULT')
                return 'NONE'
        }
    }
  
    render() {
      return (
        <div style={{ 
          // backgroundColor: '#F2F2F2' 
          }} onClick={(e) => this.closeAlertMessage(e)}>
            {/* <div id="message">
              <div style={{ padding: "5px" }}>
              <div id="inner-message">
                    {this.state.showAlertMessage ? this.showAlertMessage() : null}
                  </div>
                <div id="inner-message">
                  {this.state.showDangerAlert ? this.showDangerAlert() : null}
                  {this.state.showSuccessAlert ? this.showSuccessAlert() : null}
                </div>
              </div>
            </div> */}
            
            <div id="container">
            <NavBar />
                <div className='title'>
                    <h2>VEHICLE SERVICES</h2>
                </div>
                <div className='section1'>
                    <b>Selling/Donating Vehicle:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.sdvDlSsn} onChange={(e) => this.setState({ sdvDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.sdvDob} onChange={(e) => this.setState({ sdvDob: e.target.value })} />
                    <Label>Title Number:</Label>
                    <Input value={this.state.sdvTitleNum} onChange={(e) => this.setState({ sdvTitleNum: e.target.value })} />
                    <Label>Last 4 Digits of VIN:</Label>
                    <Input value={this.state.sdvVin} onChange={(e) => this.setState({ sdvVin: e.target.value })} />
                    <Label>Selling/Donating:</Label>
                    <Input value={this.state.sdvSd} onChange={(e) => this.setState({ sdvSd: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(1)}>Submit</Button>{' '}<Button onClick={() => this.cancel(1)}>Cancel</Button>
                </div>

                <div className='section1'>
                    <b>Titling a Vehicle:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.tvDlSsn} onChange={(e) => this.setState({ tvDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.tvDob} onChange={(e) => this.setState({ tvDob: e.target.value })} />
                    <Label>Vehicle Make:</Label>
                    <Input value={this.state.tvMake} onChange={(e) => this.setState({ tvMake: e.target.value })} />
                    <Label>Vehicle Model:</Label>
                    <Input value={this.state.tvModel} onChange={(e) => this.setState({ tvModel: e.target.value })} />
                    <Label>Vehicle Year:</Label>
                    <Input value={this.state.tvYear} onChange={(e) => this.setState({ tvYear: e.target.value })} />
                    <Label>Last 4 Digits of VIN:</Label>
                    <Input value={this.state.tvVin} onChange={(e) => this.setState({ tvVin: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(2)}>Submit</Button>{' '}<Button onClick={() => this.cancel(2)}>Cancel</Button>
                </div>

            </div>
          
        </div>
      );
    }
  }
  
  export default VehicleServices;
