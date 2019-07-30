const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE;

exports.handler = async (event) => {
  var deviceId = event.pathParameters ? event.pathParameters.deviceId : null;
  const requestBody = event.body;
  if (!deviceId) { // id does not exist in the HTTP request, generate it. Insert action
    deviceId = this.generateUuid();
  }
  try {
    await this.putDevice(deviceId, requestBody);
    return {
      statusCode: 204 // 201 Created is more apt for insert but this operation is both for update and create
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500
    };
  }
};

exports.generateUuid = () => {
  return uuidv1(); // UUID generated based on timestamp
};

exports.putDevice = async (deviceId, body) => {
  // Parsing is necessary when using API Gateway
  // Reason: API Gateway stringifies JSON objects. Thus body is string when called from API Gateway
  // On Lambda console, body is received as a object.  This causes an error while testing with Lambda console
  if (typeof (body) !== 'object') body = JSON.parse(body);
  var params = {
    TableName: tableName,
    Key: {
      deviceId: deviceId
    },
    AttributeUpdates: {
      deviceInfo: {
        Action: 'PUT',
        Value: body
      },
      lastUpdated: {
        Action: 'PUT',
        Value: moment().format()
      }
    }
  };

  await docClient.update(params).promise();
};
