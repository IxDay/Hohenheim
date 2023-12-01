const { Octokit } = require("octokit")
const utils = require('./utils')
const octokit = new Octokit()


const list = async () => {
  try {
    // const response = await octokit.rest.repos.get({owner: "github", repo: "docs"})
    // const response = await octokit.rest.git.getTree({owner: "github", repo: "docs", tree_sha: "main"})
    utils.pp(response)
    // console.log({ message: "success!", data: response })
  } catch (error) {
    console.log({ message: "error", error })
  }
}

const files = async (owner, repo) => {
  const args = {owner: owner, repo: repo, tree_sha: "HEAD", recursive: true}
  // const details = await octokit.rest.repos.get(args)
  // args.tree_sha = details.data.default_branch
  return octokit.rest.git.getTree(args)
}

const repos = async (owner) => {
  const response = await octokit.rest.repos.listForOrg({ org: owner });
  utils.pp(response)
}

const docs = async (owner, repo) => {
  const response = await files(owner, repo)
  response.data.tree.forEach((file) => {
    utils.pp(file)
  })
}

const main = async () => {
  await docs("kubernetes", "kops")
}

main()
