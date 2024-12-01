#!/bin/bash

WORKDIR=/Users/user/Repos/github/rhymes-web/

S1_SERVER=root@ovz1.9131212685.no45p.vps.myjino.ru
S1_REMOTEDIR=/var/www/r.v5a.ru

# не менять на переменную (безопасность!)
#rm -rf ${WORKDIR}/dist/*

cd ${WORKDIR} || exit
#git pull --rebase
#yarn install
#yarn build --outDir dist

#BUILDFN=./build`date '+%Y%m%d'`.tar
#rm -rf ${BUILDFN}.gz
#tar cf  ${BUILDFN} ./dist
#gzip ${BUILDFN}

####### Server 1 #######
ssh -p 49368 ${S1_SERVER} -i ~/.ssh/id_rsa \
    "rm -rf ${S1_REMOTEDIR}/static/* && rm -rf ${S1_REMOTEDIR}/index.html"
ssh -p 49368 ${S1_SERVER} -i ~/.ssh/id_rsa \
    "mkdir -p ${S1_REMOTEDIR}/static/css && mkdir -p ${S1_REMOTEDIR}/static/js"

scp -P 49368 -i ~/.ssh/id_rsa build/* ${S1_SERVER}:${S1_REMOTEDIR}
scp -P 49368 -i ~/.ssh/id_rsa build/static/css/* ${S1_SERVER}:${S1_REMOTEDIR}/static/css
scp -P 49368 -i ~/.ssh/id_rsa build/static/js/* ${S1_SERVER}:${S1_REMOTEDIR}/static/js

exit;