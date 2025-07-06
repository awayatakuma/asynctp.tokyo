# 📚 Documentation

Complete documentation for the asynctp.tokyo portfolio project.

## 📖 Available Guides

### 🚀 Development
- [**Development Workflow**](./development-workflow.md) - Complete development guide with TDD, quality checks, and best practices
- [**Testing Guide**](./testing.md) - Test suite documentation, coverage, and testing strategies

### 🔧 Tools & Quality  
- [**Code Quality**](./code-quality.md) - Linting, formatting, pre-commit hooks, and quality tools
- [**GitHub Actions**](./github-actions.md) - CI/CD pipeline setup with Vercel deployment

## 🎯 Quick Navigation

### For New Developers
1. Start with [Development Workflow](./development-workflow.md) to understand the complete development process
2. Review [Code Quality](./code-quality.md) to set up your environment properly
3. Check [Testing Guide](./testing.md) to understand the test structure

### For CI/CD Setup
- [GitHub Actions](./github-actions.md) - Complete CI/CD configuration guide

### For Troubleshooting
- [Development Workflow](./development-workflow.md#-問題解決フロー) - Problem-solving flows
- [Code Quality](./code-quality.md#-エラー時の対応) - Error handling procedures
- [GitHub Actions](./github-actions.md#-失敗時の対応フロー) - CI/CD failure resolution

## 🛠️ Key Scripts Reference

| Script | Purpose | Documentation |
|--------|---------|---------------|
| `npm run dev` | Development server | [Development Workflow](./development-workflow.md) |
| `npm run test` | Run tests | [Testing Guide](./testing.md) |
| `npm run quality` | All quality checks | [Code Quality](./code-quality.md) |
| `npm run build` | Production build | [GitHub Actions](./github-actions.md) |

## 📁 Project Structure

```
asynctp.tokyo/
├── README.md                    # Project overview & quick start
├── docs/                        # Detailed documentation (you are here)
│   ├── README.md               # Documentation index
│   ├── development-workflow.md # Complete development guide  
│   ├── testing.md              # Test setup & strategies
│   ├── code-quality.md         # Quality tools & processes
│   └── github-actions.md       # CI/CD pipeline
├── src/                        # Source code
│   ├── components/             # React components
│   ├── app/                    # Next.js App Router
│   ├── types/                  # TypeScript definitions
│   └── utils/                  # Utility functions
├── .github/                    # GitHub Actions workflows
└── public/                     # Static assets
```

## 🎉 Getting Help

- **Development Issues:** See [Development Workflow](./development-workflow.md)
- **Test Problems:** Check [Testing Guide](./testing.md) 
- **Quality Checks:** Review [Code Quality](./code-quality.md)
- **CI/CD Issues:** Consult [GitHub Actions](./github-actions.md)

---

**💡 Pro Tip:** Keep this documentation updated as the project evolves!