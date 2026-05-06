import { describe, test, expect, beforeEach, afterEach, mock } from "bun:test";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/repository/route";

const originalEnv = { ...process.env };
const originalFetch = global.fetch;

const targetApi = "http://localhost:3000/api/repository";

describe("GET /api/repository", () => {
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

    test("idがない場合 400を返す", async () => {
        const url = new URL(targetApi);
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 400エラーが返されることを確認
        expect(res.status).toBe(400);

        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("idが文字列の場合 400を返す", async () => {
        const url = new URL(targetApi);
        url.searchParams.set("id", "abc");
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 400エラーが返されることを確認
        expect(res.status).toBe(400);

        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("存在しないidの場合は 404を返す", async () => {
        // 外部APIへの依存をなくすためにモックを作成する
        global.fetch = mock(async () => new Response(JSON.stringify({ message: "Not Found", error: null }), { status: 404 })) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("id", "123");
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 404エラーが返されることを確認
        expect(res.status).toBe(404);

        const body = await res.json();
        expect(body).toHaveProperty("error");
        expect(body).toHaveProperty("message");
    });

    test("正常なidがある場合 200を返す", async () => {
        // 外部APIへの依存をなくすためにモックを作成する
        global.fetch = mock(async () => new Response(JSON.stringify({ id: "123456" }), { status: 200 })) as unknown as typeof fetch;
        const url = new URL(targetApi);
        url.searchParams.set("id", "123456");
        const req = new NextRequest(url.href);
        const res = await GET(req);
        // 200が返されることを確認
        expect(res.status).toBe(200);

        const body = await res.json();
        // idが一致することを確認
        expect(body.id).toBe("123456");
    });

    test("fetchが例外を投げた場合 500を返す", async () => {
        // 強制的に500を返すようにmockを作成
        global.fetch = mock(async () => {
            throw new Error("network failure");
        }) as unknown as typeof fetch;

        const url = new URL(targetApi);
        url.searchParams.set("id", "123456");
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
