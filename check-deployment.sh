#!/bin/bash

# 检查部署状态脚本
# 使用方法: ./check-deployment.sh

echo "🔍 检查部署状态..."

# 检查 GitHub Actions 状态
echo "📋 检查 GitHub Actions 状态..."
echo "访问: https://github.com/IOExceptions/la-mian/actions"

# 检查最近的提交
echo "📝 最近的提交:"
git log --oneline -3

# 检查分支状态
echo "🌿 当前分支:"
git branch -v

# 检查远程状态
echo "🌐 远程状态:"
git remote -v

# 检查工作流文件
echo "📁 工作流文件:"
ls -la .github/workflows/

# 检查是否有未提交的更改
echo "📊 工作区状态:"
git status --porcelain

echo ""
echo "📋 下一步操作:"
echo "1. 访问 GitHub Actions 页面查看运行状态"
echo "2. 检查 GitHub Secrets 配置"
echo "3. 验证 K3s 集群连接"
echo "4. 查看部署日志" 