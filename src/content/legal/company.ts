/**
 * Who operates Lucid Saga, as in the company's other products (TaskFlow's legal pages,
 * Mikigb77/TaskFlowWeb src/content/legal/company.json), and the facts the documents rest on.
 * docs/LEGAL.md says where each fact comes from. Change a fact here, and the documents follow.
 */
export const company = {
  name: "GARBAR, IN-TEC, S.L.",
  taxId: "B56760374",
  registeredAddress: "Carrer Sant Antoni Mª Claret, 24, 3ª planta, 08037 Barcelona, España",
  /** As the registry writes it, in Catalan. */
  commercialRegister:
    "Societat inscrita al Registre Mercantil de Barcelona, Tom 49105, Foli 130, Full 607875, Inscripció 1",
  /** General enquiries. */
  generalEmail: "lucidsaga@garbar.tech",
  /** Support, complaints, privacy rights and account deletion. */
  supportEmail: "lucidsaga.support@garbar.tech",
  /** The youngest a player may be to sign up (the app's MIN_SIGNUP_AGE). */
  minimumAge: 16,
  /** Under this age, a player gets only Teen stories (PlayableAnime F8). */
  teenOnlyUnder: 17,
  /** The day this version of the documents took effect. */
  version: "2026-11-08",
} as const;
