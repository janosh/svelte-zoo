import { titles_as_tooltips } from '$lib/actions'
import tippy, { type Instance } from 'tippy.js'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

// Mock tippy
vi.mock(`tippy.js`, () => ({
  default: vi.fn(() => ({
    setProps: vi.fn(),
    destroy: vi.fn(),
    hide: vi.fn(),
  })),
}))

function create_element(
  tag: string,
  attributes: Record<string, string> = {},
): HTMLElement {
  const element = document.createElement(tag)
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  return element
}

describe(`titles_as_tooltips action`, () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement(`div`)
    document.body.appendChild(container)
    // Reset tippy mock
    vi.mocked(tippy).mockClear()
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test.each([
    [`title`, `Test tooltip`],
    [`aria-label`, `Aria label tooltip`],
    [`data-title`, `Data title tooltip`],
  ])(`creates tooltip for element with %s attribute`, (attr, value) => {
    const element = create_element(`div`, { [attr]: value })
    container.appendChild(element)

    titles_as_tooltips(container)

    expect(tippy).toHaveBeenCalledWith(
      element,
      expect.objectContaining({
        content: value,
        allowHTML: true,
        placement: `bottom`,
      }),
    )
    expect(element.getAttribute(`title`)).toBeNull()
    expect(element.getAttribute(`data-title`)).toBe(value)
  })

  test(`replaces \\r with <br/> in tooltip content`, () => {
    const element = create_element(`div`, { title: `Line 1\rLine 2` })
    container.appendChild(element)

    titles_as_tooltips(container)

    expect(tippy).toHaveBeenCalledWith(
      element,
      expect.objectContaining({
        content: `Line 1<br/>Line 2`,
        allowHTML: true,
      }),
    )
  })

  test(`applies custom params to tooltip`, () => {
    const element = create_element(`div`, { title: `Custom params test` })
    container.appendChild(element)

    titles_as_tooltips(container, { placement: `top`, arrow: true })

    expect(tippy).toHaveBeenCalledWith(
      element,
      expect.objectContaining({
        placement: `top`,
        arrow: true,
      }),
    )
  })

  test(`creates tooltips for multiple elements`, () => {
    const element1 = create_element(`div`, { title: `Tooltip 1` })
    const element2 = create_element(`div`, { title: `Tooltip 2` })
    container.appendChild(element1)
    container.appendChild(element2)

    titles_as_tooltips(container)

    expect(tippy).toHaveBeenCalledTimes(2)
  })

  test(`updates tooltips when update function is called`, () => {
    const element = create_element(`div`, { title: `Initial tooltip` })
    container.appendChild(element)

    const { update } = titles_as_tooltips(container)

    update({ placement: `top` })

    const instance = vi.mocked(tippy).mock.results[0].value

    expect(instance.setProps).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: `top`,
      }),
    )
  })

  test(`destroys tooltips and restores original titles`, () => {
    const element = create_element(`div`, { title: `Test tooltip` })
    container.appendChild(element)

    const { destroy } = titles_as_tooltips(container)

    destroy()

    const instance = vi.mocked(tippy).mock.results[0].value
    expect(instance.destroy).toHaveBeenCalled()
    expect(element.getAttribute(`title`)).toBe(`Test tooltip`)
    expect(element.getAttribute(`data-title`)).toBeNull()
  })

  test(`handles elements without title attributes`, () => {
    const element = create_element(`div`)
    container.appendChild(element)

    titles_as_tooltips(container)

    expect(tippy).not.toHaveBeenCalled()
  })

  test(`only shows one tooltip at a time`, () => {
    const element1 = create_element(`div`, { title: `Tooltip 1` })
    const element2 = create_element(`div`, { title: `Tooltip 2` })
    container.appendChild(element1)
    container.appendChild(element2)

    let onShowCallback: ((instance: Instance) => void) | undefined

    vi.mocked(tippy).mockImplementation((_, options) => {
      onShowCallback = options.onShow
      return { hide: vi.fn() }
    })

    titles_as_tooltips(container)

    const instance1 = vi.mocked(tippy).mock.results[0].value
    const instance2 = vi.mocked(tippy).mock.results[1].value

    onShowCallback?.(instance1 as Instance)
    onShowCallback?.(instance2 as Instance)

    expect(instance1.hide).toHaveBeenCalledOnce()
    expect(instance2.hide).not.toHaveBeenCalled()
  })
})
