import { Slider } from '$lib'
import { mount, tick } from 'svelte'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'

// TODO fix, unclear why in
test.skip(`forwards DOM events`, () => {
  const oninput = vi.fn()
  const onclick = vi.fn()
  mount(Slider, {
    target: document.body,
    props: { oninput, onclick },
  })

  const num_input = doc_query<HTMLInputElement>(`input[type=number]`)

  num_input.value = `5`
  num_input.dispatchEvent(new Event(`input`))
  expect(oninput).toHaveBeenCalledOnce()
  expect(oninput).toHaveBeenCalledWith(new Event(`input`))

  expect(onclick).toHaveBeenCalledOnce()
  expect(onclick).toHaveBeenCalledWith(new MouseEvent(`click`))
})

test(`takes value, min, max, step, and disabled props`, () => {
  mount(Slider, {
    target: document.body,
    props: { value: 5, min: 0, max: 10, step: 1, disabled: true },
  })

  const num_input = doc_query<HTMLInputElement>(`input[type=number]`)

  expect(num_input.value).toBe(`5`)
  expect(num_input.min).toBe(`0`)
  expect(num_input.max).toBe(`10`)
  expect(num_input.step).toBe(`1`)
  expect(num_input.disabled).toBe(true)
})

test(`renders custom label text`, () => {
  mount(Slider, {
    target: document.body,
    props: { label: `Volume Control` },
  })

  const label = doc_query(`label`)
  expect(label.textContent?.trim()).toBe(`Volume Control`)
})

test(`applies custom styles`, () => {
  mount(Slider, {
    target: document.body,
    props: {
      style: `color: red;`,
      slider_style: `width: 200px;`,
    },
  })

  const label = doc_query(`label`)
  const range_input = doc_query<HTMLInputElement>(`input[type=range]`)

  expect(label.style.color).toBe(`red`)
  expect(range_input.style.width).toBe(`200px`)
})

test(`applies custom class name`, () => {
  mount(Slider, {
    target: document.body,
    props: { class: `custom-slider` },
  })

  const label = doc_query(`label`)
  expect(label.classList.contains(`custom-slider`)).toBe(true)
})

test(`binds value between range and number inputs`, async () => {
  mount(Slider, {
    target: document.body,
    props: { value: 50 },
  })

  const range_input = doc_query<HTMLInputElement>(`input[type=range]`)
  const number_input = doc_query<HTMLInputElement>(`input[type=number]`)

  // Update range input
  range_input.value = `75`
  range_input.dispatchEvent(new Event(`input`))
  await tick()
  expect(number_input.value).toBe(`75`)

  // Update number input
  number_input.value = `25`
  number_input.dispatchEvent(new Event(`input`))
  await tick()
  expect(range_input.value).toBe(`25`)
})
