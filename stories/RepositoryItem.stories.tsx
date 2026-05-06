import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RepositoryItem from "@/components/RepositoryItem";
import { mockRepository } from "./mocdData/mockRepository";

const meta = {
    title: "Components/RepositoryItem",
    component: RepositoryItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RepositoryItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        repository: mockRepository,
    },
};

// リポジトリ名が長い場合
export const LongRepositoryName: Story = {
    args: {
        repository: {
            ...mockRepository,
            full_name: "tetsu/this-is-a-very-long-repository-name-to-test-the-layout-of-the-repository-item-component",
        },
    },
};

// オーナーのアバターURLが空の場合
export const NoAvatarUrl: Story = {
    args: {
        repository: {
            ...mockRepository,
            owner: {
                ...mockRepository.owner,
                avatar_url: "",
            },
        },
    },
};
