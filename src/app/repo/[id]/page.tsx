"use client";
import useSWR from "swr";
import * as React from "react";
import RepoPageTitle from "@/components/RepoPageTitle";
import { GitHubRepository } from "@/types/github";
import StatsArea from "@/components/StatsArea";
import BackButton from "@/components/BackButton";
import { ErrorMessage } from "@/components/Utils";
import { fetcher } from "@/lib/fetcher";

type RepositoryPageProps = {
    params: Promise<{ id: string }>;
};

export default function RepositoryPage({ params }: RepositoryPageProps) {
    const { id } = React.use(params);

    const {
        data: repository,
        error,
        isLoading,
    } = useSWR<GitHubRepository>(id ? `/api/repository?id=${id}` : null, fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 30 * 60 * 1000, // 再取得時間を30分に設定
    });

    if (error) {
        return <ErrorMessage message="リポジトリの情報の取得に失敗しました。" detail={error instanceof Error ? error.message : "Unknown error"} />;
    }

    return (
        <>
            <div className="mb-5">
                <BackButton />
            </div>
            <RepoPageTitle repository={repository ?? null} isLoading={isLoading} />
            <StatsArea repository={repository ?? null} isLoading={isLoading} />
        </>
    );
}
