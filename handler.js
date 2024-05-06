'use strict';
const AWS = require('aws-sdk')

module.exports.requestUploadUrl = async (event) => {
  const s3 = new AWS.S3()
  const params = JSON.parse(event.body)
  const S3params = {
    Bucket: 'silly-cats',
    Key: params.name,
    ContentType: params.type
  }
  const uploadURL = s3.getSignedUrl('putObject', S3params)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
        uploadURL
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
