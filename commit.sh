
branch_name=`git symbolic-ref --short -q HEAD` #获取分支名称


echo '请输入commit信息:'
read commit_msg
git add -A #将内容从工作目录添加到暂存区
git commit -m $commit_msg #主要是将暂存区里的改动给提交到本地的版本库
git push origin $branch_name:$branch_name #是将本地分支的更新推送到远程主机
