const clientID = 'Ov23ct32Klst4n5NyZJj';
const redirectUri = 'https://cche0214.github.io/CUMT-Summer-Social-Practice-2024/comments.html';

function initiateGitHubLogin() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
}

async function authenticateWithGitHub() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        try {
            const response = await fetch('/.netlify/functions/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Access Token:', data.access_token);
                // 设置 Gitalk 的访问令牌
                const gitalk = new Gitalk({
                    clientID: 'Ov23ct32Klst4n5NyZJj',
                    clientSecret: '', // 使用无服务器函数处理
                    repo: 'CUMT-Summer-Social-Practice-2024',
                    owner: 'cche0214',
                    admin: ['cche0214'],
                    id: location.pathname,
                    distractionFreeMode: false,
                    accessToken: data.access_token,
                });
                gitalk.render('gitalk-container');
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Network Error:', error);
        }
    } else {
        console.error('No authorization code found');
    }
}

document.getElementById('loginButton').addEventListener('click', initiateGitHubLogin);
authenticateWithGitHub();
