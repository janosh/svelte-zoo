export function get_html_sort_value(element: Element): string {
  if (element.dataset.sortValue !== undefined) {
    return element.dataset.sortValue
  }
  for (const child of element.children) {
    const child_val = get_html_sort_value(child)
    if (child_val !== ``) {
      return child_val
    }
  }
  return element.textContent ?? ``
}

export function sortable(
  node: HTMLElement,
  {
    header_selector = `thead th`,
    asc_class = `table-sort-asc`,
    desc_class = `table-sort-desc`,
    sorted_style = { backgroundColor: `rgba(255, 255, 255, 0.1)` },
  } = {},
) {
  // this action can be applied to bob-standard HTML tables to make them sortable by
  // clicking on column headers (and clicking again to toggle sorting direction)
  const headers = node.querySelectorAll<HTMLTableCellElement>(header_selector)
  let sort_col_idx: number
  let sort_dir = 1 // 1 = asc, -1 = desc

  for (const [idx, header] of headers.entries()) {
    header.style.cursor = `pointer` // add cursor pointer to headers

    const init_styles = { ...header.style }
    header.addEventListener(`click`, () => {
      // reset all headers to initial state
      for (const header of headers) {
        header.textContent = header.textContent?.replace(/ ↑| ↓/, ``) ?? ``
        header.classList.remove(asc_class, desc_class)
        Object.assign(header.style, init_styles)
      }
      if (idx === sort_col_idx) {
        sort_dir *= -1 // reverse sort direction
      } else {
        sort_col_idx = idx // set new sort column index
        sort_dir = 1 // reset sort direction
      }
      header.classList.add(sort_dir > 0 ? asc_class : desc_class)
      Object.assign(header.style, sorted_style)
      header.textContent = `${header.textContent?.replace(/ ↑| ↓/, ``)} ${sort_dir > 0 ? `↑` : `↓`}`

      const table_body = node.querySelector(`tbody`)
      if (!table_body) return

      // re-sort table
      const rows = Array.from(table_body.querySelectorAll(`tr`))
      rows.sort((row_1, row_2) => {
        const cell_1 = row_1.cells[sort_col_idx]
        const cell_2 = row_2.cells[sort_col_idx]
        const val_1 = get_html_sort_value(cell_1)
        const val_2 = get_html_sort_value(cell_2)

        if (val_1 === val_2) return 0
        if (val_1 === ``) return 1 // treat empty string as lower than any value
        if (val_2 === ``) return -1 // any value is considered higher than empty string

        const num_1 = Number(val_1)
        const num_2 = Number(val_2)

        if (isNaN(num_1) && isNaN(num_2)) {
          return (
            sort_dir * val_1.localeCompare(val_2, undefined, { numeric: true })
          )
        }
        return sort_dir * (num_1 - num_2)
      })

      for (const row of rows) table_body.appendChild(row)
    })
  }
}

type HighlightOptions = {
  query?: string
  disabled?: boolean
  node_filter?: (node: Node) => number
  css_class?: string
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
    node_filter = () => NodeFilter.FILTER_ACCEPT,
    css_class = `highlight-match`,
  } = ops

  // clear previous ranges from HighlightRegistry
  CSS.highlights.clear()

  if (!query || disabled || typeof CSS == `undefined` || !CSS.highlights) return // abort if CSS highlight API not supported

  const tree_walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode: node_filter,
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
