import { getInput, info, setFailed } from "@actions/core";
import { getOctokit } from "@actions/github";

import { CommitStatusState, getCommitHash, parseRepoName, validateCommitStatusState } from "./utils";

interface Inputs {
  token: string;
  state: CommitStatusState;
  owner: string;
  repo: string;
  sha: string;
  targetUrl?: string;
  artifacts?: string;
  context?: string;
}

const getInputs = (): Inputs => {
  const token = getInput("token", { required: true });
  const state = validateCommitStatusState(getInput("status"));
  const [owner, repo] = parseRepoName(getInput("repo"));
  const sha = getCommitHash(getInput("sha"));
  const targetUrl = getInput("targetUrl");
  const artifacts = getInput("artifacts");
  const context = getInput("context");

  return {
    token,
    state,
    repo,
    owner,
    sha,
    targetUrl,
    artifacts,
    context: context,
  };
};

const run = async (): Promise<void> => {
  try {
    const inputs = getInputs();

    info(
      `Setting commit status for ${inputs.owner}/${inputs.repo}#${inputs.sha} to ${inputs.state} for context ${inputs.context}`,
    );

    const octokit = getOctokit(inputs.token);
    await octokit.rest.repos.createCommitStatus({
      owner: inputs.owner,
      repo: inputs.repo,
      sha: inputs.sha,
      state: inputs.state,
      target_url: inputs.targetUrl,
      description: inputs.artifacts,
      context: inputs.context,
    });
  } catch (error) {
    setFailed((error as Error).message);
  }
};

void run();
