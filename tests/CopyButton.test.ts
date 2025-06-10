import { CopyButton } from '$lib'
import { mount } from 'svelte'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe(`CopyButton`, () => {
  let target: HTMLElement
  let mock_clipboard: { writeText: vi.Mock }

  beforeEach(() => {
    target = document.body
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

    expect(button).toBeTruthy()
    expect(icon).toBeTruthy()
    // The innerHTML contains &nbsp;Copy which becomes \u00A0Copy in textContent
    expect(button?.innerHTML).toContain(`&nbsp;Copy`)
  })

  test(`copies content to clipboard`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)
    mount(CopyButton, { target, props: { content: `test content` } })

    target.querySelector(`button`)?.click()
    expect(mock_clipboard.writeText).toHaveBeenCalledWith(`test content`)
  })

  test(`handles successful copy`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)
    mount(CopyButton, { target, props: { content: `test` } })

    const button = target.querySelector(`button`)
    expect(button?.innerHTML).toContain(`&nbsp;Copy`) // initial state

    button?.click()
    expect(mock_clipboard.writeText).toHaveBeenCalledWith(`test`)

    await vi.runOnlyPendingTimersAsync()
    expect(mock_clipboard.writeText).toHaveBeenCalledTimes(1)
  })

  test(`handles clipboard error`, async () => {
    mock_clipboard.writeText.mockRejectedValueOnce(new Error(`Failed`))
    const console_spy = vi.spyOn(console, `error`).mockImplementation(() => {})

    mount(CopyButton, { target, props: { content: `test` } })

    const button = target.querySelector(`button`)
    expect(button?.innerHTML).toContain(`&nbsp;Copy`) // initial state

    button?.click()
    await vi.runOnlyPendingTimersAsync()

    // Verify error was logged and clipboard was attempted
    expect(console_spy).toHaveBeenCalled()
    expect(mock_clipboard.writeText).toHaveBeenCalledWith(`test`)
  })

  test(`renders custom labels`, () => {
    const custom_labels = {
      default: { icon: `Copy` as const, text: `CustomCopy` },
      success: { icon: `Check` as const, text: `CustomCopied` },
      error: { icon: `Alert` as const, text: `CustomError` },
    }
    mount(CopyButton, { target, props: { labels: custom_labels } })

    const button = target.querySelector(`button`)
    expect(button?.textContent?.trim()).toBe(`CustomCopy`)
  })

  test(`applies custom styles`, () => {
    mount(CopyButton, { target, props: { style: `background-color: red;` } })
    expect(target.querySelector(`button`)?.style.backgroundColor).toBe(`red`)
  })

  test(`renders as different element`, () => {
    mount(CopyButton, { target, props: { as: `div` } })
    expect(target.querySelector(`div`)).toBeTruthy()
    expect(target.querySelector(`button`)).toBeFalsy()
  })

  test(`handles empty content`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)
    mount(CopyButton, { target, props: { content: `` } })

    target.querySelector(`button`)?.click()
    expect(mock_clipboard.writeText).toHaveBeenCalledWith(``)
  })

  test(`handles undefined content`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)
    mount(CopyButton, { target })

    target.querySelector(`button`)?.click()
    expect(mock_clipboard.writeText).toHaveBeenCalledWith(``)
  })

  test(`resets state after timeout`, async () => {
    mock_clipboard.writeText.mockResolvedValueOnce(undefined)
    mount(CopyButton, { target })

    target.querySelector(`button`)?.click()
    await vi.runOnlyPendingTimersAsync()
    await vi.advanceTimersByTimeAsync(2000)

    expect(target.querySelector(`button`)?.innerHTML).toContain(`&nbsp;Copy`)
  })

  test(`doesn't render button when global`, () => {
    mount(CopyButton, { target, props: { global: true } })
    expect(target.querySelector(`button`)).toBeFalsy()
  })

  test(`doesn't render button with global_selector`, () => {
    mount(CopyButton, { target, props: { global_selector: `pre > code` } })
    expect(target.querySelector(`button`)).toBeFalsy()
  })

  test(`applies accessibility attributes`, () => {
    mount(CopyButton, { target })
    const button = target.querySelector(`button`)
    expect(button?.getAttribute(`tabindex`)).toBe(`0`)
    expect(button?.getAttribute(`role`)).toBe(`button`)
  })

  test(`handles multiple rapid clicks`, async () => {
    mock_clipboard.writeText.mockResolvedValue(undefined)
    mount(CopyButton, { target, props: { content: `test` } })
    const button = target.querySelector(`button`)

    button?.click()
    button?.click()
    button?.click()
    await vi.runOnlyPendingTimersAsync()

    expect(mock_clipboard.writeText).toHaveBeenCalledTimes(3)
  })
})
