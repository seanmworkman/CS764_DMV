/**
 * @fileoverview This file contains the Online Services page implementation.
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
    VRR,
    AC,
    DLR,
    STV
} from '../graphql/queries.js';

let client;

client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});

console.log(client)


 class OnlineServices extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        alertMessage: "",
        showAlertMessage: false,

        // Vehicle Registration Renewal
        vrrDlSsn: '',
        vrrDob: '',
        vrrTitleNum: '',
        vrrVin: '',

        // Address Change
        acDlSsn: '',
        acDob: '',
        acNewAddy: '',

        // Drivers License Renewal
        dlrDlSsn: '',
        dlrDob: '',

        // Sold/Traded Vehicle
        stvDlSsn: '',
        stvDob: '',
        stvTitleNum: '',
        stvVin: '',
        stvSt: ''
      };
    }  
  
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  
    /**
     * Sets the success alert message and the show state.
     */
    setAlertMessage = (message) => {
      this.setState({
        alertMessage: message,
        showAlertMessage: true
      });
    }
  
    /**
     * Displays the danger alert. This method is called in render.
     */
    showAlertMessage = () => {
      if (this.showAlertMessage) {
        return (
          <Alert variant="danger" onClose={() => this.setState({ showAlertMessage: false })} dismissible>
            <h4>{this.state.alertMessage}</h4>
          </Alert>
        );
      }
    }
  
    clickedElementIsButton = (element) => {
      return typeof element.target.className === 'string' && element.target.className.includes("btn");
    }
  
    closeAlertMessage = (e) => {
      if ((this.state.showAlertMessage === true)
        && !this.clickedElementIsButton(e)) {
        this.setState({ showAlertMessage: false });
      }
    }

    cancel = (section) => {
        switch (section) {
            case 1:
                this.setState({
                    vrrDlSsn: '',
                    vrrDob: '',
                    vrrTitleNum: '',
                    vrrVin: ''
                });
                break;
            case 2:
                this.setState({
                    acDlSsn: '',
                    acDob: '',
                    acNewAddy: ''
                });
                break;
            case 3:
                this.setState({
                    dlrDlSsn: '',
                    dlrDob: ''
                });
                break;
            case 4:
                this.setState({
                    stvDlSsn: '',
                    stvDob: '',
                    stvTitleNum: '',
                    stvVin: '',
                    stvSt: ''
                });
                break;
            default:
                this.setState({
                    // Vehicle Registration Renewal
                    vrrDlSsn: '',
                    vrrDob: '',
                    vrrTitleNum: '',
                    vrrVin: '',

                    // Address Change
                    acDlSsn: '',
                    acDob: '',
                    acNewAddy: '',

                    // Drivers License Renewal
                    dlrDlSsn: '',
                    dlrDob: '',

                    // Sold/Traded Vehicle
                    stvDlSsn: '',
                    stvDob: '',
                    stvTitleNum: '',
                    stvVin: '',
                    stvSt: ''
                });
        }
    }

    runMutation = async (queryType, data) => {
      console.log('data:', data)
      console.log('queryType:', queryType)
        try {
          let res = await client.mutate({
            mutation: queryType,
            variables: data
          });
          console.log('result:', res)
          this.setAlertMessage("SUCCESS");
          this.cancel(0);
        } catch (err) {
          console.log(err)
          console.log('error:', JSON.stringify(err, null, 2));
        }
    }

    submit = async (section) => {
        let data = {};
        console.log('submit:', section)
        switch (section) {
            case 1:
                data = {
                  vrrData: {
                    dl_ssn: this.state.vrrDlSsn,
                    dob: this.state.vrrDob,
                    title_num: this.state.vrrTitleNum,
                    vin: this.state.vrrVin
                }};
                this.runMutation(VRR, data);
                break;
            case 2:
                data = {
                  acData: {
                    dl_ssn: this.state.acDlSsn,
                    dob: this.state.acDob,
                    new_address: this.state.acNewAddy
                }};
                this.runMutation(AC, data);
                break;
            case 3:
                data = {
                  dlr_riData: {
                    dl_ssn: this.state.dlrDlSsn,
                    dob: this.state.dlrDob
                }};
                this.runMutation(DLR, data);
                break;
            case 4:
                data = {
                  stvData: {
                    dl_ssn: this.state.stvDlSsn,
                    dob: this.state.stvDob,
                    title_num: this.state.stvTitleNum,
                    vin: this.state.stvVin,
                    sold_traded: this.state.stvSt
                }};
                this.runMutation(STV, data);
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
            
            
            <div id="container">
            <NavBar />
                {/* <div id="title">
                  <div style={{ padding: "5px" }}>
                  <div id="inner-message">
                        {this.state.showAlertMessage ? this.showAlertMessage() : null}
                      </div>
                  </div>
                </div> */}
                <div className='title'>
                    <h2>ONLINE SERVICES</h2>
                </div>
                <div className='section1'>
                    <b>Vehicle Registration Renewal:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.vrrDlSsn} onChange={(e) => this.setState({ vrrDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.vrrDob} onChange={(e) => this.setState({ vrrDob: e.target.value })} />
                    <Label>Title Number:</Label>
                    <Input value={this.state.vrrTitleNum} onChange={(e) => this.setState({ vrrTitleNum: e.target.value })} />
                    <Label>Last 4 Digits of VIN:</Label>
                    <Input value={this.state.vrrVin} onChange={(e) => this.setState({ vrrVin: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(1)}>Submit</Button>{' '}<Button onClick={() => this.cancel(1)}>Cancel</Button>
                </div>

                <div className='section1'>
                    <b>Address Change:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.acDlSsn} onChange={(e) => this.setState({ acDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.acDob} onChange={(e) => this.setState({ acDob: e.target.value })} />
                    <Label>New Address:</Label>
                    <Input value={this.state.acNewAddy} onChange={(e) => this.setState({ acNewAddy: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(2)}>Submit</Button>{' '}<Button onClick={() => this.cancel(2)}>Cancel</Button>
                </div>

                <div className='section1'>
                    <b>Driver's License Renewal:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.dlrDlSsn} onChange={(e) => this.setState({ dlrDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.dlrDob} onChange={(e) => this.setState({ dlrDob: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(3)}>Submit</Button>{' '}<Button onClick={() => this.cancel(3)}>Cancel</Button>
                </div>

                <div className='section1'>
                    <b>Sold/Traded Vehicle:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.stvDlSsn} onChange={(e) => this.setState({ stvDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.stvDob} onChange={(e) => this.setState({ stvDob: e.target.value })} />
                    <Label>Title Number:</Label>
                    <Input value={this.state.stvTitleNum} onChange={(e) => this.setState({ stvTitleNum: e.target.value })} />
                    <Label>Last 4 Digits of VIN:</Label>
                    <Input value={this.state.stvVin} onChange={(e) => this.setState({ stvVin: e.target.value })} />
                    <Label>Sold/Traded:</Label>
                    <Input value={this.state.stvSt} onChange={(e) => this.setState({ stvSt: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(4)}>Submit</Button>{' '}<Button onClick={() => this.cancel(4)}>Cancel</Button>
                </div>
                <br />
                <br />

            </div>
          
        </div>
      );
    }
  }
  
  export default OnlineServices;
