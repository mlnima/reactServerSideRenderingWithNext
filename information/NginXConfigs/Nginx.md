#Basic config for each domain on a single server
## ake a file name yourDomain  at /etc/nginx/site-enabled/[yourSiteName]
    server {
    listen 80;
    listen [::]:80;
    root /var/www/html;
    server_name example.com www.example.com;
    
        if ($http_x_forwarded_proto = "http") {
            return 301 https://$server_name$request_uri;
        }
    
        location / {
            proxy_pass http://localhost:3000;
            include proxy_params;
        }
    
        location ~ ^/(socket.io|api|dashboard|static|public|files) {
            proxy_pass http://localhost:3002;
            include proxy_params;
        }
    }

    server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate /var/www/vhosts/example/ssl/certificate.pem;   SSL CERTIFICATE PATH
    ssl_certificate_key /var/www/vhosts/example/ssl/private.pem;   SSL KEY PATH
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html index.htm index.nginx-debian.html;

        location / {
            proxy_pass http://localhost:3000;
            include proxy_params;
        }
    
        location ~ ^/(socket.io|api|dashboard|static|public|files) {
            proxy_pass http://localhost:3002;
            include proxy_params;
        }
    }