# easyui
# 1、配置Git，生产秘钥和公钥
# a)先输入ssh-keygen –t rsa –C “邮箱地址”,注意ssh-keygen之间是没有空格的,其他的之间是有空格的
# b)一路anter
# C:\Users\deelon\.ssh  //默认位置
# 2、在github上 配置SSH keys
# a)settings -- ssh and GPS keys  --add new ssh 
# b) 之后打开刚才生成的那个文件id_rsa.pub，全选复制里面的内容到Key这一栏中，点击Add Key按钮完成操作

# 3、验证是否设置成功，在git bash下输入命令：
# ssh -T git@github.com

#4、配置用户名和邮箱

# 在git bash下输入命令：

# git config --global user.name "用户名"
# git config --global user.email "邮箱"

echo "# easyui" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:hgwn/easyui.git
git push -u origin master

# 5、推送代码
# 第一次推送的时候要添加远程的代码库到配置
# $ git remote add origin https://github.com/hgwn/easyui.git   （会要求输入github账户和登录密码)
# 推送代码：
#  git push -u origin master   