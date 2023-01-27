#!/bin/sh

cwd=$(pwd)

if [ -z "${FULL_NAME}" ]; then
	printf "Please enter your full Name: "
	read name
else
	name="${FULL_NAME}"
fi

if [ -z "${USER_MAIL}" ]; then
	printf "Please enter your e-Mail: "
	read mail
else
	mail="${USER_MAIL}"
fi

if [ -z "${TOKEN_AZURE}" ]; then
	printf "Please enter your azure token: "
	read token
else
	token="${TOKEN_AZURE}"
fi

git config --global user.name "$name"
git config --global user.email "$mail"

if [ -x "$(command -v npm)" ]; then
	b64=`echo -n $token | base64`
	
	echo "Set up node.js"
	
	echo "registry=https://pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/registry/" > ~/.npmrc
	echo "always-auth=true" >> ~/.npmrc
	echo "" >> ~/.npmrc
	echo "; begin auth token " >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/registry/:username=EJOT-Dev" >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/registry/:_password=$b64" >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/registry/:email=$mail" >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/:username=EJOT-Dev" >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/:_password=$b64" >> ~/.npmrc
	echo "//pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/npm/:email=$mail" >> ~/.npmrc
	echo "; end auth token" >> ~/.npmrc
fi

touch ~/.configured
