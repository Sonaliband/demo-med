# Verification record

## Completed

- TypeScript compilation (`tsc --noEmit`) passed after resolving a JSX closing fragment and the geography response type.
- Production Worker/client build completed successfully. The build reports a large 3D dependency chunk; it is lazy loaded.
- Browser: sample clinical case opened and analyzed successfully, with a summary, nine extracted keyword entities, clinical features, research links and export action.
- Browser: saved a WHO guideline; navigated to Saved Research and confirmed the persisted publication.
- Browser: selected Review filter and confirmed the Long COVID review; entered a nonmatching search and confirmed the empty state; reset filters and opened the research detail.
- Browser: selected Europe on the atlas and confirmed the COVID-19 in Europe chart heading.
- Browser: WebMCP research search returned four matching dengue resources; a non-string query was rejected intentionally.
- Browser: 390px mobile research detail and dashboard were inspected; mobile sidebar opened and navigated to the dashboard.
- Browser: 1440px desktop dashboard inspected with the clinical network rendered.
- Globe geometry and markers rendered from Natural Earth coastlines.
- A server/browser date-locale hydration mismatch was found and fixed with explicit en-GB dates and stable initial state.

## Boundaries

This is a demonstration application. No live clinical AI, production identity provider, cloud database, image/PDF extraction, clinical similarity model or real disease surveillance feed is configured. External publication content remains at its original sources. The production bundle warning about 3D chunk size is retained; code splitting prevents loading it until a scene is needed.

Local browser hot reload produced React Three Fiber/Drei root-unmount warnings during source changes. These were reviewed separately from functional workflow verification.
