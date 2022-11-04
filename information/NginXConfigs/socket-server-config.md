#Basic config for each domain on a single server
## on ubuntu server this file should be created with the exact domain name at /etc/nginx/sites-enabled
    server {
        listen 80 ;
        listen [::]:80 ;
        root /var/www/html;
        server_name $DOMAIN.com www.$DOMAIN.com;

        #Redirect traffic to HTTPS
        if ($http_x_forwarded_proto = "http") {
            return 301 https://$server_name$request_uri;
        }

        location /api {
            # API server address
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        ssl        on;
        ssl_certificate         /etc/ssl/certs/cert.pem;
        ssl_certificate_key     /etc/ssl/private/key.pem;
        server_name $DOMAIN.com www.$DOMAIN.com;
        root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        location /api {
            # API server address
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    
    }