import messages from './messages'

const m = (rule, params = {}) => {
  let msg = messages[rule]
  
  for (const [key, value] of Object.entries(params)) {
    msg = msg.replaceAll(':' + key, value)
    msg = msg.charAt(0).toUpperCase() + msg.slice(1)
  }

  return msg
}

const rules = ({
  required: (params) => {
    return (v) => !!v || m('required', params)
  },
  email: (params) => {
    return (v) => /.+@.+\..+/.test(v) || m('email', params)
  },
  min: (params) => {
    return (v) => (v && v.length >= params.option) || m('min', params)
  },
  max: (params) => {
    return (v) => (v && v.length <= params.option) || m('max', params)
  },
  checkbox: (params) => {
    return (v) => (!!v) || m('checkbox', params)
  },
})

function getArray (str) {
  return str.split('|')
}

export default function generate (rulesObj) {
  const dict = {}

  for (const [key, value] of Object.entries(rulesObj)) {
    dict[key] = []
    getArray(value).forEach(item => {
      const [rule, option] = item.split(':')
      dict[key].push(rules[rule] ? rules[rule]({ attribute: key === 'rePassword' ? 'password' : key, [rule]: option, option }) : null)
    })
  }

  return dict
}
