---
name: issue-flow
description: GitHub Issue番号を指定して、要件定義→設計→実装→レビュー→テスト→修正のサイクルを一気通貫で回すオーケストレーター。「Issue #123 を進めて」「#45を最後までやって」のような依頼で使う。各節目でユーザーの確認を取りながら issue-requirements/issue-design/issue-implement/issue-review/issue-test/issue-fix を順に呼び出す。
---

# Issue駆動開発フロー(reservation_app)

GitHub Issue 1件を、要件定義・設計・実装・レビュー・テスト・修正の6工程で進めるための共通ルールと、全体を通しで回すオーケストレーターです。個別の工程だけをやりたい場合はそれぞれのスキル(`issue-requirements` / `issue-design` / `issue-implement` / `issue-review` / `issue-test` / `issue-fix`)を直接呼んでください。

## 共通の前提・規約(全スキルに共通)

### 成果物の置き場所
各工程の成果物は `docs/issues/<Issue番号>/` 配下に書く。
- `requirements.md` — 要件定義(issue-requirements)
- `design.md` — 設計(issue-design)
- `review.md` — レビュー指摘(issue-review、追記式)
- `test-report.md` — テスト結果(issue-test、追記式)

### ブランチ・コミット規約
- ブランチ名: `issue-<番号>-<英語の短いスラッグ>`(例: `issue-42-add-slot-cancel`)
- コミットメッセージには `#<番号>` を含める
- 作業前に `git status` で未コミットの変更がないか確認し、あれば先にユーザーに確認する(スタッシュ/コミットせず勝手に上書きしない)

### GitHubラベル(工程の可視化用)
Issueに以下のラベルを付け替えながら進める。ラベルが存在しない場合は最初に作成してよいか確認してから `gh label create` する。

| ラベル | 意味 |
|---|---|
| `stage:requirements` | 要件定義中 |
| `stage:design` | 設計中 |
| `stage:ready-for-dev` | 設計承認済み・実装着手可 |
| `stage:in-progress` | 実装中 |
| `stage:review` | レビュー中 |
| `stage:testing` | テスト中 |
| `stage:needs-fix` | 修正必要(レビュー/テストでNG) |
| `stage:done` | 完了 |

### 確認が必要なアクション(必ずユーザーに確認してから実行する)
- Issueへのコメント投稿、ラベルの付け替え・新規作成
- リモートへのpush、PR作成、Issueのクローズ
- ベースブランチ(main等)への直接コミット

ブランチ作成・ローカルコミット・ローカルでのファイル読み書き・テスト実行はここでいう確認なしで進めてよい(通常の実装作業と同じ扱い)。

### リポジトリの特定
このディレクトリ(`reservation_app/`)はモノレポのサブディレクトリで、`gh` コマンドはカレントディレクトリのgit remoteから自動でリポジトリを解決する。複数リポジトリが絡む操作でない限り `--repo` を明示する必要はない。

### スコープの注意
このモノレポには `clinic-app` / `movie-app` / `Javascript/` など他プロジェクトも同居している。Issueがreservation_app以外のものを指している場合は、対象ディレクトリの `CLAUDE.md` やスキル構成(例: `clinic-app/.claude/`)がないか確認し、無関係なディレクトリを変更しない。

## オーケストレーションの進め方

Issue番号(またはURL)を受け取ったら、以下を順に進める。各ステップの後、次に進んでよいかユーザーに確認する(特に設計承認・実装完了・修正完了の節目は明示的に確認を取る)。

1. **要件定義**: `Skill(skill: "issue-requirements")` を呼ぶ。`requirements.md` の「未確定事項」が残っていれば、ユーザーに確認してから次へ進む。未確定のまま進めるとIssue主旨とズレた実装になりやすい。
2. **設計**: `Skill(skill: "issue-design")` を呼ぶ。`design.md` をユーザーに提示し、実装着手前に承認を取る。
3. **実装**: `Skill(skill: "issue-implement")` を呼ぶ。設計に沿ってメインセッションが直接コードを書く(サブエージェントに丸投げしない)。
4. **レビュー**: `Skill(skill: "issue-review")` を呼ぶ。Critical/High指摘があれば5へ、なければ6へ。
5. **修正**: `Skill(skill: "issue-fix")` を呼ぶ。修正後は4に戻ってレビューを再実行し、収束するまで繰り返す。
6. **テスト**: `Skill(skill: "issue-test")` を呼ぶ。失敗があれば5(修正)に戻り、その後6を再実行する。
7. 4〜6が収束したら、ユーザーに完了を報告し、PR作成・Issueクローズを希望するか確認する(希望されれば `gh pr create` で該当Issueを `Closes #<番号>` として紐付ける。実行前に必ず確認)。

## 注意

- 各工程はそれぞれのSKILL.mdに詳細な手順があるので、このオーケストレーターは「順序」と「節目の確認」だけを担当する。個々の作業内容を重複して書かない。
- ユーザーが「設計だけ見せて」のように一部だけを求めている場合は、フル実行せず該当スキルだけを呼ぶ。
