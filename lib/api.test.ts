import { getPostBySlug, getAllPosts } from './api'
import fs from 'fs'
import { join } from 'path'

jest.mock('fs')

describe('api', () => {
  const postsDirectory = join(process.cwd(), '_posts')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get post by slug', () => {
    const slug = 'hello-world'
    const fileContents = `---
title: 'Hello World'
date: '2020-03-16T05:35:07.322Z'
author:
  name: 'JJ Kasper'
  picture: '/assets/blog/authors/jj.jpeg'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/hello-world/cover.jpg'
---

Hello world content
`
    ;(fs.readFileSync as jest.Mock).mockReturnValue(fileContents)

    const post = getPostBySlug(slug, ['title', 'slug', 'content'])

    expect(post.title).toBe('Hello World')
    expect(post.slug).toBe('hello-world')
    expect(post.content).toBe('\nHello world content\n')
  })

  test('should get all posts', () => {
    const slug1 = 'hello-world'
    const slug2 = 'dynamic-routing'
    ;(fs.readdirSync as jest.Mock).mockReturnValue([`${slug1}.md`, `${slug2}.md`])

    ;(fs.readFileSync as jest.Mock).mockImplementation((path) => {
        if (path.includes(slug1)) {
            return `---
title: 'Hello World'
date: '2020-03-16T05:35:07.322Z'
---
Hello world content`
        }
        if (path.includes(slug2)) {
             return `---
title: 'Dynamic Routing'
date: '2020-03-17T05:35:07.322Z'
---
Dynamic Routing content`
        }
        return ''
    })

    const posts = getAllPosts(['title', 'date', 'slug'])

    expect(posts.length).toBe(2)
    expect(posts[0].slug).toBe(slug2) // Sorted by date desc
    expect(posts[1].slug).toBe(slug1)
  })
})
