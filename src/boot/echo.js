import Echo from 'laravel-echo'
import { boot } from 'quasar/wrappers'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  // wsHost: 'localhost',
  wsHost: process.env.VUE_APP_BASE_URL_MAIN,
  wsPort: 6001,
  key: process.env.VUE_APP_PUSHER_KEY,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  },
  // authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
  authEndpoint: process.env.VUE_APP_BROADCASTING_AUTH_ENDPOINT,
})

export default boot(({ app }) => {
  app.config.globalProperties.$echo = echo;
})

export { echo };
