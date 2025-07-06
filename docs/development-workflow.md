# 🚀 開発フローガイド

このプロジェクトで最適化された開発フローの完全ガイドです。

## 📋 日常的な開発サイクル

### **1. 開発開始時**
```bash
# プロジェクト開始
git pull origin main
npm run dev

# 品質状態の確認
npm run quality:check
```

### **2. 機能開発中**
```bash
# コーディング中の継続的チェック
npm run format        # 定期的なフォーマット
npm run test:watch    # バックグラウンドでテスト監視

# 特定コンポーネント開発時
npm run test -- ComponentName.test.tsx
```

### **3. 開発完了時**
```bash
# 最終品質チェック
npm run quality

# すべて成功したらコミット
git add .
git commit -m "feat: add new component"
# ↑ 自動でpre-commitフックが実行される
```

## 🔄 推奨する開発フロー詳細

### **Phase 1: 計画・設計**
```bash
# ブランチ作成
git checkout -b feature/new-component

# 型定義の計画
# src/types/components.ts に必要な型を先に定義
```

### **Phase 2: TDD（テスト駆動開発）**
```bash
# 1. テストファイル作成
touch src/components/__tests__/NewComponent.test.tsx

# 2. テスト作成（レッドフェーズ）
npm run test:watch  # 監視モード開始

# 3. 最小限の実装（グリーンフェーズ）
touch src/components/NewComponent.tsx

# 4. リファクタリング（リファクターフェーズ）
npm run format && npm run lint:fix
```

### **Phase 3: 継続的品質管理**
```bash
# 開発中の品質チェック（5-10分おき）
npm run quality:check

# 問題があった場合の修正
npm run lint:fix      # 自動修正
npm run type-check    # 型エラー確認
npm run test          # テスト状況確認
```

### **Phase 4: コミット準備**
```bash
# 最終品質確保
npm run quality

# 成功したらコミット（pre-commitフックが自動実行）
git add .
git commit -m "feat: implement NewComponent with tests"
```

## ⚡ 効率的な開発パターン

### **🔧 コンポーネント開発パターン**

#### **1. 型ファースト開発**
```typescript
// src/types/components.ts
export interface NewComponentProps {
  title: string
  onClick: () => void
}
```

#### **2. テストファースト開発**
```typescript
// src/components/__tests__/NewComponent.test.tsx
import { NewComponent } from '../NewComponent'
import type { NewComponentProps } from '@/types/components'

describe('NewComponent', () => {
  const mockProps: NewComponentProps = {
    title: 'Test Title',
    onClick: jest.fn(),
  }
  
  it('renders with correct title', () => {
    render(<NewComponent {...mockProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    render(<NewComponent {...mockProps} />)
    fireEvent.click(screen.getByText('Test Title'))
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })
})
```

#### **3. 実装**
```typescript
// src/components/NewComponent.tsx
import type { NewComponentProps } from '@/types/components'

export const NewComponent = ({ title, onClick }: NewComponentProps) => {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}
```

## 🎯 品質チェックのタイミング

### **リアルタイム（開発中）**
- VSCode/IDEの自動フォーマット
- `npm run test:watch` でテスト監視

### **定期的（15-30分おき）**
```bash
npm run quality:check  # 非破壊的チェック
```

### **区切り時（機能完成時）**
```bash
npm run quality        # 修正込みチェック
```

### **コミット時（自動）**
- pre-commitフックによる自動品質確保

## 🔍 問題解決フロー

### **lint エラー時**
```bash
# 自動修正を試行
npm run lint:fix

# 手動確認が必要な場合
npm run lint  # エラー詳細確認

# よくあるエラーと対処法：
# - unused imports → 自動削除される
# - formatting issues → 自動修正される
# - complex logic → 手動でリファクタリング
```

### **型エラー時**
```bash
# 型チェック実行
npm run type-check

# 段階的修正アプローチ：
# 1. src/types/ で型定義確認・追加
# 2. コンポーネントのprops型確認
# 3. テストファイルの型確認
# 4. import文の型import確認
```

### **テスト失敗時**
```bash
# 詳細確認
npm run test -- --verbose

# 特定テスト実行
npm run test -- ComponentName.test.tsx

# カバレッジ確認
npm run test:coverage

# デバッグモード
npm run test:watch -- --verbose
```

## 📝 ベストプラクティス

### **1. 小さなコミット習慣**
```bash
# ✅ 良い例：機能単位でのコミット
git commit -m "feat: add Button component"
git commit -m "test: add Button component tests" 
git commit -m "style: improve Button styling"
git commit -m "docs: update Button component docs"

# ❌ 避ける例：大きすぎるコミット
git commit -m "add entire dashboard feature"
```

### **2. 品質チェックの習慣化**
```bash
# 🌅 朝一番の品質確認
npm run quality:check

# 🍽️ 昼休み前の品質確認  
npm run quality:check

# 🌙 作業終了前の品質確保
npm run quality
```

### **3. 効率的なデバッグ**
```bash
# 特定コンポーネントのテスト監視
npm run test:watch -- --testNamePattern="ButtonComponent"

# 型エラーのリアルタイム確認
npm run type-check  # 別ターミナルで定期実行

# 特定ファイルのlint確認
npx biome check src/components/Button.tsx
```

## 🎮 推奨IDE設定

### **VSCode設定例 (.vscode/settings.json)**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll": true
  },
  "typescript.preferences.useAliasesForRenames": false,
  "jest.autoRun": "watch",
  "files.associations": {
    "*.test.{ts,tsx}": "typescript"
  }
}
```

### **推奨拡張機能**
- Biome (biomejs.biome)
- Jest (orta.vscode-jest)
- TypeScript Importer (pmneo.tsimporter)
- Auto Rename Tag (formulahendry.auto-rename-tag)

## 🚦 開発状態の可視化

### **✅ 健全な状態の指標**
```bash
npm run quality:check
# ✅ Format check: No issues
# ✅ Lint check: No issues  
# ✅ Type check: No errors
# ✅ Tests: 38/38 passing
```

### **⚠️ 注意が必要な状態**
```bash
# Lint warnings が出る場合
npm run lint:fix  # 自動修正を試行

# 型エラーが出る場合  
npm run type-check  # 手動修正が必要

# テスト失敗が出る場合
npm run test -- --verbose  # 詳細確認
```

### **❌ 問題のある状態**
```bash
# pre-commitフックが失敗する場合
# 1. 個別に問題を特定
npm run format:check  # フォーマット問題
npm run lint         # lint問題  
npm run type-check   # 型問題
npm run test         # テスト問題

# 2. 順次解決
npm run quality      # 一括修正試行
```

## 🔄 ワークフロー例

### **新機能開発の完全フロー**
```bash
# 1. 準備
git checkout main
git pull origin main
git checkout -b feature/user-profile
npm run quality:check  # 開始時の状態確認

# 2. 型定義
# src/types/components.ts でUserProfileProps定義

# 3. テスト作成
# src/components/__tests__/UserProfile.test.tsx
npm run test:watch    # 監視開始

# 4. 実装
# src/components/UserProfile.tsx
npm run format        # 定期的なフォーマット

# 5. 品質チェック
npm run quality:check # 中間確認
npm run quality       # 最終確認

# 6. コミット
git add .
git commit -m "feat: add UserProfile component with tests"
# pre-commitフックが自動実行 ✅

# 7. プッシュ
git push origin feature/user-profile
```

## 💡 生産性向上のTips

### **開発効率化**
```bash
# エイリアス設定例（~/.bashrc または ~/.zshrc）
alias q="npm run quality:check"
alias qf="npm run quality"  
alias tw="npm run test:watch"
alias tc="npm run type-check"

# 使用例
q      # 素早い品質チェック
qf     # 修正込み品質チェック
tw     # テスト監視開始
tc     # 型チェック
```

### **マルチターミナル活用**
```bash
# ターミナル1: 開発サーバー
npm run dev

# ターミナル2: テスト監視  
npm run test:watch

# ターミナル3: 品質チェック用
npm run quality:check
```

## 🎯 成功指標

このフローが成功している状態：

1. **コミット時の自動品質確保**: pre-commitフックが常に成功
2. **テストカバレッジの維持**: 新機能にはテストが必ず付随
3. **型安全性の確保**: TypeScriptエラーが0件
4. **コード品質の一貫性**: lintルールが自動適用
5. **開発速度の向上**: 品質問題の早期発見・修正

---

**💡 このガイドを参照しながら開発することで、常に高品質なコードベースを維持できます！**