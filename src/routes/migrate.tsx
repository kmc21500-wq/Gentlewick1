import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/migrate")({ head: () => ({ meta: [{ title: "Gentlewick" }] }), component: MigrationInfo });
function MigrationInfo() { return <Shell><main className="mx-auto max-w-2xl px-5 py-14"><p className="kicker">Gentlewick</p><h1 className="mt-3 font-serif text-4xl">Keep it simple.</h1><p className="lede mt-5">You can use Gentlewick without an account. Your memorial pages and candle memories stay stored in this browser on this device.</p><Link to="/memorials" className="btn btn-primary mt-6">Continue to your memorials</Link></main></Shell>; }
