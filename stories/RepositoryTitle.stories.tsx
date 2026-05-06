import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RepoPageTitle from "@/components/RepoPageTitle";
import { mockRepository } from "./mocdData/mockRepository";

const meta = {
    title: "Components/RepoPageTitle",
    component: RepoPageTitle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RepoPageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        repository: mockRepository,
        isLoading: false,
    },
};

// リポジトリ名が長い場合
export const LongRepositoryName: Story = {
    args: {
        repository: {
            ...mockRepository,
            full_name: "tetsu/this-is-a-very-long-repository-name-to-test-the-layout-of-the-repository-item-component",
        },
        isLoading: false,
    },
};

// 言語が選択されていない場合
export const NoLanguage: Story = {
    args: {
        repository: {
            ...mockRepository,
            language: "",
        },
        isLoading: false,
    },
};

// ロード中
export const Loading: Story = {
    args: {
        repository: {
            ...mockRepository,
        },
        isLoading: true,
    },
};
