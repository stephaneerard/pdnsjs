#!/bin/bash

wget -S -O - --header="X-API-Key: pdnsapikey" http://127.0.0.1:8888/api/v1/servers || exit 1

# wget -S -O - \
#   --header="X-API-Key: pdnsapikey" \
#   --post-data="{\"name\": \"stammgast.com.\", \"kind\": \"NATIVE\", \"api_rectify\": true, \"masters\": [], \"nameservers\": [\"ns1.com.\", \"ns2.com.\"]}" \
#   http://192.168.0.2:8888/api/v1/servers/localhost/zones