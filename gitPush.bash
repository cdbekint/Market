#!/usr/bin/env bash
read -p "please input your message for git push : " message
git pull
git add --all
git commit -m "$message"
git push origin master