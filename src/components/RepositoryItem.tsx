import Link from "next/link";
import Image from "next/image";
import { GitHubRepository } from "@/types/github";

const RepositoryItem = ({ repository }: { repository: GitHubRepository }) => {
    return (
        <Link href={`/repo/${repository.id}`} className="group w-full border rounded-md border-zinc-500 p-5 flex items-center gap-5 hover:border-white">
            <div className="rounded-full bg-zinc-500 w-12 aspect-square overflow-hidden border">{repository.owner.avatar_url && <Image src={repository.owner.avatar_url} alt={`${repository.owner.login}'s avatar`} width={48} height={48} className="object-cover w-full h-full" />}</div>
            <div className="flex-1">
                <span className="font-bold break-all line-clamp-2 group-hover:underline">{repository.full_name}</span>
            </div>
        </Link>
    );
};

export default RepositoryItem;
