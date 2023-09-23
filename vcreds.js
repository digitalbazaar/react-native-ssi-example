import * as vc from '@digitalbazaar/vc';
import {config} from './config.js';
import {documentLoader} from './documentLoader.js';
import {klona} from 'klona/json';

const vcredsConfig = config.vcreds;

export async function issue({credential, signatureSuite}) {
  credential = klona(credential);

  if (typeof credential.issuer === 'string') {
    credential.issuer = {
      id: signatureSuite.key.controller,
    };
  } else {
    credential.issuer = {
      ...credential.issuer,
      id: signatureSuite.key.controller,
    };
  }

  if (!vcredsConfig.showIssuerImage) {
    credential.issuer.image = '';
  }

  if (!vcredsConfig.showCredentialSubjectImage) {
    credential.credentialSubject.image = '';
  }
  return vc.issue({credential, suite: signatureSuite, documentLoader});
}

export const createPresentation = vc.createPresentation;

export async function signPresentation(options) {
  return vc.signPresentation({
    ...options,
    suite: options.signatureSuite,
    documentLoader,
  });
}

export async function verifyCredential({signedCredential, verificationSuite}) {
  return vc.verifyCredential({
    credential: signedCredential,
    suite: verificationSuite,
    documentLoader,
  });
}

export async function verify({
  presentation,
  verificationSuite,
  challenge,
  domain,
}) {
  return vc.verify({
    presentation,
    suite: verificationSuite,
    challenge,
    domain,
    documentLoader,
  });
}
