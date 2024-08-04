const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 从请求体中获取授权码
  const { code } = JSON.parse(event.body);

  // 从环境变量中读取 GitHub 应用的 Client ID 和 Client Secret
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = 'https://cumt-summer-social-practice-2024.netlify.app/comments';

  try {
    // 向 GitHub 的授权服务器发送 POST 请求以获取访问令牌
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });
    
    // 解析 GitHub 响应的 JSON 数据
    const data = await response.json();

    // 根据响应状态返回结果
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(data), // 返回访问令牌
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error_description }), // 返回错误描述
      };
    }
  } catch (error) {
    // 捕获并返回可能发生的任何错误
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }), // 返回错误信息
    };
  }
};
