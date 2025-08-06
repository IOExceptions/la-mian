# 手动修复 Kubeconfig 指南

## 🔍 问题诊断

base64 编码错误通常是由于：
1. 证书数据格式不正确
2. 编码过程中出现字符丢失
3. 原始 kubeconfig 文件损坏

## 🛠️ 手动修复步骤

### 步骤 1: 检查 K3s 状态

\`\`\`bash
# 检查 K3s 服务状态
sudo systemctl status k3s

# 检查 kubeconfig 文件
sudo ls -la /etc/rancher/k3s/k3s.yaml
\`\`\`

### 步骤 2: 重新生成 kubeconfig

\`\`\`bash
# 备份原始文件
sudo cp /etc/rancher/k3s/k3s.yaml /etc/rancher/k3s/k3s.yaml.backup

# 重启 K3s 服务
sudo systemctl restart k3s
sleep 10

# 检查新生成的 kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml
\`\`\`

### 步骤 3: 手动创建正确的 kubeconfig

\`\`\`bash
# 获取服务器 IP
SERVER_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | head -n1 | awk '{print $2}' | cut -d'/' -f1)
echo "服务器 IP: $SERVER_IP"

# 直接复制原始 kubeconfig
sudo cp /etc/rancher/k3s/k3s.yaml kubeconfig-fixed.yaml

# 更新服务器地址
sed -i "s|server: https://127.0.0.1:6443|server: https://$SERVER_IP:6443|g" kubeconfig-fixed.yaml

# 添加跳过 TLS 验证
sed -i '/server:/a\    insecure-skip-tls-verify: true' kubeconfig-fixed.yaml
\`\`\`

### 步骤 4: 测试连接

\`\`\`bash
# 测试 kubeconfig
export KUBECONFIG=kubeconfig-fixed.yaml
kubectl config view

# 测试连接
kubectl cluster-info

# 如果成功，获取 base64 编码
cat kubeconfig-fixed.yaml | base64 -w 0
\`\`\`

## 🔧 备选方案

### 方案 1: 使用 Token 认证

\`\`\`bash
# 获取 Token
TOKEN=$(sudo cat /var/lib/rancher/k3s/server/node-token)

# 创建使用 Token 的 kubeconfig
cat > kubeconfig-token.yaml << EOF
apiVersion: v1
kind: Config
clusters:
- cluster:
    insecure-skip-tls-verify: true
    server: https://$SERVER_IP:6443
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
users:
- name: default
  user:
    token: $TOKEN
EOF

# 测试连接
export KUBECONFIG=kubeconfig-token.yaml
kubectl cluster-info
\`\`\`

### 方案 2: 重新安装 K3s

如果问题持续，可以重新安装 K3s：

\`\`\`bash
# 卸载 K3s
/usr/local/bin/k3s-uninstall.sh

# 清理数据
sudo rm -rf /var/lib/rancher
sudo rm -rf /etc/rancher

# 重新安装
curl -sfL https://get.k3s.io | sh -

# 等待安装完成
sleep 30

# 获取新的 kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml
\`\`\`

## 📋 验证步骤

### 1. 检查 kubeconfig 格式

\`\`\`bash
# 验证 YAML 格式
kubectl config view --kubeconfig=kubeconfig-fixed.yaml

# 检查证书数据
grep -A1 "client-certificate-data:" kubeconfig-fixed.yaml
grep -A1 "client-key-data:" kubeconfig-fixed.yaml
\`\`\`

### 2. 测试连接

\`\`\`bash
# 测试集群连接
kubectl cluster-info --kubeconfig=kubeconfig-fixed.yaml

# 测试节点连接
kubectl get nodes --kubeconfig=kubeconfig-fixed.yaml

# 测试命名空间
kubectl get namespaces --kubeconfig=kubeconfig-fixed.yaml
\`\`\`

### 3. 获取 GitHub Secrets 内容

\`\`\`bash
# 获取 base64 编码
cat kubeconfig-fixed.yaml | base64 -w 0
\`\`\`

## 🚨 常见问题

### 问题 1: base64 编码错误
\`\`\`
illegal base64 data at input byte 6
\`\`\`
**解决方案**: 重新生成 kubeconfig 文件

### 问题 2: 证书数据缺失
\`\`\`
client-certificate-data: ""
\`\`\`
**解决方案**: 重启 K3s 服务

### 问题 3: 权限问题
\`\`\`
permission denied
\`\`\`
**解决方案**: 使用 sudo 运行命令

## 📞 支持

如果问题仍然存在：

1. 检查 K3s 日志：`sudo journalctl -u k3s`
2. 验证网络连接：`curl -k https://localhost:6443/healthz`
3. 检查证书文件：`sudo ls -la /var/lib/rancher/k3s/server/tls/`
