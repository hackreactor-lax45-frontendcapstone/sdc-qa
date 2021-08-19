/* eslint-disable camelcase */
/* eslint-disable no-undef */
const axios = require('axios');

const URL = 'http://18.144.34.24:80';
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

  test(`response time < ${FLIGHT_TIME}ms`, (done) => {
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

  test(`response time < ${FLIGHT_TIME}ms`, (done) => {
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

describe('GET questions from a series of products', () => {
  const STATUS = 200; // OK
  const FLIGHT_TIME = 100; // ms

  // If fail, manually query DB: SELECT MAX(product_id) FROM questions;
  const MAX_ID = 1000011;
  const PRODUCT_IDS = [];
  const LATE_PRODUCT_IDS = [];
  const TEST_COUNT = 10;
  for (let i = 0; i < TEST_COUNT; i += 1) {
    PRODUCT_IDS.push(Math.floor(Math.random() * MAX_ID));
    LATE_PRODUCT_IDS.push(Math.floor((0.9 + 0.1 * Math.random()) * MAX_ID));
  }

  test(`status code ${STATUS} for ${TEST_COUNT} random products`, (done) => {
    const queries = PRODUCT_IDS.map((product_id) => axios.get(
      QUESTIONS, { params: { product_id } },
    )
      .then((response) => response.status)
      .catch((error) => { throw error; }));

    Promise.all(queries)
      .then((results) => {
        results.forEach((result) => expect(result).toEqual(STATUS));
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test(`response time < ${FLIGHT_TIME}ms for 4 random products`, (done) => {
    const PRODUCT_RESPONSES = [];

    let START = Date.now();
    let INDEX = 0;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS, { params: { product_id: PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS, { params: { product_id: PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS, { params: { product_id: PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS, { params: { product_id: PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    Promise.all(PRODUCT_RESPONSES)
      .then((results) => {
        console.log('fully random: ', results);
        results.forEach((result) => expect(result).toBeLessThan(FLIGHT_TIME));
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test(`response time < ${FLIGHT_TIME}ms for 4 random products in last '10%' of table`, (done) => {
    const PRODUCT_RESPONSES = [];

    let START = Date.now();
    let INDEX = 0;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS,
      { params: { product_id: LATE_PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS,
      { params: { product_id: LATE_PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS,
      { params: { product_id: LATE_PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    START = Date.now();
    INDEX += 1;
    PRODUCT_RESPONSES[INDEX] = axios.get(QUESTIONS,
      { params: { product_id: LATE_PRODUCT_IDS[INDEX] } })
      .then(() => Date.now() - START)
      .catch((error) => { throw error; });

    Promise.all(PRODUCT_RESPONSES)
      .then((results) => {
        console.log('last \'10%\' random: ', results);
        results.forEach((result) => expect(result).toBeLessThan(FLIGHT_TIME));
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });

  test(`response time < ${200}ms for ${TEST_COUNT} random products in last '10%' of table`, (done) => {
    let START;
    const PRODUCT_RESPONSES = LATE_PRODUCT_IDS.map((product_id) => {
      START = Date.now();
      return axios.get(QUESTIONS, { params: { product_id } })
        .then(() => Date.now() - START)
        .catch((error) => { throw error; });
    });

    Promise.all(PRODUCT_RESPONSES)
      .then((results) => {
        console.log(results);
        results.forEach((result) => expect(result).toBeLessThan(200));
      })
      .catch((error) => console.error(error))
      .finally(() => done());
  });
});
