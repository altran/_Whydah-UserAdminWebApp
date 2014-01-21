#!/bin/sh

export IAM_MODE=DEV
#export IAM_MODE=TEST

A=UserAdministration
V=0.2-SNAPSHOT
JARFILE=$A-$V.jar

pkill -f $A

wget --user=altran --password=l1nkSys -O $JARFILE "http://mvnrepo.cantara.no/service/local/artifact/maven/content?r=altran-snapshots&g=net.whydah.identity&a=$A&v=$V&p=jar"
nohup java -jar -DIAM_CONFIG=useradministration.TEST.properties $JARFILE &

tail -f nohup.out

