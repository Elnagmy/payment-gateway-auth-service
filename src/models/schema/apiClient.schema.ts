import { Schema, model, connect } from 'mongoose';

interface ApiClent {
  apiClientId: string;
  owner: string;
  email: string;
  password: string;
  token: { type: String }
}


const schema = new Schema<ApiClent>({
  apiClientId: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  token: { type: String }
});

const ApiClentModel = model<ApiClent>('ApiClent', schema);

export default ApiClentModel