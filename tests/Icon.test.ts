import { Icon } from '$lib'
import { mount } from 'svelte'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

const icon_names = [
  `Alert`,
  `Check`,
  `Collapse`,
  `Copy`,
  `Cross`,
  `Disabled`,
  `Expand`,
  `GitHub`,
  `StackBlitz`,
  `Svelte`,
] as const

describe(`Icon`, () => {
  let target: HTMLElement

  beforeEach(() => (target = document.body))
  afterEach(() => (target.innerHTML = ``))

  test.each(icon_names)(`renders %s icon correctly`, (icon_name) => {
    mount(Icon, { target, props: { icon: icon_name } })

    const svg = target.querySelector(`svg`)
    expect(svg?.tagName).toBe(`svg`)
    expect(svg?.querySelectorAll(`path`).length).toBeGreaterThan(0)
  })

  test.each([
    [`Alert`, `0 0 16 16`],
    [`Check`, `0 0 12 16`],
    [`GitHub`, `0 0 24 24`],
    [`Svelte`, `0 0 24 24`],
    [`StackBlitz`, `0 0 24 24`],
  ])(`%s icon has correct viewBox`, (icon_name, expected_viewBox) => {
    mount(Icon, {
      target,
      props: { icon: icon_name as (typeof icon_names)[number] },
    })
    expect(target.querySelector(`svg`)?.getAttribute(`viewBox`)).toBe(
      expected_viewBox,
    )
  })

  test(`renders with fill attribute`, () => {
    mount(Icon, { target, props: { icon: `Copy`, fill: `red` } })
    expect(target.querySelector(`svg`)?.getAttribute(`fill`)).toBeTruthy()
  })

  test(`renders paths with d attributes`, () => {
    mount(Icon, { target, props: { icon: `Copy` } })
    const paths = target.querySelectorAll(`path`)
    expect(paths.length).toBeGreaterThan(0)
    expect(paths[0]?.getAttribute(`d`)).toBeTruthy()
  })

  test(`Collapse and Expand icons are different`, () => {
    mount(Icon, { target, props: { icon: `Collapse` } })
    const collapse_svg = target.innerHTML

    target.innerHTML = ``
    mount(Icon, { target, props: { icon: `Expand` } })
    const expand_svg = target.innerHTML

    expect(collapse_svg).not.toBe(expand_svg)
  })
})
