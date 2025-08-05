#!/bin/bash

# Next.js 应用自动部署脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署 Next.js 应用..."

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install --legacy-peer-deps

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建结果
if [ ! -d ".next" ]; then
    echo "❌ 构建失败: .next 目录不存在"
    exit 1
fi

echo "✅ 构建完成!"

# 显示构建统计
echo "📊 构建统计:"
echo "- 静态文件: .next/static/"
echo "- 服务端文件: .next/server/"
echo "- 总大小: $(du -sh .next | cut -f1)"

echo "🎉 部署准备完成!"
echo ""
echo "📋 下一步操作:"
echo "1. 将项目文件上传到服务器"
echo "2. 在服务器上运行: npm install --legacy-peer-deps"
echo "3. 在服务器上运行: npm run build"
echo "4. 配置 Nginx 反向代理"
echo "5. 使用 PM2 启动应用: pm2 start npm --name 'la-mian' -- start" 