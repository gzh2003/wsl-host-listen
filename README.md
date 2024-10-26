# wsl-host-listen

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)

## Description

`wsl-host-listen` is a tool designed to facilitate access to Windows Subsystem for Linux (WSL) from
local area networks.

This utility streamlines the installation of
[WSLHostPatcher](https://github.com/CzBiX/WSLHostPatcher).

## Usage

`wsl-host-listen` usage via npm:

```sh
npx wsl-host-listen
```

## Recommendations

Consider using `netsh` to add a port proxy:

```
netsh interface portproxy add v4tov4 listenport=<yourPortToForward> listenaddress=0.0.0.0 connectport=<yourPortToConnectToInWSL> connectaddress=(wsl hostname -I)
```

Check out the
[Microsoft documentation](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-a-wsl-2-distribution-from-your-local-area-network-lan)
for more information.

Alternatively set up
[mirrored mode networking](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking).
