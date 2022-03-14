const { httpGet } = require('./mock-http-interface');

// Function to parse json data
const parseJSON = (data) => {
  return JSON.parse(data).message
}

// Async function as a promise is being passed
const getArnieQuotes = async (urls) => {
  const results = await Promise.all(
    // Map all URL's to an array of objects stored in results
    urls.map(async (url) => {
      // await promise returned by HTTP get request
      const res = await httpGet(url);
      // check for successful response
      if (res.status === 200) {
        // return "Arnie Quote" with quote as value for map
        return {
          "Arnie Quote": parseJSON(res.body),
        };
      // Otherwise, return failure with response as value
      // Could test for other edge cases here
      } else {
        return {
          'FAILURE': parseJSON(res.body),
        };
      }
    })
  );
  return results;
};


module.exports = {
  getArnieQuotes,
};
