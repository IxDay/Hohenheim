require("dotenv").config()

const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })
const utils = require('./utils')
const catalog = require('./catalog')
const github = require('./github')
const martian = require('@tryfabric/martian')

const pageId = process.env.NOTION_PAGE_ID
// const title = request.body.dbName

block = {
  quote: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: 'This page contains a list of your services generated by Catbus. It is automatically locked up and not meant to be modified by users.',
        },
      }
    ],
    color: 'default'
  }
}

const cb = async (path, content) => {
  const response = await notion.blocks.children.append({
      block_id: pageId,
      children: martian.markdownToBlocks(content)
  })
  // utils.pp(response)
}

const main = async () => {
  try {
    // const response = await notion.blocks.children.list({block_id: pageId, page_size: 50});
    // const response = await notion.databases.retrieve({database_id: "57abb306-4c41-49cc-8e94-9762662d473e"})
    // const response = await notion.pages.retrieve({ page_id: pageId });
    // const response = await catalog.post(notion, pageId)
    // const response = await notion.blocks.children.append({
    //   block_id: pageId,
    //   children: [
    //     block
    //   ]
    // })

    const args = {owner: "ixday", repo: "hohenheim", docs: "tests", cb}
    const files = await github.docs(args)
    // utils.pp(response)
    // console.log({ message: "success!", data: response })
  } catch (error) {
    console.log({ message: "error", error })
  }
}

main()
