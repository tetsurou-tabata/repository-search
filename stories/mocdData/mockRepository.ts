import type { GitHubRepository } from "@/types/github";

export const mockRepository: GitHubRepository = {
    id: 123456,
    name: "repository-search",
    full_name: "tetsu/repository-search",
    html_url: "https://github.com/tetsu/repository-search",
    description: "GitHub repository search app built with Next.js",
    stargazers_count: 420,
    language: "TypeScript",
    forks_count: 21,
    open_issues_count: 5,
    subscribers_count: 10,
    owner: {
        login: "tetsu",
        avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
        html_url: "https://github.com/tetsu",
    },
};
