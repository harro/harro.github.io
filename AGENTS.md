# Agent Guidance

## Design and Implementation Compliance (CRITICAL)

Inspect the g3doc/ folder for design and implementation guides. Consider these
guides when developing new functionality. When developing for a particular
phase, look ahead at future phases documents and use these to inform your design
choices, to favour having a more future proof design.

### Design Proposal, Implementation Guides and Plans (CRITICAL)

Changes to the code SHOULD include changes to the documentation where
applicable.

There exists a hierarchy of documentation:
    Design Proposal > Implementation Guide > Implementation Plan

Design Proposal is high level, focusing on problem statement, requirements,
goals and desired outcomes. There is typically only a single Design Proposal for
a system.

Implementation Guides are more specific than the Design Proposal but not as
specific as an Implementation Plan. They will include guidance on authentication
and authorization, system process flows, data structures and API interfaces.
They do not specify implementation details and do not have code examples or
acceptance tests. There will be multiple Implementation Guides covering the
major logically separate top-level components of the system.

Implementation Plans detail the steps to execute for a new feature or change of
a sub component and the tests required for validation. It includes details such
as technology, frameworks, code languages, libraries, security and performance
considerations. Everything a human or agent might need to implement a successful
solution. There will be multiple Implementation Plans, each plan covers a
focused part of the implementation and its validation. Broken down to facilitate
progressive delivery of the overall implementation and design.

Implementation Plans can be ephemeral and may exist only for the lifetime of the
change enacted. Whereas the Design Proposal and the Implementation Guides are
retained for the lifetime of the project as a whole.

## Fix Bugs Comprehensively (CRITICAL)

When fixing a bug, search the code and fix all instances where it is applicable.

Never claim a bug is fixed, a test passes, or a file was changed without running
the tool and observing the literal output. State what was verified vs assumed.

If a solution requires a non-standard workaround, hack, or fallback, explicitly
highlight the compromise in the final response rather than presenting it as
standard behavior.

## The Requestor is not always right (CRITICAL)

Challenge me if you have concerns about the intent, scope or accuracy of a
request. Adopt a Socratic Orchestration model, where the requestor is not always
right and desires to be questioned and challenged about their assumptions.

Consider goals objectively do not attempt to please the requestor but instead
seek to implement the request in the objectively best manner, aligning with
industry and organisational best practices.

When there are multiple effective approaches, prompt the requester (include your
recommendations) for which approach to take.

In chat replies provide links or quotes to best practices where they may improve
understanding of the answers or actions taken.

## Functionality Gap (IMPORTANT)

When you discover missing features, unsupported commands, or limitation during
development or testing, add these to a TODO.md file in the current workspace
(create this file if it does not exist).

If the code differs significantly from the documentation then note these
discrepancies in the same TODO.md file.

## Refactor While You Work (IMPORTANT)

Whenever fixing bugs or adding features, always look for opportunities to
refactor and simplify the surrounding code. Extract shared helpers, remove
duplication, simplify control flow. Look for opportunities to use language
specific idiomatic best practices and code patterns. Leave the code better than
you found it.

Where these changes do not pertain to the current task at hand, create a
separate cleanup Commit for these changes.

## Use Strong Types (IMPORTANT)

Use type declarations where they add clarity and type safety. Prefer more
specific types, over general types such as `Any`.

In Python, use modern built-in lowercase generics (list[str], dict[str, Any])
and union syntax (str | None) rather than importing List, Dict, Optional from
typing.

## Document Classes, Functions and Methods Extensively (IMPORTANT)

Public classes, functions and methods should be richly documented. Complex logic
or process flows that span large regions of code should also be generously
documented.

For localised comments (inline) write clear, purposeful comments that explain
the **why** and intent behind non-obvious logic, design choices, trade-offs, and
edge cases, rather than merely repeating what the code does.

Keep comments up-to-date whenever modifying surrounding code to avoid stale
documentation. When adding temporary items or tracking future work (gap),
use standard TODO formatting (`TODO(harro): <description>`).

## De-lint Every Commit (IMPORTANT)

When committing changes ensure the code is both styled and lint checked.

Do not silence analyzer findings with inline suppressions (`NOLINT`,
`# pylint: disable`). Fix the underlying code issue. Unless it is a Python
generic exception, these are OK to silence.

Agent instructions (like this) and skills are to be word wrapped at 80
characters where possible.

## Run integration tests

If there are pertinent integration tests (identifiable as suffixed with
`integration_test`), which are separate from the standard unittests, then run
these as part of the verification when they are applicable to the changes being
made.

## Communication

Avoid idioms, don't be sycophantic. Adopt a writing and communication style that
is to the point, concise, insightful and cautionary when needed.

Images and graphics should be illustrative and be informative. Avoid animations
or heavy weight graphics that do not improve the quality of the message.

## Special Characters

Avoid using emojis, horizontal lines or other special graphical characters
unless they add additional information.
