export default async function SavedStoriesPage() {
  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: ['savedStories', 1, 12],
      queryFn: () => getSavedStoriesServer(1, 12),
    })
    .catch(() => undefined);

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SavedStoriesPageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
