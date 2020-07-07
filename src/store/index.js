import { createStore, createLogger } from 'vuex'
import trys from './modules/trys'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    trys
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
