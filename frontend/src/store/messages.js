import { ref, toRef } from 'vue'

const messagesContainer = ref([])

export default function ({ store }) {
  store.messages = messagesContainer
  // if (!Object.prototype.hasOwnProperty(store.$state, 'messages')) {
  // }
  store.$state.messages = messagesContainer
  store.messages = toRef(store.$state, 'messages')

  function createMessage (type, content) {
    return { type: type, content: content }
  }

  function addErrorMessage (content) {
    messagesContainer.value.push(createMessage('danger', content))
  }

  function addSuccessMessage (content) {
    messagesContainer.value.push(createMessage('success', content))
  }

  function addInfoMessage (content) {
    messagesContainer.value.push(createMessage('info', content))
  }

  function clearMessages () {
    messagesContainer.value = []
  }

  return {
    messagesContainer,
    addErrorMessage,
    addInfoMessage,
    addSuccessMessage,
    clearMessages
  }
}
