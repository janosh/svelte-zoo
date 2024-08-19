import { get_html_sort_value, sortable } from '$lib/actions'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

function make_table(rows: string[][]): HTMLTableElement {
  const table = document.createElement(`table`)
  table.innerHTML = `
    <thead>
      <tr>${rows[0].map((cell) => `<th>${cell}</th>`).join(``)}</tr>
    </thead>
    <tbody>
      ${rows
        .slice(1)
        .map(
          (row) => `
        <tr>${row.map((cell) => `<td>${cell}</td>`).join(``)}</tr>
      `,
        )
        .join(``)}
    </tbody>
  `
  return table
}

function get_sorted_values(
  table: HTMLTableElement,
  column_index: number,
): string[] {
  return Array.from(table.querySelectorAll(`tbody tr`)).map(
    (row) => row.cells[column_index].textContent || ``,
  )
}

function click_header(table: HTMLTableElement, column_index: number) {
  const header = table.querySelector(
    `th:nth-child(${column_index + 1})`,
  ) as HTMLTableCellElement
  header.click()
}

let table: HTMLTableElement

beforeEach(() => {
  table = make_table([
    [`Name`, `Age`, `Score`],
    [`Alice`, `30`, `95`],
    [`Bob`, `25`, `88`],
    [`Charlie`, `35`, `92`],
  ])
  document.body.appendChild(table)
})

afterEach(() => {
  document.body.removeChild(table)
})

describe(`get_html_sort_value`, () => {
  test.each([
    [`<span data-sort-value="10">Ten</span>`, `10`],
    [`<span>No sort value</span>`, `No sort value`],
    [`<span><em data-sort-value="20">Twenty</em></span>`, `20`],
    [``, ``],
  ])(`returns correct value for %s`, (html, expected) => {
    const element = document.createElement(`div`)
    element.innerHTML = html
    expect(get_html_sort_value(element)).toBe(expected)
  })
})

describe(`sortable function`, () => {
  test(`sorts table correctly`, () => {
    sortable(table)

    click_header(table, 1)
    expect(get_sorted_values(table, 1)).toEqual([`25`, `30`, `35`])

    click_header(table, 1)
    expect(get_sorted_values(table, 1)).toEqual([`35`, `30`, `25`])
  })

  test(`handles empty values correctly`, () => {
    table = make_table([
      [`Name`, `Age`],
      [`Alice`, `30`],
      [`Bob`, ``],
      [`Charlie`, `25`],
    ])
    document.body.replaceChild(table, document.body.firstChild as Node)

    sortable(table)
    click_header(table, 1)

    expect(get_sorted_values(table, 1)).toEqual([`25`, `30`, ``])
  })

  test(`handles data-sort-value attribute`, () => {
    table = make_table([
      [`Name`, `Score`],
      [`Alice`, `<span data-sort-value="95">A</span>`],
      [`Bob`, `<span data-sort-value="88">B</span>`],
      [`Charlie`, `<span data-sort-value="92">A-</span>`],
    ])
    document.body.replaceChild(table, document.body.firstChild as Node)

    sortable(table)
    click_header(table, 1)

    expect(get_sorted_values(table, 1)).toEqual([`B`, `A-`, `A`])
  })

  test(`handles zero values correctly`, () => {
    table = make_table([
      [`Name`, `Score`],
      [`Alice`, `0`],
      [`Bob`, `10`],
      [`Charlie`, ``],
    ])
    document.body.replaceChild(table, document.body.firstChild as Node)

    sortable(table)
    click_header(table, 1)

    expect(get_sorted_values(table, 1)).toEqual([`0`, `10`, ``])
  })

  test(`updates header styles correctly`, () => {
    sortable(table)
    const header = table.querySelector(
      `th:nth-child(2)`,
    ) as HTMLTableCellElement

    header.click()
    expect(header.classList.contains(`table-sort-asc`)).toBe(true)
    expect(header.style.backgroundColor).toBe(`rgba(255, 255, 255, 0.1)`)
    expect(header.textContent).toContain(`↑`)

    header.click()
    expect(header.classList.contains(`table-sort-desc`)).toBe(true)
    expect(header.textContent).toContain(`↓`)
  })

  test(`applies custom classes and styles`, () => {
    sortable(table, {
      asc_class: `custom-asc`,
      desc_class: `custom-desc`,
      sorted_style: { color: `red`, fontWeight: `bold` },
    })
    const header = table.querySelector(
      `th:nth-child(2)`,
    ) as HTMLTableCellElement

    header.click()
    expect(header.classList.contains(`custom-asc`)).toBe(true)
    expect(header.style.color).toBe(`red`)
    expect(header.style.fontWeight).toBe(`bold`)

    header.click()
    expect(header.classList.contains(`custom-desc`)).toBe(true)
    expect(header.style.color).toBe(`red`)
    expect(header.style.fontWeight).toBe(`bold`)
  })
})
