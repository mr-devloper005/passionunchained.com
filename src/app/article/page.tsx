import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("article", {
    path: "/article",
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  });

export default async function ArticleAliasPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return <TaskListPage task="article" category={resolvedSearchParams?.category} />;
}
