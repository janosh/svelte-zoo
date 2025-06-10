import { Tooltip } from '$lib'
import { mount, tick } from 'svelte'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe(`Tooltip`, () => {
  let target: HTMLElement

  beforeEach(() => {
    target = document.body
    // Mock viewport dimensions
    vi.spyOn(window, `innerWidth`, `get`).mockReturnValue(1024)
    vi.spyOn(window, `innerHeight`, `get`).mockReturnValue(768)
  })

  afterEach(() => {
    target.innerHTML = ``
    vi.restoreAllMocks()
  })

  test(`renders nothing when no text or tip slot provided`, () => {
    mount(Tooltip, { target })
    expect(target.querySelector(`.tooltip`)).toBeNull()
  })

  test(`renders tooltip with text prop`, async () => {
    const text = `Hello World`
    mount(Tooltip, {
      target,
      props: { text },
    })

    const container = target.querySelector(`span`)
    container?.dispatchEvent(new MouseEvent(`mouseenter`))

    const tooltip = target.querySelector(`.tooltip`)
    expect(tooltip?.textContent?.trim()).toBe(text)
  })

  test(`shows tooltip on mouseenter and hides on mouseleave`, async () => {
    mount(Tooltip, { target, props: { text: `Tooltip Text` } })

    await tick()
    const container = target.querySelector(`span`)
    const tooltip = target.querySelector(`.tooltip`) as HTMLElement

    // Show tooltip
    container?.dispatchEvent(new MouseEvent(`mouseenter`))
    expect(tooltip.style.visibility).toBe(`visible`)
    expect(tooltip.style.opacity).toBe(`1`)

    // Hide tooltip
    container?.dispatchEvent(new MouseEvent(`mouseleave`))
    expect(tooltip.style.visibility).toBe(`hidden`)
    expect(tooltip.style.opacity).toBe(`0`)
  })

  test(`respects max-width prop`, async () => {
    mount(Tooltip, {
      target,
      props: { text: `Tooltip Text`, max_width: `200px` },
    })

    await tick()
    const container = target.querySelector(`span`)
    container?.dispatchEvent(new MouseEvent(`mouseenter`))

    const tooltip = target.querySelector(`.tooltip`) as HTMLElement
    expect(tooltip.style.maxWidth).toBe(`200px`)
  })

  test(`applies custom cursor style`, async () => {
    mount(Tooltip, {
      target,
      props: {
        text: `Tooltip Text`,
        cursor: `help`,
      },
    })

    const container = target.querySelector(`span`) as HTMLElement
    expect(container.style.cursor).toBe(`help`)
  })

  test(`handles custom class name`, async () => {
    mount(Tooltip, {
      target,
      props: {
        text: `Tooltip Text`,
        class: `custom-class`,
      },
    })

    const container = target.querySelector(`span`)
    expect(container?.classList.contains(`custom-class`)).toBe(true)
  })

  test(`handles custom styles`, async () => {
    const style = `margin: 10px`
    const tip_style = `padding: 20px`

    mount(Tooltip, {
      target,
      props: {
        text: `Tooltip Text`,
        style,
        tip_style,
      },
    })

    const container = target.querySelector(`span`) as HTMLElement
    const tooltip = target.querySelector(`.tooltip`) as HTMLElement

    expect(container.style.margin).toBe(`10px`)
    expect(tooltip.style.padding).toBe(`20px`)
  })

  test(`tooltip is invisible by default`, async () => {
    mount(Tooltip, { target, props: { text: `Tooltip Text` } })

    const tooltip = target.querySelector(`.tooltip`) as HTMLElement

    // Check computed styles to verify initial invisible state
    const computedStyle = window.getComputedStyle(tooltip)
    expect(computedStyle.visibility).toBe(`hidden`)
    expect(computedStyle.opacity).toBe(`0`)
  })

  test(`renders text prop with html content using {@html}`, async () => {
    const html_content = `<strong>Bold Text</strong>`
    mount(Tooltip, {
      target,
      props: { text: html_content },
    })

    const container = target.querySelector(`span`)
    container?.dispatchEvent(new MouseEvent(`mouseenter`))

    const tooltip = target.querySelector(`.tooltip`)
    expect(tooltip?.innerHTML).toContain(html_content)
  })
})
