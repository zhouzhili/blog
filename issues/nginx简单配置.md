### nginx 简单配置和使用

nginx 自然不用多说，强大的静态文件服务器，前端工作做多了或多或少会有写服务部署的工作，正好自己也有一个便宜的阿里云服务器，那么就来折腾一下。

#### 1. 基本配置

首先，先起一个静态文件服务器，简单配置如下：

```nginx
# 启用服务使用的用户，Linux上跟权限有关
user nginx;

worker_processes auto;
# 错误日志
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  # hide nginx version
  server_tokens off;

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    #端口
    listen 80;
    # 服务名
    server_name www.test.cn;
    # 文件夹
    root /usr/share/nginx/html;

    location / {
      index index.html ;
    }
  }
}
```

其中主要部分是 server 中的配置，配置好端口，服务名，以及文件夹三分部就可以运行期我们的服务了。

#### 2.开启 Gzip 压缩

Gzip 能够压缩我们的网络资源，加快网路传输速度，简单的 gzip 配置如下：

```nginx
# 开启gzip
gzip on;

# 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
gzip_min_length 1k;

# gzip 压缩级别 1-10
gzip_comp_level 2;

# 进行压缩的文件类型。
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
```

由于图片本身已有压缩,开启 gzip 压缩不明显，而且对于大文件等开启压缩会占用较大的 CPU 资源，且效果不明显，所以不建议开启。

#### 3.开启缓存

使用缓存可以使得再次打开网站的速度变快，如果网站本身静态资源变化不多的时候，开启缓存效果尤为明显，另外对于单页应用，js,css 等资源都有 hash 值，可以不用缓存，而 html 作为单一入口，可以不缓存，基本的配置如下：

```nginx
# HTML不缓存
location ~ .*\.(html)(.*) {
  add_header Cache-Control max-age=no-cache;
  expires 0;
}
#JS 和 CSS 缓存时间设置
location ~ .*\.(css|js)(.*) {
  expires 3d;
}

# 通配所有以....结尾的请求
location ~* \.(png|jpg|jpeg|gif|gz|svg|mp4|ogg|ogv|webm|htc|xml|woff)(.*) {
  access_log off;
  expires 7d;
}
```
