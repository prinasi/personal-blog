# Personal Blog

一个为 GitHub Pages 设计的个人静态博客：干净的首页和文章列表、Markdown 写作与预览、封面/正文图片上传，以及在网页内直接新建、更新、删除文章。没有后端服务；所有内容都提交到当前 GitHub 仓库，随后由 GitHub Actions 自动重新发布。

## 一次部署到 GitHub Pages

1. 将项目推送到 GitHub 的 `main` 分支。
2. 打开仓库的 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。
3. 在 **Actions** 页面确认 `Deploy GitHub Pages` 工作流成功完成。首次部署通常需要一两分钟。
4. 项目仓库会发布到 `https://<owner>.github.io/<repository>/`；若仓库名是 `<owner>.github.io`，则发布到根路径。

工作流会在构建时自动注入仓库 owner、名称、分支和正确的路径前缀，不需要手动配置站点 URL 或 Actions Secret。

## 本地运行与自定义

```bash
pnpm install
pnpm dev
```

编辑 `src/config/site-content.json` 可以修改站点名称、简介、头像和配色。若希望在本地开发时也测试“发布到 GitHub”，复制 `.env.example` 为 `.env.local`，填写仓库信息；不要把 `.env.local` 或任何 Token 提交到仓库。

## 网页写作教程

1. 进入站点的 **写文章**，填写标题、URL slug 和 Markdown 正文；也可以点击 **导入 MD** 导入本地 Markdown 文件。
2. 在右侧上传封面或正文图片。将缩略图拖到正文编辑区会插入 Markdown 图片；直接粘贴截图也会自动上传。图片会作为文章资源保存。
3. 点击 **预览** 确认效果，然后点击 **输入 Token**。
4. 在 GitHub 的 **Settings → Developer settings → Personal access tokens → Fine-grained tokens** 创建一个 token：
   - Resource owner 选择你的账号；
   - Repository access 选择此博客仓库；
   - Repository permissions 中将 **Contents** 设为 **Read and write**；
   - 生成后立即复制 token，并输入网站弹窗。
5. 再次点击 **发布**。网页会创建一次 Git 提交，GitHub Actions 随即重新部署站点。

在文章详情页点击 **编辑** 可以更新内容；编辑页的 **删除** 会删除文章目录并同步更新文章索引。Token 只保存在当前浏览器标签页会话的 `sessionStorage` 中，关闭浏览器标签页后失效；它不会写入仓库或部署产物。请只在你自己可信的设备上输入 Token。

文章和图片的仓库布局如下：

```text
public/blogs/
  index.json
  <slug>/
    config.json
    index.md
  <image-hash>.<ext>
```

## 常见问题

- **发布按钮提示配置不完整**：只有已通过 GitHub Actions 部署的站点会自动获得仓库信息。本地测试发布时请配置 `.env.local`。
- **401 / 403**：重新创建或确认 token，确保它针对当前仓库且 `Contents` 是 `Read and write`。
- **发布后内容未立刻变化**：等待 Actions 工作流完成后刷新页面；CDN 缓存通常只会短暂延迟。
- **站点部署在仓库子路径时图片失效**：不要手动去掉 `next.config.ts` 的 `basePath` 配置，站点已自动处理该路径。
