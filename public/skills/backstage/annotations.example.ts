import type { BackstageAnnotations } from "./types";

// The ONE file you hand-edit. Key = the data-backstage="..." attribute on the element.
// Pattern to copy: confirmed sources are "live"; stubbed-but-known are "mock";
// anything you can't verify from the code is "tbd" with an open question — never fake an endpoint.

export const annotations: BackstageAnnotations = {
  balance: {
    label: "Available Balance",
    status: "live",
    sources: [
      { name: "Wallet Ledger", type: "svc", ref: "GET /v1/wallet/balance" },
      { name: "Pending Holds", type: "calc", ref: "reserves - disputes" },
    ],
    calc: "Settled funds minus pending holds and active reserves, in account currency.",
    io: {
      request: "GET /v1/wallet/balance?account=ACME-2291&currency=USD",
      response: `{ "available": 882701, "pending": 12030, "currency": "USD" }`,
    },
    presenter: "Real-time balance — it already nets out reserves.",
    openQuestions: ["Are disputed amounts deducted here or downstream in the ledger?"],
    action: "Opened balance detail",
    narration: "Fetches live wallet balance and subtracts pending holds before display.",
  },

  viewDetails: {
    label: "View details (transaction row)",
    status: "live",
    sources: [
      { name: "Transaction Service", type: "api", ref: "GET /v1/payments/{id}" },
      { name: "Customer Service", type: "svc", ref: "GET /v1/customers/{id}" },
    ],
    calc: "Modal aggregates the payment record + customer profile + dispute status into one view.",
    io: {
      request: "GET /v1/payments/INV-2025-234\nGET /v1/customers/mia-lang",
      response: `{ "payment": { "amount": 30000, "status": "PAID" }, "customer": { "ltv": 4120 } }`,
    },
    presenter: "One click here fans out to two services and stitches the result — backend aggregation in action.",
    action: "Clicked View details",
    narration: "Fans out to Payments + Customers, aggregates into the detail modal.",
  },

  // Example of the TBD discipline — keep this for anything unconfirmed:
  repeatCustomers: {
    label: "Repeat customers card",
    status: "tbd",
    sources: [{ name: "Customer graph", type: "svc", ref: "TBD — which service owns identity?" }],
    calc: "% of customers with 2+ orders in trailing 90 days. Definition of 'repeat' not locked.",
    io: { request: "// endpoint not yet defined", response: "// currently mocked at 68%" },
    presenter: "Flag in the demo: the number is plausible but we haven't identified the system of record yet.",
    openQuestions: [
      "Which service owns customer identity / dedupe across guest checkouts?",
      "Is a 90-day window the right definition of 'repeat'?",
    ],
  },
};
