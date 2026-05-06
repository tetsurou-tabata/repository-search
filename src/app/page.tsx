"use client";
import useSWRInfinite from "swr/infinite";
import { useRef, useMemo } from "react";
import RepositoryItem from "@/components/RepositoryItem";
import { SearchRepositoriesResponse, GitHubRepository } from "@/types/github";
import { Loader, ErrorMessage } from "@/components/Utils";
import { useSearchConditionStore } from "@/store/useSearchConditionStore";
import { fetcher } from "@/lib/fetcher";

export default function Home() {
    const queryInputRef = useRef<HTMLInputElement>(null);
    const query = useSearchConditionStore((state) => state.query);
    const setQuery = useSearchConditionStore((state) => state.setQuery);

    const getKey = (pageIndex: number, previousPageData: SearchRepositoriesResponse | null) => {
        if (!query.trim()) return null;

        // 前ページが空なら次ページを止める
        if (previousPageData && (previousPageData.items?.length ?? 0) === 0) return null;

        const page = pageIndex + 1;
        return `/api/search?q=${encodeURIComponent(query)}&page=${page}`;
    };

    const { data, setSize, error, isLoading, isValidating } = useSWRInfinite<SearchRepositoriesResponse>(getKey, fetcher, {
        revalidateOnFocus: false, // フォーカス時の再取得を無効化
        dedupingInterval: 30 * 60 * 1000, // 再取得の時間を30分に設定
        revalidateFirstPage: false,
    });

    // useSWRInfiniteからのデータはページごとに分かれているためフラットにする
    const repositories = useMemo(() => data?.flatMap((page) => page.items ?? []) ?? [], [data]);

    // 次のページがあるかどうか
    const totalCount = data?.[0]?.total_count ?? 0;
    const hasNextPage = repositories.length > 0 && repositories.length < totalCount;

    const search = () => {
        if (queryInputRef.current && !isLoading) {
            setQuery(queryInputRef.current.value);
            setSize(1);
        }
    };

    return (
        <>
            <form
                className="flex items-center mb-5 gap-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    search();
                }}
            >
                <input type="text" name="query" ref={queryInputRef} defaultValue={query} placeholder="キーワードを入力してください。" className="border border-zinc-500 rounded-md py-2 px-4 flex-1" autoComplete="query" />
                <button type="submit" className="bg-amber-50 rounded-md py-2 px-5 text-black font-medium cursor-pointer min-w-30">
                    {isLoading ? "検索中..." : "検索"}
                </button>
            </form>
            {isLoading && (
                <div className="flex justify-center mb-5">
                    <Loader text="検索中..." />
                </div>
            )}
            {error && <ErrorMessage message="データの取得に失敗しました。" detail={error.message} />}
            {repositories && repositories.length > 0 && (
                <>
                    <div className="grid gap-5">
                        {repositories.map((item: GitHubRepository) => (
                            <RepositoryItem key={item.id} repository={item} />
                        ))}
                    </div>

                    {hasNextPage && (
                        <div className="flex items-center justify-center mt-10">
                            {isValidating ? (
                                <Loader text="読み込み中..." />
                            ) : (
                                <button className="w-full border border-zinc-500 cursor-pointer py-4 rounded-md text-sm" onClick={() => setSize((prev) => prev + 1)}>
                                    さらに読み込む
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
