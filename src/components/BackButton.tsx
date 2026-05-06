"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    const onBack = () => {
        // 履歴がある通常遷移ならブラウザバック同等
        if (window.history.length > 1) {
            router.back();
            return;
        }
        router.push("/");
    };

    return (
        <button onClick={onBack} className="px-2 py-1 text-sm border bg-transparent rounded hover:bg-white hover:text-black cursor-pointer">
            戻る
        </button>
    );
};

export default BackButton;
