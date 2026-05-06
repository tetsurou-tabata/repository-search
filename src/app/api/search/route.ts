import { NextRequest, NextResponse } from "next/server";
import { buildGitHubHeaders } from "@/lib/github";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const params = request.nextUrl.searchParams;

        const query = params.get("q")?.trim() ?? "";
        if (!query) {
            return NextResponse.json(
                {
                    message: "qパラメータは必須です。",
                    error: "Missing required parameter: q",
                },
                { status: 400 },
            );
        }

        // ページ数
        const pageRaw = params.get("page") ?? "1";
        const page = Number(pageRaw);

        // pageは正の整数のみ許可
        if (!Number.isInteger(page) || page < 1) {
            return NextResponse.json(
                {
                    message: "pageは1以上の整数で指定してください。",
                    error: "Invalid parameter: page",
                },
                { status: 400 },
            );
        }

        const url = new URL("https://api.github.com/search/repositories");
        url.searchParams.set("q", query);
        url.searchParams.set("sort", "stars");
        url.searchParams.set("order", "desc");
        url.searchParams.set("per_page", "20");
        url.searchParams.set("page", String(page));

        const response = await fetch(url.toString(), {
            headers: buildGitHubHeaders(),
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message || "GitHub API Error",
                    error: data?.errors ?? null,
                },
                { status: response.status || 500 },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
};
