export function sortable(
  node: HTMLElement,
  { header_selector = `thead th` } = {},
) {
  // this action can be applied to bob-standard HTML tables to make them sortable by
  // clicking on column headers (and clicking again to toggle sorting direction)
  const headers = node.querySelectorAll<HTMLTableCellElement>(header_selector)
  let sort_col_idx: number
  let sort_dir = 1 // 1 = asc, -1 = desc

  for (const [idx, header] of headers.entries()) {
    // add cursor pointer to headers
    header.style.cursor = `pointer`
    const init_bg = header.style.backgroundColor
    header.addEventListener(`click`, () => {
      for (const header of headers) {
        // removing any existing arrows
        header.textContent = header.textContent?.replace(/ ↑| ↓/, ``)
        header.classList.remove(`asc`, `desc`)
        header.style.backgroundColor = init_bg
      }
      header.classList.toggle(sort_dir > 0 ? `asc` : `desc`)
      header.style.backgroundColor = `rgba(255, 255, 255, 0.1)`
      // append arrow to header text
      if (idx === sort_col_idx) {
        sort_dir *= -1 // reverse sort direction
      } else {
        sort_col_idx = idx // set new sort column index
        sort_dir = 1 // reset sort direction
      }
      header.innerHTML = `${header.textContent} ${sort_dir > 0 ? `↑` : `↓`}`
      const table_body = node.querySelector(`tbody`)
      if (!table_body) return

      // re-sort table
      const rows = Array.from(table_body.querySelectorAll(`tr`))
      rows.sort((row_1, row_2) => {
        const val_1 = row_1.cells[sort_col_idx].textContent ?? ``
        const val_2 = row_2.cells[sort_col_idx].textContent ?? ``
        return (
          sort_dir * val_1.localeCompare(val_2, undefined, { numeric: true })
        )
      })

      for (const row of rows) table_body.appendChild(row)
    })
  }
}

type HighlightOptions = {
  query: string
  disabled: boolean
  acceptNode: (node: Node) => number
  css_class: string
}

export function highlight_matches(node: HTMLElement, ops: HighlightOptions) {
  update_highlights(node, ops)
  return {
    update: (ops: HighlightOptions) => update_highlights(node, ops),
  }
}

function update_highlights(node: Node, ops: HighlightOptions) {
  const {
    query = ``,
    disabled = false,
    acceptNode = () => NodeFilter.FILTER_ACCEPT,
    css_class = `highlight-match`,
  } = ops

  // clear previous ranges from HighlightRegistry
  CSS.highlights.clear()

  if (!query || disabled || typeof CSS == `undefined` || !CSS.highlights) return // abort if CSS highlight API not supported

  const tree_walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode,
  })
  const text_nodes: Node[] = []
  let current_node = tree_walker.nextNode()
  while (current_node) {
    text_nodes.push(current_node)
    current_node = tree_walker.nextNode()
  }

  // iterate over all text nodes and find matches
  const ranges = text_nodes.map((el) => {
    const text = el.textContent?.toLowerCase()
    const indices = []
    let start_pos = 0
    while (text && start_pos < text.length) {
      const index = text.indexOf(query, start_pos)
      if (index === -1) break
      indices.push(index)
      start_pos = index + query.length
    }

    // create range object for each str found in the text node
    return indices.map((index) => {
      const range = new Range()
      range.setStart(el, index)
      range.setEnd(el, index + query?.length)
      return range
    })
  })

  // create Highlight object from ranges and add to registry
  CSS.highlights.set(css_class, new Highlight(...ranges.flat()))
}
