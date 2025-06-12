#!/usr/bin/env bash
apt-get update && \
apt-get install --yes build-essential cmake pkg-config libzmq3-dev libssl-dev libsodium-dev libunbound-dev libminiupnpc-dev libunwind-dev libpcsclite-dev liblzma-dev libreadline-dev libldns-dev libexpat1-dev libgtest-dev doxygen graphviz
echo "Dependencies installation complete"
echo "Download Submodules"

