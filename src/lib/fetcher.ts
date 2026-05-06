import { ApiErrorBody } from "@/types/github";

export const fetcher = async <T extends object>(url: string): Promise<T> => {
    const res = await fetch(url);
    const data = (await res.json()) as T | ApiErrorBody;
    if (!res.ok) {
        const message = "error" in data ? data.error || data.message || `API Error: ${res.status}` : `API Error: ${res.status}`;
        throw new Error(message);
    }
    return data as T;
};
