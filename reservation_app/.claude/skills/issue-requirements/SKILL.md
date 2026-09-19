---
name: issue-requirements
description: 指定したGitHub Issueの内容を読み取り、要件定義書(docs/issues/<番号>/requirements.md)を作成する。曖昧点は「未確定事項」として整理し、必要ならIssueにコメントして確認する。「Issue #123の要件を整理して」のような依頼で使う。
---

# Issue要件定義(reservation_app)

GitHub Issue 1件を要件定義書に落とし込む工程。共通規約(成果物の置き場所・ラベル・確認が必要なアクション)は `issue-flow` スキルを参照。

## 手順

1. Issue番号を確認する(ユーザーが番号を出していなければ聞く、またはURLから抽出する)。
2. `gh issue view <番号> --json number,title,body,comments,labels,url` でIssue本文・コメント・ラベルを取得する。
3. 関連コンテキストを集める:
   - このディレクトリの `CLAUDE.md`
   - `docs/requirements/` 配下(既存の要件定義との整合性チェック用)
   - 必要なら隣接プロジェクト(`../clinic-app/`等)の類似実装の有無
4. `Agent` ツールで `subagent_type: issue-requirements-analyst` を呼び、取得したIssue情報と関連コンテキストを渡して `docs/issues/<番号>/requirements.md` を作成させる。
5. できあがった `requirements.md` をユーザーに提示する。特に「未確定事項」セクションを強調する。
6. 未確定事項がある場合:
   - ユーザー自身が答えられるものはその場で確認し、doc に反映する。
   - Issue起票者に確認が必要なものは、Issueにコメントを投稿してよいかユーザーに確認してから `gh issue comment <番号> --body "..."` で質問を投稿する(**無断で投稿しない**)。
7. ラベルを `stage:requirements` → (未確定事項が解消したら)`stage:design` に付け替えてよいかユーザーに確認してから `gh issue edit <番号> --add-label ... --remove-label ...` を実行する。ラベルが存在しなければ先に作成してよいか確認する。

## 完了条件

- `docs/issues/<番号>/requirements.md` が存在し、受け入れ条件が検証可能な粒度で書かれている
- 未確定事項が「解消済み」か「意図的に設計フェーズへ持ち越し」のどちらかである(放置しない)
