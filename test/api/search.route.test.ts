import { describe, test, expect, beforeEach, afterEach, mock } from "bun:test";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/search/route";

const originalEnv = { ...process.env };
const originalFetch = global.fetch;

const targetApi = "http://localhost:3000/api/search";

describe("GET /api/search", () => {
    // 各テストで環境変数とfetchをリセット
    beforeEach(() => {
        process.env = { ...originalEnv };
        global.fetch = originalFetch;
        mock.restore();
    });

    // 各テスト後に環境変数とfetchを元に戻す
    afterEach(() => {
        process.env = { ...originalEnv };
        global.fetch = originalFetch;
        mock.restore();
    });

    test("qがない場合 400を返す", async () => {
        const url = new URL(targetApi);
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 400エラーが返されることを確認
        expect(res.status).toBe(400);

        const body = await res.json();
        // errorプロパティが含まれていることを確認
        expect(body).toHaveProperty("error");
        // messageプロパティが含まれることを確認
        expect(body).toHaveProperty("message");
    });

    test("qが空白の場合 400を返す", async () => {
        const url = new URL(targetApi);
        url.searchParams.set("q", "");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("qがある場合 200を返す", async () => {
        // 外部APIへの依存をなくすためにモックを作成する
        global.fetch = mock(async () => new Response(JSON.stringify({ items: [], total_count: 0, incomplete_results: false }), { status: 200 })) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 200が返されることを確認
        expect(res.status).toBe(200);

        const body = await res.json();
        // itemsプロパティが含まれていることを確認
        expect(body).toHaveProperty("items");
        // total_countが0以上
        expect(body.total_count).toBeGreaterThanOrEqual(0);
    });

    test("pageが負数の場合 400を返す", async () => {
        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        url.searchParams.set("page", "-1");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("pageが数値でない場合 400を返す", async () => {
        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        url.searchParams.set("page", "abc");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("pageが小数の場合 400を返す", async () => {
        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        url.searchParams.set("page", "1.5");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("1000件目以降のデータを取得しようとした場合", async () => {
        // 外部APIへの依存をなくすためにモックを作成する
        global.fetch = mock(async () => new Response(JSON.stringify({ message: "Only the first 1000 search results are available", error: null }), { status: 422 })) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        // per_pageが20固定なのでpageを51にする
        url.searchParams.set("page", "51");
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 422が返されることを確認
        expect(res.status).toBe(422);

        const body = await res.json();
        // messageプロパティが含まれることを確認
        expect(body).toHaveProperty("message");
        // errorプロパティが含まれていることを確認
        expect(body).toHaveProperty("error");
    });

    test("1000件目以下は許可される", async () => {
        // 外部APIへの依存をなくすためにモックを作成する
        global.fetch = mock(async () => new Response(JSON.stringify({ items: [], total_count: 0, incomplete_results: false }), { status: 200 })) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        url.searchParams.set("page", "50");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(Array.isArray(body.items)).toBe(true);
    });

    test("fetchが例外を投げた場合 500を返す", async () => {
        // 強制的に500を返すようにmockを作成
        global.fetch = mock(async () => {
            throw new Error("network failure");
        }) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("q", "react");
        const req = new NextRequest(url.href);
        const res = await GET(req);

        expect(res.status).toBe(500);
        const body = await res.json();
        // errorプロパティが含まれていることを確認
        expect(body).toHaveProperty("error");
        // messageプロパティが含まれることを確認
        expect(body.message).toBe("Internal Server Error");
    });
});
