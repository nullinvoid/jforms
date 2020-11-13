function h(tag, props = {}, ...childs) {
  const htmlEl = document.createElement(tag)

  for (const propName in props)
    htmlEl[propName] = props[propName]

  for (const child of childs)
    htmlEl.append(child)

  return htmlEl
}

const rows = [
    {f1: 'v1', f2: 'v2', f3: 'v3'},
    {f1: 'v1', f2: 'v2', f3: 'v3'},
    {f1: 'v1', f2: 'v2', f3: 'v3'}
]

const partRow = ({name, value = ''}) => 
    h('td'
    , {}
    , h
        ('input', {
            type: 'text',
            name,
            value
        })
    )

const Row = (records) => records.reduce ((row, [name, value]) => [...row, partRow ({name, value})], [])

const Tr = (row) => 
    h('tr', {}, ...row)

const addRowBtn = (records) => {
    const add = (e) => e.target.insertAdjacentElement ('beforebegin', Tr (Row (records)))

    return h
        ( 'button'
        , 
            { onclick: add
            , innerHTML: '+'
            }
        )
}

const style = 
`
    display: flex;
    flex-direction: column;
    width: max-content;
`

const jform = ({elements}) => {
    const header = 
    Object.keys
        ( elements[0]
        )
        . reduce
        ( (header, key) => [...header, h('th', {innerHTML: key})]
        , []
        )

    const inputs = 
    elements.reduce
        ( (inputs, element) => [...inputs, Tr (Row (Object.entries (element)))]
        , []
        )

    return h
        ( 'table'
        , {}
        , Tr(header)
        , ...inputs
        , addRowBtn(header.map(a => []))
        )
}

document.body.append ( jform({elements: rows}))
