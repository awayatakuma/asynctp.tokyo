# Code Quality Setup

このプロジェクトは、高品質なコードを維持するためのツールとプロセスが設定されています。

## 🛠️ ツール構成

### Biome
- **フォーマッター**: コードの一貫した書式設定
- **リンター**: コード品質チェックとベストプラクティス適用
- **インポート整理**: import文の自動整理

### Husky + lint-staged
- **pre-commitフック**: コミット前の自動品質チェック
- **段階的処理**: 変更されたファイルのみ対象

### TypeScript
- **型チェック**: 静的型検証
- **Next.jsベストプラクティス**: 適切な型構造

### Jest + React Testing Library
- **単体テスト**: コンポーネントの動作検証
- **型安全なテスト**: TypeScript統合

## 📋 使用可能なコマンド

### 基本コマンド
```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build
```

### コード品質コマンド
```bash
# フォーマット適用
npm run format

# フォーマット確認のみ（変更なし）
npm run format:check

# lint実行
npm run lint

# lint自動修正
npm run lint:fix

# TypeScript型チェック
npm run type-check
```

### テスト関連
```bash
# テスト実行
npm run test

# ウォッチモード
npm run test:watch

# カバレッジ付きテスト
npm run test:coverage

# CI環境用テスト
npm run test:ci
```

### 総合品質チェック
```bash
# 全品質チェック（修正付き）
npm run quality

# 全品質チェック（確認のみ）
npm run quality:check
```

## 🔧 pre-commit フロー

コミット実行時に以下が自動実行されます：

1. **lint-staged**: 変更ファイルのフォーマット・lint
2. **TypeScript型チェック**: プロジェクト全体
3. **テスト実行**: 全テストスイート

### フローの詳細
```bash
git commit -m "feat: add new component"
↓
🔍 Running pre-commit checks...
  ├── biome format --write (変更ファイル)
  ├── biome check --write (変更ファイル)
  └── git add (修正内容をステージング)
↓
🔧 Running TypeScript type check...
  └── tsc --noEmit
↓
🧪 Running tests...
  └── jest --passWithNoTests
↓
✅ All pre-commit checks passed!
```

## ⚠️ エラー時の対応

### pre-commit失敗時
```bash
# 手動で品質チェック実行
npm run quality

# 個別確認
npm run lint        # lint エラー確認
npm run type-check  # 型エラー確認
npm run test        # テスト失敗確認
```

### よくある問題と解決
1. **lint エラー**: `npm run lint:fix` で自動修正
2. **型エラー**: 該当ファイルの型定義を確認・修正
3. **テスト失敗**: 変更に応じてテストを更新
4. **フォーマット**: `npm run format` で自動修正

## 📁 設定ファイル

- `biome.json` - Biome設定（フォーマット・lint ルール）
- `jest.config.js` - Jest設定
- `tsconfig.json` - TypeScript設定  
- `.husky/pre-commit` - pre-commitフック
- `package.json` の `lint-staged` - 段階的処理設定

## 🎯 品質基準

- **lint エラー**: 0個
- **型エラー**: 0個  
- **テスト失敗**: 0個
- **コードカバレッジ**: 保持（新機能は適切なテスト追加）

この設定により、一貫した高品質なコードベースが維持されます。