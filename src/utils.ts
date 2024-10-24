import { context } from "@actions/github";

export type CommitStatusState = "error" | "failure" | "pending" | "success";

const getSHA = (): string | null => {
  if (context.eventName === "pull_request") {
    return context.payload.pull_request?.head.sha;
  }
  if (context.eventName === "push") {
    return context.sha;
  }
  return null;
};

export const validateCommitStatusState = (state: string): CommitStatusState => {
  const allowedStates: Record<CommitStatusState, boolean> = {
    error: true,
    failure: true,
    pending: true,
    success: true,
  };

  if (state === "cancelled") {
    return "error";
  }

  if (!(state in allowedStates)) {
    throw new Error(`state must be one of "error", "failure", "pending", "success"`);
  }

  return state as CommitStatusState;
};

export const getCommitHash = (sha: string) => {
  const commit = sha || getSHA();
  if (!commit) {
    throw new Error("Unable to determine the commit hash. Please provide the `sha` parameter");
  }

  return commit;
};

export const parseRepoName = (repository: string): Array<string> => {
  if (repository) {
    return repository.split("/", 2);
  }

  const { owner, repo } = context.repo;
  return [owner, repo];
};
