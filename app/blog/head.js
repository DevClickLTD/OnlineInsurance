export default function Head({ params, searchParams }) {
  const pageParam = searchParams?.page;
  const currentPage = parseInt(pageParam || "1", 10) || 1;
  const prev = currentPage > 1 ? `/blog?page=${currentPage - 1}` : null;
  const next = currentPage >= 1 ? `/blog?page=${currentPage + 1}` : null;

  return (
    <>
      {prev && <link rel="prev" href={prev} />}
      {next && <link rel="next" href={next} />}
    </>
  );
}
