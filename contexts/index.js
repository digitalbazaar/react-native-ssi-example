import * as credentialsV1 from './credentials-v1.js';
import * as credentialsExamplesV1 from './credentials-examples-v1.js';
import * as ed255192020V1 from './suites-ed25519-2020-v1.js';
import * as nsOrdrl from './ns-ordrl.js';

const contextDescriptions = [
  credentialsV1,
  credentialsExamplesV1,
  ed255192020V1,
  nsOrdrl,
];
const contextMap = new Map();

for (const contextDescription of contextDescriptions) {
  contextMap.set(contextDescription.url, contextDescription.context);
}

export const CONTEXT_MAP = contextMap;
