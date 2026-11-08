/** The legal documents, each at /{lang}/{id}. */
export const documents = ["privacy", "terms", "legal", "delete-account"] as const;
export type DocumentId = (typeof documents)[number];

export type ContactPurpose = "privacy" | "deletion" | "withdrawal";

export type Section = {
  id: string;
  title: string;
  /** Shows the operator's identity (company.ts) above the section's words. */
  company?: boolean;
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraphs after the list. */
  notes?: string[];
  /** A button that opens an email to support, with a subject (and, to delete, a body) filled in. */
  contact?: ContactPurpose;
  /** Site paths (/privacy#rights, localized on the page) or full https URLs. */
  links?: { label: string; href: string }[];
};

export type LegalDocument = {
  title: string;
  description: string;
  /** Three short lines shown first, "at a glance". */
  summary: string[];
  sections: Section[];
};

export type LegalCopy = Record<DocumentId, LegalDocument>;
