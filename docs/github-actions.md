# 🚀 GitHub Actions シンプルガイド

個人プロジェクト向けの最小限で実用的なGitHub Actions設定です。
**デプロイ: Vercel自動デプロイを使用**

## 📋 ワークフロー構成（シンプル版）

### 1. **🔍 CI/CD** (`.github/workflows/ci.yml`)
**トリガータイミング：**
- ✅ **Pull Request作成・更新時** - コードレビュー前の品質チェック
- ✅ **手動実行** - 必要に応じたテスト実行

**実行内容：**
```yaml
🔍 品質チェック & ビルド (10分以内)
├── npm run quality:check
│   ├── TypeScript型チェック
│   ├── Biome lint
│   ├── フォーマットチェック
│   └── Jest テスト実行
└── npm run build
```

### 2. **🚀 Vercel自動デプロイ**
**デプロイ方式：**
- ✅ **PRマージ時** - Vercelが自動でproductionデプロイ
- ✅ **PR作成時** - Vercelが自動でpreviewデプロイ生成

**GitHub Actions不要：**
```yaml
🚀 Vercel自動デプロイ（GitHub Actions外）
├── PRプレビュー自動生成
├── mainブランチ本番自動デプロイ
└── ビルドログはVercelダッシュボードで確認
```

### 3. **🤖 Dependabot** (`.github/dependabot.yml`)
**更新頻度：**
- ✅ **月1回** - npm依存関係の更新チェック
- ✅ **月1回** - GitHub Actions依存関係の更新チェック

## 🎯 実行タイミング（シンプル版）

```bash
# 🔍 コードレビュー前
Pull Request作成・更新
├── GitHub Actions: CI/CD実行 (品質チェック + ビルド)
└── Vercel: プレビューデプロイ自動生成

# 🚀 本番デプロイ
Pull Requestマージ時
└── Vercel: 本番環境へ自動デプロイ

# 🤖 定期メンテナンス
月1回 → Dependabot更新チェック
```

**Note**: デプロイはVercelが自動実行するため、GitHub Actionsでのデプロイ処理は不要です。

## 📊 実行時間とコスト最適化

| 処理 | 実行場所 | 実行時間 | 頻度 | 月間実行回数（概算） |
|-----|---------|---------|------|---------------------|
| CI/CD | GitHub Actions | 5-10分 | PR作成・更新毎 | 10-20回 |
| Deploy | Vercel | 2-5分 | PR・マージ毎 | 15-30回 |
| Dependabot | GitHub | 自動 | 月1回 | 2回 |

**GitHub Actions使用時間：** 約2-4時間/月（無料枠内で十分）  
**Vercel使用：** 無料枠内で運用可能

## 🔧 手動実行方法

```bash
# GitHub Web UI
1. リポジトリのActionsタブに移動
2. 実行したいワークフローを選択
3. "Run workflow" ボタンをクリック

# GitHub CLI
gh workflow run ci.yml
```

## 🚨 失敗時の対応フロー

### **CI/CD失敗時**
```bash
1. GitHub ActionsのログでエラーBOOL詳細確認
2. ローカルで品質チェック実行
   npm run quality:check
3. 問題修正後、再度push
```

### **Vercelデプロイ失敗時**
```bash
1. Vercelダッシュボードでビルドログ確認
2. ローカルでビルド確認
   npm run build
3. 必要に応じてVercelで手動再デプロイ
```

## 📈 品質指標の監視

### **監視ポイント**
品質とデプロイ状況の監視：

- ✅ **GitHub Actions** - 品質チェック結果（型、lint、テスト）
- 🚀 **Vercel Dashboard** - デプロイ状況、ビルドログ、サイトURL

### **推奨監視項目**
```bash
# 週1回確認
- GitHub Actions: 失敗したワークフローの有無
- Vercel: デプロイ成功率とパフォーマンス
- Dependabot: 更新提案

# 月1回確認
- GitHub Actions使用時間
- Vercel使用量
- 全体的な品質トレンド
```

## 🎉 Vercel + GitHub Actions の利点

この設定により：

1. **役割分担明確** - GitHub Actions（品質）+ Vercel（デプロイ）
2. **低コスト運用** - 両方とも無料枠内で運用可能
3. **メンテナンス負荷軽減** - 複雑なデプロイ設定不要
4. **高速デプロイ** - Vercelの最適化されたビルド・配信
5. **プレビュー機能** - PR毎に自動プレビュー環境生成
6. **手動制御可能** - 必要に応じて手動実行

**Result: 個人プロジェクトに最適な、シンプルで高性能なCI/CD環境！** 🚀