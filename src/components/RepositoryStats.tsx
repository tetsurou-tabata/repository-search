// ナンバーフォーマット関数（例: 1.2K, 3.4M）
function formatNumber(value: number, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(value);
}

export type RepositoryStatsProps = {
    title: string;
    count: number | null;
};

const RepositoryStats = ({ title, count }: RepositoryStatsProps) => {
    return (
        <div className="flex gap-2 border rounded-md px-3 py-1">
            <p className="text-sm">{title}</p>
            <p className="text-sm">{count !== null ? formatNumber(count) : "-"}</p>
        </div>
    );
};

export default RepositoryStats;
