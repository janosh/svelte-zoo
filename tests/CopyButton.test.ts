import { CopyButton } from '$lib'
import { mount, tick } from 'svelte'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe(`CopyButton`, () => {
  let target: HTMLElement
  let mock_clipboard: { writeText: vi.Mock }

  beforeEach(() => {
    target = document.body
    // Mock clipboard API
    mock_clipboard = { writeText: vi.fn() }
    Object.assign(navigator, { clipboard: mock_clipboard })
    vi.useFakeTimers()
  })

  afterEach(() => {
    target.innerHTML = ``
  })

  test(`renders with default props`, () => {
    mount(CopyButton, { target })
    const button = target.querySelector(`button`)
    const icon = button?.querySelector(`svg`)
    const text = button?.querySelector(`span`)

    expect(button).toBeTruthy()
    expect(icon).toBeTruthy()
    expect(text?.textContent).toBe(`Copy`)
  })

  test(`copies content to clipboard on click`, async () => {
    const content = `Test content`
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)

    mount(CopyButton, { target, props: { content } })

    const button = target.querySelector(`button`)
    button?.click()

    expect(mock_clipboard.writeText).toHaveBeenCalledWith(content)
  })

  test(`changes state after successful copy`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)

    mount(CopyButton, { target })
    const button = target.querySelector(`button`)
    button?.click()

    // Wait for the promise to resolve and state to update
    await tick()

    // Check success state
    const success_text = button?.querySelector(`span`)
    expect(success_text?.textContent).toBe(`Copied`)

    // Check if it returns to default state
    await vi.advanceTimersByTimeAsync(2000)
    const default_text = button?.querySelector(`span`)
    expect(default_text?.textContent).toBe(`Copy`)
  })

  test(`handles clipboard error`, async () => {
    mock_clipboard.writeText.mockRejectedValueOnce(new Error(`Clipboard error`))
    const console_spy = vi.spyOn(console, `error`).mockImplementation(() => {})

    mount(CopyButton, { target })
    const button = target.querySelector(`button`)
    button?.click()

    // Wait for the promise to reject and state to update
    await tick()

    // Check error state
    const error_text = button?.querySelector(`span`)
    expect(error_text?.textContent).toBe(`Error`)
    expect(console_spy).toHaveBeenCalled()

    // Check if it returns to default state
    await vi.advanceTimersByTimeAsync(2000)
    const default_text = button?.querySelector(`span`)
    expect(default_text?.textContent).toBe(`Copy`)
  })

  test(`renders custom labels`, () => {
    const custom_labels = {
      default: { icon: `CustomCopy`, text: `CustomCopy` },
      success: { icon: `CustomCheck`, text: `CustomCopied` },
      error: { icon: `CustomAlert`, text: `CustomError` },
    }
    mount(CopyButton, { target, props: { labels: custom_labels } })

    const text = target.querySelector(`span`)
    expect(text?.textContent).toBe(`CustomCopy`)
  })

  test(`applies custom styles`, () => {
    const customStyle = `background-color: red;`
    mount(CopyButton, { target, props: { style: customStyle } })

    const button = target.querySelector(`button`)
    expect(button?.style.backgroundColor).toBe(`red`)
  })

  test(`renders as different element when "as" prop is provided`, () => {
    mount(CopyButton, { target, props: { as: `div` } })

    const element = target.querySelector(`div`)
    expect(element).toBeTruthy()
    expect(target.querySelector(`button`)).toBeFalsy()
  })

  test(`respects skip_selector when creating global buttons`, async () => {
    document.body.innerHTML = `
      <pre><code>test code</code><button>Existing Button</button></pre>
    `
    mount(CopyButton, {
      target,
      props: { global: true, skip_selector: `button` },
    })

    // Simulate navigation
    const navigateCallback = vi.fn()
    navigateCallback()

    // Should not add new button because pre already has one
    const buttons = document.querySelectorAll(`pre button`)
    expect(buttons.length).toBe(1)
  })
})
