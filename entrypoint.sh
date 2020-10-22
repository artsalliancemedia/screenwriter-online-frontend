#!/bin/sh

# Replace env
echo 'Check the env'

if [[ -z $VUE_APP_BASE_URL || -z $VUE_APP_PRODUCER_URL || -z $VUE_APP_HUB_URL || -z $VUE_APP_ENV || -z $NODE_HOST ]]; then
  echo 'one or more variables are undefined'
  exit 1
fi

echo 'Replacing env vars in JS'
for file in /app/assets/js/*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$VUE_APP_BASE_URL,$VUE_APP_PRODUCER_URL,$VUE_APP_HUB_URL,$VUE_APP_ENV' < $file.tmpl.js > $file
done

echo 'Replacing env vars in conf'
for config in /etc/nginx/nginx.conf
do
  echo "Processing $config ...";

  if [ ! -f $config.tmpl.conf ]; then
    cp $config $config.tmpl.conf
  fi

  envsubst '$NODE_HOST' < $config.tmpl.conf > $config
done

echo "Starting Nginx"
nginx -g 'daemon off;'
