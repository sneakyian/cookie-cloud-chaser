import { Button } from "@/components/ui/button";
import useReadme from "@/hooks/useReadme";

const Index = () => {
  const readmeUrl =
    "https://raw.githubusercontent.com/sneakyian/cookie-cloud-chaser/main/README.md";
  const { data, loading, error } = useReadme(readmeUrl);

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container max-w-4xl space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Cookie Cloud Chaser — Latest README
          </h1>
          <p className="text-muted-foreground">Pulled live from GitHub</p>
          <div className="flex justify-center gap-3">
            <a
              href="https://github.com/sneakyian/cookie-cloud-chaser"
              target="_blank"
              rel="noreferrer"
            >
              <Button>Open GitHub Repo</Button>
            </a>
          </div>
        </header>

        <section className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          {loading ? (
            <p className="text-muted-foreground">Loading README…</p>
          ) : error ? (
            <p className="text-destructive">Error: {error}</p>
          ) : (
            <pre className="whitespace-pre-wrap text-sm leading-6 overflow-auto max-h-[60vh]">
              {data}
            </pre>
          )}
        </section>
      </div>
    </main>
  );
};

export default Index;
