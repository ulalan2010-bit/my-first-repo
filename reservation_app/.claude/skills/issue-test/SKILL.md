---
name: issue-test
description: requirements.mdの受け入れ条件を検証するテストを作成・実行し、結果をdocs/issues/<番号>/test-report.mdにまとめる。issue-test-engineerエージェントに委譲する。「Issue #123のテストをして」のような依頼で使う。
---

# Issueテスト(reservation_app)

要件定義書の受け入れ条件をテストで検証する工程。共通規約は `issue-flow` スキルを参照。

## 前提

`docs/issues/<番号>/requirements.md` と `design.md`(テスト方針)が存在すること。実装が完了していること。

## 手順

1. `Agent` ツールで `subagent_type: issue-test-engineer` を呼び、以下を渡す:
   - `docs/issues/<番号>/requirements.md` の受け入れ条件
   - `docs/issues/<番号>/design.md` のテスト方針
2. エージェントがテストを作成・実行し、`docs/issues/<番号>/test-report.md` に結果を追記する。
3. 結果をユーザーに提示する:
   - 全て成功 → 完了。`issue-flow`から呼ばれている場合はPR作成の要否をユーザーに確認する工程へ戻す。
   - 失敗あり → 原因が「テスト側」か「実装側」かを明示し、`issue-fix` を提案する。
   - 未カバーの受け入れ条件がある → ユーザーに追加テストが必要か確認する。

## ラベル

テスト開始時に `stage:testing` に付け替えてよいかユーザーに確認する。全て成功したら `stage:done` への付け替え、失敗があれば `stage:needs-fix` への付け替えを確認する。

## 完了条件

- `docs/issues/<番号>/test-report.md` に最新の結果が記録されている
- 受け入れ条件と実施済みテストの対応が明確になっている(表で確認できる)
