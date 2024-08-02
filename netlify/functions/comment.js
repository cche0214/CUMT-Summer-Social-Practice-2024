exports.handler = async (event) => {
  console.log('Received event:', event); // 输出整个事件对象

  if (event.httpMethod === 'POST') {
    try {
      console.log('Request body:', event.body); // 输出请求体

      if (!event.body || event.body.trim() === '') {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Request body is empty' }),
        };
      }

      let parsedBody;
      try {
        parsedBody = JSON.parse(event.body);
      } catch (parseError) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid JSON format' }),
        };
      }

      const { code } = parsedBody;

      if (!code) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Authorization code is required' }),
        };
      }

      const response = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
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
