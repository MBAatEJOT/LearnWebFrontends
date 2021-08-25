FROM ubuntu:18.04

COPY library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
    && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
    # Use Docker script from script library to set things up
    && /bin/bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "${USERNAME}" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

COPY ejot-scripts/artifacts.sh /conf/artifacts.sh

RUN mv /etc/bash.bashrc '/root/.bashrc'
RUN chmod +x /conf/artifacts.sh

# RUN groupadd --gid 1000 node \
#   && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

ENV \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip

ENV ACCEPT_EULA=Y
# Install required libraries
RUN apt-get update \
	&& apt-get install -y wget unzip git gnupg curl software-properties-common

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# Set up .Net repository
RUN wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
	&& dpkg -i packages-microsoft-prod.deb

# Install transport-https
RUN apt-get update \
	&& apt-get install -y apt-transport-https

# Install .Net Core and Entity Framework tools
RUN apt-get update \
	&& apt-get install -y dotnet-sdk-3.1 dotnet-sdk-5.0 \
	&& dotnet help \
	&& dotnet tool install --global dotnet-ef

# Install mssql-tools
RUN apt-get update \
	&& apt-get install -y mssql-tools unixodbc-dev

# Set up node.js repository
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# Install node.js
RUN apt-get install -y nodejs

# Install essentials
RUN apt-get install -y build-essential

# Install Angular's cli
RUN npm i -g @angular/cli@11 gulp-cli