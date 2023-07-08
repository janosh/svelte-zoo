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
