FROM heroku/cedar:14

# Internally, we arbitrarily use port 3000
ENV PORT 5000
# Which version of node?
ENV NODE_ENGINE 9.0.0
# Locate our binaries
ENV PATH /app/heroku/node/bin/:/app/user/node_modules/.bin:$PATH

# Create some needed directories
RUN mkdir -p /app/heroku/node /app/.profile.d
WORKDIR /app/user

# Install node
RUN curl -s https://s3pository.heroku.com/node/v$NODE_ENGINE/node-v$NODE_ENGINE-linux-x64.tar.gz | tar --strip-components=1 -xz -C /app/heroku/node

# Export the node path in .profile.d
RUN echo "export PATH=\"/app/heroku/node/bin:/app/user/node_modules/.bin:\$PATH\"" > /app/.profile.d/nodejs.sh

#ONBUILD ADD package.json /app/user/
#ONBUILD ADD package-lock.json /app/user/
#ONBUILD RUN /app/heroku/node/bin/npm install
#ONBUILD ADD . /app/user/

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
ADD . /app/user/

WORKDIR /app/user

# 安装项目依赖包
RUN npm install

# 容器对外暴露的端口号
EXPOSE 5000

# 容器启动时执行的命令，类似npm run start
CMD ["npm", "start"]
