import { NextRequest, NextResponse } from "next/server";
import { buildGitHubHeaders } from "@/lib/github";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const params = request.nextUrl.searchParams;

        const idRaw = params.get("id") ?? "";
        const id = Number(idRaw);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                {
                    message: "idパラメータの値が不正です。",
                    error: "Missing required parameter: id",
                },
                { status: 400 },
            );
        }

        const url = new URL(`https://api.github.com/repositories/${idRaw}`);

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
