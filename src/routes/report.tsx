import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { submitContentReport } from "@/lib/gentlewickServer";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/report")({
  validateSearch: (search: Record<string, unknown>) => ({ url: typeof search.url === "string" ? search.url : "" }),
  component: ReportPage,
});

const itemOptions = [
  ["memorial_text", "Memorial text"],
  ["photo", "Uploaded photo"],
  ["condolence", "Condolence message"],
  ["other", "Other"],
];
const reasonOptions = [
  ["animal_cruelty", "Animal cruelty or graphic violence"],
  ["harassment_hate_threats", "Harassment, hate speech, or threats"],
  ["private_data_doxxing", "Private personal data or doxxing"],
  ["copyright_privacy", "Copyright or privacy infringement"],
  ["spam_scam", "Spam or scam"],
  ["suspected_csam", "Suspected child sexual abuse material (CSAM)"],
  ["other_illegal", "Other illegal content"],
];

function ReportPage() {
  const { url } = Route.useSearch();
  const [targetUrl, setTargetUrl] = useState(url);
  const [itemType, setItemType] = useState("memorial_text");
  const [reason, setReason] = useState("");
  const [explanation, setExplanation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goodFaith, setGoodFaith] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const csam = reason === "suspected_csam";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError(""); setReceipt("");
    try {
      const result = await submitContentReport({ data: { target_url: targetUrl, item_type: itemType, reason, explanation, reporter_name: name, reporter_email: email, good_faith: goodFaith, website } });
      setReceipt(result.receipt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your report could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  return <Shell><main className="mx-auto max-w-2xl px-5 py-12">
    <p className="kicker">Gentlewick Sanctuary</p>
    <h1 className="mt-3 font-serif text-4xl">Report content</h1>
    <p className="mt-4 text-muted">Use this form to report content you believe is illegal under Irish or EU law, or violates our Sanctuary Guidelines. Please include the link and a clear explanation.</p>
    {receipt ? <section className="panel mt-8 p-6" role="status"><h2 className="font-serif text-2xl">Your report has been received.</h2><p className="mt-3">Reference: <strong>{receipt}</strong></p><p className="mt-3 text-muted">Your report is saved for review. Email confirmation and decision notifications are not yet enabled.</p></section> : <form onSubmit={submit} className="panel mt-8 grid gap-5 p-5 sm:p-7">
      <label className="field"><span>Link to the content being reported</span><input type="url" value={targetUrl} onChange={e=>setTargetUrl(e.target.value)} placeholder="https://gentlewick.com/…" required/></label>
      <label className="field"><span>Which specific item is affected?</span><select value={itemType} onChange={e=>setItemType(e.target.value)} required>{itemOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="field"><span>Reason for your report</span><select value={reason} onChange={e=>setReason(e.target.value)} required><option value="">Choose a reason…</option>{reasonOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
      <label className="field"><span>Explain why you believe this content is illegal</span><textarea minLength={10} maxLength={4000} value={explanation} onChange={e=>setExplanation(e.target.value)} placeholder="Please be specific…" required/></label>
      {!csam ? <><label className="field"><span>Your full name</span><input value={name} onChange={e=>setName(e.target.value)} maxLength={200} required/></label><label className="field"><span>Your email address</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={320} required/></label></> : <p className="text-sm text-muted">Name and email are optional for this report. Do not download, attach, copy, or redistribute suspected material—provide only its link and description.</p>}
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={goodFaith} onChange={e=>setGoodFaith(e.target.checked)} required className="mt-1"/><span>I confirm that I have a good-faith belief that the information and allegations in this report are accurate and complete.</span></label>
      <label className="sr-only">Website <input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
      {error?<p className="text-sm text-red-700" role="alert">{error}</p>:null}
      <button className="btn btn-primary" disabled={busy}>{busy?"Submitting…":"Submit Report"}</button>
    </form>}
    <p className="mt-6 text-sm text-muted">Reports are private and are not visible to the public. Please do not include sensitive information beyond what is necessary to identify and explain the content.</p>
  </main></Shell>;
}
