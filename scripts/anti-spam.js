import fs from "node:fs";

const parseBlockedTerms = (value) =>
  (value || "")
    .split(/\r?\n|,/)
    .map((term) => term.trim().toLocaleLowerCase())
    .filter(Boolean);

const deleteIssue = async (issueId) => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${process.env.GH_TOKEN}`,
      "content-type": "application/json",
      "user-agent": "azot-issue-moderation",
    },
    body: JSON.stringify({
      query: `
        mutation DeleteIssue($issueId: ID!) {
          deleteIssue(input: { issueId: $issueId }) {
            repository {
              id
            }
          }
        }
      `,
      variables: {
        issueId,
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    throw new Error(
      `GitHub GraphQL deleteIssue failed with status ${response.status}: ${JSON.stringify(payload.errors || payload)}`,
    );
  }
};

const main = async () => {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const issue = event.issue;
  const blockedTerms = parseBlockedTerms(process.env.BLACKLIST);

  if (blockedTerms.length === 0) {
    console.log("No blocked issue terms configured.");
    return;
  }

  const issueText = `${issue.title || ""}\n${issue.body || ""}`.toLocaleLowerCase();

  if (!blockedTerms.some((term) => issueText.includes(term))) {
    console.log("Issue did not match configured deletion rules.");
    return;
  }

  await deleteIssue(issue.node_id);

  console.log(`Deleted issue #${issue.number}.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
