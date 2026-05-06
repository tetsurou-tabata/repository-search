import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import StatsArea from "@/components/StatsArea";
import { mockRepository } from "./mocdData/mockRepository";

const meta = {
    title: "Components/StatsArea",
    component: StatsArea,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
                <Story />
            </div>
        ),
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof StatsArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        repository: mockRepository,
        isLoading: false,
    },
};

// ロード中
export const Loading: Story = {
    args: {
        repository: mockRepository,
        isLoading: true,
    },
};

// 数字が大きい場合
export const LargeCount: Story = {
    args: {
        repository: {
            ...mockRepository,
            subscribers_count: 11111111111111,
            forks_count: 222222222222,
            stargazers_count: 3333333333333,
            open_issues_count: 44444444444,
        },
        isLoading: false,
    },
};
