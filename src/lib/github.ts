// GitHubAPIの呼び出しに必要なヘッダーを構築
export const buildGitHubHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    return headers;
};
