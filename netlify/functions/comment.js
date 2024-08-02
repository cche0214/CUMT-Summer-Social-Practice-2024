// netlify/functions/github-auth.js

const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const { code } = JSON.parse(event.body);

      if (!code) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Authorization code is required' }),
        };
      }

      // 使用 GitHub OAuth API 获取访问令牌
      const response = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,   // 使用环境变量
        client_secret: process.env.GITHUB_CLIENT_SECRET, // 使用环境变量
        code,
      }, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.data.error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: response.data.error_description }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ access_token: response.data.access_token }),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
