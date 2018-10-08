#!/bin/bash

sudo mv -f ./travis/powerdns/etc/apt/preferences.d/pdns /etc/apt/preferences.d
sudo mv -f ./travis/powerdns/etc/apt/sources.list.d/pdns.list /etc/apt/sources.list.d

curl https://repo.powerdns.com/FD380FBB-pub.asc | sudo apt-key add - &&
sudo apt-get update && sudo apt-get install pdns-server pdns-backend-pgsql

sudo rm -f /etc/powerdns/pdns.conf
sudo cp ./travis/powerdns/pdns.conf /etc/powerdns

sudo /etc/init.d/pdns restart
