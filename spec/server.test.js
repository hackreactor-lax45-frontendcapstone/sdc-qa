/* eslint-disable no-undef */
const axios = require('axios');

const URL = 'http://13.57.37.87:3000';
const QUESTIONS = `${URL}/qa/questions`;

describe('GET questions from single product', () => {
  const PRODUCT_ID = 56600;
  const QUESTION_ID = 199192;
  const STATUS = 200; // OK
  const FLIGHT_TIME = 100; // ms

  test(`status code ${STATUS}`, (done) => {
    axios.get(QUESTIONS, { params: { product_id: PRODUCT_ID } })
      .then((response) => {
        expect(response.status).toEqual(STATUS);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test(`response time less than ${FLIGHT_TIME}ms`, (done) => {
    const START = Date.now();
    axios.get(QUESTIONS, { params: { product_id: PRODUCT_ID } })
      .then(() => {
        expect(Date.now() - START).toBeLessThan(FLIGHT_TIME);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test('correct data', (done) => {
    axios.get(QUESTIONS, { params: { product_id: PRODUCT_ID } })
      .then((response) => {
        expect(response.data.product_id).toEqual(PRODUCT_ID.toString());
        expect(response.data.results[0].question_id).toEqual(QUESTION_ID);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });
});

describe('GET answers from single question', () => {
  const PRODUCT_ID = 56600;
  const QUESTION_ID = 199192;
  const ANSWER_ID = 388986;
  const STATUS = 200; // OK
  const FLIGHT_TIME = 100; // ms

  test(`status code ${STATUS}`, (done) => {
    axios.get(`${QUESTIONS}/${QUESTION_ID}/answers`)
      .then((response) => {
        expect(response.status).toEqual(STATUS);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test(`response time less than ${FLIGHT_TIME}ms`, (done) => {
    const START = Date.now();
    axios.get(`${QUESTIONS}/${QUESTION_ID}/answers`)
      .then(() => {
        expect(Date.now() - START).toBeLessThan(FLIGHT_TIME);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test('correct data', (done) => {
    axios.get(`${QUESTIONS}/${QUESTION_ID}/answers`)
      .then((response) => {
        expect(response.data.question).toEqual(QUESTION_ID.toString());
        expect(response.data.results[0].answer_id).toEqual(ANSWER_ID);
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });
});
