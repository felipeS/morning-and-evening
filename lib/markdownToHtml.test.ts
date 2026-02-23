import markdownToHtml from './markdownToHtml'
import { remark } from 'remark'

// Mock remark and remark-html to avoid ESM issues in Jest
jest.mock('remark', () => {
    const mRemark = {
        use: jest.fn().mockReturnThis(),
        process: jest.fn().mockResolvedValue({
            toString: () => '<h1>Hello World</h1>'
        })
    }
    return {
        remark: jest.fn().mockReturnValue(mRemark)
    }
})

jest.mock('remark-html', () => ({}))

describe('markdownToHtml', () => {
  it('should convert markdown to html', async () => {
    const markdown = '# Hello World'
    const htmlOutput = await markdownToHtml(markdown)

    expect(remark).toHaveBeenCalled()
    expect(htmlOutput).toContain('<h1>Hello World</h1>')
  })
})
