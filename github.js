const { Octokit } = require("octokit")
const utils = require('./utils')
const octokit = new Octokit()

const content = async ({owner, repo, path = "."} = {}) =>
  (await octokit.rest.repos.getContent({owner, repo, path})).data

const repos = async (owner) => {
  const response = await octokit.rest.repos.listForOrg({ org: owner });
  utils.pp(response)
}

const docs = async ({owner, repo, docs = "docs", cb = async(path, content) => {}} = {}) => {
  const readmeFilter = (file) => file.name.toUpperCase() === "README.MD"
  const docsFilter = (file) => file.name.toUpperCase().endsWith(".MD")
  const cbMap = async (file) => {
    const response = await content({owner, repo, path: file.path})
    await cb(file.path, atob(response.content))
  }

  const index = await content({owner, repo})
  index.filter(readmeFilter).map(cbMap)
  const dir = await content({owner, repo, path: docs})
  dir.filter(docsFilter).map(cbMap)
}

module.exports = {
  content: content,
  repos: repos,
  docs: docs,
}
