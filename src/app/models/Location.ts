/* {
  _id: { $oid: '5ebb5b83bb68c1719951f321' },
  id: 169,
  lat: -10.9112,
  lng: -37.0621,
  estabelecimento: 'US OSWALDO DE SOUZA',
  logradouro: 'TV ADALTO BOTELHO',
  bairro: 'GETULIO VARGAS',
  cidade: 'ARACAJU',
  telefone: '(79) 31791326',
  particular: false,
  locations: { type: 'Point', coordinates: [-10.9112, -37.0621] },
}
 */

import { Schema, model, Document } from 'mongoose'

interface PointType {
  type: string;
  coordinates: number[];
}

export interface LocationModel {
  id: number;
  lat: number;
  lng: number;
  estabelecimento: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  telefone: string;
  particular: boolean;
  locations: PointType;
}

export type LocationDocument = LocationModel & Document

const schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  estabelecimento: String,
  logradouro: String,
  bairro: String,
  cidade: String,
  telefone: String,
  particular: Boolean,
  locations: Object,
})

export default model<LocationDocument>('Location', schema)
