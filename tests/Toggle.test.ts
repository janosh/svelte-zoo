import { Toggle } from '$lib'
import { mount, tick } from 'svelte'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe(`Toggle`, () => {
  let target: HTMLElement

  afterEach(() => (target.innerHTML = ``))

  beforeEach(() => (target = document.body))

  test(`renders unchecked by default`, () => {
    mount(Toggle, { target })
    const input = target.querySelector(
      `input[type="checkbox"]`,
    ) as HTMLInputElement
    expect(input.checked).toBe(false)
  })

  test(`renders checked when checked prop is true`, () => {
    mount(Toggle, { target, props: { checked: true } })
    const input = target.querySelector(
      `input[type="checkbox"]`,
    ) as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  test(`toggles on click`, async () => {
    mount(Toggle, { target })
    const input = target.querySelector(
      `input[type="checkbox"]`,
    ) as HTMLInputElement

    input.click()
    expect(input.checked).toBe(true)

    input.click()
    expect(input.checked).toBe(false)
  })

  test(`toggles on Enter key`, async () => {
    mount(Toggle, { target })
    const input = target.querySelector(
      `input[type="checkbox"]`,
    ) as HTMLInputElement

    input.dispatchEvent(new KeyboardEvent(`keydown`, { key: `Enter` }))
    await tick()
    expect(input.checked).toBe(true)

    input.dispatchEvent(new KeyboardEvent(`keydown`, { key: `Enter` }))
    await tick()
    expect(input.checked).toBe(false)
  })

  test(`doesn't toggle on other keys`, async () => {
    mount(Toggle, { target })
    const input = target.querySelector(
      `input[type="checkbox"]`,
    ) as HTMLInputElement

    input.dispatchEvent(new KeyboardEvent(`keydown`, { key: `A` }))
    expect(input.checked).toBe(false)
  })

  test(`applies custom class`, () => {
    mount(Toggle, { target, props: { class: `custom-class` } })
    const label = target.querySelector(`label`)
    expect(label?.classList.contains(`custom-class`)).toBe(true)
  })

  test(`applies custom style`, () => {
    const style = `margin: 10px`
    mount(Toggle, { target, props: { style } })
    const label = target.querySelector(`label`)
    expect(label?.getAttribute(`style`)).toBe(style)
  })

  test(`applies custom input style`, () => {
    const input_style = `width: 20px`
    mount(Toggle, { target, props: { input_style } })
    const input = target.querySelector(`input`)
    expect(input?.getAttribute(`style`)).toBe(input_style)
  })

  test(`sets required attribute`, () => {
    mount(Toggle, { target, props: { required: true } })
    const input = target.querySelector(`input`)
    expect(input?.hasAttribute(`required`)).toBe(true)
  })

  test(`sets custom id`, () => {
    mount(Toggle, { target, props: { id: `custom-id` } })
    const input = target.querySelector(`input`)
    expect(input?.getAttribute(`id`)).toBe(`custom-id`)
  })

  test(`emits change event`, async () => {
    const handleChange = vi.fn()
    mount(Toggle, { target, events: { change: handleChange } })
    const input = target.querySelector(`input[type="checkbox"]`)

    input?.dispatchEvent(new Event(`change`, { bubbles: true }))
    expect(handleChange).toHaveBeenCalled()
  })

  test(`handles blur event`, async () => {
    const handleBlur = vi.fn()
    mount(Toggle, { target, events: { blur: handleBlur } })
    const input = target.querySelector(`input`)
    input?.dispatchEvent(new FocusEvent(`blur`, { bubbles: true }))
    expect(handleBlur).toHaveBeenCalled()
  })

  test(`handles click event`, async () => {
    const handleClick = vi.fn()
    mount(Toggle, { target, events: { click: handleClick } })
    const input = target.querySelector(`input`)
    input?.dispatchEvent(new MouseEvent(`click`, { bubbles: true }))
    expect(handleClick).toHaveBeenCalled()
  })
})
