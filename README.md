# MEDINTEL — Clinical Case & Disease Intelligence

A working demonstration of a botanical clinical research interface. Built from the supplied reference analysis and the design system in DESIGN_SYSTEM.md.

## Run locally

Requires Node.js 22.13 or later and npm.

```sh
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:5173. For a production build:

```sh
npx tsc --noEmit
npm run build
npm start
```

If the Windows npm shim is misconfigured, run npm through its installed npm-cli.js, or run the development entry directly with `node scripts/run-framework.mjs dev`.

No application environment variables or API keys are required for this demonstration.

## Pages

| Route | Function |
|---|---|
| `/` | Botanical landing, interactive clinical network, seven-step scroll narrative |
| `/dashboard` | Overview, recent cases, research and contextual insights |
| `/cases` | Search, open and delete locally saved cases |
| `/case` | Create a case, add attachments, save, analyze and export |
| `/case?id=…` | Edit an existing case |
| `/similar` | Interactive related-case network and comparison details |
| `/trends` | Rotating/drag/zoom globe, region selection, disease filter, time range and accessible chart data |
| `/research` | Search, category/disease/date filters, sorting and bookmarks |
| `/research/:id` | Reading view, citation copy, original publication and saving |
| `/saved` | Saved reading list and JSON export |
| `/profile` | Editable profile and preferences |
| `/login`, `/signup` | Local demo session flows and authentication integration boundary |

## Technology

React 19, TypeScript, Vinext on Vite 8, Tailwind CSS 4, Radix/Shadcn UI primitives, Three.js, React Three Fiber, Drei, Recharts, Lucide and Sonner. Motion uses CSS, IntersectionObserver and React Three Fiber frame updates. The framework produces a Cloudflare-compatible Worker and client assets. Three.js scenes are lazy loaded with Suspense and text-control fallbacks.

## Project structure

```
app/
  globals.css                 Shared visual tokens and responsive styles
  layout.tsx                  Metadata and application shell
  page.tsx                    Landing route
  [section]/page.tsx          Workspace routes
  research/[id]/page.tsx      Research detail routes
components/
  medintel.tsx                Landing and scroll narrative
  workspace.tsx               Navigation, notifications and page composition
  case-pages.tsx              Journal editor, analysis and case list
  intelligence-pages.tsx      Dashboard, similarity and atlas
  research-pages.tsx          Reading library and details
  profile-pages.tsx           Profile, login and signup
  shared.tsx                  Shared controls and state subscription
  3d/clinical-model.tsx        Reusable clinical network and geographic globe
  ui/                         Reused accessible component primitives
services/index.ts             Replaceable demo service layer
models are in types/index.ts
 data/demo.ts                 Sample case, synthetic records and curated publications
public/botanical.png          Original generated watercolor artwork
public/land.geojson           Natural Earth land outlines
public/favicon.svg            MEDINTEL favicon
DESIGN_SYSTEM.md               Reference analysis, tokens and module identities
VALIDATION.md                  Verification performed and limitations
```

## What is real and what is demonstration data

- Case creation, editing, searching, deletion, attachment storage, text extraction, exports, bookmarks, filtering and local preferences work.
- Cases, attachments and bookmarks use browser localStorage and remain on the current device. This is deliberately a **device-local demonstration**, not a secure patient record system. Storage capacity depends on the browser; save errors are surfaced to the user.
- Attachments support PDF, PNG, JPEG and TXT, up to 1.5 MB each. TXT content can be added to the narrative. PDF/image contents are preserved and downloadable, but are not parsed or sent to an AI model.
- Analysis summarizes submitted text and matches a small medical keyword dictionary. It does not call an LLM or diagnose a patient. Similarity scores are illustrative symptom overlap against synthetic teaching records, not published patient matches.
- Regional counts, trends and alert levels are synthetic and explicitly labelled. They are not real surveillance data.
- Research metadata and source links refer to six real WHO, PAHO, Nature Medicine and NEJM publications. The collection is curated, not a live latest-research feed. Short summaries are editorial, and relevance scores are demonstration values.
- Login/signup opens a local demo session. Passwords are validated for form demonstration and immediately discarded. Google sign-in explains that no identity provider is connected. There is no claim of a real account or secure authorization.
- The notification panel shows local workspace information. The update preference is stored for a future connected notification service.

## Connecting a real backend

The UI imports service objects from `services/index.ts`, and the record shapes are in `types/index.ts`. Replace those implementations with your HTTP API client and make callers await server responses. Suggested contracts:

- `GET/POST /api/cases`, `GET/PATCH/DELETE /api/cases/:id`
- `POST /api/cases/:id/analyze`: return `Analysis` with source-backed entity extraction and relevance
- `POST /api/cases/:id/attachments`: use authenticated object storage and server validation
- `GET /api/similar-cases?caseId=…`: return verified publication metadata and validated similarity
- `GET /api/research?query=…&category=…&disease=…`: integrate PubMed/Europe PMC or another licensed literature source
- `GET /api/trends?region=…&disease=…`: use official surveillance feeds, timestamps and provenance
- `GET/POST/DELETE /api/saved-research`
- `GET/PATCH /api/profile`: persist preferences under the authenticated user

Use an identity provider such as Firebase Auth or an OIDC service and validate server-side sessions. Keep medical AI API credentials on the server. Cloud storage, patient privacy controls, audit logging, authorization, clinical validation and live-data provenance must be implemented before use with real patient information.

## Accessibility and performance

Semantic forms with labels, focus states, keyboard-operable Radix tabs/selects/dialogs/sidebar, mobile navigation, accessible chart table, non-WebGL control fallback, reduced-motion handling and bounded canvas pixel ratio. Network and globe controls have text equivalents. Native operating-system reduced-motion is respected alongside the local preference.

## Asset provenance

- Botanical illustration: generated once using the built-in image tool; prompt documented in DESIGN_SYSTEM.md.
- Globe coastline geometry: Natural Earth 1:110m land, public domain; https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
- Fonts: Google Fonts, Playfair Display and DM Sans, with local system fallbacks.
- Publication citations and original links are stored in data/demo.ts and shown on research detail pages.

## Agent access

When the browser supports WebMCP, `search_research` exposes the same curated research search service. It validates string input and returns concise metadata without changing local state.
