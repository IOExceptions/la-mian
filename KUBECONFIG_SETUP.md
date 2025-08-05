# Kubeconfig 设置和验证指南

## 🔍 问题诊断

如果您遇到 `connection refused` 错误，请按照以下步骤检查和修复：

### 1. 获取正确的 kubeconfig

在 K3s 服务器上运行：

```bash
# 获取 kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml

# 检查服务器地址
grep "server:" /etc/rancher/k3s/k3s.yaml
```

### 2. 验证服务器地址

确保服务器地址正确：

```yaml
# 正确的配置示例
apiVersion: v1
kind: Config
clusters:
- cluster:
    server: https://YOUR_SERVER_IP:6443  # 替换为实际 IP
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
    client-certificate-data: ...
    client-key-data: ...
```

### 3. 常见问题解决

#### 问题 1: 服务器地址是 127.0.0.1
**原因**: kubeconfig 中的服务器地址是本地地址
**解决**: 更新为实际的服务器 IP 地址

```bash
# 获取服务器 IP
ip addr show | grep "inet " | grep -v 127.0.0.1

# 更新 kubeconfig
sed -i 's|server: https://127.0.0.1:6443|server: https://YOUR_ACTUAL_IP:6443|g' kubeconfig.yaml
```

#### 问题 2: 防火墙阻止连接
**解决**: 开放 6443 端口

```bash
# Ubuntu/Debian
sudo ufw allow 6443

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=6443/tcp
sudo firewall-cmd --reload
```

#### 问题 3: K3s 服务未运行
**解决**: 重启 K3s 服务

```bash
sudo systemctl restart k3s
sudo systemctl status k3s
```

### 4. 测试连接

```bash
# 测试集群连接
kubectl cluster-info

# 测试节点连接
kubectl get nodes

# 测试命名空间
kubectl get namespaces
```

### 5. 更新 GitHub Secrets

1. 获取正确的 kubeconfig：
   ```bash
   sudo cat /etc/rancher/k3s/k3s.yaml | base64 -w 0
   ```

2. 更新 GitHub Secrets：
   - 名称: `KUBE_CONFIG`
   - 值: 上面命令的输出

### 6. 验证步骤

```bash
# 1. 检查 kubeconfig 文件
cat kubeconfig.yaml

# 2. 测试连接
kubectl cluster-info

# 3. 检查权限
kubectl auth can-i get pods

# 4. 测试部署
kubectl get deployments -n la-mian
```

## 🚨 常见错误

### 错误 1: connection refused
```
dial tcp 127.0.0.1:6443: connect: connection refused
```
**解决方案**: 更新服务器地址为实际 IP

### 错误 2: certificate signed by unknown authority
```
x509: certificate signed by unknown authority
```
**解决方案**: 
1. 在 kubeconfig 中添加 `insecure-skip-tls-verify: true`
2. 或在 kubectl 命令中添加 `--insecure-skip-tls-verify` 参数
3. 使用提供的脚本生成正确的 kubeconfig：
   ```bash
   ./create-kubeconfig.sh
   ```

### 错误 3: forbidden
```
Error from server (Forbidden)
```
**解决方案**: 检查用户权限和 RBAC 配置

## 📋 检查清单

- [ ] K3s 服务正在运行
- [ ] 服务器地址正确（不是 127.0.0.1）
- [ ] 防火墙允许 6443 端口
- [ ] kubeconfig 文件格式正确
- [ ] GitHub Secrets 已更新
- [ ] 网络连接正常

## 🔧 自动化修复

运行修复脚本：

```bash
./fix-kubeconfig.sh
```

## 📞 支持

如果问题仍然存在：

1. 检查 K3s 服务状态
2. 验证网络连接
3. 查看 K3s 日志
4. 联系技术支持 