# CS764_DMV

## Overview
This application is an implementation of several online DMV services. 

It uses ReactJS, GraphQL, NodeJS, and an Etherium Blockchain with smart contracts.

The user enters the proper data for the specified fields and that data is then stored properly on a local test network of the Etherium Blockchain.

## To Run
In `CS764_DMV/Blockchain` run: `docker build -t masters/addtochain:latest .` (if first run) then `docker run -p 5000:5000 masters/addtochain:latest`.
In `CS764_DMV/graphql-sa-server` run: `npm i` (if first run) then `npm start`.
In `CS764_DMV/graphql-sa-frontend` run: `npm i` (if first run) then `npm start`.