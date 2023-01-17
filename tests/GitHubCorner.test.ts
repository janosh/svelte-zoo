import { GitHubCorner } from '$lib'
import { repository } from '$root/package.json'
import { doc_query } from 'tests'
import { expect, test } from 'vitest'

test.each([[`top-left`], [`top-right`], [`bottom-left`], [`bottom-right`]])(
  `GitHubCorner`,
  (corner) => {
    const props = {
      href: repository,
      title: `Fancy words`,
      ariaLabel: `Click here for riches`,
      target: `_blank`,
      corner,
      style: `z-index: 42;`,
    }
    const { href, title, ariaLabel, target } = props
    new GitHubCorner({ target: document.body, props })

    expect(
      doc_query(
        `a[href='${href}'][target='${target}'][title='${title}'][aria-label='${ariaLabel}']`
      )
    ).toBeInstanceOf(HTMLAnchorElement)
  }
)
