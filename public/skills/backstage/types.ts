// Backstage annotation schema.
// Key insight: the prototype carries `data-backstage="<id>"` attributes; this file maps each
// id to a description of the backend behind it. The overlay reads these and renders them.

export type BackstageStatus = "live" | "mock" | "tbd";
export type SourceType = "api" | "db" | "svc" | "calc" | "mock";

export interface BackstageSource {
  name: string;     // human name, e.g. "Wallet Ledger"
  type: SourceType; // drives the colored type chip
  ref: string;      // endpoint / table / computation, e.g. "GET /v1/wallet/balance"
                    // or, when unconfirmed, "TBD — which service owns this?"
}

export interface BackstageAnnotation {
  label: string;                              // human name of the element
  status: BackstageStatus;                    // live = confirmed, mock = stubbed, tbd = source unknown
  sources: BackstageSource[];                 // where the data comes from
  calc: string;                               // plain-English: what is computed / aggregated
  io: { request: string; response: string };  // sample payloads (use "// TBD" when unknown)
  presenter: string;                          // one line to say aloud during the demo
  openQuestions?: string[];                   // unresolved backend questions to surface live
  action?: string;                            // event-log card title (defaults to label)
  narration?: string;                         // event-log backend story (defaults to calc)
}

export type BackstageAnnotations = Record<string, BackstageAnnotation>;
