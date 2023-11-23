import { setupDevtoolsPlugin } from '@vue/devtools-api'

function setupDevtools (app, storage) {
  // let trackId = 0
  let devtoolsApi
  const devtools = {}

  setupDevtoolsPlugin({
    id: 'vue-session',
    label: 'Vue Session',
    packageName: 'vue-session',
    homepage: 'http://example.com',
    componentStateTypes: ['vue-session'],
    enableEarlyProxy: true,
    app
  }, api => {
    devtoolsApi = api
    devtoolsApi
    api.addInspector({
      id: 'vue-session-storage',
      label: 'Vue Session Storage',
      icon: 'storage'
    })

    api.on.getInspectorTree((payload) => {
      if (payload.inspectorId === 'vue-session-storage') {
        payload.rootNodes = [
          {
            id: 'storage',
            label: 'Storage',
            tags: [
              {
                label: `sessionId: ${storage.DEFAULT_KEY_NAME}`,
                textColor: 0x000000,
                backgroundColor: 0xFF984F
              }
            ]
          }
        ]
      }
    })

    api.on.getInspectorState(payload => {
      if (payload.inspectorId === 'vue-session-storage') {
        payload.state = {
          state: [
            {
              key: 'data',
              value: storage.data
            }
          ]
        }
      }
    })

    api.addTimelineLayer({
      id: 'vue-session-storage',
      label: 'VueSession',
      color: 0x92A2BF
    })

    // api.sendInspectorState('vue-session-storage')
  })

  return devtools
}

class VueSession {
  constructor(options) {
    const defaultOptions = options || {}
    const { sessionKey, persistent, initial } = defaultOptions

    this.storage = sessionStorage
    this._history = []

    this.DEFAULT_KEY_NAME = sessionKey || 'vue-session'

    // TODO: Implement functionnalities for persistence
    // and for implementing initial data
    this.isPersistent = persistent || false
    this.initial = initial || {}

    const existingItems = this.storage.getItem(this.DEFAULT_KEY_NAME)
    if (!existingItems) {
      const data = { sessionId: Date.now(), ...this.initial }
      this.storage.setItem(this.DEFAULT_KEY_NAME, JSON.stringify(data))
    }
  }

  get data () {
    return JSON.parse(this.storage.getItem(this.DEFAULT_KEY_NAME))
  }

  _precheck () {
    // Ensures that the session key above
    // is always present before doing any
    // operations
    if (!(this.DEFAULT_KEY_NAME in this.storage)) {
      const sessionData = { sessionId: Date.now() }
      this.storage.setItem(this.DEFAULT_KEY_NAME, JSON.stringify(sessionData))
    }
  }

  _save (data) {
    // Internal method that saves the stringified
    // data to the storage
    this._precheck()
    this._history.push(['save', data])
    this.storage.setItem(this.DEFAULT_KEY_NAME, JSON.stringify(data))
  }

  create (key, value) {
    // this._precheck()
    const storedData = this.data
    storedData[key] = value
    this._save(storedData)
  }

  exists (key) {
    const storedData = this.data
    return Object.keys(storedData).includes(key)
  }

  getDelete (key) {
    let returnValue = null
    var storedData = this.data

    returnValue = storedData[key]
    delete storedData[key]

    this._save(storedData)
    return returnValue
  }

  increment (key) {
    let result = this._getValueForOperation(key)
    result = result += 1
    this.create(key, result)
  }

  decrement (key) {
    let result = this._getValueForOperation(key)
    result = result -= 1
    this.create(key, result)
  }

  incrementBy (key, k = 1) {
    let result = this._getValueForOperation(key)
    result = result += k
    this.create(key, result)
  }

  decrementBy (key, k = 1) {
    let result = this._getValueForOperation(key)
    result = result -= k
    this.create(key, result)
  }

  getOrCreate (key, value) {
    const result = this.exists(key)
    let returnValue = null
    let returnArray
    if (result) {
      returnValue = this.retrieve(key)
      returnArray = [false, returnValue]
    } else {
      this.create(key, value)
      returnValue = value
      returnArray = [true, returnValue]
    }
    return returnArray
  }

  listPush (key, value) {
    const result = this._getList(key)
    result.push(value)
    this.create(key, result)
  }

  defaultList (key, value) {
    if (this.exists(key)) {
      this.listPush(key, value)
    } else {
      this.create(key, [value])
    }
  }

  listMerge (key, values) {
    var newList = null
    const result = this._getList(key)

    if (!Array.isArray(values)) {
      throw new Error('Is not an array')
    }

    newList = [...result, ...values]
    this.create(key, newList)
  }

  listCount (key) {
    const result = this._getList(key)
    return result.length
  }

  toggle (key) {
    var result = this.retrieve(key)
    if (typeof result === 'boolean') {
      this.create(key, !result)
    } else {
      this.create(key, true)
    }
  }

  retrieve (key) {
    // this._precheck()
    return this.data[key]
  }

  remove (key) {
    var storedData = this.data
    delete storedData[key]
    this._save(storedData)
  }

  renew () {
    // Fails silently if there is no
    // session in the storage
    try {
      const storedData = this.data
      storedData.sessionId = Date.now()
      this.storage.setItem(this.DEFAULT_KEY_NAME, JSON.stringify(storedData))
      return true
    } catch {
      return false
    }
  }

  clear () {
    // Fails silently if there is no
    // session in the storage
    try {
      const sessionId = this.data.sessionId
      this.storage.setItem(this.DEFAULT_KEY_NAME, JSON.stringify({ 'sessionId': sessionId }))
      return true
    } catch {
      return false
    }
  }

  contains (key) {
    return this.data ? key in this.data : false
  }

  destroy () {
    this.storage.clear()
  }

  install (app) {
    setupDevtools(app, this)
    app.config.globalProperties.$session = this
    app.mixin({
      data: () => ({
        sessionStorage: this.data
      })
    })
    window.VueSession = this
  }
}

function createVueSession (options) {
  return new VueSession(options)
}

export {
  createVueSession,
  VueSession
}
