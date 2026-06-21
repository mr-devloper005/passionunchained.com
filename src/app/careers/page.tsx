import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const benefits = [
  "Flexible schedules and remote-first culture",
  "Health, dental, and vision coverage",
  "Annual learning stipend",
  "Quarterly offsites and team retreats",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help us build the future of community-driven publishing at ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild>
          <Link href="/contact">Apply Now</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-foreground">No current openings</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We are not hiring for open roles right now. If you would like to work with {SITE_CONFIG.name},
              please send your details and query through the contact page.
            </p>
            <Button className="mt-5" asChild>
              <Link href="/contact">Send Details on Contact Page</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Why {SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We are building a product that helps people discover and share the best knowledge on the web.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-md border border-border bg-secondary/40 px-3 py-2">
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
