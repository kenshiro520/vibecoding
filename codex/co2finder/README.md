# CO₂ Finder

「CO2 Finder — 開発ブリーフ v1」に基づき、ウェブ検索 UI と最小限の検索 API を備えた pnpm モノレポを初期構築しました。

## リポジトリ構成

```
codex/co2finder
├── apps
│   ├── api        # Express ベースの検索 API (/api/search)
│   └── web        # Next.js (App Router) + Tailwind CSS の UI
├── packages
│   └── core       # 共通の型定義と抽出ユーティリティ
├── .env.example   # 必要な環境変数のサンプル
├── package.json   # ルートスクリプトとワークスペース設定
└── pnpm-workspace.yaml
```

## 90 分単位のタスクと再現手順

### タスク 1 (0-90 分相当): モノレポ初期化
1. `cd codex/co2finder`
2. `pnpm install` — 依存関係の解決と `pnpm-lock.yaml` の生成
3. 環境変数を `.env` にコピー: `cp .env.example .env`

### タスク 2 (90-180 分相当): Web アプリ UI
1. `pnpm dev:web`
2. ブラウザで `http://localhost:3000` を開き、Google 風の検索トップ画面を確認
3. キーワードボタンをクリックして検索フォームへの入力反映を確認

### タスク 3 (180-270 分相当): API サービス
1. `.env` の `API_PORT` を必要に応じて変更
2. `pnpm dev:api`
3. `curl "http://localhost:3001/api/search?q=脱炭素"` で JSON レスポンス（最大 5 件）を確認

### タスク 4 (270-360 分相当): コアパッケージ
1. `pnpm --filter @co2finder/core build`
2. 生成された `packages/core/dist` を確認し、`selectTopResults` が重複排除と件数制限を行うことを確認

## 開発メモ
- Next.js App Router + Tailwind を用いて、中央配置の検索入力 UI を実装しました。
- Express API は共通パッケージの型 (`SearchResult`) とユーティリティ (`selectTopResults`) を利用しています。
- 追加のデータソースやアルゴリズムは `packages/core` を拡張することで差し替え可能です。

## 環境変数
`.env.example` を `.env` にコピーして利用してください。

| 変数 | 用途 |
| ---- | ---- |
| `NEXT_PUBLIC_API_BASE_URL` | Web アプリから参照する検索 API のベース URL |
| `API_PORT` | Express API サーバーの待受ポート |

## 利用コマンド
- `pnpm install` — 依存関係のインストール
- `pnpm dev:web` — Next.js 開発サーバー (http://localhost:3000)
- `pnpm dev:api` — Express API サーバー (http://localhost:3001)
- `pnpm -r build` — すべてのワークスペースのビルド
- `pnpm -r lint` — TypeScript ベースの型チェック
