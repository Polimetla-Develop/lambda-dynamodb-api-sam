const req = require('./test.js');

exports.handler = async (event) => {  
  try {
    console.log('calling test')
    const mydata = req.test();
    console.log(mydata);
  } catch (err) {
    console.log(err);
  }
};
