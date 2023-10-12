sudo rm -rf letsencrypt

sudo docker run -it --rm --name letsencrypt \
      -v $PWD/file:/app \
      -v $PWD/certbot/log:/var/log/letsencrypt \
      -v $PWD/letsencrypt:/etc/letsencrypt \
      -v $PWD/lib/letsencrypt:/var/lib/letsencrypt \
      certbot/certbot \
      certonly \
      --manual \
      --email grandora@ygg-cg.com \
      --no-eff-email \
      --force-renewal \
      --register-unsafely-without-email \
      -d grandora.games \
      -d *.grandora.games \
      -d yggdrazil.games \
      -d *.yggdrazil.games \
      -d grandora.space \
      -d *.grandora.space \
      --preferred-challenges dns \
      --server https://acme-v02.api.letsencrypt.org/directory

sudo docker restart nginx

