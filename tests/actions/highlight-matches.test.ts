import { highlight_matches } from '$lib/actions'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mockHighlightsSet = vi.fn()
const mockHighlightsClear = vi.fn()
global.CSS = {
  highlights: { set: mockHighlightsSet, clear: mockHighlightsClear },
} as unknown

const RangeMock = vi
  .fn()
  .mockImplementation(() => ({ setStart: vi.fn(), setEnd: vi.fn() }))
global.Range = RangeMock as unknown
global.Highlight = class {} as unknown

describe(`highlight_matches`, () => {
  let testNode: HTMLElement

  beforeEach(() => {
    testNode = document.createElement(`div`)
    testNode.innerHTML = `<p>This is a test paragraph with some text to highlight.</p>`
    document.body.appendChild(testNode)
  })

  afterEach(() => {
    document.body.removeChild(testNode)
    vi.clearAllMocks()
  })

  test.each([
    [`applies highlights correctly`, { query: `test` }, true, 1],
    [
      `does not apply highlights when disabled`,
      { query: `test`, disabled: true },
      false,
      0,
    ],
    [
      `uses custom CSS class`,
      { query: `test`, css_class: `custom-highlight` },
      true,
      1,
      `custom-highlight`,
    ],
    [`handles empty query`, { query: `` }, false, 0],
  ])(
    `%s`,
    (_, options, shouldSet, setCallCount, cssClass = `highlight-match`) => {
      highlight_matches(testNode, options)
      expect(mockHighlightsClear).toHaveBeenCalled()
      if (shouldSet) {
        expect(mockHighlightsSet).toHaveBeenCalledWith(
          cssClass,
          expect.any(Highlight),
        )
      } else expect(mockHighlightsSet).not.toHaveBeenCalled()
      expect(mockHighlightsSet).toHaveBeenCalledTimes(setCallCount)
    },
  )

  test(`handles node_filter`, () => {
    const nodeFilter = vi.fn().mockReturnValue(NodeFilter.FILTER_ACCEPT)
    highlight_matches(testNode, { query: `test`, node_filter: nodeFilter })
    expect(nodeFilter).toHaveBeenCalled()
    expect(mockHighlightsSet).toHaveBeenCalled()
  })

  test(`update function works correctly`, () => {
    const action = highlight_matches(testNode, { query: `test` })
    action.update({ query: `paragraph` })
    expect(mockHighlightsClear).toHaveBeenCalledTimes(2)
    expect(mockHighlightsSet).toHaveBeenCalledTimes(2)
  })

  test.each([
    [`handles multiple occurrences`, `<p>Test test test</p>`, 3],
    [`is case insensitive`, `<p>Test TEST test</p>`, 3],
  ])(`%s`, (_, innerHTML, expectedRanges) => {
    testNode.innerHTML = innerHTML
    highlight_matches(testNode, { query: `test` })
    expect(mockHighlightsSet).toHaveBeenCalledWith(
      `highlight-match`,
      expect.any(Highlight),
    )
    expect(RangeMock).toHaveBeenCalledTimes(expectedRanges)
  })
})
