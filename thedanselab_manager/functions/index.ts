/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface CreateStudentData {
  email: string;
  password: string;
  name: string;
  firstName: string;
}

export const createStudent = functions.https.onCall(async (data: CreateStudentData, context: functions.https.CallableContext) => {
  const { email, password, name, firstName } = data;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${name}`,
    });

    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name: name,
      firstName: firstName,
      email: email,
      status: 'eleve',
    });

    return { email: userRecord.email };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', error.message, error);
  }
});
