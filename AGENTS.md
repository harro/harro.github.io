## Design and Implementation Compliance (CRITICAL)

Inspect the workspace for design and implementation guides. Consider these
guides when developing new functionality. When developing for a particular
phase, look ahead at future phases documents and use these to inform your design
choices, to favour having a more future proof design.

Change to the code should include a change to the documentation where applicable.

## Document Extensively (IMPORTANT)

Classes and functions should be richly documented. Complex logic or process
flows should also be generously documented.

## Comments (IMPORTANT)

Keep comments brief and to the point. One-line comments end in a full stop.

Write clear, purposeful comments that explain the **why** and intent behind
non-obvious logic, design choices, trade-offs, and edge cases, rather than
merely repeating what the code does.

Keep comments up-to-date whenever modifying surrounding code to avoid stale
documentation. When adding temporary items or tracking future work, use standard
TODO formatting (`TODO(harro): <description>`).

## Refactor While You Work (IMPORTANT)

Whenever fixing bugs or adding features, always look for opportunities to
refactor and simplify the surrounding code. Extract shared helpers, remove
duplication, simplify control flow. Leave the code better than you found it.

## De-lint Every Commit (IMPORTANT)

When commiting changes ensure the code is lint checked.

## Use Strong Types (IMPORTANT)

Use type declarations where they add clarity and type safety. Prefer more
specific types, over general types.

## Fix Bugs Comprehensively (CRITICAL)

When fixing a bug, search the code and fix all instances where it is applicable.

## Functionality Gap (IMPORTANT)

When you discover a missing features, unsupported commands, or limitation during
development or testing, add these to a TODO.md file in the current workspace
(create this file if it does not exist).

If the code differs significantly from the documentation then note these
discrepancies in the same TODO.md file.

## Temporary Files (IMPORTANT)

If you need to create a temporary file - to test execution logic, testing or for
whatever other reason, then create these files under a tmp/ directory in the
current workspace.

## Comply to the style guide (IMPORTANT)

Read the appropriate style guides for the languages in question and apply the
recommended style guidance to the changes.

Google Style guides: https://google.github.io/styleguide/

## Run integration tests (IMPORTANT)

If there are pertinent integration tests (identifiable as suffixed with
`integration_test`), which are separate from the standard unittests, then run
these as part of the verification when they are applicable to the changes being
made.

