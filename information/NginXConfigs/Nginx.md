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

        location / {
            # Web server address
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api {
            # API server address
            proxy_pass http://localhost:3002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /dashboard {
            # File server address
            proxy_pass http://localhost:3003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /static {
            # File server address
            proxy_pass http://localhost:3003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /files {
            # File server address
            proxy_pass http://localhost:3003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

[//]: # (        location /messenger {)

[//]: # (            # API server address)

[//]: # (            proxy_pass http://localhost:3002;)

[//]: # (            proxy_http_version 1.1;)

[//]: # (            proxy_set_header Upgrade $http_upgrade;)

[//]: # (            proxy_set_header Connection 'upgrade';)

[//]: # (            proxy_set_header Host $host;)

[//]: # (            proxy_cache_bypass $http_upgrade;)

[//]: # (        })

        location /public {
            # File server address
            proxy_pass http://localhost:3003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /socket.io {
            # Socket.io server address
            proxy_pass http://localhost:3001/socket.io;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        ssl        on;
        ssl_certificate         /etc/ssl/certs/trdland.pem;
        ssl_certificate_key     /etc/ssl/private/trdlandKey.pem;
        server_name $DOMAIN.com www.$DOMAIN.com;
        root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        location / {
            # Web server address
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api {
            # API server address
            proxy_pass http://localhost:3002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

       location /dashboard {
            # API server address
            proxy_pass http://localhost:3002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /static {
            # API server address
            proxy_pass http://localhost:3002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /public {
            # File server address
            proxy_pass http://localhost:3002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }


        location /socket.io {
            # Socket.io server address
            proxy_pass http://localhost:3001/socket.io;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }


# (location ~ ^/(static|media)/ {})
