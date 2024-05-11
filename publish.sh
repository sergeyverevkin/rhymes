#!/bin/bash

WORKDIR=/Users/user/WebstormProjects/rhymes/

S1_SERVER=root@ovz1.9131212685.no45p.vps.myjino.ru
S1_REMOTEDIR=/var/www/r.v5a.ru

S2_SERVER=key@ncai.ru  #'79.174.83.132'
S2_REMOTEDIR=/app/transfer/dist

# не менять на переменную (безопасность!)
rm -rf ${WORKDIR}/dist/*

cd ${WORKDIR} || exit
git pull --rebase
yarn install

yarn build --outDir dist

BUILDFN=./build`date '+%Y%m%d'`.tar
rm -rf ${BUILDFN}.gz
tar cf  ${BUILDFN} ./dist
gzip ${BUILDFN}

####### Server 1 #######
ssh -p 49368 ${S1_SERVER} -i ~/.ssh/id_rsa \
    "rm -rf ${S1_REMOTEDIR}/assets/* && rm -rf ${S1_REMOTEDIR}/fonts/* && rm -rf ${S1_REMOTEDIR}/images/* && rm -rf ${S1_REMOTEDIR}/index.html"
ssh -p 49368 ${S1_SERVER} -i ~/.ssh/id_rsa \
    "mkdir -p ${S1_REMOTEDIR}/assets && mkdir -p ${S1_REMOTEDIR}/fonts && mkdir -p ${S1_REMOTEDIR}/images"

scp -P 49368 -i ~/.ssh/id_rsa dist/assets/* ${S1_SERVER}:${S1_REMOTEDIR}/assets/
scp -P 49368 -i ~/.ssh/id_rsa dist/images/* ${S1_SERVER}:${S1_REMOTEDIR}/images/
scp -P 49368 -i ~/.ssh/id_rsa dist/fonts/* ${S1_SERVER}:${S1_REMOTEDIR}/fonts/
scp -P 49368 -i ~/.ssh/id_rsa dist/index.html ${S1_SERVER}:${S1_REMOTEDIR}/

exit;

#rm -rf dist
#yarn build:admin
scp -P 49368 -i ~/.ssh/id_rsa dist/assets/* root@ovz1.9131212685.no45p.vps.myjino.ru:${REMOTEDIR}/admin/assets/
scp -P 49368 -i ~/.ssh/id_rsa dist/images/* root@ovz1.9131212685.no45p.vps.myjino.ru:${REMOTEDIR}/admin/images/
scp -P 49368 -i ~/.ssh/id_rsa dist/fonts/* root@ovz1.9131212685.no45p.vps.myjino.ru:${REMOTEDIR}/admin/fonts/
scp -P 49368 -i ~/.ssh/id_rsa dist/index.html root@ovz1.9131212685.no45p.vps.myjino.ru:${REMOTEDIR}/admin/

ssh ${REMOTE_SERVER} "mkdir -p ${REMOTEDIR2}/admin/assets; mkdir -p ${REMOTEDIR2}/admin/fonts; mkdir -p ${REMOTEDIR2}/admin/images "

scp dist/assets/* ${REMOTE_SERVER}:${REMOTEDIR2}/admin/assets/
scp dist/images/* ${REMOTE_SERVER}:${REMOTEDIR2}/admin/images/
scp dist/fonts/* ${REMOTE_SERVER}:${REMOTEDIR2}/admin/fonts/
scp dist/index.html ${REMOTE_SERVER}:${REMOTEDIR2}/admin/
