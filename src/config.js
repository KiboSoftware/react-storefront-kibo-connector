const config = {
    "accessTokenUrl": process.env.KIBO_ACCESS_TOKEN_URL || 'https://home.dev10.kubedev.kibo-dev.com/api/platform/applications/authtickets/oauth',
    "clientId":  process.env.KIBO_CLIENT_ID || 'mozuadmin.mpoc_app.1.0.0.Release',
    "sharedSecret": process.env.KIBO_SHARED_SECRET || '1d16d7d35b8542cba2f99216f20dca32',
    "apiHost":  process.env.KIBO_API_HOST || 'https://t17194-s21127.dev10.kubedev.kibo-dev.com',
}

export default config