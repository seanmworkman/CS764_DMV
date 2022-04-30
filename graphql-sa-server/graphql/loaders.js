const _ = require("lodash");

const axios = require('axios');


const userFriendlyUnexpectedError = () => {
  return new Error("An unexpected error occurred");
}

const logError = (err) => {
  var stack = new Error().stack,
      caller = stack.split('\n')[2].trim();
  console.log("Error in " + caller + ":", err);
}

/**
 * Runs the sentiment analysis based on the search term
 * @param {*} root 
 * @param {*} param1 
 */
const runSearchAndAnalysis = async (root, { searchTerm, method }) => {
  let term = searchTerm.replace(" ", "+");
  console.log(term, method)
  let url = `http://127.0.0.1:5000/sentAnalysis?method=${method}&searchTerm=${term}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Vehicle Registration Renewal
 * @param {*} root 
 * @param {*} param1 
 */
 const vrr = async (root, { vrrData }) => {
  console.log(vrrData)
  let identifier = vrrData['dl_ssn'] + vrrData['dob']

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let expirationDate = new Date(year + 3, month, day);

  data = {
    title_num: vrrData['title_num'],
    vin: vrrData['vin'],
    expiration_date: expirationDate,
    section: 'VehicleRegistrationRenewal'
  }
  console.log(data)
  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Address Change
 * @param {*} root 
 * @param {*} param1 
 */
 const ac = async (root, { acData }) => {
  let identifier = acData['dl_ssn'] + acData['dob']

  let d = new Date();

  data = {
    new_address: data['new_address'],
    date_changed: d,
    section: 'AddressChange'
  }

  console.log(data)

  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Driver's License Renewal
 * @param {*} root 
 * @param {*} param1 
 */
 const dlr = async (root, { dlr_riData }) => {
  let identifier = dlr_riData['dl_ssn'] + dlr_riData['dob']

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let expirationDate = new Date(year + 3, month, day);

  data = {
    renewal_date: d,
    expiration_date: expirationDate,
    section: 'DriversLicenseRenewal'
  }

  console.log(data)

  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Sold/Traded Vehicle
 * @param {*} root 
 * @param {*} param1 
 */
 const stv = async (root, { stvData }) => {
  let identifier = stvData['dl_ssn'] + stvData['dob']
  data = {
    title_num: stvData['title_num'],
    vin: stvData['vin'],
    sold_traded: stvData['sold_traded'],
    section: 'SoldTradedVehicle'
  }

  console.log(data)

  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Real ID
 * @param {*} root 
 * @param {*} param1 
 */
 const ri = async (root, { dlr_riData }) => {
  let identifier = dlr_riData['dl_ssn'] + dlr_riData['dob']

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let expirationDate = new Date(year + 3, month, day);

  data = {
    expiration_date: expirationDate,
    section: 'RealID'
  }

  console.log(data)

  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Obtaining a Vital Document
 * @param {*} root 
 * @param {*} param1 
 */
 const ovd = async (root, { ovdData }) => {
  let identifier = ovdData['dl_ssn'] + ovdData['dob']
  let stringifiedData = JSON.stringify(ovdData).replace(" ", "+");
  console.log(stringifiedData)
  let form = 'ovd';
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Selling/Donating Vehicle
 * @param {*} root 
 * @param {*} param1 
 */
 const sdv = async (root, { sdvData }) => {
  let identifier = sdvData['dl_ssn'] + sdvData['dob']
  data = {
    title_num: sdvData['title_num'],
    vin: sdvData['vin'],
    selling_donating: sdvData['selling_donating'],
    section: 'SellingDonatingVehicle'
  }

  console.log(data)
  
  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}

/**
 * Titling a Vehicle
 * @param {*} root 
 * @param {*} param1 
 */
 const tv = async (root, { tvData }) => {
  let identifier = tvData['dl_ssn'] + tvData['dob']
  data = {
    make: tvData['make'],
    model: tvData['model'],
    year: tvData['year'],
    vin: tvData['vin'],
    section: 'TitlingVehicle'
  }

  console.log(data)
  
  let stringifiedData = JSON.stringify(data).replace(" ", "+");
  
  let url = `http://127.0.0.1:5000/addToChain?identifier=${identifier}&data=${stringifiedData}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err.response.body);
    logError(err);
    throw userFriendlyUnexpectedError();
  }
}



module.exports.runSearchAndAnalysis = runSearchAndAnalysis;
module.exports.vrr = vrr;
module.exports.ac = ac;
module.exports.dlr = dlr;
module.exports.stv = stv;
module.exports.ri = ri;
module.exports.ovd = ovd;
module.exports.sdv = sdv;
module.exports.tv = tv;