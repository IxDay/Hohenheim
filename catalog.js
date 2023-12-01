const payload = {
  parent: {
    type: "page_id",
  },
  is_inline: true,
  title: [
    {
      type: "text",
      text: {
        content: "Catalog",
      },
    },
  ],
  properties: {
    Kind: {
      rich_text: {},
    },
    Name: {
      title: {},
    },
    Owner: {
      rich_text: {},
    },
    Lifecycle: {
      rich_text: {},
    },
    Tier: {
      rich_text: {},
    },
  },
}

module.exports = {
  post: async (notion, pageId) => notion.databases.create(
    { ...payload, ...{parent: {page_id: pageId }}}
  ),
}
