---
name: issue-review
description: Issue用ブランチの差分をdesign.md/requirements.mdおよびコード品質・セキュリティ観点でレビューし、指摘をdocs/issues/<番号>/review.mdにまとめる。issue-code-reviewerエージェントに委譲する。「Issue #123の実装をレビューして」のような依頼で使う。
---

# Issueレビュー(reservation_app)

実装済みの差分をレビューする工程。共通規約は `issue-flow` スキルを参照。

## 前提

`docs/issues/<番号>/design.md` と実装コミットが存在すること。

## 手順

1. 対象ブランチと差分を確認する: `git diff main...HEAD --stat` などで規模を把握する。
2. `Agent` ツールで `subagent_type: issue-code-reviewer` を呼び、以下を渡す:
   - Issue番号
   - `docs/issues/<番号>/requirements.md` と `design.md` のパス(エージェント自身に読ませてよい)
   - 差分の範囲(ブランチ名、ベースブランチ)
3. エージェントが `docs/issues/<番号>/review.md` に指摘を追記する。
4. 指摘一覧をユーザーに提示し、総合判定に従って次の工程を提案する:
   - Critical/High あり → `issue-fix` を提案
   - Medium/Low のみ → ユーザーに`issue-fix`するか次工程(`issue-test`)に進むか確認
   - 問題なし → `issue-test` を提案
5. より深いレビュー(セキュリティ観点の追加チェックなど)が欲しい場合、組み込みの `/code-review` スキル(例: `/code-review high`)を追加で走らせることもできる、とユーザーに伝えてもよい。

## ラベル

レビュー開始時に `stage:review` が付いているか確認する(なければ `issue-implement` の完了時に付け忘れている可能性がある)。指摘対応が必要なら `stage:needs-fix` に付け替えてよいかユーザーに確認する。

## 完了条件

- `docs/issues/<番号>/review.md` に最新のレビュー結果が記録されている
- ユーザーが次工程(修正 or テスト)を把握している
