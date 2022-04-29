/**
 * @fileoverview This file contains the Driver Services page implementation.
 */ 

 import Alert from 'react-bootstrap/Alert';
 import React, { Component, Fragment } from 'react';
 import { Image } from 'react-native';
 import {
   Button,
   Label,
   Input,
   Modal, ModalBody,
   Table,
   Form, FormGroup
 } from 'reactstrap';

import NavBar from '../components/NavBar.js';

import ApolloClient from "apollo-boost";

import '../components/Style/landing.css';

import {
  RI,
  OVD
} from '../graphql/queries.js';

let client;

client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});

let dpeQuestions = {
  'Which of the following types of signs inform you of possible hazards ahead?': [
    'Warning signs',
    'Guide signs',
    'Regulatory signs',
    'Informational signs'
  ],
  'If your vehicle stalls on railroad tracks when a train is approaching, what should you do?': [
    'Ask other drivers to help move your vehicle',
    'Get everyone out of your vehicle',
    'Try to signal the approaching train',
    'Try to restart your vehicle'
  ],
  'When you park next to a curb, you may not park more than ________ from the curb.': [
    'two feet',
    'four feet',
    'one foot',
    'three foot'
  ],
  'Never follow an emergency vehicle closer than ________ when its lights are flashing.': [
    '300 feet',
    '500 feet',
    '100 feet',
    '1000 feet'
  ],
  'For safe driving, the Virginia Driver\'s Manual recommends that you keep your hands at': [
    'the 8 o\'clock and 4 o\'clock positions',
    'the 10 o\'clock and 2 o\'clock positions',
    'the 10 o\'clock and 3 o\'clock positions',
    'the 9 o\'clock and 2 o\'clock positions',
  ],
  'In Virginia, you may make a left turn at a red light if you are turning': [
    'from a one-way street onto a two-way street',
    'from a one-way street onto another one-way street',
    'from a two-way street onto another two-way street',
    'from a two-way street onto a one-way street'
  ],
  'If two vehicles arrive at an uncontrolled intersection (i.e., one without signs or signals) from different roadways at about the same time, the vehicle _________ has the right-of-way.': [
    'on the left',
    'that weighs less than',
    'on the right',
    'that signals first'
  ]
}

let mpeQuestions = {
  'As you are riding, an object appears suddenly in your path. What should you do?': [
    'Swerve into the left lane',
    'Brake abruptly while swerving',
    'Swerve onto the shoulder of the road'
  ],
  'To discourage other vehicles from sharing your lane, you should ride in the ________ lane position.': [
    'right',
    'center',
    'right to center',
    'left'
  ],
  'The best protection against flying objects while you\'re riding is': [
    'goggles',
    'sunglasses',
    'headlights',
    'a face shield'
  ],
  'When should you adjust your side mirrors?': [
    'Before you start to ride',
    'At the first stop after you\'ve started to ride',
    'At any time',
    'While you are riding'
  ],
  'In Virginia, a passenger is': [
    'not required to wear a helmet',
    'required to wear a helmet only if he or she is under 21',
    'required to take a riding course',
    'required to wear a helmet'
  ],
  'The best way to prevent fatigue while riding a motorcycle is to': [
    'take frequent rest brakes',
    'ride only during the day',
    'drink lots of fluids',
    'avoid wearing goggles or a face shield'
  ],
  'What should you do to avoid colliding with a vehicle cutting in?': [
    'Brake abruptly while swerving',
    'Grab at the front brake',
    'Swerve into the left lane'
  ],
  'When looking where you want to turn, you should': [
    'reduce your speed before the turn',
    'turn your head, not your shoulders, in the direction of the intended turn',
    'keep your eyes level with the horizon',
    'do all of the above'
  ],
  'All of the following are part of the upshifting process EXCEPT': [
    ' easing out the clutch and adjusting the throttle',
    'gently applying the front brake while adjusting the throttle',
    'rolling off the throttle as you squeeze the clutch',
    'lifting the shift lever as far as it will go'
  ],
  'You are approaching a turn and need to shift gears. When should you shift gears?': [
    'Before the turn',
    'After the turn',
    'At any time',
    'During the turn'
  ]
};


 class DriverServices extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        alertMessage: "",
        showDangerAlert: false,

        // Real ID
        riDlSsn: '',
        riDob: '',

        // Obtaining a Vital Document
        ovdDlSsn: '',
        ovdDob: '',
        ovdDn: '',

        document: '',

        dpeOpen: false,
        mpeOpen: false
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

    toggleDPEOpen = () => {
      this.setState({
        dpeOpen: !this.state.dpeOpen
      });
    }

    toggleMPEOpen = () => {
      this.setState({
        mpeOpen: !this.state.mpeOpen
      });
    }

    cancel = (section) => {
        switch (section) {
            case 1:
                this.setState({
                    riDlSsn: '',
                    riDob: '',
                });
                break;
            case 2:
                this.setState({
                    ovdDlSsn: '',
                    ovdDob: '',
                    ovdDn: ''
                });
                break;
            default:
                this.setState({
                    // Real ID
                    riDlSsn: '',
                    riDob: '',
                    
                    // Obtaining a Vital Document
                    ovdDlSsn: '',
                    ovdDob: '',
                    ovdDn: ''
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

    runQuery = async (queryType, data) => {
        try {
          let res = await client.query({
            query: queryType,
            variables: data,
            fetchPolicy: 'network-only'
          });
          this.setState({
            document: res.data.ovd
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
                  dlr_riData: {
                    dl_ssn: this.state.riDlSsn,
                    dob: this.state.riDob
                }};
                this.runMutation(RI, data);
                break;
            case 2:
                data = {
                  ovdData: {
                    dl_ssn: this.state.ovdDlSsn,
                    dob: this.state.ovdDob,
                    doc_name: this.state.ovdDn
                }};
                this.runQuery(OVD, data);
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
                    <h2>DRIVER/ID SERVICES</h2>
                </div>
                <div className='section1'>
                    <b>Practice Exams:</b>
                    <br />
                    <Button color='primary' onClick={() => this.toggleDPEOpen()}>Driver Practice Exam</Button>{' '}<Button color='primary'  onClick={() => this.toggleMPEOpen()}>Motorcycle Practice Exam</Button>
                </div>

                <div className='section1'>
                    <b>Real ID:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.riDlSsn} onChange={(e) => this.setState({ riDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.riDob} onChange={(e) => this.setState({ riDob: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(1)}>Submit</Button>{' '}<Button onClick={() => this.cancel(1)}>Cancel</Button>
                </div>

                <div className='section1'>
                    <b>Obtaining a Vital Document:</b>
                    <br />
                    <Label>DL Number or SSN:</Label>
                    <Input value={this.state.ovdDlSsn} onChange={(e) => this.setState({ ovdDlSsn: e.target.value })} />
                    <Label>DOB:</Label>
                    <Input value={this.state.ovdDob} onChange={(e) => this.setState({ ovdDob: e.target.value })} />
                    <Label>Sold/Traded:</Label>
                    <Input value={this.state.ovdDn} onChange={(e) => this.setState({ ovdDn: e.target.value })} />
                    <br />
                    <Button color='primary' onClick={() => this.submit(2)}>Submit</Button>{' '}<Button onClick={() => this.cancel(2)}>Cancel</Button>
                </div>

            </div>

            <Modal isOpen={this.state.dpeOpen} toggle={this.toggleDPEOpen} scrollable={true} size='lg'>
                <ModalBody>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th scope="row" style={{ textAlign: 'center' }}>Driver's License Practice Exam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>
                                {Object.keys(dpeQuestions).map((key1) => {
                                  return (
                                    <Form>
                                      <br />
                                      <legend>{key1}</legend>
                                      {Object.keys(dpeQuestions[key1]).map((key2) => {
                                        return (
                                          <FormGroup check>
                                            <Label check>
                                              <Input type="radio" name="radio1" />{' '}
                                              {dpeQuestions[key1][key2]}
                                            </Label>
                                          </FormGroup>
                                        )
                                      })}
                                    </Form>
                                  )
                                })}
                              </td>
                            </tr>
                            <tr>
                              <td><Button color='primary' onClick={() => this.toggleDPEOpen()}>Submit</Button>{' '}<Button onClick={() => this.toggleDPEOpen()}>Cancel</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>

            <Modal isOpen={this.state.mpeOpen} toggle={this.toggleMPEOpen} scrollable={true} size='lg'>
                <ModalBody>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th scope="row" style={{ textAlign: 'center' }}>Motorcycle License Practice Exam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>
                                {Object.keys(mpeQuestions).map((key1) => {
                                  return (
                                    <Form>
                                      <br />
                                      <legend>{key1}</legend>
                                      {Object.keys(mpeQuestions[key1]).map((key2) => {
                                        return (
                                          <FormGroup check>
                                            <Label check>
                                              <Input type="radio" name="radio1" />{' '}
                                              {mpeQuestions[key1][key2]}
                                            </Label>
                                          </FormGroup>
                                        )
                                      })}
                                    </Form>
                                  )
                                })}
                              </td>
                            </tr>
                            <tr>
                              <td><Button color='primary' onClick={() => this.toggleMPEOpen()}>Submit</Button>{' '}<Button onClick={() => this.toggleMPEOpen()}>Cancel</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
          
        </div>
      );
    }
  }
  
  export default DriverServices;
