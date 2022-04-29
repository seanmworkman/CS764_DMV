const { gql } = require('apollo-server-express');

// // The GraphQL schema
const typeDefs = gql`

  input vrrData {
    dl_ssn: String
    dob: String
    title_num: String
    vin: String
  }

  input acData {
    dl_ssn: String
    dob: String
    new_address: String
  }

  input dlr_riData {
    dl_ssn: String
    dob: String
  }

  input stvData {
    dl_ssn: String
    dob: String
    title_num: String
    vin: String
    sold_traded: String
  }

  input sdvData {
    dl_ssn: String
    dob: String
    title_num: String
    vin: String
    selling_donating: String
  }

  input ovdData {
    dl_ssn: String
    dob: String
    doc_name: String
  }

  input tvData {
    dl_ssn: String
    dob: String
    make: String
    model: String
    year: String
    vin: String
  }

  type Query {
    runSearchAndAnalysis(searchTerm: String, method: String): String
    ovd(ovdData: ovdData): String
  }

  type Mutation {
    vrr(vrrData: vrrData): String
    ac(acData: acData): String
    dlr(dlr_riData: dlr_riData): String
    stv(stvData: stvData): String
    ri(dlr_riData: dlr_riData): String
    sdv(sdvData: sdvData): String
    tv(tvData: tvData): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports.typeDefs = typeDefs;