import { CircleSpinner } from '$lib'
import { mount } from 'svelte'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe(`CircleSpinner`, () => {
  let target: HTMLElement

  beforeEach(() => (target = document.body))
  afterEach(() => (target.innerHTML = ``))

  test(`renders with default props`, () => {
    let div: HTMLDivElement
    mount(CircleSpinner, {
      target,
      props: {
        get div() {
          return div
        },
        set div(value) {
          div = value
        },
      },
    })
    expect(target.querySelector(`div`)).toBeTruthy()
  })

  test(`renders with custom props`, () => {
    let div: HTMLDivElement
    mount(CircleSpinner, {
      target,
      props: {
        size: `100px`,
        duration: `2s`,
        class: `custom-spinner`,
        'data-testid': `spinner`,
        get div() {
          return div
        },
        set div(value) {
          div = value
        },
      },
    })
    expect(target.querySelector(`div`)).toBeTruthy()
  })

  test(`has spinning animation via CSS`, () => {
    let div: HTMLDivElement
    mount(CircleSpinner, {
      target,
      props: {
        get div() {
          return div
        },
        set div(value) {
          div = value
        },
      },
    })
    const spinner = target.querySelector(`div`)
    const computed_style = getComputedStyle(spinner!)
    expect(computed_style.animationName).not.toBe(`none`)
  })

  test(`gets color from computed style when not provided`, () => {
    let div: HTMLDivElement
    mount(CircleSpinner, {
      target,
      props: {
        get div() {
          return div
        },
        set div(value) {
          div = value
        },
      },
    })
    const spinner = target.querySelector(`div`)
    const computed_style = getComputedStyle(spinner!)
    expect(computed_style.borderColor).toBeTruthy()
  })
})
