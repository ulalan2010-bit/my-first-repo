# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This directory currently contains **requirements documentation only** — there is no application code, `package.json`, build tooling, or tests here yet. Before writing code in this directory, check whether the user wants a new implementation scaffolded from scratch or wants it added to one of the sibling apps described below.

## What this is

`docs/requirements/` is a Markdown export of the Notion database **「診療予約・患者情報管理・電子カルテ要件定義」** (Clinic Reservation / Patient Info Management / Electronic Chart requirements). Start at [docs/requirements/README.md](docs/requirements/README.md) for the table of contents; each numbered file corresponds to one Notion page.

The requirements cover **two systems**:

- **診療予約・患者情報管理** (clinic reservation & patient info management) — staff open reservation slots (default: unpublished/private), patients book via a bilingual (JP/EN) web form or staff transcribe paper reservations.
- **電子カルテ / MedChart** (electronic chart) — patient header, SOAP progress notes, visit history, labs/orders, in a single 3-column screen.

These two hand off data to each other (reservation + PII flow into the chart after check-in) but are treated as separate systems with separate concerns.

## Requirements you must not silently violate when implementing against these docs

These are called out repeatedly in the requirements as non-negotiable even for a minimal/prototype build (see [06_設計原則.md](docs/requirements/06_設計原則.md)):

- **No overwrite of finalized records** — corrections to confirmed chart entries must be appended as a correction/new version with who/when/why, never edited in place.
- **Audit trail** — viewing, creating, editing, confirming, correcting, invalidating, or downloading patient data must be logged; regular users can't alter/delete the audit log.
- **Patient header always visible** — while a chart is open, ID/name/kana/sex/DOB/age must stay pinned on screen to prevent patient mix-ups.
- **PII lifecycle** — real name/DOB/address/insurance number are only stored temporarily, purged automatically 2 months after visit completion (`受診完了`). Patients who opt out of disclosure (`非提示オプション`) must have none of this PII stored at all.
- **Slots are private by default** — a reservation slot only becomes bookable after staff explicitly activates it.

## Explicitly out of scope (don't build unless asked)

Per [02_スコープ.md](docs/requirements/02_スコープ.md) and [13_今後の検討事項.md](docs/requirements/13_今後の検討事項.md): production payment processing, HL7 FHIR integration, SSO/production auth (current design is a shared staff passcode), receipt/insurance billing, e-prescriptions, DICOM/imaging device integration, patient email/SMS notifications, video-call telehealth itself, and AI-automated diagnosis/summary confirmation.

**福祉タクシー予約 (welfare taxi reservation) is a separate system with its own requirements doc, URL, and data** — do not merge its data model or code with this one even though both are "reservation" systems.

## Related implementations elsewhere in this monorepo

The requirements docs reference implementation paths (`Javascript/yoyaku-kanri/`, `Javascript/emr/`) and a Supabase-backed rewrite. When implementing features described here, check these existing sibling projects first for established patterns/data models before introducing new ones:

- `../clinic-app/` — Next.js + Supabase app for this same clinic domain; has its own `CLAUDE.md`/`AGENTS.md` and a security checklist at [docs/requirements/15_セキュリティ提案事項一覧.md](docs/requirements/15_セキュリティ提案事項一覧.md) worth re-checking after any auth/PII/logging change.
- `../Javascript/emr/` — a plain HTML/JS/CSS prototype of the electronic chart (`index.html`, `app.js`, `style.css`).
- `../Javascript/福祉タクシー/` — the separate welfare-taxi reservation system (has its own `README.md` and `docs/`); useful as a structural reference but not a data/domain reference for this system.

The `Javascript/yoyaku-kanri/` path named in [05_システム構成.md](docs/requirements/05_システム構成.md) does not exist yet in this repo — the clinic reservation side described here has not been implemented as of this writing.

## Issue駆動開発フロー

GitHub Issueを起点に要件定義→設計→実装→レビュー→テスト→修正を回すための skill/agent 一式が `.claude/skills/issue-*` と `.claude/agents/issue-*` にある。エントリポイントは `issue-flow` スキル(個別工程だけを行いたい場合は `issue-requirements` / `issue-design` / `issue-implement` / `issue-review` / `issue-test` / `issue-fix` を直接使う)。成果物は [docs/issues/](docs/issues/README.md) 配下にIssue番号ごとに残る。詳細は `.claude/skills/issue-flow/SKILL.md` を参照。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
