---
name: issue-design
description: 要件定義書(docs/issues/<番号>/requirements.md)をもとに技術設計書(design.md)を作成する。影響ファイル・データモデル・API・テスト方針をまとめ、実装前にユーザーの承認を取る。「Issue #123の設計をして」のような依頼で使う。
---

# Issue設計(reservation_app)

要件定義書を実装可能な設計に落とし込む工程。共通規約は `issue-flow` スキルを参照。

## 前提

`docs/issues/<番号>/requirements.md` が存在すること。なければ先に `issue-requirements` を実行する(ユーザーに確認)。

## 手順

1. `docs/issues/<番号>/requirements.md` を読む。
2. `Agent` ツールで `subagent_type: issue-designer` を呼び、requirements.mdの内容を渡して `docs/issues/<番号>/design.md` を作成させる。
3. できあがった `design.md` をユーザーに提示する。特に以下を強調する:
   - 影響ファイル一覧(想定より変更範囲が大きくないか)
   - 採用しなかった代替案とその理由
   - 「設計上の未確定事項」
4. ユーザーから実装着手の承認を得る。**承認前に `issue-implement` へ進まない。**
5. 承認が得られたら、ラベルを `stage:design` → `stage:ready-for-dev` に付け替えてよいかユーザーに確認してから実行する。

## 差し戻しのケース

- requirements.mdの受け入れ条件だけでは設計を決められない(未確定事項が設計に直結する)場合、`issue-requirements` に差し戻すべきかユーザーに相談する。
- 既存の設計原則(`CLAUDE.md`や`docs/requirements/`内の設計原則)に反する設計しか選べない場合、その旨と理由を明示してユーザーの判断を仰ぐ。

## 完了条件

- `docs/issues/<番号>/design.md` が存在し、影響ファイル・データモデル・テスト方針が具体的に書かれている
- ユーザーが実装着手を承認している
