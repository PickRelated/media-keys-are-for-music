const defaultOptions = {
  isControlledRemotely: true,
  mediaKeysControl: 'local',
}

const getForm = () => {
  const fields = {}
  const [form] = document.forms
  for (const key in defaultOptions) {
    fields[key] = form[key]
  }
  const forEachField = (callback) => {
    for (const key in fields) {
      callback(fields[key], key)
    }
  }
  const getValues = () => {
    const values = {}
    forEachField((field, key) => {
      values[key] = field.type === 'checkbox' ? field.checked : field.value
    })
    return values
  }
  return {
    fields,
    forEachField,
    get values() {
      return getValues()
    },
  }
}

const saveOptions = () => {
  chrome.storage.sync.set(getForm().values, () => {
    const status = document.getElementById('status')
    status.style.opacity = 1
    setTimeout(() => {
      status.style.opacity = 0
    }, 1000)
  })
}

const restoreOptions = () => {
  chrome.storage.sync.get(defaultOptions, (values) =>
    getForm().forEachField((field, name) => {
      // eslint-disable-next-line no-param-reassign
      field.value = values[name]
      // eslint-disable-next-line no-param-reassign
      field.checked = values[name]
    }),
  )
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
