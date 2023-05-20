import { FileDetails } from '$lib'
import { tick } from 'svelte'
import { expect, test } from 'vitest'
import { doc_query } from '.'

const files = [
  { title: `file1`, content: `content1` },
  { title: `file2`, content: `content2` },
]
const click = new MouseEvent(`click`)

test(`FileDetails renders all files passed`, async () => {
  new FileDetails({ target: document.body, props: { files } })
  await tick()

  const details = document.querySelectorAll(`li > details`)
  expect(details.length).toBe(files.length)

  // check items are wrapped in ordered list
  const ol = doc_query(`ol`)
  expect(ol.children.length).toBe(files.length)
})

test(`FileDetails renders file titles and contents`, async () => {
  new FileDetails({ target: document.body, props: { files } })
  await tick()

  const titles = document.querySelectorAll(`summary`)
  expect(titles.length).toBe(files.length)

  const contents = document.querySelectorAll(`pre > code`)

  for (const [idx, src] of contents.entries()) {
    expect(src.textContent).toBe(files[idx].content)
  }
})

test(`FileDetails opens and closes files when the toggle button is clicked`, async () => {
  const files = [
    { title: `file1`, content: `content1`, open: false },
    { title: `file2`, content: `content2`, open: false },
  ]

  new FileDetails({
    target: document.body,
    props: { files },
  })
  await tick()

  const details = document.querySelectorAll(`details`)
  for (const detail of details) {
    expect(detail.open).toBe(false)
  }

  const btn = doc_query(`button`)
  btn.dispatchEvent(click)
  await tick()

  for (const detail of details) {
    expect(detail.open).toBe(true)
  }

  btn.dispatchEvent(click)
  await tick()

  for (const detail of details) {
    expect(detail.open).toBe(false)
  }
})

test(`toggle all button opens and closes all details`, async () => {
  const files = [
    { title: `file1`, content: `content1`, open: false },
    { title: `file2`, content: `content2`, open: false },
    { title: `file3`, content: `content3`, open: false },
  ]

  const toggle_all_btn_title = `toggle all`
  new FileDetails({
    target: document.body,
    props: { files, toggle_all_btn_title },
  })

  await tick()

  const details = document.querySelectorAll(`details`)

  const btn = doc_query(`button[title='${toggle_all_btn_title}']`)

  // open all details
  btn.dispatchEvent(click)
  await tick()

  // all details elements should now be open
  for (const detail of details) {
    expect(detail.open).toBe(true)
  }

  // Click the toggle button again to close all details
  btn.dispatchEvent(click)
  await tick()

  // all details elements should now be closed
  for (const detail of details) {
    expect(detail.open).toBe(false)
  }

  // Open some of the details
  details[0].open = true
  details[1].open = true
  await tick()

  // Click the toggle button to close all details
  btn.dispatchEvent(click)
  await tick()

  // All details elements should now be closed
  for (const detail of details) {
    expect(detail.open).toBe(false)
  }
})
