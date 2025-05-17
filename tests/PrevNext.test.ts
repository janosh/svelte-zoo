import { goto } from '$app/navigation'
import { PrevNext } from '$lib'
import { mount } from 'svelte'
import { afterEach, expect, test, vi } from 'vitest'

// Mock $app/navigation
vi.mock(`$app/navigation`, () => ({
  goto: vi.fn(),
}))

const items = [`page1`, `page2`, `page3`, `page4`]
const items_with_labels = [
  [`page1`, `First Page`],
  [`page2`, `Second Page`],
  [`page3`, `Third Page`],
  [`page4`, `Fourth Page`],
] as const

test(`renders nothing when less than 3 items`, () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items: [`page1`, `page2`], current: `page1` },
  })
  expect(target.querySelector(`nav`)).toBeNull()
})

test(`renders navigation with prev/next links`, () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items, current: `page2` },
  })

  const links = target.querySelectorAll(`a`)
  expect(links.length).toBe(2)
  expect(links[0].getAttribute(`href`)).toBe(`page1`)
  expect(links[1].getAttribute(`href`)).toBe(`page3`)
})

test(`wraps around at the ends`, () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items, current: `page1` },
  })

  const links = target.querySelectorAll(`a`)
  expect(links[0].getAttribute(`href`)).toBe(`page4`) // prev wraps to last
  expect(links[1].getAttribute(`href`)).toBe(`page2`) // next is page2
})

test(`handles custom titles`, () => {
  const target = document.body
  const titles = { prev: `Back`, next: `Forward` }
  mount(PrevNext, {
    target,
    props: { items, current: `page2`, titles },
  })

  const spans = target.querySelectorAll(`span`)
  expect(spans[0].textContent).toBe(`Back`)
  expect(spans[1].textContent).toBe(`Forward`)
})

test(`handles keyboard navigation`, async () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items, current: `page2` },
  })

  window.dispatchEvent(new KeyboardEvent(`keyup`, { key: `ArrowLeft` }))
  expect(goto).toHaveBeenCalledWith(`page1`, {
    replaceState: true,
    noScroll: true,
  })

  window.dispatchEvent(new KeyboardEvent(`keyup`, { key: `ArrowRight` }))
  expect(goto).toHaveBeenCalledWith(`page3`, {
    replaceState: true,
    noScroll: true,
  })
})

test(`handles custom node element`, () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items, current: `page2`, node: `div` },
  })

  expect(target.querySelector(`div.prev-next`)).not.toBeNull()
  expect(target.querySelector(`nav`)).toBeNull()
})

test(`handles items with labels`, () => {
  const target = document.body
  mount(PrevNext, {
    target,
    props: { items: items_with_labels, current: `page2` },
  })

  const links = target.querySelectorAll(`a`)
  expect(links[0].getAttribute(`href`)).toBe(`page1`)
  expect(links[1].getAttribute(`href`)).toBe(`page3`)
})

test.each([
  [`verbose`, [`page1`], `warn`],
  [`errors`, [`page1`, `page2`, `page3`], `error`],
  [`silent`, [`page1`], null],
] as const)(
  `log=%s mode handles %i items with %s`,
  async (log, test_items, level) => {
    const warn = vi.spyOn(console, `warn`)
    const error = vi.spyOn(console, `error`)

    mount(PrevNext, {
      target: document.body,
      props: { items: test_items, current: `invalid`, log },
    })

    if (level === `warn`) {
      expect(warn).toHaveBeenCalledWith(
        `PrevNext received 1 items - minimum of 2 expected`,
      )
    } else if (level === `error`) {
      expect(error).toHaveBeenCalledWith(
        expect.stringContaining(`PrevNext received invalid current=invalid`),
      )
    } else {
      expect(warn).not.toHaveBeenCalled()
      expect(error).not.toHaveBeenCalled()
    }

    warn.mockRestore()
    error.mockRestore()
  },
)

test(`handles custom goto options`, () => {
  const target = document.body
  const goto_options = { replaceState: false, noScroll: false }
  mount(PrevNext, {
    target,
    props: { items, current: `page2`, goto_options },
  })

  window.dispatchEvent(new KeyboardEvent(`keyup`, { key: `ArrowLeft` }))
  expect(goto).toHaveBeenCalledWith(`page1`, goto_options)
})

test(`handles custom keyup handler`, () => {
  const target = document.body
  const onkeyup = vi.fn(({ prev, next }) => ({
    PageUp: prev[0],
    PageDown: next[0],
  }))

  mount(PrevNext, { target, props: { items, current: `page2`, onkeyup } })

  window.dispatchEvent(new KeyboardEvent(`keyup`, { key: `PageUp` }))
  expect(goto).toHaveBeenCalledWith(`page1`, expect.any(Object))

  window.dispatchEvent(new KeyboardEvent(`keyup`, { key: `PageDown` }))
  expect(goto).toHaveBeenCalledWith(`page3`, expect.any(Object))
})

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = ``
  vi.clearAllMocks()
})
