export default function ({ $axios }) {
    $axios.onRequest(config => {
        config.headers.common['apikey'] = process.env.api_key;
        config.headers.common['Accept'] = 'application/json, text/plain, */*';
    })

    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
        'post'
    ])
  }