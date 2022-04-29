import { gql } from "apollo-boost";

export const SEARCH = 
  gql`query runSearchAndAnalysis($searchTerm: String, $method: String) {
      runSearchAndAnalysis(searchTerm: $searchTerm, method: $method) 
  }`

export const OVD = 
  gql`query ovd($ovdData: ovdData) {
      ovd(ovdData: $ovdData) 
  }`

export const VRR = 
  gql`mutation vrr($vrrData: vrrData) {
      vrr(vrrData: $vrrData) 
  }`

export const AC = 
  gql`mutation ac($acData: acData) {
      ac(acData: $acData) 
  }`

export const DLR = 
  gql`mutation dlr($dlr_riData: dlr_riData) {
      dlr(dlr_riData: $dlr_riData) 
  }`

export const STV = 
  gql`mutation stv($stvData: stvData) {
      stv(stvData: $stvData) 
  }`

export const RI = 
  gql`mutation ri($dlr_riData: dlr_riData) {
      ri(dlr_riData: $dlr_riData) 
  }`

export const SDV = 
  gql`mutation sdv($sdvData: sdvData) {
      sdv(sdvData: $sdvData) 
  }`

export const TV = 
  gql`mutation tv($tvData: tvData) {
      tv(tvData: $tvData) 
  }`