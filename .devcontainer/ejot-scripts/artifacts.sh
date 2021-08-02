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

if [ -z "${TOKEN_SEQ_LEARNWEBFRONTENDS}" ]; then
	echo "No Seq API key found please set manually by using 'dotnet user-secrets' set..."
else
	seqtoken="${TOKEN_SEQ_LEARNWEBFRONTENDS}"
fi

git config --global user.name "$name"
git config --global user.email "$mail"

if [ -d ~/.npm ]; then
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
	
	npm i -g ejot-cli
	
	cd /workspaces/LearnWebFrontends/LearnWebFrontends.Client
	npm i
fi

if [ -d ~/.dotnet ]; then
	if [ ! -d ~/.nuget/NuGet ]; then
		echo "Creating nuget folder"
		mkdir -p ~/.nuget/NuGet
	fi
	echo "Set up .Net Core"
	echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>" > ~/.nuget/NuGet/NuGet.Config
	echo "<configuration>" >> ~/.nuget/NuGet/NuGet.Config
	echo "  <packageSources>" >> ~/.nuget/NuGet/NuGet.Config
	echo "    <add key=\"nuget.org\" value=\"https://api.nuget.org/v3/index.json\" protocolVersion=\"3\" />" >> ~/.nuget/NuGet/NuGet.Config
	echo "    <add key=\"ejot-packages\" value=\"https://pkgs.dev.azure.com/EJOT-Dev/_packaging/ejot-packages/nuget/v3/index.json\" />" >> ~/.nuget/NuGet/NuGet.Config
	echo "  </packageSources>" >> ~/.nuget/NuGet/NuGet.Config
	echo "  <packageSourceCredentials>" >> ~/.nuget/NuGet/NuGet.Config
	echo "    <ejot-packages>" >> ~/.nuget/NuGet/NuGet.Config
	echo "        <add key=\"Username\" value=\"$mail\" />" >> ~/.nuget/NuGet/NuGet.Config
	echo "        <add key=\"ClearTextPassword\" value=\"$token\" />" >> ~/.nuget/NuGet/NuGet.Config
	echo "      </ejot-packages>" >> ~/.nuget/NuGet/NuGet.Config
	echo "  </packageSourceCredentials>" >> ~/.nuget/NuGet/NuGet.Config
	echo "</configuration>" >> ~/.nuget/NuGet/NuGet.Config

	cd /workspaces/LearnWebFrontends
	dotnet restore
fi

if [ -n "$seqtoken" ]; then
	echo "Set up Seq API key"
	cd /workspaces/LearnWebFrontends/LearnWebFrontends
	dotnet user-secrets set "Seq:ApiKey" "$seqtoken"
fi

touch ~/.configured
