import ruleGenerator from './rules'

export function validate (fields, rules) {
  const r = ruleGenerator(rules)
  const list = []
  
  for (const [field, functions] of Object.entries(r)){
    for (const method of Object.values(functions)){
      const s = method(fields[field])
      if(s !== true){
        list.push(method(fields[field]))
        break
      }
    }
  };
  
  if(Object.keys(list).length === 0)
    return {
      ok: true
    }

  return {
    ok: false,
    error: list[0]
  }
}