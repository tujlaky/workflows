#!/usr/bin/env bash
set -e
npm install --unsafe-perm=true -g coffee coffeescript firebase-tools prettier yarn bit-bin
yarn install
mkdir scripts
cd $HOME
wget https://github.com/git-lfs/git-lfs/releases/download/v2.3.2/git-lfs-linux-amd64-2.3.2.tar.gz
tar -xf git-lfs-linux-amd64-2.3.2.tar.gz
cd git-lfs-2.3.2
./install.sh
rm ../git-lfs-linux-amd64-2.3.2.tar.gz
apt-get update
apt-get install -y --no-install-recommends zip python-pip python-dev build-essential apt-transport-https python-setuptools
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
touch /etc/apt/sources.list.d/kubernetes.list
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list
apt-get update
apt-get install -y kubectl
pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic
apt-get remove --purge -y python-pip python-dev build-essential python-setuptools
apt-get autoremove -y
apt-get clean
mkdir -p $HOME/.kube
yes | bit init
