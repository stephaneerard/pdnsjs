#!/bin/bash

wget -S -O - --header="X-API-Key: pdnsapikey" http://127.0.0.1:8888/api/v1/servers || exit 1
