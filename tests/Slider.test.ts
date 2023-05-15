import { Slider } from '$lib'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'

test(`forwards DOM events`, () => {
  const input_spy = vi.fn()
  const click_spy = vi.fn()
  const slider = new Slider({ target: document.body })

  slider.$on(`input`, input_spy)
  slider.$on(`click`, click_spy)

  const num_input = doc_query<HTMLInputElement>(`input[type=number]`)

  num_input.value = `5`
  num_input.dispatchEvent(new Event(`input`))
  expect(input_spy).toHaveBeenCalledOnce()

  num_input.click()
  expect(click_spy).toHaveBeenCalledOnce()
})

test(`takes value, min, max, step, and disabled props`, () => {
  new Slider({
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
