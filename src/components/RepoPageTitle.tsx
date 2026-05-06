import Image from "next/image";
import { GitHubRepository } from "@/types/github";

type RepoPageTitleProps = {
    repository: GitHubRepository | null;
    isLoading?: boolean;
};

const RepoPageTitle = ({ repository, isLoading = false }: RepoPageTitleProps) => {
    // ロード中の表示
    if (isLoading || !repository) {
        return (
            <div className="flex items-center gap-5 mb-5" aria-busy="true" aria-label="Loading repository title">
                <div className="rounded-full w-12 aspect-square border skeleton" />
                <div className="space-y-2">
                    <div className="h-6 w-56 rounded skeleton" />
                    <div className="h-4 w-24 rounded skeleton" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-5 mb-5">
            <div className="rounded-full bg-amber-50 w-12 aspect-square overflow-hidden border">{repository.owner.avatar_url && <Image src={repository.owner.avatar_url} alt={`${repository.owner.login}'s avatar`} width={48} height={48} className="object-cover w-full h-full" />}</div>
            <div className="flex-1">
                <h1 className="font-bold text-2xl break-all">{repository.full_name}</h1>
                <p className="text-gray-300">{repository.language ? repository.language : "-"}</p>
            </div>
        </div>
    );
};

export default RepoPageTitle;
