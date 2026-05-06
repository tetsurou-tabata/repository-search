import RepositoryStats from "@/components/RepositoryStats";
import type { GitHubRepository } from "@/types/github";

type StatsAreaProps = {
    repository: GitHubRepository | null;
    isLoading?: boolean;
};

const StatsArea = ({ repository, isLoading = false }: StatsAreaProps) => {
    if (isLoading || !repository) {
        return <div className="w-full max-w-md h-6 rounded-md skeleton"></div>;
    }
    return (
        <div className="flex gap-3 flex-wrap">
            <RepositoryStats title="Watch" count={repository.subscribers_count} />
            <RepositoryStats title="Fork" count={repository.forks_count} />
            <RepositoryStats title="Star" count={repository.stargazers_count} />
            <RepositoryStats title="Issue" count={repository.open_issues_count} />
        </div>
    );
};

export default StatsArea;
