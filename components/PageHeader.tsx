import Link from "next/link";

export default function PageHeader({
  title,
  crumb,
}: {
  title: string;
  crumb: string;
}) {
  return (
    <section className="bg-brand text-white">
      <div className="max-w-container mx-auto px-4 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{title}</h1>
        <nav className="text-sm text-white/80" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
