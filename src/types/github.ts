export type GitHubOwner = {
    login: string;
    avatar_url: string;
    html_url: string;
};

export type GitHubRepository = {
    id: number;
    full_name: string;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;

    stargazers_count: number;
    subscribers_count: number;
    forks_count: number;
    open_issues_count: number;

    owner: GitHubOwner;
};

export type SearchRepositoriesResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepository[];
};

export type ApiErrorBody = {
    message?: string;
    error?: string;
};
