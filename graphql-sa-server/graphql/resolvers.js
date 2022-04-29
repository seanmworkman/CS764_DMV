// Imported loaders 
const { 
  runSearchAndAnalysis,
  vrr,
  ac,
  dlr,
  stv,
  ri,
  ovd,
  sdv,
  tv
} = require('./loaders');

// All resolvers used for queries/mutations 
const resolvers = {
  
  Query: {
    runSearchAndAnalysis,
    ovd
  },

  Mutation: {
    vrr,
    ac,
    dlr,
    stv,
    ri,
    sdv,
    tv
  }
  
};

module.exports.resolvers = resolvers;