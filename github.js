const { Octokit } = require("octokit")
const utils = require('./utils')
const octokit = new Octokit()

const content = async ({owner, repo, path = "."} = {}) =>
  (await octokit.rest.repos.getContent({owner, repo, path})).data

const repos = async (owner) => {
  const response = await octokit.rest.repos.listForOrg({ org: owner });
  utils.pp(response)
}

const docs = async ({owner, repo, cb = (path, content) => {}} = {}) => {
  (await content({owner, repo})).forEach(async (file) => {
    if (file.name.toUpperCase() === "README.MD") {
      cb(file.path, atob((await content({owner, repo, path: file.name})).content))
    }
  })
}

module.exports = {
  content: content,
  repos: repos,
  docs: docs,
}
